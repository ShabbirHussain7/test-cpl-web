---
area: Monitoring Censorship at Global Scale
date: 2023-07-01
publisher: Privacy Enhancing Technology Symposium
name: "CERTainty: Detecting DNS Manipulation using TLS Certificates"
tags:
  - censorship
  - observatory
  - measurement
  - analysis
  - dns
  - certificates
collaborators:
  - Elisa Tsai
  - Deepak Kumar
  - Ram Sundara Raman
  - Gavin Li
  - Yael Eiger
  - Roya Ensafi
pdf: "papers/certainty.pdf"
slides: slides/certainty-slides.pdf
bibtex: "@inproceedings{tsai2023detecting,
  title = {CERTainty: Detecting DNS Manipulation using TLS Certificates},
  author = {Tsai, Elisa and Kumar, Deepak and Sundara Raman, Ram and Li, Gavin and Eiger, Yael and Ensafi, Roya},
  booktitle={Privacy Enhancing Technologies Symposium (PETS)},
  year={2023}
  }"
abstract:
  "DNS manipulation is an increasingly common technique used by censors and other network adversaries to prevent users from accessing restricted Internet resources and hijack their connections. Prior work in detecting DNS manipulation relies largely on comparing DNS resolutions with trusted control results to identify inconsistencies. However, the emergence of CDNs and other cloud providers practicing content localization and load balancing leads to these heuristics being inaccurate, paving the need for more verifiable signals of DNS manipulation. In this paper, we develop a new technique, CERTainty, that utilizes the widely established TLS certificate ecosystem to accurately detect DNS manipulation, and obtain more information about the adversaries performing such manipulation. We find that untrusted certificates, mismatching hostnames, and blockpages are powerful proxies for detecting DNS manipulation. Our results show that previous work using consistency-based heuristics is inaccurate, allowing for 72.45% false positives in the cases detected as DNS manipulation. Further, we identify 17 commercial DNS filtering products in 52 countries, including products such as SafeDNS, SkyDNS, and Fortinet, and identify the presence of 55 ASes in 26 countries that perform ISP-level DNS manipulation. We also identify 226 new blockpage clusters that are not covered by previous research. We are integrating techniques used by CERTainty into active measurement platforms to continuously and accurately monitor DNS manipulation."
---
