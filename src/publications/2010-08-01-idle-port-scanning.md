---
area: Monitoring Censorship at Global Scale
date: 2010-08-01
publisher: "USENIX Security Symposium"
name: "Idle Port Scanning & Non-interference Analysis of Network Protocol Stacks Using Model Checking"
tags:
  - censorship
collaborators:
  - Roya Ensafi
  - Jong Chun Park
  - Deepak Kapur
  - Jedidiah R Crandall
pdf: "papers/Ensafi2010a.pdf"
bibtex: "@inproceedings{Roya2010Idle,<br>
  title={Idle Port Scanning & Non-interference Analysis of Network Protocol Stacks Using Model Checking},<br>
  author={Roya Ensafi and Jong Chun Park and Deepak Kapur and Jedidiah R. Crandall},<br>
  booktitle={USENIX Security Symposium},<br>
  year={2010}<br>
  }"
talk: ""
slides: ""
abstract:
  "Idle port scanning uses side-channel attacks to bounce scans off of a 'zombie' host to stealthily scan a victim IP address or infer IP-based trust relationships between the zombie and victim. We present results from building a transition system model of a network protocol stack for an attacker, victim, and zombie, and testing this model for non-interference properties using model checking. Two new methods of idle scans resulted from our modeling effort, based on TCP RST rate limiting and SYN caches, respectively. Through experimental verification of these attacks, we show that it is possible to scan victims which the attacker is not able to route packets to, meaning that protected networks or ports closed by firewall rules can be scanned. This is not possible with the one currently known method of idle scan in the literature that is based on non-random IPIDs.
  For the future design of network protocols, a notion of trusted vs. untrusted networks and hosts (based on existing IP-based trust relationships) will enable shared, limited resources to be divided. For a model complex enough to capture the details of each attack and where a distinction between trusted and untrusted hosts can be made, we modeled RST rate limitations and a split SYN cache structure. Non-interference for these two resources was verified with symbolic model checking and bounded model checking to depth 1000, respectively. Because each transtion is roughly a packet, this demonstrates that the two respective idle scans are ameliorated by separating these resources."
---
