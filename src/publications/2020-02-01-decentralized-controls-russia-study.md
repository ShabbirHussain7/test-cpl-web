---
area: Exposing Emerging Censorship Threats
date: 2020-02-02
publisher: Network and Distributed System Security Symposium (NDSS)
name: "Decentralized Control: A Case Study of Russia"
awards:
  - Finalist at the CSAW '20 Applied Research Competition
tags:
 - country-studies
collaborators:
  - Reethika Ramesh
  - Ram Sundara Raman
  - Matthew Bernhard
  - Victor Ongkowijaya
  - Leonid Evdokimov
  - Annie Edmundson
  - S. Sprecher
  - Muhammad Ikram
  - Roya Ensafi
press:
  - publisher: Associated Press
    link: "https://apnews.com/2cee9a8f8b234f5a86987eec835f3c55"
  - publisher: CPJ
    link: "https://cpj.org/blog/2019/11/russia-internet-censorship-censored-planet.php"
  - publisher: Voice of America
    link: "https://www.voanews.com/silicon-valley-technology/study-russias-web-censoring-tool-sets-pace-imitators"
  - publisher: MSN
    link: "https://www.msn.com/en-us/news/technology/study-russias-web-censoring-tool-sets-pace-for-imitators/ar-AAJXp4A?srcref=rss"
  - publisher: ABC News
    link: "https://abcnews.go.com/Politics/wireStory/study-russias-web-censoring-tool-sets-pace-imitators-66797101"
  - publisher: New York Times
    link: "https://www.nytimes.com/aponline/2019/11/06/us/politics/ap-us-russia-internet-censorship.html"
  - publisher: Washington Post
    link: "https://www.washingtonpost.com/business/technology/study-russias-web-censoring-tool-sets-pace-for-imitators/2019/11/06/f10dd964-00ea-11ea-8341-cc3dce52e7de_story.html"
  - publisher: University of Michigan News
    link: "https://news.umich.edu/how-russias-online-censorship-could-jeopardize-internet-freedom-worldwide/"
pdf: "papers/russia.pdf"
bibtex: "@inproceedings{ndss20-russia,<br>
title={Decentralized Control: A Case Study of Russia},<br>
author={R. Ramesh, R. Sundara Raman, M. Bernhard, V. Ongkowijaya, L. Evdokimov, A. Edmundson, S. Sprecher, M. Ikram, R.Ensafi},<br>
booktitle={Proceedings of the Network and Distributed System Security Symposium, NDSS 2020, San Diego, California, USA},<br>
year={2020}<br>
}"
talk: "https://youtu.be/aKeMB-Owlug"
slides: "slides/ndss20-decentralized-slides-v1.pdf"
abstract:
  "Until now, censorship research has largely focused on highly centralized networks that rely on government-run technical choke-points, such as the Great Firewall of China. Although it was previously thought to be prohibitively difficult, large-scale censorship in decentralized networks are on the rise. Our in-depth investigation of the mechanisms underlying decentralized information control in Russia shows that such large-scale censorship can be achieved in decentralized networks through inexpensive commodity equipment. This new form of information control presents a host of problems for censorship measurement, including difficulty identifying censored content, requiring measurements from diverse perspectives, and variegated censorship mechanisms that require significant effort to identify in a robust manner.

  By working with activists on the ground in Russia, we obtained five leaked blocklists signed by Roskomnadzor, the Russian government’s federal service for mass communications, along with seven years of historical blocklist data. This authoritative list contains domains, IPs, and subnets that ISPs have been required to block since November 1st, 2012. We used the blocklist from April 24 2019, that contains 132,798 domains, 324,695 IPs, and 39 subnets, to collect active measurement data from residential, data center and infrastructural vantage points. Our vantage points span 408 unique ASes that control ~ 65% of Russian IP address space.

  Our findings suggest that data centers block differently from the residential ISPs both in quantity and in method of blocking, resulting in different experiences of the Internet for residential network perspectives and data center perspectives. As expected, residential vantage points experience high levels of censorship. While we observe a range of blocking techniques, such as TCP/IP blocking, DNS manipulation, or keyword based filtering, we find that residential ISPs are more likely to inject blockpages with explicit notices to users when censorship is enforced. Russia’s censorship architecture is a blueprint, and perhaps a forewarning of what and how national censorship policies could be implemented in many other countries that have similarly diverse ISP ecosystems to Russia’s. Understanding decentralized control will be key to continuing to preserve Internet freedom for years to come."
---
