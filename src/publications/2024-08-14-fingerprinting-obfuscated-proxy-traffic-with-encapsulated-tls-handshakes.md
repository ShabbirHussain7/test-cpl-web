---
area: Advancing Traffic Obfuscation
date: 2024-08-14
publisher: USENIX Security
name: "Fingerprinting Obfuscated Proxy Traffic with Encapsulated TLS Handshakes"
category: Censored
tags:
  - censorship
  - circumvention
  - fingerprinting
collaborators:
  - Diwen Xue
  - Michalis Kallitsis
  - Amir Houmansadr
  - Roya Ensafi
pdf: "papers/sec24-xue.pdf"
slides: slides/tls-usenix24-slides.pdf
talk: https://www.youtube.com/watch?v=8GO_9HKTvb0
bibtex: "@inproceedings {Xue2024TLS,
	author = {Diwen Xue and Michalis Kallitsis and Amir Houmansadr and Roya Ensafi},
	title = {{Fingerprinting Obfuscated Proxy Traffic with Encapsulated TLS Handshakes}},
	booktitle = {33rd USENIX Security Symposium (USENIX Security 24)},
	year = {2024},
	address = {Philadelphia, PA},
	publisher = {USENIX Association},
}"
abstract: "The global escalation of Internet censorship by nation-state actors has led to an ongoing arms race between censors and obfuscated circumvention proxies. Research over the past decade has extensively examined various fingerprinting attacks against individual proxy protocols and their respective countermeasures. In this paper, however, we demonstrate the feasibility of a protocol-agnostic approach to proxy detection, enabled by the shared characteristic of nested protocol stacks inherent to all forms of proxying and tunneling activities. We showcase the practicality of such an approach by identifying one specific fingerprint-encapsulated TLS handshakes-that results from nested protocol stacks, and building similarity-based classifiers to isolate this unique fingerprint within encrypted traffic streams.
  Assuming the role of a censor, we build a detection framework and deploy it within a mid-size ISP serving upwards of one million users. Our evaluation demonstrates that the traffic of obfuscated proxies, even with random padding and multiple layers of encapsulations, can be reliably detected with minimal collateral damage by fingerprinting encapsulated TLS handshakes. While stream multiplexing shows promise as a viable countermeasure, we caution that existing obfuscations based on multiplexing and random padding alone are inherently limited, due to their inability to reduce the size of traffic bursts or the number of round trips within a connection. Proxy developers should be aware of these limitations, anticipate the potential exploitation of encapsulated TLS handshakes by the censors, and equip their tools with proactive countermeasures."
---
