---
area: Characterizing Internet Splintering
date: 2018-11-01
publisher: ACM Internet Measurement Conference (IMC)
name: "403 Forbidden: A Global View of CDN Geoblocking"
tags:
  - geo-discrimination
collaborators:
  - Allison McDonald
  - Matthew Bernhard
  - Luke Valenta
  - Benjamin VanderSloot
  - Will Scott
  - Nick Sullivan
  - J. Alex Halderman
  - Roya Ensafi
pdf: "papers/403forbidden.pdf"
bibtex: "@inproceedings{Allison2018403,
  title={403 Forbidden: A Global View of CDN Geoblocking},
  author={Allison McDonald and Matthew Bernhard and Luke Valenta and Benjamin VanderSloot and Will Scott and Nick Sullivan and J. Alex Halderman and Roya Ensafi},
  booktitle={ACM Internet Measurement Conference},
  year={2018}
  }"
talk: ""
slides: ""
abstract:
  "We report the first wide-scale measurement study of server-side geographic restriction, or geoblocking, a phenomenon in which server operators intentionally deny access to users from particular countries or regions. Many sites practice geoblocking due to legal requirements or other business reasons, but excessive blocking can needlessly deny valuable content and services to entire national populations.
  To help researchers and policymakers understand this phenomenon, we develop a semi-automated system to detect instances where whole websites were rendered inaccessible due to geoblocking. By focusing on detecting geoblocking capabilities offered by large CDNs and cloud providers, we can reliably distinguish the practice from dynamic anti-abuse mechanisms and network-based censorship. We apply our techniques to test for geoblocking across the Alexa Top 10K sites from thousands of vantage points in 177 countries. We then expand our measurement to a sample of CDN customers in the Alexa Top 1M.
  We find that geoblocking occurs across a broad set of countries and sites. We observe geoblocking in nearly all countries we study, with Iran, Syria, Sudan, Cuba, and Russia experiencing the highest rates. These countries experience particularly high rates of geoblocking for finance and banking sites, likely as a result of U.S. economic sanctions. We also verify our measurements with data provided by Cloudflare, and find our observations to be accurate."
---
