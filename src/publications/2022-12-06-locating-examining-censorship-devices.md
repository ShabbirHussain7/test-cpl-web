---
area: Monitoring Censorship at Global Scale
date: 2022-12-06
publisher: Conference on emerging Networking EXperiments and Technologies (CoNEXT 2022)
name: "Network measurement methods for locating and examining censorship devices"
tags:
  - censorship
  - dual-use
  - measurement
  - networks
awards:
  - IRTF Applied Networking Research Prize winner
collaborators:
  - Ram Sundara Raman
  - Mona Wang   
  - Jakub Dalek
  - Jonathan Mayer
  - Roya Ensafi
pdf: "assets/censorship-devices.pdf"
slides: "assets/censorship-devices-slides.pdf"
press:
  - publisher: Censored Planet
    link: "https://censoredplanet.org/censorship-devices"
  - publisher: Open Technology Fund
    link: "https://www.opentech.fund/news/"
bibtex: "@inproceedings {SundaraRaman2022Network,<br>
	author = {Ram Sundara Raman and Mona Wang and Jakub Dalek and Jonathan Mayer and Roya Ensafi},<br>
	title = {Network Measurement Methods for Locating and Examining Censorship Devices},<br>
	booktitle = {Proceedings of the 18th International Conference on emerging Networking EXperiments and Technologies (CoNEXT '22)},<br>
	year = {2022},<br>
	address = {Rome, Italy},<br>
	publisher = {Association for Computing Machinery},<br>
}"
abstract: "Advances in networking and firewall technology have led to the emergence of network censorship devices that can perform large-scale, highly-performant content blocking. While such devices have proliferated, techniques to locate, identify, and understand them are still limited, require cumbersome manual effort, and are developed on a case-by-case basis.
  In this paper, we build robust, general-purpose methods to understand various aspects of censorship devices, and study devices deployed in 4 countries (Azerbaijan, Belarus, Kazakhstan, and Russia). We develop a censorship traceroute method, CenTrace, that automatically identifies the network location of censorship devices. We use banner grabs to identify vendors from potential censorship devices. To collect more features about the devices themselves, we build a censorship fuzzer, CenFuzz, that uses various HTTP request and TLS Client Hello fuzzing strategies to examine the rules and triggers of censorship devices. Finally, we use features collected using these methods to cluster censorship devices and explore device characteristics across deployments.
  Using CenTrace measurements, we find that censorship devices are often deployed in ISPs upstream to clients, sometimes even in other countries. Using data from banner grabs and injected block-pages, we identify 23 commercial censorship device deployments in Azerbaijan, Belarus, Kazakhstan, and Russia. We observe that certain CenFuzz strategies such as using a different HTTP method succeed in evading a large portion of these censorship devices, and observe that devices manufactured by the same vendors have similar evasion behavior using clustering. The methods developed in this paper apply consistently and rapidly across a wide range of censorship devices and enable continued understanding and monitoring of censorship devices around the world."
---
