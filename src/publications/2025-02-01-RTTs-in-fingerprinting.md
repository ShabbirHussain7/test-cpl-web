---
area: Advancing Traffic Obfuscation
date: 2025-02-01                            # ⚠️ needs date
publisher: Network and Distributed System Security Symposium (NDSS 2025)
name: The Discriminative Power of Cross-layer RTTs in Fingerprinting Proxy Traffic
collaborators:
  - Diwen Xue
  - Robert Stanley
  - Piyush Kumar
  - Roya Ensafi
pdf: "papers/rtt-fingerprinting.pdf"
slides: ""
talk: https://www.youtube.com/watch?v=i_yBhIYsMBw
bibtex: "@inproceedings{Xue2025Timing,<br>
  author = {D. Xue and R. Stanley and P. Kumar and R. Ensafi},<br>
  title = {The Discriminative Power of Cross-layer RTTs in Fingerprinting Proxy Traffic},<br>
  booktitle = {Network and Distributed System Security Symposium (NDSS 2025)},<br>
  year = {2025}<br>
}"
abstract: "The escalating global trend of Internet censorship has necessitated an increased adoption of proxy tools, especially obfuscated circumvention proxies. These proxies serve a fundamental need for access and connectivity among millions in heavily censored regions. However, as the use of proxies expands, so do censors' dedicated efforts to detect and disrupt such circumvention traffic to enforce their information control policies. In this paper, we bring out the presence of an inherent fingerprint for detecting obfuscated proxy traffic. The fingerprint is created by the misalignment of transport- and application-layer sessions in proxy routing, which is reflected in the discrepancy in Round Trip Times (RTTs) across network layers. Importantly, being protocol-agnostic, the fingerprint enables an adversary to effectively target multiple proxy protocols simultaneously. We conduct an extensive evaluation using both controlled testbeds and real-world traffic, collected from a partner ISP, to assess the fingerprint's potential for exploitation by censors. In addition to being of interest on its own, our timing-based fingerprinting vulnerability highlights the deficiencies in existing obfuscation approaches. We hope our study brings the attention of the circumvention community to packet timing as an area of concern and leads to the development of more sustainable countermeasures."
---