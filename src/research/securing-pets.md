---
title: Securing VPN and Circumvention Tool Ecosystem
permalink: /securing-pets
affiliations: University of Michigan
---


## Overview

Targeted network interference—such as censorship, bandwidth throttling, and selective traffic blocking—fundamentally depends on an adversary's ability to accurately identify and classify specific types of traffic, a process known as traffic fingerprinting. To counteract these powerful classification techniques, traffic obfuscation protocols aim to disguise sensitive traffic, making it indistinguishable from benign, everyday network flows.  
Our research rigorously evaluates state-of-the-art obfuscation protocols by empirically analyzing their resilience against realistic fingerprinting attacks. By exposing vulnerabilities within widely deployed obfuscation methods, we reveal critical gaps that adversaries can exploit such as nested protocol structures, timing discrepancies, and anomalous congestion control behaviors. Our goal is to guide the design of next-generation obfuscation protocols, ensuring that future solutions provide robust and lasting defenses against traffic fingerprinting.
Proxy traffic inherently creates detectable timing discrepancies between application-layer and transport-layer round-trip times (RTTs). These consistent differences allow reliable fingerprinting of obfuscated proxy protocols with low false positives. 
## Key Findings