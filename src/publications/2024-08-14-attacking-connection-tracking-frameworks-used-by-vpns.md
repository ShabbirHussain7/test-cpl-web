---
area: Securing VPN and Circumvention Tool Ecosystem
date: 2024-08-14                            # ⚠️ needs date
publisher: USENIX Security Symposium 24
name: Attacking Connection Tracking Frameworks as used by Virtual Private Networks
collaborators:
  - Benjamin Mixon‑Baca
  - Jeffrey Knockel
  - Diwen Xue
  - Tarun Ayyagari
  - Deepak Kapur
  - Jedidiah R. Crandall
  - Roya Ensafi
pdf: "assets/pets24-ben.pdf"
slides: ""
bibtex: "@inproceedings{MixonBaca2024,<br>
  author = {B. Mixon‑Baca and J. Knockel and D. Xue and T. Ayyagari and D. Kapur and J. R. Crandall and R. Ensafi},<br>
  title = {Attacking Connection Tracking Frameworks as used by Virtual Private Networks},<br>
  booktitle = {Proceedings on Privacy Enhancing Technologies (PETS 2024)},<br>
  year = {2024},<br>
  address = {Bristol, UK}<br>
}"
abstract:
  "VPNs (Virtual Private Networks) have become an essential privacy-enhancing technology, particularly for at-risk users like dissidents, journalists, NGOs, and others vulnerable to targeted threats. While previous research investigating VPN security has focused on cryptographic strength or traffic leakages, there remains a gap in understanding how lower-level primitives fundamental to VPN operations, like connection tracking, might undermine the security and privacy that VPNs are intended to provide.

  In this paper, we examine the connection tracking frameworks used in common operating systems, identifying a novel exploit primitive that we refer to as the port shadow. We use the port shadow to build four attacks against VPNs that allow an attacker to intercept and redirect encrypted traffic, de-anonymize a VPN peer, or even portscan a VPN peer behind the VPN server. We build a formal model of modern connection tracking frameworks and identify that the root cause of the port shadow lies in five shared, limited resources. Through bounded model checking, we propose and verify six mitigations in terms of enforcing process isolation. We hope our work leads to more attention on the security aspects of lower-level systems and the implications of integrating them into security-critical applications."
---