---
area: Monitoring Censorship at Global Scale
date: 2018-08-01
publisher: USENIX Security Symposium
name: "Quack: Scalable Remote Measurement of Application-Layer Censorship"
tags:
  - censorship
  - quack
collaborators:
  - Benjamin VanderSloot  
  - Allison McDonald
  - J. Alex Halderman
  - Will Scott
  - Roya Ensafi
pdf: "papers/quack_sec18.pdf"
bibtex: "@inproceedings{Ben2018Quack:,<br>
  title={Quack: Scalable Remote Measurement of Application-Layer Censorship},<br>
  author={Ben VanderSloot and Allison McDonald and Will Scott and J. Alex Halderman and Roya Ensafi},<br>
  booktitle={USENIX Security Symposium},<br>
  year={2018}<br>
  }"
talk: https://www.youtube.com/watch?v=WwKQrXWUoSM
slides: slides/security18_slides_vandersloot.pdf
abstract:
  "Remote censorship measurement tools can now detect DNS- and IP-based blocking at global scale. However, a major unmonitored form of interference is blocking triggered by deep packet inspection of application-layer data. We close this gap by introducing Quack, a scalable, remote measurement system that can efficiently detect application-layer interference.
  We show that Quack can effectively detect application-layer blocking triggered on HTTP and TLS headers, and it is flexible enough to support many other diverse protocols. In experiments, we test for blocking across 4458 autonomous systems, an order of magnitude larger than provided by country probes used by OONI. We also test a corpus of 100,000 keywords from vantage points in 40 countries to produce detailed national blocklists. Finally, we analyze the keywords we ind blocked to provide insight into the application-layer blocking ecosystem and compare countries' behavior. We find that the most consistently blocked services are related to circumvention tools, pornography, and gambling, but that there is signiicant country-to-country variation."
---
