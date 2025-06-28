---
area: Advancing Traffic Obfuscation
date: 2025-07-01                            # ⚠️ needs date
publisher: Free and Open Communications on the Internet (FOCI 2025)
name: Is Custom Congestion Control a Bad Idea for Circumvention Tools?
collaborators:
  - Wanye Wang
  - Diwen Xue
  - Piyush Kumar Sharma
  - Ayush Mishra
  - Anonymous
  - Roya Ensafi
pdf: "papers/congestion.pdf"
slides: ""
bibtex: "@inproceedings{Wang2025Congestion,
  author = {Wanye Wang and Diwen Xue and Piyush Kumar and Ayush Mishra and Anonymous and Roya Ensafi},
  title = {Is Custom Congestion Control a Bad Idea for Circumvention Tools?},
  booktitle = {Free and Open Communications on the Internet (FOCI 2025)},
  year = {2025}
}"
abstract: "Circumvention proxies often have to operate under adverse network conditions, especially over cross-border links with high packet loss. These scenarios motivated the development of proxies that implement custom congestion control algorithms (CCAs) that aggressively sustain high sending rates by disregarding standard congestion responses. In this paper, we argue that such custom CCAs are fundamentally at odds with the core principles of censorship circumvention. Using Hysteria and TCP-Brutal as case studies, we demonstrate how these custom CCAs produce traffic patterns that significantly deviate from standard TCP and QUIC behaviors, and further develop simple, threshold-based classifiers to show how a censor can distinguish such proxy traffic by its lack of response to congestion signals. We emphasize that any performance optimizations must be grounded in standard protocol behaviors to maintain the indistinguishability required for effective censorship circumvention"
---