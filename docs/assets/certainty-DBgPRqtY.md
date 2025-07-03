---
layout: report
date: "15 January 2024"
title: "CERTainty: Detecting DNS Manipulation at Scale using TLS Certificates"
permalink: /certainty
excerpt: "We developed a novel technique, *CERTainty*, to detect DNS manipulation by utilizing a widely adopted trusted infrastructure: TLS certificates."
authors:
  - TBA
affiliations: Censored Planet at the University of Michigan, Stanford University
border: yes

research: "CERTainty: Detecting DNS Manipulation at Scale using TLS Certificates"
link: "assets/certainty.pdf"
writers: "Elisa Tsai, Deepak Kumar, Ram Sundara Raman, Gavin Li, Yael Eiger, Roya Ensafi"
appearing: "Privacy Enhancing Technologies Symposium (PETS), July 2023"
---

This post highlights the findings discussed in the Proceedings on [Privacy Enhancing Technologies (PoPETs) 2023](https://petsymposium.org/cfp23.php) paper [CERTainty: Detecting DNS Manipulation at Scale using TLS Certificates](..assets/certainty.pdf).

DNS manipulation is an increasingly common technique used by censors and other network adversaries to prevent users from accessing restricted Internet resources and hijacking their connections. State-of-the-art detection heuristics introduced by previous work are error-prone given advancements in Internet infrastructure such as CDNs. We develop a novel technique, *CERTainty*, to detect DNS manipulation by utilizing a widely adopted trusted infrastructure: TLS certificates.

<img src="./assets/certainty_1.png" width="60%" alt="The DNS manipulation detection, noise removal, and annotation pipeline of CERTainty. Blue indicates data retrieved from Censored Planet." title="The DNS manipulation detection pipeline of CERTainty">
{: .center }

**Figure 1.** _The DNS manipulation detection pipeline of CERTainty_
{: .center }


### High-level Takeaways

* We introduce a new technique, *CERTainty*, that utilizes the widely established TLS certificate ecosystem to accurately detect DNS manipulation, as well as obtain more information about the adversaries performing such manipulation.

* We evaluate our research against previous studies that have used state-of-the-art heuristics relying on control metadata to detect DNS manipulation, and find that the dynamic behaviors of CDN and website content localization cause 72.45% of DNS manipulation cases detected using such heuristics to be false positives, and also fail to detect 9.70% of the true cases of DNS manipulation identified by *CERTainty*.

* We identify 17 commercial DNS filtering products in 52 countries, including products such as SafeDNS, SkyDNS, and Fortinet, and identify the presence of 55 ASes in 26 countries that perform ISP-level DNS manipulation.

* We identify 226 new blockpage clusters that are not covered by previous research, and the annotated blockpage fingerprints are open-sourced for the community. We are integrating techniques used by *CERTainty* into active measurement platforms to continuously and accurately monitor DNS manipulation.

### Background, DNS Manipulation Detection Heuristics, & TLS Certificates

Due to a lack of encryption, DNS traffic is easy to manipulate, reroute, and hijack. We define ***DNS manipulation*** as the phenomenon where a network adversary — such as a censoring authority — manipulates DNS responses to prevent a user from accessing legitimate content for the name requested in the DNS query. DNS manipulation is diverse and decentralized; countries like Pakistan use a nonzero Response Code to deny access to blocked domains, while others, like Russia, manipulate DNS responses at the ISP level and redirect users to blockpages.

**DNS Manipulation Detection Heuristics**

Conceptually, identifying DNS manipulation is straightforward and entails verifying the legitimacy of resolved IP addresses. In reality, however, detecting DNS manipulation on the global stage is more challenging due to website localization effects, differences in censor behaviors, and a lack of clear signals of manipulation. Most censorship measurement platforms, including OONI and Censored Planet, incorporate a “test vs. control“ strategy to detect DNS manipulations, with requests to trusted resolvers acting as control ground truth. Because localization effects make it challenging to ensure that such controls identify all intended resolutions, when comparing IP addresses to control measurements is inconclusive, measurement platforms use a variety of other control-matching heuristics to determine whether DNS resolution is correct. These heuristics often fall into two categories:

1. ***Consistency-Based Heuristics***. Consistency-based heuristics were designed based on the insight that, behind the same domain name, there are typically shared infrastructural signals even if the exact IP address is different. For instance, [Pearce et al.](https://www.usenix.org/system/files/conference/usenixsecurity17/sec17-pearce.pdf) showed in 2017 that heuristics such as the AS number and name, HTTP content hash, HTTPS certificate hash, and PTR records serve as good consistency heuristics.

2. ***Verifiable Signals.*** An alternate approach to detecting DNS manipulation is to use independent signals that can indicate whether the IP address returned during DNS resolution provides legitimate content. For instance, if injected or poisoned IPs redirect traffic to a blockpage citing the reason for blocking, we view it as a very strong signal of DNS manipulation. Previous work has used a range of clustering techniques to identify blockpages, but human identification remains the primary mechanism to identify the unique parts of blockpages of various domains.


<img src="./assets/certainty_2.png" width="50%" alt="Censorship measurement platforms and their implemented DNS manipulation detection heuristics" title="Censorship measurement platforms and their implemented DNS manipulation detection heuristics">
{: .center }

**Figure 2.** _Censorship measurement platforms and their implemented DNS manipulation detection heuristics_
{: .center }

**Detecting DNS Manipulation with TLS Certificates**

A ***TLS Certificate*** is an electronic document used to prove the validity of a public key and subsequently establish an encrypted network connection using TLS protocol. *CERTainty* relies on the fact that valid TLS certificates for a domain can only be issued by the owner, and DNS manipulation is performed by an in-network adversary, such as an ISP, that does not own the domain. *CERTainty* fetches TLS certificates from the IP addresses returned during the DNS resolution and examines the validity of these certificates for the requested domain.

### In-depth Investigation

*CERTainty* detects DNS manipulation with the following two steps, as shown in Figure 1:

1. When a TLS Client Hello message with the appropriate Server Name is sent to resolved IP addresses, *CERTainty* checks the validity and correctness of the returned certificates. 

2. *CERTainty* clusters and identifies blockpages, and determines whether the web page returned during the HTTP request matches our list of expert-curated blockpage fingerprints. We use information from certificates as well as HTML blockpages to attribute DNS manipulation and find who implements it.

**Data Collection**

In this study, we leverage open-access global DNS measurement data collected by Censored Planet twice a week from May 16, 2022 to November 30, 2022. Censored Planet performs measurements to thousands of open DNS servers longitudinally, and implements consistency-based heuristics shown in Figure 2. Censored Planet compares DNS resolution results collected from a set of trusted ***control resolvers***, such as those operated by Google and Cloudflare, to the results of test DNS resolvers by leveraging [Censys](https://censys.com/). This yields a list of 25,943 open resolvers in more than 200 countries. The ***domain test list*** is a combination of the Citizen Lab Global Test list and the 500 top domains from the Tranco 1M list resulting in a total of 2,098 domains. Cumulatively, this results in 31.17 million HTTP(S) page requests for over 2.93 billion lines of DNS resolutions, with 96.87% succeeding in getting a DNS response. We add an extra noise filtering stage to exclude DNS responses that are highly likely due to misconfiguration or misguided NATs and firewalls (such as resolvers whose DNS responses only contain timeouts).


**Blockpage Clustering & Fingerprint Generation**

In order to capture signals of overt censorship where a blockpage is served, *CERTainty* fetches HTTP response headers and HTML pages from the IPs returned by the control resolvers and test resolver. Blockpage clustering is performed, followed by the manual creation of blockpage fingerprints with appropriate labels. We integrate publicly available blockpage fingerprints in addition to 226 new fingerprints for a total of 662 blockpage fingerprints. We manually verify each blockpage cluster to remove false positives, and observe 21 potential clusters.

**Using Certificate Validity to Measure DNS Manipulation**

The presence of a valid certificate is a strong signal that the application-layer connection to a server (HTTPS) is legitimate. For the scope of this study, we consider a certificate to be valid if two criteria are met: first, the certificate chains to a trusted root in the [Mozilla NSS Root Store by OpenSSL](https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/), and second, the hostname in the certificate (either in the common name or the subject alternative name) matches the domain we are attempting to reach following the rules as specified in [RFC 6125](https://dl.acm.org/doi/pdf/10.17487/RFC6125). Our approach is similar to the one followed by a browser attempting to validate the authenticity of a domain. At a high level, we consider any connection that returns a valid certificate to be unmanipulated and use other signals (e.g., blockpage fingerprints) to link certificate invalidity to DNS manipulation.


<figure>
  <img src="./assets/certainty_3.png" alt="Figure of untrusted certificate with matched hostname" title="Untrusted certificate with matched hostname" width="30%">
  <img src="./assets/certainty_4.png" alt="Figure of trusted certificate with matched hostname" title="Trusted certificate with matched hostname" width="30%">
  <img src="./assets/certainty_5.png" alt="Figure of untrusted certificate with mismatched hostname" title="Figure of untrusted certificate with mismatched hostname" width="30%">
  <figcaption><b>Figure 3.</b> Blockpage fingerprint matching and control certificate matching for HTTPS responses with invalid certificates.</figcaption>
</figure>


We consider four distinct cases in certificate validation when identifying DNS manipulation where the certificate we obtain from control resolutions are valid, and one case where the certificates we obtain from control resolutions are invalid.

**Case 1: Valid Certificates.** We view the presence of a valid certificate for the requested domain as a strong signal that the IP address is not manipulated. We note that none of the HTML pages returned with a valid certificate match a known blockpage fingerprint.

**Case 2: Untrusted Certificate with Matched Hostname.** If an untrusted certificate is returned with a matching hostname for a request, we mark the request as potential DNS manipulation. To confirm this categorization, we check our blockpage fingerprints against the pages returned during the HTTP request. As shown in Figure 3-(1), we observe that 86.25% (2,521 out of 2,923) of the untrusted certificates with a matching hostname come with an identified blockpage.

**Case 3: Trusted Certificate with Mismatched Hostname.** When a trusted certificate is returned with a mismatched hostname, we consider this to be a potential sign of DNS manipulation. Exploring these cases, we observe this behavior to be largely driven by ISP-level blocking. Of the requests made in this category, 10.48% (2,518 out of 24,029) match a blockpage fingerprint, as shown in Figure 3-(2). For requests that return 400+ status codes, 98.66% (18,825 out of 19,079) are returned by Chinese open resolvers, with IPs typically belonging to large entities like Facebook, Cloudflare, and other blocked CDN services. Our observations align with [prior China-focused studies](https://www.usenix.org/system/files/sec21-hoang.pdf) that suggest China’s national Firewall (the GFW) returns IP addresses of large US-based companies to DNS queries of blocked content.

**Case 4: Untrusted Certificate with Mismatched Hostname.** An untrusted certificate with a wrong hostname is a very strong signal that the returned IPs do not host the requested domain, and is therefore a potential signal for DNS manipulation. We observe 92.31% (4,167 out of 4,514) of the pages match with a blockpage fingerprint. For the general 400+ error pages, we see certificates issued by ISPs in a few countries like Singapore, Columbia, and Russia, where the information in the certificate signifies that they are cases of DNS manipulation even without an explicit blockpage.

**Case 5: Invalid Control Certificate (Misissuance).** In order to use certificate validity as a proxy for detecting DNS manipulation, we need to account for certificates that would be invalid even in a control setting. To confirm that the certificates we receive are indeed originating from the IP addresses received during DNS resolution, we perform TTL-limited traceroute tests for (IP, domain) pairs with invalid certificates. We perform two TLS Hello requests for the control domain and the target domain, sending the requests with incrementing TTL values. Then we compare the control traceroute and test traceroute to determine where in the network the TLS response is originating from. In all cases, we observe that the traceroute terminates in the same network (/24 subnet) as the endpoint IP address, therefore, we are confident that the certificates are returned by the IPs obtained during DNS resolution.

### Evaluation & Findings

To assess the effectiveness of *CERTainty* for identifying DNS manipulation, we compare our technique directly against several state-of-the-art verifiable signals and consistency heuristics:

* **Verifiable Signals.** [Pearce et al.’s Iris technique](https://www.usenix.org/system/files/conference/usenixsecurity17/sec17-pearce.pdf) checks whether the returned certificates for servers that support HTTPS are browser-trusted. For requests with SNI, the technique checks if they are for the correct IP addresses, and we find only 0.12% of certificates have IP addresses in their common name or SAN. For requests without SNI, Iris checks if the returned certificate contains the right domain name, and our analysis shows that 63.89% of DNS resolution pairs with valid certificates return general CDN certificates with mismatched hostnames when queried with the domain as SNI. Other previous work has incorporated information extracted from the page fetched from resolved IPs, either using the page length or identifying blockpages. Among all the DNS manipulation detected by *CERTainty*, 82.39% observe invalid certificates without blockpages. Therefore, blockpage information alone is not enough.

* **Consistency-based heuristics.** We compare against four popular consistency-based techniques: HTTP and Certificate hash matching, AS matching, PTR matching, and statistical thresholding. Overall, we observe that 9.70% of true manipulated responses are erroneously tagged as correct resolution using consistency-based comparisons (i.e. 9.70% of the cases are false negatives). Moreover, a staggering number of 72.45% DNS resolutions that are tagged as “manipulation“ by consistency-based heuristics are false positives.


***CERTainty* identifies 17 DNS manipulation filtering product vendors deployed in 52 countries.** Most (94.11%) commercial filtering devices return an IP hosting (configurable) blockpage, and vendors deploy different strategies for DNS manipulation.

***CERTainty* detects DNS manipulation on the ISP level in 26 countries, ranging from previously well-studied countries in Internet censorship to countries not previously investigated in depth** (e.g. Indonesia, Nepal, Thailand, and Romania). We also see ISPs performing DNS manipulation in countries that [Freedom House](https://freedomhouse.org/) classified as “Free”, such as Germany, Greece, and Denmark.

**We learn that it is important to integrate both the information inferred from blockpages and certificates.** In the worst case, an adversary can choose to issue a non-informative certificate with no blockpages, making it very hard to determine the implementer and purpose of DNS manipulation. Among all the invalid certificates *CERTainty* detected, 82.39% come without a blockpage.

**Investigating cases where test resolvers fail for both HTTP and HTTPS requests produces not only indicators of misconfigured resolvers but also indicators of resolvers configured for specific domain blocking.** For example, we discover 83 Russian resolvers that assign between 20 and 114 domains to the IP 62.33.207.197. The domains assigned to this IP by the resolver include bbc.com, bridges.torproject.org, and psiphon.ca. Upon investigation, we discover that the only open port is port 444, which returns a Russian blockpage (Figure 4).

<img src="./assets/certainty_6.png" width="50%" alt="Russian ISP blockpage hosted on IP 62.33.207.197, port 444" title=" Russian ISP blockpage hosted on IP 62.33.207.197, port 444">
{: .center }

**Figure 4.** _ Russian ISP blockpage hosted on IP 62.33.207.197, port 444._
{: .center }



### Discussion

By taking one step forward to fetch the HTTP(S) pages hosted on IPs returned by resolvers, *CERTainty* simulates the users’ perspective to understand the accessibility of requested resources. Additionally, it provides a venue to perform quick automated detection of DNS manipulation, reveals critical information when the middleboxes choose not to return blockpages, and can even help us discover covert DNS manipulation. 

We have integrated *CERTainty* into Censored Planet, and we are also actively working on integrating our techniques into other measurement platforms such as [OONI](https://ooni.org/). We hope that our techniques bring improved accuracy and rigor to the continued monitoring of DNS manipulation attempts.

