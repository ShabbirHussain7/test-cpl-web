---
layout: report
date: "6 April 2021"
title: "Throttling of Twitter in Russia"
permalink: /throttling
excerpt: "As of March 10, 2021, Russia has throttled access to several Twitter-related domains."
authors:
  - Diwen Xue
  - Reethika Ramesh
  - ValdikSS
  - Leonid Evdokimov
  - Andrey Viktorov
  - Arham Jain
  - Eric Wustrow
  - Simone Basso
  - Roya Ensafi (ensafi@umich.edu)
affiliations: Censored Planet at the University of Michigan
border: yes

note: "If you are in the region (Russia) and are interested to collaborate or want to provide more information/feedback please reach out to us at: censoredplanet-rapid-focus@umich.edu."

research: "Throttling Twitter: An Emerging Censorship Technique in Russia"
link: "assets/throttling-imc-paper.pdf"
writers: "Diwen Xue, Reethika Ramesh, ValdikSS, Leonid Evdokimov, Andrey Viktorov, Arham Jain, Eric Wustrow, Simone Basso, and Roya Ensafi"
appearing: "ACM Internet Measurement Conference (IMC) 2021"
video: "https://www.youtube-nocookie.com/embed/GenCBx5jWxo"
---
This post highlights findings also discussed in our [IMC 2021](https://conferences.sigcomm.org/imc/2021/) paper [“Throttling Twitter: An Emerging Censorship Technique in Russia”](https://dl.acm.org/doi/10.1145/3487552.3487858).

<img src="/assets/throttling-timeline.png" alt="Timeline of Twitter throttling in Russia" title="Timeline of Twitter throttling in Russia" width="100%">
**Figure 1.** _Timeline of Twitter throttling in Russia_
{: .center }

[[1](https://rkn.gov.ru/news/rsoc/news73464.htm), [2](https://ntc.party/t/twitter/907), [3](https://ntc.party/t/twitter/907/27), [4](https://habr.com/en/news/t/546280/#comment_22787474), [5](https://twitter.com/ValdikSS/status/1369633722954379273), [6](https://speed.gulag.link/), [7](https://rkn.gov.ru/news/rsoc/news73480.htm), [8](https://lynx.pink/is-my-twitter-slow-or-what/), [9](https://twitter.com/libneko/status/1370028217352921098)]

As of March 10, 2021, Russia has throttled access to several Twitter-related domains. Early reports ([ntc.party](https://ntc.party/t/twitter/907)) suggested the throttling was triggered by TLS SNI, targeting domains including \*t.co\*, \*.twimg.com, and \*twitter.com. Connections to these domains were throttled to 128 kbps.

Shortly after these reports, the Russian government issued an [official explanation](https://vk.com/wall-76229642_235341) for the throttling, explaining that the government had “taken measures to protect Russian citizens from the influence of unlawful content”, alluding to Twitter’s non-compliance with Russian content takedown requests. The incident was quickly noticed partly due to the *t.co* matching rule that inadvertently triggered throttling for unrelated high-profile domains, such as reddi**t.co**m or microsof**t.co**m.

This incident captures the first known centrally controlled attempt by the Russian government to use throttling (instead of outright blocking) to put pressure on social media websites. Moreover, this marks a departure from Russia’s previously decentralized, ISP-controlled censorship model to a more centralized one that gives significant power to the authority to unilaterally impose desired restrictions.

Figure 1 shows a timeline of this throttling event. In this report, we provide results from our ongoing measurements and new technical details about how the throttling is implemented.

###  Russia’s throttling demonstrates an escalation of government control

Russia’s Internet consists of 1000s of ASes and a large number of ISPs, similar to the architecture in many other countries around the world. Federal law 139-FZ, passed in 2012, defined policies for how Russian ISPs could implement information control in a decentralized manner. [[Refer to our 2020 comprehensive study of Russia’s censorship apparatus](https://censoredplanet.org/russia)] Under this law, many ISPs opted to use commercially available network middleboxes to  implement blocklists provided by Roskomnadzor (Russian Authority on Information Control). Now, however, there are reports [[https://t.me/roskomsvoboda/6619](https://t.me/roskomsvoboda/6619)] that Twitter is throttled using a different mechanism, the so-called TSPU (ТСПУ, технические средства противодействия угрозам, "technical solution for threat countermeasures'') DPI boxes, which are special-purpose devices developed by [RDP.RU](http://rdp.ru/) for Roskomnadzor. In [a recent interview](https://tass.ru/interviews/11032409), a Russian parliament member states that the Twitter throttling is the first instance that these DPI boxes are put into use on a massive scale.  TSPU is controlled directly and remotely by Roskomnadzor, not by individual ISPs like existing middleboxes, which moves the country's architecture of censorship closer to the centralized models of China and Iran.

### High-level Takeaways



*   The throttler is triggered upon observing Twitter-related domains (*.twimg.com, twitter.com, and t.co)  in the SNI extension of a TLS client hello record.
*   The throttling operates by traffic policing. After the throttler is triggered, data packets transferred in either direction (download/upload) will be dropped once the rate limit is reached.
*   The throttling devices are placed close to end users and they are not co-located with the blocking devices, suggesting they are separately administered.
*   Throttling behaviors are consistent across different ISPs, suggesting a single implementation deployed widely or that the throttling devices are centrally managed.
*   Throttling can only be triggered for TCP connections that originate from within Russia (i.e. the client is in Russia). However, once such a connection is made, throttling can be triggered by a Twitter SNI sent in either direction.
*   Contrary to previous reports, the relaxed string matching rule of the throttler is still in effect for some domain strings, causing collateral damage, even though *t.co* and more recently, *twitter.com have been patched. For example, garbage.twimg.com is throttled suggesting that *.twimg.com is still a matching rule.
*   The throttler is stateful and drops states for inactive connections after around 10 minutes. Moreover, for each new connection it inspects beyond the initial packet, possibly as a countermeasure against circumvention attempts.
*   The throttling can be circumvented based on ad-hoc modifications to the session, TCP-level fragmentation, or TLS packet stuffing (splitting Client hello across packets).
*   We recommend that browsers and websites implement support for TLS [Encrypted Client Hello](https://tools.ietf.org/html/draft-ietf-tls-esni) (ECH, and its predecessor ESNI) to make it more difficult for censors to throttle based on SNI.
*   Monitoring throttling is challenging and existing censorship detection platforms aren’t equipped to cover it. This incident of Russia throttling Twitter serves as a wakeup call.

We started our investigation on Friday March 12 by contacting local activists from the Internet freedom community who helped us secure 7 vantage points that were experiencing throttling: 3 local vantage points in landlines (ISPs: Ufanet, OBIT) and 4 mobile vantage points (ISPs: Beeline, MTS, Tele2, Megafon) from which we were able to observe the throttling.

To confirm throttling, we sent three requests: a request with a Twitter-related SNI, a request  without the SNI, and finally a control case where we tested with a random SNI not affiliated with Twitter. We tested each case using the cURL command line tool to retrieve the same \~400kb image.

In all 7 vantage points, connections with Twitter-related SNI are throttled, whereas connections without the SNI match the throughput in the control case.  We repeated all following measurements on a list of domains including twitter.com, t.co, abs.twimg.com, pbs.twimg.com, api.twitter.com and observed the same results.

After establishing that throttling is indeed occurring, we did more in-depth measurements to understand the nuances of the throttling and the technology behind it.

<img src="/assets/twitter-measurement.png" alt="Measurement setup" title="Measurement setup"/>
**Figure 2.** _Record and Replay Measurement Setup_
{: .center }

**Throttling throughput converges to a value between 100kbps and 150kbps.**

To measure the throttling in a more controlled environment, we followed the “record and replay” approach. The setup for this measurement is illustrated in Figure 2. (1) We collected traffic captures while making a request to __abs.twimg.com__ to fetch an image using an unthrottled Russian landline vantage point. (2) We set up a replay server at the University of Michigan and used all our Russian vantage points as replay clients. The replay server and clients coordinate to replay many customized recorded TCP sessions. The replay system captures nuances from the original recording, such as timing dependencies, and leaves all other parts of the traffic to the TCP stack of each endpoint [Refer to [here](https://conferences2.sigcomm.org/imc/2015/papers/p239.pdf) for more].

For each vantage point, we conducted two different replays between the vantage points and the UMich replay server while capturing the traffic with tcpdump. First, we replayed the Twitter  traffic recording which we know is throttled (Figure 3). Next, we replayed the same recording with all bytes scrambled such that any structure or keyword that may trigger the DPI is removed (Figure 4). We found that the throttling throughput converges to a value between 100kbps and 150kbps.

We also collected traffic captures where the uploading traffic dominates the bandwidth as well as where the client and server simultaneously send and receive data. We observed both directions are throttled independently to the same throughput limit, suggesting that upstream and downstream traffic each have their own “[token bucket](https://www.cisco.com/c/en/us/support/docs/quality-of-service-qos/qos-policing/19645-policevsshape.html#tokenrefreshrate)”.

![Original Replay Throughput](/assets/original-replay-throughput.png "Original Replay Throughput")
**Figure 3.** _Original Replay Throughput (throttled)_
{: .center }
![Inverted Replay Throughput](/assets/inverted-replay-throughput.png "Inverted Replay Throughput")
**Figure 4.** _Inverted Replay Throughput (un-throttled)_
{: .center }

**Throttling is implemented by dropping packets that exceed the rate limit (Traffic policing).**

Using the same setup, we observed that the throttler drops incoming data packets from either direction once the rate limit is exceeded.

![Client side PCAP for a throttled session.](/assets/client-side-throttling-pcap.jpg "Client side PCAP for a throttled session.")
**Figure 5.** _Client side PCAP for a throttled session. Notice the gap in IPID._
{: .center }


This is a sample packet capture from a throttled Russian vantage point connecting to our UMich machine. Notice that packet#26 is sent over 1 second after packet#24 has been sent, and the IPID values jump from 2252 to 2276, resulting in a “gap” in the client side PCAP (Figure 5). However, the server side PCAP reveals that it is still sending new packets during this gap period, and the 22 skipped IPIDs indicate the packets that are dropped by the throttler (Figure 6). We performed a similar experiment for a throttled, upload-dominating session, and we see similar patterns in the collected PCAPs.

![Server side PCAP for a throttled session.](/assets/server-side-throttling-pcap.png "Server side PCAP for a throttled session.")
**Figure 6.** _Server side PCAP for a throttled session. All highlighted packets are dropped by the throttler._
{: .center }


In addition, we repeated above experiments (for both downstream and upstream sessions) but kept the sending rate below the throttled rate. We do not observe any abnormal batch packet loss in this  case. We therefore believe that the **throttling of Twitter is implemented by traffic policing** and that packets transferred in either direction will be dropped once the rate limit is reached (Figure 7). For example, if we transfer 16 KB (128 Kbit) of data in 100ms, all packets are dropped for the next 900ms, leaving “gaps” in PCAP trace.

<img src="/assets/traffic-policing.png" style="margin-left:auto;margin-right:auto;display:block;" alt="Traffic policing" title="Traffic policing" width="50%">
**Figure 7.** _A normal session (left) and a session under traffic policing (right)._
{: .center }

On some cellular vantage points (such as Tele2-3G), we observed throttling based on traffic shaping instead. While the rate limit is similar to the rate limit for the throttling of Twitter, we are still able to distinguish between the two cases as we observe upload throttling on our Tele2-3G vantage point for all traffic types and connections regardless of their destination.

Below are two throughput graphs that correspond to file upload on Beeline (Figure 8) and Tele2-3G (Figure 9), respectively. Notice that while the throttled throughput rates are similar, the throughput graph for tele2 is much more smooth because the rate-limiting mechanism on Tele2-3G is delay-based rather than loss-based. Yet, we are unable to conclude whether Twitter uploading traffic is throttled in Tele2-3G network, as it has other rate limiting mechanisms for upload traffic regardless of Twitter. We therefore exclude the vantage point from our upload throttling tests.

![Upload throughput on Beeline](/assets/upload-throughput-beeline.png "Upload throughput on Beeline")
**Figure 8.** _Upload throughput on Beeline._
{: .center }
![Upload throughput on Tele2-3G](/assets/upload-throughput-tele2.png "Upload throughput on Tele2-3G")
**Figure 9.** _Upload throughput on Tele2-3G._
{: .center }


This suggests that **precise attribution of traffic throttling can be challenging.** When multiple throttling schemes are being used (by different parties on a network path), it becomes complicated for end users to pinpoint the reason for throttling, and it is hard for researchers to identify where in the network the throttling happens or to isolate one specific scheme from others for measurement.

#### The throttling device is located close to end-users

To identify where in the network path throttling occurs, we use a common TTL-based technique. The IP TTL (Time-To-Live) field controls how many network hops a packet is allowed to traverse. We have each throttled vantage point establish a TCP connection with our UMich server. Next, using _nfqueue_, we insert a clienthello packet containing a Twitter-related SNI with increasing TTL values and subsequently attempt some data transfer. If we identify some TTL value N where we don’t observe throttling but N+1 results in throttling, then we know that the throttler operates between the N and N+1 hop.

<img src="/assets/throttling-ttl.png" width="50%" style="float:right;margin-left:2%" alt="Identifying the location of the throttler with TTL" title="Identifying the location of the throttler with TTL"/>

The diagram on the right illustrates this experiment. We performed this experiment on four mobile vantage points and two landline vantage points. Overall, **we found the throttling device is placed close to end-users**. For all six vantage points, our test shows that the throttler operates within the first five hops. This result is consistent with previous reports on Russia’s DPI installation: in [a letter sent out by Roskomnadzor to ISPs](https://habr.com/ru/post/459894/), it mentions that the TSPU boxes should ideally be installed before carrier-grade NAT devices (away from the backbone network). Moreover, [an example installation guide](https://hsto.org/webt/wk/tk/ud/wktkudgaf5uslgn-gzuj58p-xae.png) shows TSPU boxes (painted as red ovals) are placed close to end users.

We used a similar technique to identify filtering devices rather than throttling devices. In this case, we had the client send a crafted HTTP GET request containing a known “blocked” domain iteratively with increasing TTL. For the networks where the blocking is implemented using an in-path filtering device, we would observe the hop after which the “blockpage” or censoring behavior (timeout or connection reset) is triggered. In networks where we were able to estimate the filter’s location, we found that they were between hops 5-8. Since this is different from our results for throttling devices, we suspect that **the throttling devices are not co-located with the filtering device**.

#### The Throttling of Twitter is NOT symmetric

Next, we try to understand if the throttling is symmetric, i.e. does it affect traffic originating from Russia as well as traffic coming into Russia.

We customized our [remote measurement tool Quack Echo](https://censoredplanet.org/projects/quack) tool to see if we can observe any throttling from measurements conducted remotely. Quack Echo only works if the throttler/filter works in a bidirectional manner. We discovered and ran measurements against 1297 Russian servers running the echo protocol on port 7, and we were not able to observe any throttling. This implies that either the throttler doesn’t inspect traffic at non-standard ports such as port 7, or that it only inspects TCP connections initiated by Russian clients.

To investigate whether _TCP direction plays a role in throttling_, we performed the following experiment. We used the same replay setup with the replay server at UMich (running on port 443) and the replay client in Russia (same as original replay). However, this time we let the replay server initiate the TCP connection.

<img src="/assets/throttling-replay.png" width="50%" style="float:right;margin-left:2%" alt="TCP direction and throttling" title="TCP direction and throttling"/>

We illustrate the difference between this setup and the original replay setup with the diagram on the right. Notice the only difference between the two experiments is which endpoint initiates the TCP connection. We do not see any throttling from the experiments in which the UMich server initiates the TCP connection. Furthermore, throughout our investigation, we have not seen any TCP session initiated by a client  outside Russia being throttled. Based on these experiments, we believe that **Russia’s Twitter throttling is not symmetric and can only be triggered by connections initiated locally (within Russia). This asymmetric nature of the throttling makes it challenging for researchers to study it from outside the country using remote measurement tools**.

#### Characteristics of the throttling are consistent across different ISPs

In the following experiments, we find that the characteristics of the throttling are highly consistent across different ISPs, suggesting that the throttling devices being used are centrally controlled.

__The authority throttles more domains than they claim__

In addition to testing the five domains we listed above, we also mutate these domains in certain ways, such as adding dots to the start and end, or adding a prefix/suffix to the domain, and test whether any of them are throttled as well. Overall, we found that **the relaxed string matching rule of the throttler is still in effect for some domain string, causing collateral damage**. For example, {abs,pbs}.twimg.com is not being checked for exact matches, but rather all domains of the form *.twimg.com face throttling. In addition, we found that domains of the form *twitter.com, for example, throttletwitter.com were throttled for a period of time. However, according to our measurements on April 2 2021, *twitter.com is no longer throttled except for exact matches (www.twitter.com, api.twitter.com etc).

Furthermore, it is also worth noting that in [an official statement made by Roskomnadzor](https://rkn.gov.ru/news/rsoc/news73480.htm), they claim that the throttling is only being applied to the “delivery of audio, video content and graphics”, and that other Twitter’s functionalities are “delivered without restrictions”. However, among the throttled domains is abs.twimg.com, which hosts large js-bundles that are essential for twitter to function.

__A Client Hello alone enough to trigger the throttling__

To test this, we replayed a traffic capture with a Client Hello containing the Twitter SNI. Next, we scrambled all other packets into random bytes so that there is no intelligible keyword or structure from any packet other than the initial client hello. We still observe throttling even after scrambling all other packets, suggesting that a sensitive client hello alone is sufficient to trigger throttling, no server side confirmation (e,g., server hello or certificate) is required.

__The throttler inspects both downstream and upstream traffic__

While inspecting both upstream and downstream traffic is generally considered to be resource-consuming, on our vantage points we found that the throttler actually inspects traffic from both directions. We test this by configuring the replay client to not send the client hello and instead have the replay server to send it to the client. This results in a throttled session.

Note that although the throttler inspects both upstream and downstream traffic, it however does not mean that the throttling is symmetric in & out of Russia (see section above on Symmetry of the throttling). Instead, it means that for connections that are subject to throttling, both client to server and server to client traffic will be inspected. Furthermore, the throttling is not triggered by a Twitter server certificate, even if the certificate is transmitted in plaintext. This observation suggests that while the throttler inspects downstream traffic (server-to-client), it does not inspect server certificates for throttling.

__The throttler inspects beyond the initial packet after observing TLS or proxy traffic__

We configured each TCP client at our vantage points to send out different initial packets to the server at UMich, which will then start a data transfer from the server to the client. We then determine whether the initial packets sequence triggers throttling based on traffic capture.

First, we observed that if we send out a packet of size at least 101 bytes containing random bytes, any Twitter client hello following it would not trigger throttling. This seems to suggest that the throttler, upon seeing a packet that cannot be parsed into any protocol it supports, will ‘clear’ the session and immediately stops inspecting the following packets. This is likely done in order to conserve DPI’s resources.

However, we find that if we send any TLS packet as the first packet (any TLS record type, except for a Client Hello that contains Twitter-related SNI, in which case the session will be immediately throttled), the throttler, upon seeing this packet, continues to inspect beyond the initial packet for an additional 15 to 20 packets. Similarly, we also find that HTTP proxy or SOCKS proxy traffic also trigger the throttler to inspect the following packets. This behavior of the throttler likely targets circumvention techniques that work by inserting fake Client Hello (e.g., GoodbyeDPI, Zapret) or by routing traffic through  (unencrypted) proxies.

__The throttler parses client hello packets but does not reassemble split TLS records__

We created a strategy to identify which parts of a packet are inspected by the throttler. The idea is similar to binary search: scramble some parts of a triggering Client Hello and see whether the session is still throttled.

First, we found that scrambling either the first byte (_TLS Content Type_) or the sixth byte (_Handshake Type_) would leave the session unthrottled. Furthermore, prepending the triggering client hello with another, non-handshake TLS record (e.g., a change cipher spec record appended by a client hello record, in one TCP packet, which is semantically legal) can also unthrottle the session. This likely suggests that the throttler only selectively inspects some types of packets.

In addition, we found that the throttler performs some packet length checking before inspecting a packet. Specifically, we found that the TLS Record length (4th and 5th bytes) has to be less than the payload length of the TCP packet wrapping it, and greater than 4 bytes + the Handshake length (7th-9th bytes). This likely suggests that the throttler lacks the ability to reassemble TLS records that are split across multiple TCP packets.

Finally, we found that scrambling the length for some variable-length fields, such as Session ID Length or Cipher Suite length, can thwart the throttler. Furthermore, putting the SNI string in any other position within the packet, scrambling the _server_name_ extension type, or the _servername_type_ within it can all independently unthrottle the session. These observations likely suggest that the throttler attempts to parse the packet to locate and extract SNI, rather than simply looking for the Twitter-related SNI string over the entire payload.

__The throttler stops monitoring inactive connections after around 10 minutes__

Since a throttler is resource-constrained (memory, disk space, CPU, etc), it has to have policies that determine when to discard a state and stop monitoring the associated TCP session. In an experiment, we created a TCP connection to a UMich server from our vantage point in Russia, then sent a Twitter Client Hello as the first packet. We confirmed that this triggers throttling with a file transfer. Next, we kept the connection idle (open, but inactive) for a while and then initiated another file transfer. We started from 1 minute all the way up to 30 minutes (each in separate experiments). We found that after keeping the TCP session inactive for around 10 minutes, the speed of the subsequent data transfer suggests the session has become unthrottled. Note that this value corresponds to what we have seen in most experiments we did rather than a precise threshold for the throttler’s state management. The exact timeout used at a given time may depend on many factors, such as the monitor’s operational load.

Next, we tested this for active sessions. Specifically, we kept the connection open while keeping transferring some data from both endpoints. After two hours we aborted the experiment, at which point we were still observing throttling for our data transfer, suggesting the timeout for an active session may be much larger than that for inactive sessions. This observation is consistent with previous studies on the Great Firewall of China (GFC)  [[10](https://www.usenix.org/conference/foci13/workshop-program/presentation/khattak)].

Finally, we tested whether the throttler would discard a state for a session after seeing a FIN-ACK or RST-ACK. Previous study on GFC found that the blocker would discard a session’s state after seeing either a FIN (FIN-ACK) or RST (RST-ACK). However, based on our experiments, we found no evidence that the throttler would stop throttling after seeing a FIN or RST packet.

In summary, the throttler operates by checking both upstream and downstream traffic. It inspects the first packet sent in either direction, and when it sees a TLS packet or an unencrypted proxy packet, it continues inspecting for an additional 15-20 packets. Once it identifies a ClientHello packet, it attempts to parse the packet to extract the SNI, but does not reassemble the packet if it is split across multiple TCP packets. For inactive connections, the throttler stops monitoring it after around 10 minutes. **Notice that most of these behaviors are implementation-dependent, and the fact that we are consistently observing them across vantage points belonging to different ISPs suggests that these throttling devices are likely centrally controlled.**

#### Circumvention Schemes

There are several circumvention strategies that can bypass throttling, some of which are based on the observations we made about the throttling devices in previous sections, such as how it inspects packets or how it manages states.

Evasion techniques that work:



*   TLS ClientHello segmentation/fragmentation (implemented in GoodbyeDPI and zapret)
*   TLS ClientHello [inflation with padding extension](https://ntc.party/t/http-headers-tls-padding-as-a-censorship-circumvention-method/168/2) to make it bigger than 1 packet (1500+ bytes)
*   Prepending real packets with a fake, scrambled packet of at least 101 bytes
*   Prepending client hello records with other TLS records, such as change cipher spec
*   Keeping the connection in idle and waiting for the throttler to drop the state
*   Adding a trailing dot to the SNI
*   Any **encrypted** tunnel/proxy/VPN

Evasion techniques that do not work:



*   Sending a single fake TLS ClientHello packet before the real one, as the throttler keeps inspecting for additional 15-20 packets
*   Sending in RST or FIN packets, as they do not clear the throttler's states
*   **Unencrypted** proxy/tunnels (HTTP proxy, SOCKS proxy)

### Conclusion

Contrary to blocking where access to the content is blocked, throttling aims to degrade the quality of service, making it nearly impossible for users to distinguish imposed/intentional throttling from nuanced reasons such as high server load or a network congestion. With the prevalence of “dual-use” technologies such as Deep Packet Inspection devices (DPIs), throttling is straightforward for authorities to implement, yet hard for users to attribute or circumvent. Censorship communities have feared throttling can be used by the government to restrict Internet freedom, but unfortunately current censorship detection platforms focus on blocking and aren’t equipped to monitor throttling. This incident of Russia throttling Twitter serves as a wakeup call to censorship researchers, and we hope to encourage future work in detecting and circumventing this emerging censorship technique.
