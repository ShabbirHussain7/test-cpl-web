---
area: ""
date: 2019-05-01                            # ⚠️ needs date
publisher: WWW 2019
name: "The Chain of Implicit Trust: An Analysis of the Web Third‑party Resources Loading"
awards: []
collaborators:
  - Muhammad Ikram
  - Rahat Masood
  - Gareth Tyson
  - Mohamed Ali Kaafar
  - Noha Loizon
  - Roya Ensafi
pdf: "assets/ImplicitTrust_www19.pdf"
slides: ""
bibtex: "@misc{ikram2019chainimplicittrustanalysis,<br>
  author = {M. Ikram et al.},<br>
  title = {The Chain of Implicit Trust: An Analysis of the Web Third‑party Resources Loading},<br>
  year = {2019},<br>
  url = {https://arxiv.org/abs/1901.07699}<br>
}"
abstract:
  "The Web is a tangled mass of interconnected services, where websites import a range of external resources from various third-party domains. However, the latter can further load resources hosted on other domains. For each website, this creates a dependency chain underpinned by a form of implicit trust between the first-party and transitively connected third-parties. The chain can only be loosely controlled as first-party websites often have little, if any, visibility of where these resources are loaded from. This paper performs a large-scale study of dependency chains in the Web, to find that around 50% of first-party websites render content that they did not directly load. Although the majority (84.91%) of websites have short dependency chains (below 3 levels), we find websites with dependency chains exceeding 30. Using VirusTotal, we show that 1.2% of these third-parties are classified as suspicious --- although seemingly small, this limited set of suspicious third-parties have remarkable reach into the wider ecosystem. By running sandboxed experiments, we observe a range of activities with the majority of suspicious JavaScript downloading malware; worryingly, we find this propensity is greater among implicitly trusted JavaScripts."
---