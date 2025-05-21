---
area: Securing VPN and Circumvention Tool Ecosystem
date: 2016-08-10
publisher: USENIX Security Symposium
name: Identifying and Characterizing Sybils in the Tor Network
collaborators: 
    - Philipp Winter
    - Roya Ensafi
    - Karsten Loesing
    - Nick Feamster
bibtex:
    "@inproceedings{197120,
    author = {Philipp Winter and Roya Ensafi and Karsten Loesing and Nick Feamster},
    title = {Identifying and Characterizing Sybils in the Tor Network},
    booktitle = {25th USENIX Security Symposium (USENIX Security 16)},
    year = {2016},
    isbn = {978-1-931971-32-4},
    address = {Austin, TX},
    pages = {1169–1185},
    url = {https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/winter},
    publisher = {USENIX Association},
    month = aug
    }"
abstract: "Being a volunteer-run, distributed anonymity network, Tor is vulnerable to Sybil attacks. Little is known about real-world Sybils in the Tor network, and we lack practical tools and methods to expose Sybil attacks. In this work, we develop sybilhunter, a system for detecting Sybil relays based on their appearance, such as configuration; and behavior, such as uptime sequences. We used sybilhunter’s diverse analysis techniques to analyze nine years of archived Tor network data, providing us with new insights into the operation of real-world attackers. Our findings include diverse Sybils, ranging from botnets, to academic research, and relays that hijacked Bitcoin transactions. Our work shows that existing Sybil defenses do not apply to Tor, it delivers insights into realworld attacks, and provides practical tools to uncover and characterize Sybils, making the network safer for its users."
pdf: papers/sybilhunting-sec16.pdf
slides: slides/security16_slides_winter.pdf
talk: https://www.youtube.com/watch?v=tCma2JhCtuY
---