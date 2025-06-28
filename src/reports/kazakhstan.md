---
layout: report
date: "23 July 2019"
title: "Kazakhstan’s HTTPS Interception"
permalink: /kazakhstan
excerpt: "The Kazakhstan government recently began using a fake root CA to perform a man-in-the-middle (MitM) attack against HTTPS connections to websites including Facebook, Twitter, and Google. We have been tracking the attack. The attack is no longer active."
authors:
  - Ram Sundara Raman^1
  - Leonid Evdokimov
  - Eric Wustrow^2
  - Alex Halderman^1
  - Roya Ensafi^1
affiliations:
  - (1) University of Michigan
  - (2) University of Colorado Boulder
border: yes
research: "Investigating Large Scale HTTPS Interception in Kazakhstan"
link: "/assets/Kazakhstan.pdf"
writers: "R. Sundara Raman, L. Evdokimov, E. Wustrow, J. A. Halderman, R. Ensafi"
appearing: "ACM Internet Measurement Conference (IMC), 2020"
note: "<b>In December 2020, Kazakhstan performed new drills of the interception system, this time using a new root CA (ISCA). Domains such as Google, Facebook and Twitter were affected again. More information and live tracking of the interception can be found here: <a href=\"https://censoredplanet.org/kazakhstan/live\">https://censoredplanet.org/kazakhstan/live</a></b>"
video: "https://www.youtube-nocookie.com/embed/RoYWsfNOCr4"
---

This post describes our analysis of carrier-level HTTPS interception ordered by the government of Kazakhstan.

The Kazakhstan government recently began using a [fake root CA to perform](https://bugzilla.mozilla.org/show_bug.cgi?id=1232689) a man-in-the-middle (MitM) attack against HTTPS connections to websites including Facebook, Twitter, and Google. We have been tracking the attack, and in this post, we provide preliminary results from our ongoing research and new technical details about the Kazakh interception system.

### High Level Takeaways:

* Kazakhstan recently began intercepting HTTPS connects using a fake root CA. This behavior significantly weakens Internet for Kazakh Internet users.
* The CA is not trusted by browsers by default, and must be installed manually by a user. Users cannot access affected sites at all if they do not install the root certificate for the fake CA and allow interception.
* Interception was first detected on July 17, and we have been tracking it continuously since July 20. It has stopped and started again several times.
* Only certain sites are intercepted, and interception is triggered based on the SNI hostname. At least 37 domains are affected, including social media and communication websites (see full list below).
* So far, the attack appears to affect a fraction of connections passing through the country’s largest ISP, Kazakhtelecom (AS 9198 KazTelecom). This means some, but not all, of the Kazakh Internet population is affected.
* The interception behavior can be triggered from outside the country, making it possible for international researchers to study remotely.

### What is a HTTPS interception?

HTTPS secures communication between browsers and websites by encrypting the communication, preventing ISPs and governments from reading or modifying it. Servers prove their identity by presenting certificates that are digitally signed by Certificate Authorities (CAs), entities trusted by web browsers to vouch for the identity of sites. For example, facebook.com provides a certificate to browsers that is signed by DigiCert, a CA that is trusted and built-in to virtually all browsers. Browsers can know they are talking to the real facebook.com by validating the presented certificate and confirming that it is signed by a CA that they trust (DigiCert). The certificate provided by facebook.com also contains a public cryptographic key that is used to secure subsequent communication between the browser and Facebook.

In an HTTPS interception attack (a kind of “man-in-the-middle” or MitM attack), an in-network adversary pretends to be a website (e.g. facebook.com) and presents its own fake certificate with the attacker’s public key. Normally, the attacker cannot get any legitimate CA to sign a certificate for a domain the attacker doesn’t control, and so browsers will detect and thwart this kind of attack. However, if the attacker can convince users to install a new CA’s root certificate into their browsers, the browsers will trust the attacker’s fake certificates signed by this illegitimate CA. With these fake certificates, the attacker can impersonate any website, modifying its content or recording exactly what users do or post on the site. For this reason, users **should not** install root CA certificates, because it opens them up to having their otherwise secure communication intercepted or modified without their knowledge.

### Censored Planet Findings

Censored Planet is a global censorship observatory operated at the University of Michigan that continuously monitors various types of network interference in over 170 countries, using a collection of remote measurement techniques. Our scanners first alerted us to the presence of a potential MitM attack occurring in Kazakhstan starting on July 20, 2019. We first detected it using a technique called HyperQuack, which works by connecting to TLS servers and sending handshakes that contain potentially censored domains in the server name indication (SNI) extension. If the response shows tell-tale signs of interference that differs from a normal handshake, the domain is marked as potentially censored in the country where the server is located. (Figure 1)

![An example of how CensoredPlanet uses HTTPS servers to detect TLS MitM](/assets/kazakhstan-quack.png "An example of how CensoredPlanet uses HTTPS servers to detect TLS MitM")

**Figure 1.** _An example of how CensoredPlanet uses HTTPS servers to detect TLS MitM_
{: .center }

Investigation revealed that the certificate returned in these cases was a fake one ultimately signed by the Kazakhstan root CA (Qaznet Trust Network) (Figure 2). Our experiments also showed that the censor acts as a transparent proxy. This means the censor decrypts the traffic and then encrypts it with its own key before forwarding it to the destination.


[![An example of a trusted and injected certificate from an HTTPS Server in the KazTelecom AS (AS 9198)](/assets/certificates.jpg "An example of a trusted and injected certificate from an HTTPS Server in the KazTelecom AS (AS 9198)")](assets/Certificates.pdf)

[**Figure 2.** _An example of a trusted and injected certificate from an HTTPS Server in the KazTelecom AS (AS 9198)_](/assets/Certificates.pdf)
{: .center }

Our investigation also shows that connections are also only intercepted if they follow a network path that passes the interception system; however, interception occurs regardless of the direction that the connection takes along the path. This means that we can trigger the interception behavior from outside the country by making connections to TLS servers inside Kazakhstan, allowing us to conveniently perform more detailed measurements.

### In-depth Analysis

Alerted by the automated results from Censored Planet’s HyperQuack scans, we performed several experiments to better understand Kazakhstan’s HTTPS interception infrastructure.

![Vantage Points](/assets/kazakhstan-umich.png "Vantage Points")

Our vantage points from within Kazakhstan are limited: we have access to two VPS clients and 52 RIPE Atlas probes in the country. We also performed more comprehensive scans from outside the country to TLS hosts in the country, as we know the interception can be triggered bidirectionally, even from clients outside the country.

From our in-country vantage points, we only observe two instances of HTTPS interception, both from [RIPE Atlas probes](https://atlas.ripe.net/measurements/22388397/#!probes). Both of our VPS clients can access the affected sites (e.g. facebook.com) without any HTTPS interception, suggesting that the HTTPS interception is not universal in the country: many clients do not receive the injected certificate even when connecting to domains known to be affected.

We find several conditions that must be true for a certificate to be injected:

* The client-to-server path must pass through a particular part of AS 9198 (KazTelecom), the only AS where we have observed injection occurring.
* The client must send a TLS SNI extension containing one of the affected domains.
* The server must present a valid browser-trusted TLS certificate, but not necessarily a certificate for the domain provided in the SNI.

We note that these conditions are necessary but not sufficient: for example we have made connections that pass through AS 9198, but do not see certificate injection despite satisfying the other conditions. We are still investigating what other conditions must be met to trigger interception.

There are over [200,000 reachable TLS hosts in Kazakhstan](https://censys.io/ipv4/metadata?q=%28location.country%3A+Kazakhstan%29+AND+protocols%3A+%22443%2Fhttps%22&), but only 6736 of them present a valid browser-trusted certificate according to Censys. On July 21, we performed a TLS handshake from a US-based vantage point to each of these 6736 HTTPS servers, setting the SNI to facebook.com and google.com, domains known to trigger HTTPS interception. We found only 459 servers (7.0%) had certificates injected, suggesting that **Kazakhstan’s HTTPS interception is currently only happening in a fraction of the country**.

We performed the same scans to the 6736 trusted HTTPS servers from one of our VPS perspectives inside the country, and found 1598 (24%) had certificates injected. While these hosts are in different locations, the path to all of these servers passed through AS 9198, suggesting this is where the HTTPS interception is occurring. Early on July 22, we noticed that interception had stopped occurring, but resumed 9 hours later. When we re-ran our measurements, we observed the number of HTTPS hosts that had certificates injected had decreased: only 300 (4.4%) from our US-vantage point, and 400 (5.9%) from our Kazakhstan VPS. This indicates that the interception system is still being tested or tuned, perhaps as a precursor to wider deployment.

### Network Hop-Level Analysis

To locate where the interception is happening, we employed a TTL-based technique often used in Internet measurement. For each HTTPS host where we were able to trigger interception, we made repeated connections with varying values for the IP time-to-live (TTL) field in the packet containing the SNI hostname and recorded the smallest TTL for which we received an injected certificate response. The IP TTL controls how many network hops the packet can traverse, so if we set a packet TTL to 3 hops, and do not receive any certificate injection, we know the injecting infrastructure is likely more than three network hops away from our source machine. This technique allows us to pinpoint the network location of the injection infrastructure.

We performed this type of scan from our VPS in Kazakhstan on the 1598 HTTPS hosts we measured that had certificates injected. For each host we sent two connections, one containing a TLS SNI header for facebook.com and one for an unaffected domain, and measured the first hop for which we received a response. Partway through this scan the HTTPS interception briefly stopped, but if we look at the first 1212 HTTPS hosts we scanned before the change, 99.5% showed certificate injection occurred at a hop earlier in the network path than the server. In the majority of cases, the injected certificate was sent only 3 or 4 network hops before the actual host, suggesting that the injection is occurring fairly close to the user. We confirmed similar findings from our US-based vantage point using the same technique.

Looking at the IP addresses of the network hops where injection occurs, we find that 95% of the time, the last hop before injection is 92.47.151.210 or 92.47.150.198, and the hop after injection is 95.56.243.92 or 95.59.170.59. All of these IP addresses are in **AS 9198 (KazTelecom), suggesting that AS 9198 is currently the only network location responsible for injecting HTTPS certificates**. An example traceroute is shown below, where certificate injection occurred first at hop 5.

<div class="box mb-3" markdown="1">
! 1 185.120.76.1<br>
! 2 88.204.195.89<br>
! 3 212.154.195.97<br>
**! 4 92.47.151.210**<br>
**! 5 95.56.243.92**<br>
! 6 178.89.110.198<br>
! 7 178.89.110.206<br>
! 8<br>
<p class="mb-0">Certificate injection occurred between hops 4 and 5.</p>
</div>

### Injected Certificates

We also looked at patterns in the certificates returned by the HTTPS interception. While certificate injection is triggered by the client’s SNI, the fake certificate returned appears to be based off of the server’s legitimate certificate and not the client’s SNI. This means that sending an SNI of facebook.com in a TLS request to the unrelated site iqala.kz results in an injected certificate with CN=iqala.kz. The injected certificate has the following properties:

* Same Subject and Subject Alternative Name (SAN) as the original host’s certificate.
* The Public Key is replaced with a host-specific RSA-2048 key, with exponent.
* The validity period (Not Before/Not After) is the same as the original certificate’s but shifted exactly 6 hours in the past.
* The serial number is the same as the original but has the last 4 bytes changed.
* All other x509 extensions are removed.

The certificate is issued by an intermediate certificate (**C=KZ, CN=Security Certificate**) that in turn is signed by the root (**C=KZ, CN=Qaznet Trust Network**). The intermediate is a 2048-bit RSA key (with more typical exponent 65537) and is valid for 3 years, while the root certificate has a 4096-bit RSA key with a 30-year validity period.

### Censor's Fingerprint

The middlebox in AS 9198 that performs interception has to connect to the original TLS server in order to retrieve its legitimate certificate for validation and replacement. We used a RIPE Atlas measurement to send a TLS connection to a server we controlled, where we could capture the packets that came from the RIPE Atlas Probe’s IP. When we have the Atlas probe client set the SNI to something that doesn’t trigger certificate injection, our server sees the normal client hello sent by the RIPE Atlas probe, which has a [specific TLS fingerprint](https://tlsfingerprint.io/id/53cd4d948af1d624). However, when we set the SNI to facebook.com, our server sees a [different TLS fingerprint](https://tlsfingerprint.io/id/f09427b5aaf9304b) from the HTTPS interception device. Unlike the RIPE Atlas fingerprint, the middlebox’s TLS fingerprint is virtually unseen in normal Internet traffic. Affected domains could use this fingerprint to tell when a connection is being intercepted, and alert the user to the interception, revoke exposed credentials, or not send sensitive data to the user.

For further analysis, we provide our packet captures [here](https://censoredplanet.org/kzmitm-20190719.tar.gz) (PCAPs or it didn’t happen!)

### Domains Targeted

HTTPS interception is triggered by the client-sent SNI extension. Censored Planet found 37 domains out of ~10000 we tested that trigger a fake certificate to be injected. These domains are mostly social media and communication sites, and listed here:

<div class="box mb-3" markdown="0">
<p class="mb-0">allo.google.com, android.com, cdninstagram.com, dns.google.com, docs.google.com, encrypted.google.com, facebook.com, goo.gl, google.com, groups.google.com, hangouts.google.com, instagram.com, mail.google.com, mail.ru, messages.android.com, messenger.com, news.google.com, ok.ru, picasa.google.com, plus.google.com, rukoeb.com, sites.google.com, sosalkino.tv, tamtam.chat, translate.google.com, twitter.com, video.google.com, vk.com, vk.me, vkuseraudio.net, vkuservideo.net, www.facebook.com, www.google.com, www.instagram.com, www.messenger.com, www.youtube.com, youtube.com</p>
</div>

ISPs telling users to install the Kazakhstan root certificate claim that it can help protect against fraudsters, hacking attempts, and illegal content. However, this list of domains suggests that the actual intention is instead to surveil users on social networking and communication sites.

### Conclusion

Kazakhstan’s HTTPS interception weakens security and privacy for the country's Internet users. Although the interception is not yet occurring country-wide, it appears the government is both willing and potentially capable of widespread HTTPS interception in the near future. The international community needs to closely monitor this alarming practice, which flies in the face of decades of progress by the computer security community towards ensuring that all websites are protected by strong, end-to-end encryption.

##### [Measurement Data](/assets/Kazakhstan/Kazakhstan_Raw_Data.zip)
##### [Measurement Source Code](/assets/Kazakhstan/Kazakhstan_Source_Code.zip)
