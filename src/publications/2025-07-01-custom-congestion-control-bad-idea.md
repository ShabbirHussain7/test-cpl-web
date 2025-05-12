---
area: Advancing Traffic Obfuscation
date: 2025-07-01                            # ⚠️ needs date
publisher: Free and Open Communications on the Internet (FOCI 2025)
name: Is Custom Congestion Control a Bad Idea for Circumvention Tools?
collaborators:
  - Wanye Wang
  - Diwen Xue
  - Piyush Kumar
  - Ayush Mishra
  - Anonymous
  - Roya Ensafi
pdf: "assets/congestion.pdf"
slides: ""
bibtex: "@inproceedings{Wang2025Congestion,<br>
  author = {W. Wang and D. Xue and P. Kumar and A. Mishra and Anonymous and R. Ensafi},<br>
  title = {Is Custom Congestion Control a Bad Idea for Circumvention Tools?},<br>
  booktitle = {Free and Open Communications on the Internet (FOCI 2025)},<br>
  year = {2025}<br>
}"
abstract: "Circumvention proxies often have to operate under adverse network conditions, especially over cross-border links with high packet loss. These scenarios motivated the development of proxies that implement custom congestion control algorithms (CCAs) that aggressively sustain high sending rates by disregarding standard congestion responses. In this paper, we argue that such custom CCAs are fundamentally at odds with the core principles of censorship circumvention. Using Hysteria and TCP-Brutal as case studies, we demonstrate how these custom CCAs produce traffic patterns that significantly deviate from standard TCP and QUIC behaviors, and further develop simple, threshold-based classifiers to show how a censor can distinguish such proxy traffic by its lack of response to congestion signals. We emphasize that any performance optimizations must be grounded in standard protocol behaviors to maintain the indistinguishability required for effective censorship circumvention"
---