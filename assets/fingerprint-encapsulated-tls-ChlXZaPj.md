---
layout: report
date: "19 March 2025"
title: "The TLS Inside TLS Problem: How Censors Can Detect Obfuscated Proxies"
permalink: /fingerprint-encapsulated-tls
excerpt: "We demonstrate how encapsulated TLS handshakes create detectable fingerprints in all obfuscated proxy traffic, regardless of the specific protocol used"
authors:
  - Diwen Xue^1
  - Michalis Kallitsis^2
  - Amir Houmansadr^3
  - Roya Ensafi^1
affiliations: 
  - (1) University of Michigan
  - (2) Merit Network, Inc.
  - (3) University of Massachusetts Amherst
border: yes
research: "Fingerprinting Obfuscated Proxy Traffic with Encapsulated TLS Handshakes"
link: "/assets/tls_in_tls.pdf"
writers: "D. Xue, M. Kallitsis, A. Houmansadr, and R. Ensafi"
appearing: "Proceedings of the 33rd USENIX Security Symposium, August 14–16, 2024"

---
<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/8GO_9HKTvb0?si=-oKT_YT7sRocar-m" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

_This post highlights findings discussed in the [USENIX Security 2024](https://www.usenix.org/conference/usenixsecurity24) paper [Fingerprinting Obfuscated Proxy Traffic with Encapsulated TLS Handshakes](https://www.usenix.org/conference/usenixsecurity24/presentation/xue-fingerprinting)._

As Internet censorship escalates globally, users increasingly rely on obfuscated proxies to circumvent restrictions. This has led to an ongoing arms race between censors and circumvention tool developers. While previous research has focused on protocol-specific vulnerabilities in proxy tools, this work demonstrates a protocol-agnostic approach to detecting proxy traffic by exploiting a fundamental characteristic shared by all proxying techniques: nested protocol stacks.

## Contributions

1. We identify a novel protocol-agnostic fingerprinting approach that identifies encapsulated TLS handshakes within encrypted proxy traffic
2. We develop similarity-based classifiers that can reliably detect these fingerprints with minimal false positives
3. We deploy and evaluate our detection framework in a mid-size ISP serving over a million users
4. We analyze 23 different obfuscated proxy configurations, including widely-used tools like Shadowsocks, VMess, Trojan, and VLESS
5. We explore the effectiveness of countermeasures like random padding and stream multiplexing

## High-level findings

1. We find that all tested obfuscated proxy protocols, in their standard configurations, are vulnerable to fingerprinting based on encapsulated TLS handshakes, with true positive rates exceeding 70%.
2. Adding multiple layers of encapsulation (e.g., Shadowsocks within WebSocket within TLS) provides limited defense and only marginally lowers detection rates.
3. Random padding makes detection marginally more difficult but is insufficient to prevent fingerprinting, even with aggressive padding schemes like XTLS-vision and obfs4.
4. Our framework can process high volumes of network traffic while maintaining an upper-bound false positive rate of just 0.0544%, making it practical for real-world censorship deployment.
5. Stream multiplexing shows promise as a mitigation technique, reducing detection rates by over 70%, but is limited in scenarios with a single application stream.


## Encapsulated TLS Handshakes

Fundamental to all proxying and tunneling is the concept of nested protocol stacks, where one protocol is encapsulated within another. For example, when using a TLS-based proxy, a user's HTTPS connection (which already uses TLS) gets encapsulated within another TLS connection between the user and the proxy server, creating a distinctive "TLS-over-TLS" pattern.


While the content of encrypted proxy traffic is not visible to network observers, the distinctive patterns of encapsulated TLS handshakes remain detectable through side-channel information like packet size, timing, and direction. These patterns serve as reliable fingerprints for identifying proxy traffic, as they indicate redundant protocol stacking not typically found in legitimate connections.

![An overview of CenTrace's operation](/assets/tlshandshakes.png "An overview of CenTrace's operation")

**Figure 1:** _TLS handshakes inside TLS-based proxy connections: This diagram shows how TLS handshakes are encapsulated in proxy traffic. On both sides, we see the protocol layers: TCP handshake, cover TLS handshake between proxy client and server, followed by the obfuscated proxy protocol. The red-boxed messages highlight the encapsulated TLS handshake (between browser and website) that occurs inside the encrypted tunnel. These encapsulated handshakes create distinctive patterns in packet size, timing, and direction that remain observable even after encryption, forming the basis of our detection technique. The left side shows TLS 1.2, which requires more round trips compared to the more efficient TLS 1.3 protocol on the right._


## Detection Framework

We developed a practical detection framework using similarity-based classifiers that analyze packet sequences for patterns indicative of encapsulated TLS handshakes:

1. Chi-squared Test: Detects local patterns in packet size sequences characteristic of TLS handshakes
2. Mahalanobis Distance: Examines aggregated traffic dynamics across multiple packets

Our approach is entirely passive, requiring no active probing, and can be deployed at scale by a network operator. During a 30-day evaluation inside a mid-size ISP, our framework processed over 110 million flows with remarkably low false positive rates.


## Implications for Circumvention Tool Developers
Our findings reveal a fundamental vulnerability in current obfuscation approaches. Rather than focusing solely on making cover protocols look "random" or mimicking legitimate protocols, developers should consider:

1. Embracing Stream Multiplexing: Combining multiple application streams in a single connection significantly reduces fingerprinting accuracy
2. Implementing Dedicated Obfuscation Layers: Decoupling obfuscation from encapsulated application streams to allow maximum flexibility in traffic shaping
3. Addressing Inherent Limitations: Understanding that current padding and multiplexing approaches cannot reduce traffic burst sizes or the number of round trips required by nested protocols


## Conclusion

Our research demonstrates that detecting obfuscated proxy traffic is possible by exploiting encapsulated TLS handshakes, even with random padding and multiple layers of encapsulation. This presents a significant shift in the censorship circumvention arms race, focusing on patterns created by nested protocol stacks rather than characteristics of individual protocols.
While stream multiplexing shows promise as a mitigation technique, current obfuscation approaches based solely on padding and multiplexing are inherently limited. Proxy developers should be aware of these limitations, anticipate the potential exploitation of encapsulated TLS handshakes by censors, and equip their tools with proactive countermeasures.
With the increasing importance of Internet freedom globally, understanding these vulnerabilities is crucial for developing more robust circumvention tools that can withstand sophisticated traffic analysis.