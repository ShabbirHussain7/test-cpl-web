---
area: Exposing Emerging Censorship Threats
date: 2023-08-09
publisher: Usenix Security Symposium 2023
name: "Network Responses to Russia's Invasion of Ukraine in 2022: A Cautionary Tale for Internet Freedom"
collaborators:
  - Reethika Ramesh
  - Ram Sundara Raman
  - Apurva Virkud
  - Alexandra Dirksen
  - Armin Huremagic
  - David Fifield
  - Dirk Rodenburg
  - Rod Hynes
  - Doug Madory
  - Roya Ensafi
slides: slides/sec23_slides_ramesh-reethika_0.pdf
pdf: papers/russia_usenix_22.pdf
talk: https://www.youtube.com/watch?v=kBK3N3dYZq4
bibtex: "@inproceedings{ramesh2023network,
  title = {Network Responses to Russia's Invasion of Ukraine in 2022: A Cautionary Tale for Internet Freedom},
  author = {Ramesh, Reethika and Sundara Raman, Ram and Virkud, Apurva and Dirksen, Alexandra and Huremagic, Armin and Fifield, David and Rodenburg, Dirk and Hynes, Rod and Madory, Doug and Ensafi, Roya},
  booktitle = {32nd USENIX Security Symposium (USENIX Security 23)},
  year = {2023},
  address = {Anaheim, CA},
  publisher = {USENIX Association}
  }"

abstract:
  "Russia's invasion of Ukraine in February 2022 was followed by sanctions and restrictions: by Russia against its citizens, by Russia against the world, and by foreign actors against Russia. Reports suggested a torrent of increased censorship, geoblocking, and network events affecting Internet freedom.
  This paper is an investigation into the network changes that occurred in the weeks following this escalation of hostilities. It is the result of a rapid mobilization of researchers and activists, examining the problem from multiple perspectives. We develop GeoInspector, and conduct measurements to identify different types of geoblocking, and synthesize data from nine independent data sources to understand and describe various network changes. Immediately after the invasion, more than 45% of Russian government domains tested blocked access from countries other than Russia and Kazakhstan; conversely, 444 foreign websites, including news and educational domains, geoblocked Russian users. We find significant increases in Russian censorship, especially of news and social media. We find evidence of the use of BGP withdrawals to implement restrictions, and we quantify the use of a new domestic certificate authority. Finally, we analyze data from circumvention tools, and investigate their usage and blocking. We hope that our findings showing the rapidly shifting landscape of Internet splintering serves as a cautionary tale, and encourages research and efforts to protect Internet freedom."
---
