---
area: "Other"
date: 2020-03-01                            # ⚠️ needs date
publisher: ACM Transactions on Privacy and Security (TOPS 2020)
name: "Measuring and Analysing the Chain of Implicit Trust: A Study of Third‑party Resources Loading"
collaborators:
  - Muhammad Ikram
  - Rahat Masood
  - Gareth Tyson
  - Dali Kaafar
  - Noha Loizon
  - Roya Ensafi
pdf: "papers/ik_wot_tops_2020.pdf"
slides: ""
bibtex: "@article{article,<br>
  author = {M. Ikram et al.},<br>
  title = {Measuring and Analysing the Chain of Implicit Trust: A Study of Third‑party Resources Loading},<br>
  journal = {ACM Transactions on Privacy and Security (TOPS)},<br>
  year = {2020}<br>
}"
abstract:
  "The web is a tangled mass of interconnected services, whereby websites import a range of external resources from various third-party domains. The latter can also load further resources hosted on other domains. For each website, this creates a dependency chain underpinned by a form of implicit trust between the first-party and transitively connected third parties. The chain can only be loosely controlled as first-party websites often have little, if any, visibility on where these resources are loaded from. This article performs a large-scale study of dependency chains in the web to find that around 50% of first-party websites render content that they do not directly load. Although the majority (84.91%) of websites have short dependency chains (below three levels), we find websites with dependency chains exceeding 30. Using VirusTotal, we show that 1.2% of these third parties are classified as suspicious—although seemingly small, this limited set of suspicious third parties have remarkable reach into the wider ecosystem. We find that 73% of websites under-study load resources from suspicious third parties, and 24.8% of first-party webpages contain at least three third parties classified as suspicious in their dependency chain. By running sandboxed experiments, we observe a range of activities with the majority of suspicious JavaScript codes downloading malware."
---