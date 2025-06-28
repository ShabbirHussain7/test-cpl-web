---
area: Exposing Emerging Censorship Threats
date: 2021-11-03
publisher: ACM Internet Measurement Conference (IMC)
name: "Throttling Twitter: An Emerging Censorship Technique in Russia"
awards:
  - Recognized as the Highest Scoring Short Paper
tags:
  - censorship
  - country-studies
collaborators:
  - Diwen Xue
  - Reethika Ramesh
  - ValdikSS
  - Leonid Evdokimov
  - Andrey Viktorov
  - Arham Jain
  - Eric Wustrow
  - Simone Basso
  - Roya Ensafi
pdf: "papers/throttling-imc-paper.pdf"
talk: "https://www.youtube.com/watch?v=GenCBx5jWxo"
slides: "slides/Throttling-IMC-slides.pdf"
press:
  - publisher: Censored Planet
    link: "https://censoredplanet.org/throttling"
  - publisher: New York Times
    link: "https://www.nytimes.com/2021/10/22/technology/russia-internet-censorship-putin.html"
  - publisher: Foreign Policy
    link: "https://foreignpolicy.com/2021/04/30/russia-block-twitter-telegram-online-censorship/"
  - publisher: Ars Technica
    link: "https://arstechnica.com/gadgets/2021/04/russias-twitter-throttling-may-give-censors-never-before-seen-capabilities/"
bibtex: "@inproceedings{xue2021throttling,
  title = {Throttling Twitter: An Emerging Censorship Technique in Russia},
  author = {Diwen Xue and Reethika Ramesh and ValdikSS and Leonid Evdokimov and Andrey Viktorov and Arham Jain and Eric Wustrow and Simone Basso and Roya Ensafi},
  booktitle={In ACM Internet Measurement Conference (IMC)},
  year={2021}
  }"

abstract:
  "In March 2021, the Russian government started to throttle Twitter on a national level, marking the first ever use of large-scale, targeted throttling for censorship purposes. The slowdown was intended to pressure Twitter to comply with content removal requests from the Russian government.
  In this paper, we take a first look at this emerging censorship technique. We work with local activists in Russia to detect and measure the throttling and reverse engineer the throttler from in-country vantage points. We find that the throttling is triggered by Twitter domains in the TLS SNI extension, and the throttling limits both upstream and downstream traffic to a value between 130 kbps and 150 kbps by dropping packets that exceed this rate. We also find that the throttling devices appear to be located close to end-users, and that the throttling behaviors are consistent across different ISPs suggesting that they are centrally coordinated. Notably, this deployment marks a departure from Russia's previously decentralized model to a more centralized one that gives significant power to the authority to impose desired restrictions unilaterally. Russia's throttling of Twitter serves as a wake-up call to censorship researchers, and we hope to encourage future work in detecting and circumventing this emerging censorship technique."
---
