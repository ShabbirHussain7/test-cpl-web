---
area: Monitoring Censorship at Global Scale
date: 2021-03-01
publisher: Financial Cryptography and Data Security (FC) 2021
name: "Lost in Transmission: Investigating Filtering of COVID-19 Websites"
tags:
  - censorship
  - observatory
  - country-studies
  - dual-use
collaborators:
  - Anjali Vyas
  - Ram Sundara Raman
  - Nick Ceccio
  - Philipp Lutscher
  - Roya Ensafi
pdf: "assets/covid.pdf"
talk: "https://youtu.be/6_gzdp7zSaw"
slides: "assets/covid-slides.pdf"
bibtex: "@inproceedings{vyas2021lost,<br>
  title = {Lost in Transmission: Investigating Filtering of COVID-19 Websites},<br>
  author = {Vyas, Anjali and Sundara Raman, Ram and Ceccio, Nick and Lutscher, Philipp and Ensafi, Roya},<br>
  booktitle={In Financial Cryptography and Data Security (FC)},<br>
  year={2021}<br>
  }"
abstract:
  "After the unprecedented arrival of the COVID-19 pandemic, the Internet has become a crucial source of essential information on the virus. To prevent the spread of misinformation and panic, many authorities have resorted to exercising higher control over Internet resources. Although there is anecdotal evidence that websites containing information about the pandemic are blocked in specific countries, the global extent of these censorship efforts is unknown. In this work, we perform the first global censorship measurement study of websites obtained from search engine queries on COVID-19 information in more than 180 countries. Using two remote censorship measurement techniques, Satellite and Quack, we collect more than 67 million measurements on the DNS and Application layer blocking of 1,291 domains containing COVID-19 information from 49,245 vantage points in 5,081 ASes. Analyzing global patterns, we find that blocking of these COVID-19 websites is relatively low—on average, 0.20%–0.34% of websites containing information about the pandemic experience interference. As expected, we see higher blocking in countries known for censorship such as Iran, China, and Kazakhstan. Surprisingly, however, we also find significant blocking of websites containing information about the pandemic in countries generally considered as “free” in the Internet space, such as Switzerland (DNS), Croatia (DNS), and Canada (Application layer). We discover that network filters in these countries flag many websites related to COVID-19 as phishing or malicious and hence restrict access to them. However, our investigation suggests that this categorization may be incorrect—most websites do not contain serious security threats—causing unnecessary blocking. We advocate for stricter auditing of filtering policies worldwide to help prevent the loss of access to relevant information."
---
