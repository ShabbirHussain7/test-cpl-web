---
area: Advancing Traffic Obfuscation
date: 2022-08-09
publisher: USENIX Security
name: "OpenVPN is Open to VPN Fingerprinting"
awards:
  - Distinguished paper award
  - Won First Prize in the 2022 Internet Defense Prize
tags:
  - censorship
  - fingerprinting
  - vpn
  - circumvention
collaborators:
  - Diwen Xue
  - Reethika Ramesh
  - Arham Jain
  - Michalis Kallitsis
  - J. Alex Halderman
  - Jedidiah R. Crandall
  - Roya Ensafi
pdf: "assets/openvpn-usenix22.pdf"
talk: "https://www.youtube.com/watch?v=ZNVff1rH-vA"
slides: "assets/openvpn-usenix22-slides.pdf"
press:
  - publisher: Censored Planet
    link: "https://censoredplanet.org/openvpn"
  - publisher: Michigan News
    link: "https://cse.engin.umich.edu/stories/research-on-key-vpn-vulnerabilities-recognized-with-two-awards-by-usenix-security"
bibtex: "@inproceedings {Xue2022OpenVPN,<br>
	author = {Diwen Xue and Reethika Ramesh and Arham Jain and Michalis Kallitsis and J. Alex Halderman and Jedidiah R. Crandall and Roya Ensafi},<br>
	title = {{OpenVPN} is Open to {VPN} Fingerprinting},<br>
	booktitle = {31st USENIX Security Symposium (USENIX Security 22)},<br>
	year = {2022},<br>
	address = {Boston, MA},<br>
	publisher = {USENIX Association},<br>
}"
abstract:
  "VPN adoption has seen steady growth over the past decade due to increased public awareness of privacy and surveillance threats. In response, certain governments are attempting to restrict VPN access by identifying connections using “dual use” DPI technology. To investigate the potential for VPN blocking, we develop mechanisms for accurately fingerprinting connections using OpenVPN, the most popular protocol for commercial VPN services. We identify three fingerprints based on protocol features such as byte pattern, packet size, and server response. Playing the role of an attacker who controls the network, we design a two-phase framework that performs passive fingerprinting and active probing in sequence. We evaluate our framework in partnership with a million-user ISP and find that we identify over 85% of OpenVPN flows with only negligible false positives, suggesting that OpenVPN-based services can be effectively blocked with little collateral damage. Although some commercial VPNs implement countermeasures to avoid detection, our framework successfully identified connections to 34 out of 41 “obfuscated” VPN configurations. We discuss the implications of the VPN fingerprintability for different threat models and propose short-term defenses. In the longer term, we urge commercial VPN providers to be more transparent about their obfuscation approaches and to adopt more principled detection countermeasures, such as those developed in censorship circumvention research."
---
