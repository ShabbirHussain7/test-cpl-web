---
area: Securing VPN and Circumvention Tool Ecosystem
date: 2023-07-15
publisher: Free and Open Communications on the Internet
name: "The Use of Push Notification in Censorship Circumvention"
slides: slides/push-foci23-slides.pdf
collaborators:
  - Diwen Xue
  - Roya Ensafi
pdf: papers/foci23-push.pdf
bibtex: "@inproceedings{Xue2023PUSH,
  author = {Diwen Xue and Roya Ensafi},
  title = {{The Use of Push Notification in Censorship Circumvention}},
  booktitle = {Free and Open Communications on the Internet},
  year = {2023},
  address = {Lausanne, Switzerland},
  publisher = {Proceedings on Privacy Enhancing Technologies}
  }"
abstract:
  "Push notifications provide a way for applications to deliver time-sensitive information directly to users. In recent years, they have gained widespread adoption across mobile and desktop platforms. In this paper, we explore the use of push notification services for censorship circumvention. Supported with measurements, we argue that push notifications offer high availability, as blocking them would incur significant collateral damage, making them ideal candidates to tunnel circumvention traffic. We present two censorship circumvention systems that leverage push notification as a transport. PushRSS is a blocking-resistant content aggregator that tunnels RSS updates through a push notification network. Once bootstrapped, the tool remains operational even if the server IP is outright blocked. PushProxy is a general-purpose proxy that routes user's downstream traffic through a push notification service, while keeping upstream an independent channel. By decoupling the downstream from upstream, PushProxy mitigates the ability of network adversaries to perform per-flow traffic analysis, while providing performance comparable to popular symmetric proxies. Although these systems have their limitations, we believe push notification still holds potential as a circumvention transport that complements existing approaches."
---
