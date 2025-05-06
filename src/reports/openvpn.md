---
layout: report
date: "2 November 2022"
title: "OpenVPN is Open to VPN Fingerprinting"
permalink: /openvpn
excerpt: "We identified OpenVPN's fingerprinting vulnerabilities and tested them with a real-world ISP"
authors:
  - Diwen Xue
  - Reethika Ramesh
  - Arham Jain
  - Michalis Kallitsis
  - J. Alex Halderman
  - Jedidiah R. Crandall
  - Roya Ensafi
affiliations: Censored Planet at the University of Michigan
border: yes

note: "This work is part of a broader effort to study issues surrounding the VPN ecosystem. For more information please follow us on VPNalyzer.org."

research: "OpenVPN is Open to VPN Fingerprinting"
link: "assets/openvpn-usenix22.pdf"
writers: "Diwen Xue, Reethika Ramesh, Arham Jain, Michalis Kallitsis, J. Alex Halderman, Jedidiah R. Crandall, Roya Ensafi"
appearing: "USENIX Security 2022 (USENIX'22)"
video: "https://www.youtube-nocookie.com/embed/ZNVff1rH-vA"
---

This post highlights findings also discussed in our [USENIX Security 2022](https://www.usenix.org/conference/usenixsecurity22) paper ["OpenVPN is Open to VPN Fingerprinting"](https://www.usenix.org/conference/usenixsecurity22/presentation/xue-diwen). The paper earned the [Distinguished Paper Award](https://www.usenix.org/conferences/best-papers) and won first place in the 2022 USENIX/Meta Internet Defense Prize.

In this paper, we investigate the potential for VPN blocking by developing mechanisms for accurately fingerprinting connections using [OpenVPN](https://openvpn.net/), the most popular protocol for commercial VPN services. We identify three fingerprints based on protocol features such as byte pattern, packet size, and server response, and we deploy a detection system based on these features inside a real ISP’s network. Our evaluation shows that we are able to identify over 85% of OpenVPN flows with only negligible false positives, suggesting that OpenVPN-based services can be effectively blocked with little collateral damage. Alarmingly, we are also able to identify the majority of the so-called “obfuscated VPNs” due to their ineffective obfuscation techniques. We discuss the implications of the VPN fingerprintability for different threat models and propose short-term defenses. In the longer term, we hope our report can bring more transparency to obfuscated VPN services and facilitate the adoption of more principled detection countermeasures.

<img src="./assets/openvpn-setup.png" alt="Framework Deployment inside Merit Network" title="Framework Deployment inside Merit Network" width="100%">
**Figure 1.** _Framework Deployment inside Merit Network_
{: .center }

### High-level Takeaways

*  We explore the implications of DPI for VPN detection and blocking by studying the fingerprintability of OpenVPN from the perspective of an adversarial ISP. Looking at the protocol, we identified three fingerprintable features based on byte pattern, packet size, and server response, respectively. 

* Based on the identified fingerprintable features, we build a detection framework (Figure 1) that is inspired by the architecture of [the Great Firewall of China](https://ensa.fi/papers/Ensafi2015b.pdf), with filtering and probing components running in sequence. A Filter performs passive filtering over passing network traffic in real time, exploiting protocol quirks we identified in OpenVPN’s handshake stage. After a flow is flagged by a Filter, the destination address is passed to a Prober that performs active probing as confirmation.

* We evaluate the framework by deploying it inside [Merit Network ISP](https://www.merit.edu/) that serves a population of 1 million users. Evaluation shows that the framework can detect the majority of OpenVPN flows, while keeping false positives at minimum. Further investigation on the false positives reveals circumstantial evidence that supports the detection result for the majority of them, yielding a false positive rate three orders of magnitude lower than previous approaches based on machine learning.

* Alarmingly, we find that commercial “obfuscated” VPN services do not perform well against our detection heuristics---We successfully identify over two-thirds of obfuscated OpenVPN flows, mostly due to the use of OpenVPN as the underlying protocol and ineffective obfuscation techniques fail to mask OpenVPN’s fingerprints.


### Background on VPN services, OpenVPN protocol, and “obfuscated VPN”

Over the last decade, the demand for commercial VPNs has been increasing steadily. This could be partly due to the reports about Internet traffic being tampered with, and monitored by different threat actors, and VPN protocols add an additional layer of security and privacy to users’ traffic.

VPN protocols create encrypted tunnels over the networks. They were first introduced as an enterprise security tool, but recently, they have been increasingly used by regular Internet users to safeguard them from surveillance, geoblocking, and censorship. 

<img src="./assets/openvpn-handshake.png" style="margin-left:auto;margin-right:auto;display:block;" alt="Openvpn Handshake" title="Openvpn Handshake" width="50%">
**Figure 2.** _OpenVPN Session Establishment (TLS mode)._
{: .center }

__OpenVPN Protocol:__ [OpenVPN](https://openvpn.net/) was first released in 2002 with the aim of creating a tunneling protocol focusing on security, while also being free and fast over the standard TCP and UDP. When the OpenVPN tunnel is active, raw IP packets being sent to or from the tunnel to the final destination are encapsulated inside OpenVPN packets. To achieve secure communication, OpenVPN leverages the OpenSSL library as its cryptographic layer. Importantly, at the beginning of an OpenVPN session, two parties engage in a [TLS-style handshake](https://openvpn.net/vpn-server-resources/tls-control-channel-security-in-openvpn-access-server/), as shown in Figure 2.


__Obfuscated VPN:__ In response to the growing popularity of VPNs, numerous ISPs and governments are now seeking to track or block VPN traffic in order to maintain visibility and control over the traffic within their jurisdictions. As a result, there is a marked demand for an emerging class of services called [“stealth”](https://torguard.net/stealth-vpn.php) or [“obfuscated”](https://surfshark.com/features/obfuscated-servers.) VPN, especially from users in countries with heavy censorship or laws against personal VPN usage. Most obfuscated VPN services use OpenVPN as the underlying protocol for security and routing, with an obfuscation layer overlaid to avoid detection. Due to the lack of an “official” obfuscation patch from the core OpenVPN developers, there has been a plethora of obfuscators implemented by different VPN providers, who often claim that their obfuscated services can remain undetected by ISPs and censors alike:

> “Engineered from the ground up to be impossible to detect” --- [TorGuard](https://torguard.net/stealth-vpn.php)

> “...keeps you out of trouble, even in China” —-- [BolehVPN](https://www.vpnmentor.com/blog/bolehvpn-traffic-obfuscation-keeps-you-out-of-trouble/)

> "...even your internet provider can’t tell that you’re using a VPN." --- [SurfShark](https://surfshark.com/features) 

Common obfuscation strategies adopted by commercial VPNs include employing [XOR-based scramblers](https://tunnelblick.net/cOpenvpn_xorpatch.html), wrapping OpenVPN inside [encrypted tunnels](https://www.vpnanswers.com/openvpn-over-ssh-tunnelling-tutorial-step-by-step/), or using proprietary protocols. __But do these measures defeat VPN detection in practice?__


### In-depth Investigation

> Effective investigation of fingerprintability requires incorporating perspectives of how ISPs and censors operate in practice. 

A principle that guides our investigation is that it is not enough to simply identify fingerprinting vulnerabilities, but we need to demonstrate realistic exploits to illustrate the practicality of exploiting the vulnerability, while taking into consideration the ISP and censors’ capabilities and constraints. For this, we adopt the perspective of an adversarial network operator by establishing a collaboration with [Merit Network](https://www.merit.edu/), a mid-size, regional ISP with roughly a million users. Within Merit Network, we used existing DPIs and monitoring servers to build our detection framework, as shown in Figure 1.

The framework aims to answer two key questions: 1) whether real-world censors are capable of performing OpenVPN detection, and 2) whether it is economical to do this at scale. The framework consists of two major components: Filters and Probers, to mimic [known capabilities](https://gfw.report/talks/imc20/en/) of real-world censorship systems. Specifically, we instantiate a Filter on a Monitoring Station overseeing mirrored traffic from a router that handles 20% of the ISP’s traffic. The Filter performs passive fingerprinting over raw packets, exploiting traffic features unique to OpenVPN. IP and port information of flows flagged by the Filter are forwarded to a probing system and then distributed to dedicated Probers. The Probers send a set of pre-defined probes specifically designed to fingerprint an OpenVPN server. Finally, probed servers that are confirmed as OpenVPN are logged for manual analysis. 

Using this framework, we design and evaluate three fingerprintable features against OpenVPN connections. Below, we give an overview of these features, but please refer to the [paper](https://www.usenix.org/conference/usenixsecurity22/presentation/xue-diwen) for more details.

**Opcode Fingerprinting**

Each OpenVPN packet has a [header](https://openvpn.net/community-resources/openvpn-protocol/) of 24 bits in TCP mode or 8 bits in UDP mode, which is not part of the encrypted payload. Each OpenVPN header starts with an opcode that specifies the message type of the current packet, which can take over 10 defined values, corresponding to message types transmitted during different communication stages. Figure 2 illustrates this procedure: An OpenVPN session starts with the client sending a Client_Reset packet. The server then responds with a Server_Reset packet, and a TLS handshake follows, which is encapsulated in P_Control packets.

A packet field taking a fixed number of values can be easy to fingerprint and has been exploited before against [other protocols](https://gfw.report/blog/gfw_shadowsocks/). We fingerprint OpenVPN’s handshake sequence by recording each opcode byte for the first 100 packets of a flow and flagging a flow if the number of different opcodes observed accords with the protocol and the Client and Server Resets are not seen once the handshake is completed. Notably, because the filtering heuristics do not require exact matching of opcode values or packet length, it ensures that the filter works effectively against certain obfuscation techniques, e.g., [XOR obfuscation](https://tunnelblick.net/cOpenvpn_xorpatch.html), which masks packet payload to ensure that the opcode bytes are altered.

**ACK Packets Fingerprinting**

OpenVPN engages in a TLS-style handshake with its peer over the control channel. Since TLS is designed to operate over a reliable layer, OpenVPN implements an [explicit acknowledgement and re-transmission mechanism](https://build.openvpn.net/doxygen/group__reliable.html#details) for its control channel messages. Specifically, incoming P_Control packets are acknowledged by P_ACK packets, which do not carry any TLS payloads and are uniform in size. Moreover, these ACK packets are seen mostly only in the early stage of a flow, during the handshake phase, and are not used in the actual data transfer channel, which can run over an unreliable layer.

We find that the presence of such ACK packets, which are uniform in size and only seen in some parts of a session, provides another fingerprintable feature. Specifically, we group packets into 10-packet bins, and we derive the ACK fingerprint for each flow by counting the number of packets in each bin that have the same size as the identified ACK packet. For OpenVPN flows, we expect to observe a high number of ACK packets in early bins and an absence of them in later bins. 

<img src="./assets/openvpn-ack.png" alt="ACK fingerprint Decision Tree from the training datasets" title="ACK fingerprint Decision Tree from the training datasets" width="70%">
{: .center }

**Figure 3.** _ACK fingerprint Decision Tree from the training datasets_
{: .center }

We collect a training dataset with pre-recorded OpenVPN connections, and we build a classification decision tree based on the dataset, as shown in Figure 3. The exact ACK fingerprint is a sequence of thresholds based on the derived decision tree.


**Active Probing**

We explore the feasibility of identifying an OpenVPN server through active probing. Typically, OpenVPN servers respond to a Client_Reset with an explicit Server_Reset, thereby giving away their identities. However, most commercial providers now have adopted [tls-auth or tls-crypt options](https://openvpn.net/community-resources/hardening-openvpn-security/). These options add an additional HMAC signature—signed by a pre-shared key to every control channel packet for integrity verification, including the initial reset packets. With either of these options enabled, an OpenVPN server would not respond to an unauthenticated client reset with a server reset, but would instead drop such packets without further processing. The presence of such HMAC mechanism increases the complexity of doing active probing: it effectively makes OpenVPN servers [“probe-resistant”](https://www.ndss-symposium.org/ndss-paper/detecting-probe-resistant-proxies/) by remaining silent when probed by an unauthenticated client.

However, we find that with carefully designed probes, we are still able to distinguish between OpenVPN and non-OpenVPN servers with high accuracy, even if the server remains “silent” throughout the probing cycle. The key concept is that although the application may not respond to probing, an attacker may still be able to fingerprint application-specific thresholds at the TCP level, such as timeouts or RST thresholds, as demonstrated by [Frolov et al](https://www.ndss-symposium.org/ndss-paper/detecting-probe-resistant-proxies/).

<img src="./assets/openvpn-probe.png" alt="Summary of Probes and the expected behaviors from an OpenVPN server" title="Summary of Probes and the expected behaviors from an OpenVPN server" width="70%">
{: .center }

**Figure 4.** _Summary of Probes and the expected behaviors from an OpenVPN server_
{: .center }

Here is the list all probes we used in our study and the expected behaviors from an OpenVPN server. As an example, the first two probes are designed to exploit a behavior associated with how OpenVPN packetize TCP streams. When OpenVPN operates over TCP, it needs to split the continuous stream into discrete OpenVPN packets. On a high level, this process involves allocating a buffer in memory to reassemble fragments of OpenVPN packets encapsulated in TCP streams. An important detail is that after the length N for the next OpenVPN packet is determined, the reassembly routine will keep reading N additional bytes before a reassembled packet can be returned to the caller and get processed. 

This means that an OpenVPN packet will not be parsed and checked for syntax and encryption errors until all its parts arrive at the server. Based on this behavior, we design two sequential probes to trigger an OpenVPN server into different code paths, which result in different connection timeouts. Base Probe 1 carries a typical 16-byte OpenVPN Client Reset, while Base Probe 2 has the same payload with the last byte stripped off. The assumption is since our two probes only differ in one byte, most non-OpenVPN servers will respond to our probes in a similar way. However, for an OpenVPN server with HMAC enabled, the connection sending the first probe will be dropped immediately because the OpenVPN packet is reassembled and a valid HMAC cannot be located. The second probe will not receive an immediate response, as the server will wait for an additional byte to arrive for reassembly. The connection will stay idle until a server specific handshake timeout has passed, after which the connection will be dropped. 


### Evaluation & Findings

We implement our detection heuristics in our framework set up inside Merit Network. Our framework feeds on traffic mirrored from a backbone router with an aggregated 20 Gbps bandwidth. Overall, we are able to identify 1,718 out of 2,000 vanilla OpenVPN flows, corresponding to 39 out of 40 unique configurations. This suggests the majority of OpenVPN traffic and servers are vulnerable to passive filtering and active probing, respectively. Surprisingly, we also identify over two-thirds of all obfuscated flows, corresponding to 34 out of 41 obfuscated configurations. This result is mostly due to obfuscated services using OpenVPN as their backbone protocol and insufficient obfuscation failing to mask OpenVPN’s fingerprints.

__4 out of the “top 5” VPN providers use XOR-based obfuscation, which is easily fingerprintable:__ We find that among the [“top 5” VPN providers](https://www.top10vpn.com/), four offer obfuscated services, all of which nonetheless are flagged as OpenVPN flows by our Filter over 90% of the time. A closer look at the raw packet capture suggests that all of them employ obfuscations that are almost identical to the so-called [XOR patch](https://tunnelblick.net/cOpenvpn_xorpatch.html). While the patch can bypass some of the most basic filters adopted by existing open-source DPI tools, we have demonstrated that even a slightly more sophisticated filter will be able to reliably and accurately detect them.

__Wrapping OpenVPN inside encrypted tunnels is a popular obfuscation strategy, yet some flows are still recognizable due to a lack of random padding:__ Another popular class of obfuscation strategies is tunnel-based, which wraps OpenVPN traffic inside an encrypted tunnel to frustrate any analysis over packet payloads. However, most of these tunnels (e.g., TLS, SSL, obfs2/3) do not add random padding to the payload being tunneled, leaving the connection vulnerable to our ACK fingerprinting. 

__UDP and obfuscated servers often share infrastructure with vanilla TCP servers, leaving them “guilty by association”:__ While our probing technique works only against vanilla TCP servers, we find that the majority of UDP and obfuscated OpenVPN services are co-located with vanilla TCP servers, presumably due to lower hosting and maintenance cost. We find that for 34 out of 41 obfuscated services, at least one vanilla OpenVPN TCP server can be found within the server’s /29 subnet.

<img src="./assets/openvpn-eval.png" alt="Merit evaluation results over days" title="Merit evaluation results over days" width="100%">
**Figure 5.** _Merit evaluation results over days_
{: .center }

__False positives:__ As shown in Figure 5, both the Filter and Prober are able to reduce the number of suspected flows by several orders of magnitude, which when combined flagged 3,638 flows as OpenVPN connections, yielding an upper bound the false positive rate to 0.0039%, which is three orders of magnitude lower than [previous ML-based approaches](https://www.researchgate.net/publication/317287987_Comparison_of_machine-learning_algorithms_for_classification_of_VPN_network_traffic_flow_using_time-related_features) (1.4%-5.5%). 

### Discussion

ISPs and government censors are motivated to detect OpenVPN flows in order to enforce traffic policies and information controls. We demonstrate that tracking and blocking the use of OpenVPN, even with most deployed obfuscation methods, is practical at scale and with minimal collateral damage. We note that many VPN providers’ claims that their obfuscated services are unobservable appear to be misleading and potentially dangerous, especially to users from countries where personal VPN usage is illegal. 

In light of our findings, users should not expect complete unobservability even when connected to “obfuscated” OpenVPN-based services. We implore VPN developers and providers to develop, standardize, and adopt robust, well-validated obfuscation strategies to better protect users from fingerprinting attacks.