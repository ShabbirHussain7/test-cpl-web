---
area: Characterizing Internet Splintering
date: 2024-08-14
publisher: USENIX Security
name: "Digital Discrimination of Users in Sanctioned States: The Case of the Cuba Embargo"
awards:
  - Distinguished paper award
pdf: papers/cuba.pdf
collaborators:
  - Anna Ablove
  - Shreyas Chandrashekaran
  - Hieu Le
  - Ram Sundara Raman
  - Reethika Ramesh
  - Harry Oppenheimer
  - Roya Ensafi
bibtex: "@inproceedings{10.5555/3698900.3699119, 
  author = {Ablove, Anna and Chandrashekaran, Shreyas and Le, Hieu and Raman, Ram Sundara and Ramesh, Reethika and Oppenheimer, Harry and Ensafi, Roya},
  title = {Digital discrimination of users in sanctioned states: the case of the cuba embargo},
  year = {2024},
  isbn = {978-1-939133-44-1},
  publisher = {USENIX Association},
  address = {USA},
  booktitle = {Proceedings of the 33rd USENIX Conference on Security Symposium},
  articleno = {219},
  numpages = {18},
  location = {Philadelphia, PA, USA},
  series = {SEC '24}
}"
abstract: "We present one of the first in-depth and systematic enduser centered investigations into the effects of sanctions on geoblocking, specifically in the case of Cuba. We conduct network measurements on the Tranco Top 10K domains and complement our findings with a small-scale user study with a questionnaire. We identify 546 domains subject to geoblocking across all layers of the network stack, ranging from DNS failures to HTTP(S) response pages with a variety of status codes. Through this work, we discover a lack of user-facing transparency; we find 88% of geoblocked domains do not serve informative notice of why they are blocked. Further, we highlight a lack of measurement-level transparency, even among HTTP(S) blockpage responses. Notably, we identify 32 instances of blockpage responses served with 200 OK status codes, despite not returning the requested content. Finally, we note the inefficacy of current improvement strategies and make recommendations to both service providers and policymakers to reduce Internet fragmentation."
---
