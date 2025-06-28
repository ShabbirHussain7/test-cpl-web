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
pdf: "papers/pets24-ben.pdf"
slides: ""
bibtex: "@inproceedings{MixonBaca2024,
  author = {Benjamin Mixon-Baca and Jeffrey Knockel and Diwen Xue and Tarun Ayyagari and Deepak Kapur and Roya Ensafi and Jedidiah R. Crandall},
  title = {Attacking Connection Tracking Frameworks as used by Virtual Private Networks},
  booktitle = {Proceedings on Privacy Enhancing Technologies (PETS 2024)},
  year = {2024},
  address = {Bristol, UK}
}"
abstract:
  "VPNs (Virtual Private Networks) have become an essential privacy-enhancing technology, particularly for at-risk users like dissidents, journalists, NGOs, and others vulnerable to targeted threats. While previous research investigating VPN security has focused on cryptographic strength or traffic leakages, there remains a gap in understanding how lower-level primitives fundamental to VPN operations, like connection tracking, might undermine the security and privacy that VPNs are intended to provide.

  In this paper, we examine the connection tracking frameworks used in common operating systems, identifying a novel exploit primitive that we refer to as the port shadow. We use the port shadow to build four attacks against VPNs that allow an attacker to intercept and redirect encrypted traffic, de-anonymize a VPN peer, or even portscan a VPN peer behind the VPN server. We build a formal model of modern connection tracking frameworks and identify that the root cause of the port shadow lies in five shared, limited resources. Through bounded model checking, we propose and verify six mitigations in terms of enforcing process isolation. We hope our work leads to more attention on the security aspects of lower-level systems and the implications of integrating them into security-critical applications."
---