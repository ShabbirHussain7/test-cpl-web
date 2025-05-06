---
title: "Advancing Traffic Obfuscation Against Novel Fingerprinting Attacks"
permalink: /obfuscation
affiliations: University of Michigan
border: yes
---

## Overview

Targeted network interference—such as censorship, bandwidth throttling, and selective traffic blocking—fundamentally depends on an adversary's ability to accurately identify and classify specific types of traffic, a process known as traffic fingerprinting. To counteract these powerful classification techniques, traffic obfuscation protocols aim to disguise sensitive traffic, making it indistinguishable from benign, everyday network flows.  
Our research rigorously evaluates state-of-the-art obfuscation protocols by empirically analyzing their resilience against realistic fingerprinting attacks. By exposing vulnerabilities within widely deployed obfuscation methods, we reveal critical gaps that adversaries can exploit such as nested protocol structures, timing discrepancies, and anomalous congestion control behaviors. Our goal is to guide the design of next-generation obfuscation protocols, ensuring that future solutions provide robust and lasting defenses against traffic fingerprinting.
Proxy traffic inherently creates detectable timing discrepancies between application-layer and transport-layer round-trip times (RTTs). These consistent differences allow reliable fingerprinting of obfuscated proxy protocols with low false positives. 
## Key Findings

<ul>

<li >Proxy traffic inherently creates detectable timing discrepancies between application-layer and transport-layer round-trip times (RTTs). These consistent differences allow reliable fingerprinting of obfuscated proxy protocols with low false positives. <a href="https://www.ndss-symposium.org/ndss2025/" target="_blank" rel="noopener noreferrer">NDSS’25</a></li>

<li> 
Circumvention proxies using custom congestion control algorithms (e.g., Hysteria, TCP-Brutal) exhibit aggressive traffic behaviors that deviate from standards like TCP Cubic or BBR, making them trivially fingerprintable. <a href="https://www.usenix.org/conference/foci25" target="_blank" rel="noopener noreferrer">FOCI’25</a></li>

<li> Simple latency-based measurements can effectively infer proxy/VPN use by comparing application-layer and network-layer RTTs. Our system, CalcuLatency, detects remote proxy use with ~97% recall and <1% false positives when users are located >650 miles from the proxy. <a href="https://www.usenix.org/conference/usenixsecurity24/presentation/calculatency" target="_blank" rel="noopener noreferrer">USENIX Security ’24 (CalcuLatency)</a>
</li>

<li> Encapsulated TLS handshakes inside encrypted tunnels reveal unique packet-size and timing patterns. These patterns allow accurate detection of obfuscation protocols like Shadowsocks, VMess, Trojan, and VLESS—even with padding or multiple layers. <a href="https://www.usenix.org/conference/usenixsecurity24/presentation/tls-in-tls" target="_blank" rel="noopener noreferrer">USENIX Security ’24 (TLS-in-TLS)</a></li>

</ul>
