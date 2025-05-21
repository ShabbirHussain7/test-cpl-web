---
area: Evaluating Network Middlebox Deployments
date: 2020-02-24
publisher: Network and Distributed System Security Symposium (NDSS)
name: "Measuring the Deployment of Network Censorship Filters at Global Scale"
tags:
  - censorship
  - dual-use
  - hyperquack
collaborators:
  - Ram Sundara Raman
  - Adrian Stoll
  - Jakub Dalek
  - Reethika Ramesh
  - Will Scott
  - Roya Ensafi
press:
  - publisher: Censored Planet
    link: "https://censoredplanet.org/filtermap"
  - publisher: Michigan CSE
    link: "https://cse.engin.umich.edu/stories/real-time-monitor-tracks-the-growing-use-of-network-filters-for-censorship"
pdf: "papers/filtermap.pdf"
bibtex: "@inproceedings{sundararaman2020measuring,<br>
  title={Measuring the Deployment of Network Censorship Filters at Global Scale},<br>
  author={Sundara Raman, Ram and Stoll, Adrian and Dalek, Jakub and Ramesh, Reethika and Scott, Will and Ensafi, Roya},<br>
  booktitle={Proceedings of the Network and Distributed System Security Symposium, NDSS 2020, San Diego, California, USA},<br>
  year={2020}<br>
  }"
talk: "https://youtu.be/R8VlHOwakQk"
slides: "slides/filtermap-slides.pdf"

abstract:
  "Content filtering technologies are often used for Internet censorship, but even as these technologies have become cheaper and easier to deploy, the censorship measurement community lacks a systematic approach to monitor their proliferation. Past research has focused on a handful of specific filtering technologies, each of which required cumbersome manual detective work to identify. Researchers and policymakers require a more comprehensive picture of the state and evolution of censorship based on content filtering in order to establish effective policies that protect Internet freedom.

  In this work, we present FilterMap, a novel framework that can scalably monitor content filtering technologies based on their blockpages. FilterMap first compiles in-network and new remote censorship measurement techniques to gather blockpages from filter deployments. We then show how the observed blockpages can be clustered, generating signatures for longitudinal tracking. FilterMap outputs a map of regions of address space in which the same blockpages appear (corresponding to filter deployments), and each unique blockpage is manually verified to avoid false positives.

  By collecting and analyzing more than 379 million measurements from 45,000 vantage points against more than 18,000 sensitive test domains, we are able to identify filter deployments associated with 90 vendors and actors and observe filtering in 103 countries. We detect the use of commercial filtering technologies for censorship in 36 out of 48 countries labeled as 'Not Free' or 'Partly Free' by the Freedom House ''Freedom on the Net'' report. The unrestricted transfer of content filtering technologies have led to high availability, low cost, and highly effective filtering techniques becoming easier to deploy and harder to circumvent. Identifying these filtering deployments highlights policy and corporate social responsibility issues, and adds accountability to filter manufacturers. Our continued publication of FilterMap data will help the international community track the scope, scale and evolution of content-based censorship."
---
