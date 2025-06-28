---
area: Characterizing Internet Splintering
date: 2022-08-10
publisher: USENIX Security
name: A Large-scale Investigation into Geodifferences in Mobile Apps
collaborators:
    - Renuka Kumar
    - Apurva Virkud
    - Ram Sundara Raman
    - Atul Prakash
    - Roya Ensafi
slides: "slides/appmap_slides.pdf"
pdf: "papers/geodiff-apps.pdf"
talk: "https://youtu.be/TlobPE3ONTI"
bibtex: "@inproceedings{277218,
    author = {Renuka Kumar and Apurva Virkud and Ram Sundara Raman and Atul Prakash and Roya Ensafi},
    title = {A Large-scale Investigation into Geodifferences in Mobile Apps},
    booktitle = {31st USENIX Security Symposium (USENIX Security 22)},
    year = {2022},
    isbn = {978-1-939133-31-1},
    address = {Boston, MA},
    pages = {1203–1220},
    url = {https://www.usenix.org/conference/usenixsecurity22/presentation/kumar},
    publisher = {USENIX Association},
    month = aug
    }"
abstract: 
    "Recent studies on the web ecosystem have been raising alarms on the increasing geodifferences in access to Internet content and services due to Internet censorship and geoblocking. However, geodifferences in the mobile app ecosystem have received limited attention, even though apps are central to how mobile users communicate and consume Internet content. We present the first large-scale measurement study of geodifferences in the mobile app ecosystem. We design a semi-automatic, parallel measurement testbed that we use to collect 5,684 popular apps from Google Play in 26 countries. In all, we collected 117,233 apk files and 112,607 privacy policies for those apps. Our results show high amounts of geoblocking with 3,672 apps geoblocked in at least one of our countries. While our data corroborates anecdotal evidence of takedowns due to government requests, unlike common perception, we find that blocking by developers is significantly higher than takedowns in all our countries, and has the most influence on geoblocking in the mobile app ecosystem. We also find instances of developers releasing different app versions to different countries, some with weaker security settings or privacy disclosures that expose users to higher security and privacy risks. We provide recommendations for app market proprietors to address the issues discovered."
---