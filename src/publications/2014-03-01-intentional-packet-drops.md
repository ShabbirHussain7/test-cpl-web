---
area: Monitoring Censorship at Global Scale
date: 2014-03-01
publisher: "Passive and Active Measurement (PAM)"
name: "Detecting intentional packet drops on the Internet via TCP/IP side channels"
tags:
  - censorship
collaborators:
  - Roya Ensafi
  - Jeffrey Knockel
  - Geoffrey Alexander
  - Jedidiah R Crandall
pdf: "/assets/Ensafi2014a.pdf"
bibtex: "@inproceedings{Roya2014Detecting,<br>
  title={Detecting intentional packet drops on the Internet via TCP/IP side channels},<br>
  author={Roya Ensafi, Jeffrey Knockel, Geoffrey Alexander, Jedidiah R Crandall},<br>
  booktitle={Passive and Active Measurement},<br>
  year={2014}<br>
  }"
talk: ""
slides: ""
abstract:
  "We describe a method for remotely detecting intentional packet drops on the Internet via side channel inferences. That is, given two arbitrary IP addresses on the Internet that meet some simple requirements, our proposed technique can discover packet drops (e.g., due to censorship) between the two remote machines, as well as infer in which direction the packet drops are occurring. The only major requirements for our approach are a client with a global IP Identifier (IPID) and a target server with an open port. We require no special access to the client or server. Our method is robust to noise because we apply intervention analysis based on an autoregressive-moving-average (ARMA) model. In a measurement study using our method featuring clients from multiple continents, we observed that, of all measured client connections to Tor directory servers that were censored, 98% of those were from China, and only 0.63% of measured client connections from China to Tor directory servers were not censored. This is congruent with current understandings about global Internet censorship, leading us to conclude that our method is effective."
---
