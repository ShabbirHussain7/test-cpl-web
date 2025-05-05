---
layout: report
date: "2 November 2022"
title: "TSPU: Russia’s Decentralized Censorship System"
permalink: /tspu
excerpt: "We measured Russia's new TSPU censorship system, which empowers the Russian government to unilaterally roll out information control measures."
authors:
  - Diwen Xue
  - Benjamin Mixon-Baca
  - ValdikSS
  - Anna Ablove
  - Beau Kujath
  - Jedidiah R. Crandall
  - Roya Ensafi
affiliations: Censored Planet at the University of Michigan, Arizona State University
border: yes

note: "If you are in the region (Russia) and are interested to collaborate or want to provide more information/feedback please reach out to us at: censoredplanet-rapid-focus@umich.edu."

research: "TSPU: Russia’s Decentralized Censorship System"
link: "assets/tspu-imc22.pdf"
writers: "Diwen Xue, Benjamin Mixon-Baca, ValdikSS, Anna Ablove, Beau Kujath, Jedidiah R. Crandall, Roya Ensafi"
appearing: "Internet Measurement Conference 2022 (IMC'22)"
---

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/LWoBhWwAY8A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

This post highlights findings also discussed in our [IMC 2022](https://conferences.sigcomm.org/imc/2022/) paper [TSPU: Russia’s Decentralized Censorship System](/assets/tspu-imc22.pdf). 

In March 2022, just days after the onset of Russia’s invasion of Ukraine, the federal government of Russia started to block social media and news websites on a national scale. The escalation of blocking quickly transformed Russia’s Internet into a propaganda bubble that’s hostile to Russian citizens’ ability to communicate and understand about the war. But how such information control is done in Russia?

<img src="./assets/tspu-war.png" width="60%" alt="Information Control in Russia during the Ukraine war" title="Information Control in Russia during the Ukraine war">
{: .center }

**Figure 1.** _Information Control in Russia during the Ukraine war_
{: .center }

In this paper, we analyze the latest development of the Internet censorship in Russia, enabled by a newly deployed system colloquially known as “TSPU” whose existence has been only hinted at in previous literature. With in-country and remote measurements, our team at Censored Planet confirm the existence of such a system and find evidence of pervasive deployment of TSPU devices on Russia’s Internet. We also characterized the How, What and Where of TSPU’s interference with users’ Internet traffic. By being in-path, centrally controlled, and close to end users, TSPU empowers the Russian government to unilaterally roll out censorship measures and potentially other attacks over thousands of privately-owned ISPs.


### High-level Takeaways

*  TSPU, технические средства противодействия угрозам (“Technical Measures to Combat Threats”), refers to the homegrown DPIs that are developed, distributed, and controlled directly by [Roskomnadzor](https://eng.rkn.gov.ru/about/), Russian government’s agency on media and communications. While previous literature [hinted](/assets/throttling-imc-paper.pdf) at the existence of such a system, this is the very first study dedicated to the analysis of TSPU including discovering: How the TSPU blocks a connection, What resources it blocks, and Where it is installed with respect to Russian users. 

* We acquire in-country vantage points in both residential networks and data centers with the help of Russia activists and researchers. From these vantage points, in-country measurements suggest the TSPUs are [in-path](https://citizenlab.ca/2018/03/bad-traffic-sandvines-packetlogic-devices-deploy-government-spyware-turkey-syria/) devices, applying censorship policies only on connections originating from within Russia, and exhibit a degree of statefulness.

* The TSPU can be triggered by different types of traffic, such as __SNI-based, IP-based, and QUIC-based__, leading to six unique blocking behaviors that we document in the paper. Based on our understanding of how these blocking are implemented, we recommend several circumvention strategies that work either from the client side or the server side.

* The TSPU blocks a variety of domains, with a notable focus on informative media such as personal blogs, news agencies, or social media. In particular, we found that the vast majority of domains that ISPs are already obligated to block under the “blocklist law” are also targeted by TSPU, suggesting a change in Russia’s censorship model.

* Even though censorship by TSPU is __asymmetric__ with respect to inside and outside Russia, with ad-hoc remote measurement techniques, we were still able to detect TSPU from outside the country. Our large-scale scanning suggests __pervasive deployment of TSPU devices__, with over six thousand unique devices being identified from 650 ASes. We further discover that these devices are located closer to end-users rather than to backbone networks, with most devices being less than two hops away from the targeted IP.

* We fear that this new TSPU censorship model of __decentralized deployment, centralized control__, may become a blueprint for other countries. Considering that Russia has a history of [exporting censorship technologies](https://public.opentech.fund/documents/English_Weber_WWW_of_Information_Controls_Final.pdf), we should monitor for their potential deployment in other regions.


<img src="./assets/tspu-timeline.png" alt="Timeline of Russian Information Control" title="Timeline of Russian Information Control" width="100%">
**Figure 2.** _Timeline of Russian Information Control_
{: .center }

### Background on Internet Censorship in Russia

The practice of Internet censorship in Russia, including both the legal and technical frameworks that support censorship policies, has gone through major changes in the past decade. Figure 2 highlights some of the important events that illustrate Russia’s tightening information control scheme.

Ten years ago, in 2012, the infamous [“blocklist law”](https://wilmap.stanford.edu/entries/federal-law-no-139-fz-blacklist-law) was signed, which claims to protect children from illegal content. The law was implemented as a singular blocklist, called [the Blocking Registry]((https://eais.rkn.gov.ru/)), which is maintained and updated by the federal agency Roskomnadzor, who is in charge of the nationwide Russian Internet censorship. Specifically, ISPs fetch the list from Roskomnadzor periodically, and are obligated to block websites from the list. While the list itself is not accessible to the general public, there are APIs that allow queries to check if a website is found within the list as well as a [leaked repository](https://github.com/zapret-info/z-i) that maintains an up-to-date copy of the blocklist.

For years after the law was signed, censorship in Russia followed a model called “decentralized control” (refer to our [previous report](https://censoredplanet.org/russia) on this). Specifically, Roskomnadzor controls the contents of the singular blocklist, determining which domains are “harmful”, but ISPs were at discretion to implement the technical means to enforce the blocking. As a result, ISPs used different blocking mechanisms with different levels of efficacy and different amounts of blocking targets. Under that model, it was difficult for the federal government to enforce censorship policies in real time and uniformly across the country. 

<img src="./assets/tspu-leak.png" width="50%" alt="Leaked installation guide for TSPU" title="Leaked installation guide for TSPU">
{: .center }

**Figure 3.** _Leaked installation guide for TSPU_
{: .center }

As a result, the [RuNet Law](https://edition.cnn.com/2019/05/01/europe/vladimir-putin-russian-independent-internet-intl/index.html) was signed in 2019, which appoints Roskomnadzor to implement special-purpose DPIs to counter "threats" to the ["stability, security, and integrity"](https://dgap.org/en/research/publications/deciphering-russias-sovereign-internet-law) of Russia’s Internet. Importantly, this law provides the legal basis for requiring ISPs to install government-supplied devices inside their networks. These devices were then shipped out to ISPs, along with instructions on where to put them (Figure 3 shows one example of installation guide leaded from ISP).

<img src="./assets/tspu-ooni.png" width="65%" alt="OONI Measurement suggests uniform censorship behaviors" title="OONI Measurement suggests uniform censorship behaviors">
{: .center }

**Figure 4.** _OONI Measurement suggests uniform censorship behaviors_
{: .center }

About a year later, Russian users started to notice blocking of domains which were not found inside the blocking registry, which defied our understanding of how censorship had been traditionally practiced until then. We called it “out-registry” blocking. One of such events is the [Twitter throttling incident](https://censoredplanet.org/throttling) back in March 2021. For all such incidents, measurements on censorship behaviors showed temporal and geographical uniformity, suggesting that the censorship devices are [likely centrally managed](https://ooni.org/post/2022-russia-blocks-amid-ru-ua-conflict/). 

We highlight that these events after 2019 marked a significant departure from Russia’s previous censorship approach (which centered on the singular blocklist and ISP compliance), and they suggest the existence of an emerging censorship system that enables the Russian government to enforce censorship in a centrally coordinated manner. __But beyond its existence, very little is known about this new TSPU system.__


### In-depth Analysis

<img src="./assets/tspu-setup.png" width="50%" alt="Measurement Setup" title="Measurement Setup">
{: .center }

**Figure 5.** _Measurement Setup_
{: .center }

There are a few key challenges of performing measurements on TSPU. First, we need to acquire appropriate vantage points inside Russia for in-country measurements. The fact that only residential networks are targeted while data centers are often exempted from the TSPU law further complicates the issue. Moreover, distinguishing TSPU from other DPIs is not trivial, because Russian ISPs still keep their own commercial filters in place, which censor many of the same resources. Finally, we found that TSPU censorship policies are NOT symmetric with respect to inside and outside Russia, which makes existing remote measurement platforms unfit for detecting TSPUs, and therefore requiring ad-hoc solutions.

Working with local activists and researchers, we set up a measurement testbed including vantage points in residential ISPs, data centers, as well as controls outside Russia, as shown in Figure 5. Using this setup, we send different types of network traffic with different censorship triggers present, such as blocklisted IP addresses, targeted SNIs, or fingerprints belonging to a disallowed protocol. For example, to study IP-based blocking, we used a retired Tor entry node in France whose IP has been “out-registry blocked” by TSPU.

**Identify TSPU blocking:**

<img src="./assets/tspu-behavior.png" alt="Six blocking behaviors attributed to TSPU" title="Six blocking behaviors attributed to TSPU" width="100%">
**Figure 6.** _Six blocking behaviors attributed to TSPU_
{: .center }

We attribute an observed blocking instance, including the trigger and the corresponding blocking behavior, to the TSPU based on the following three assumptions, based on the fact that TSPU devices are ordered, distributed, and controlled by Roskomnadzor: 

> TSPU blocking should show a high degree of uniformity in blocking behaviors across ISPs. In addition, uniformity is also expected for the blocking targets. Finally, we expect that different blocking mechanisms that are attributed to the TSPU are co-located.

Using this methodology, we identified six unique blocking behaviors that we reliably attribute to TSPU, which are implemented to target SNI, IP, or the QUIC protocol. We note that each of the six blocking behaviors requires the TSPU to modify or drop packets in order to sever a violating connection. Such capability suggests that TSPU devices have [in-path](https://citizenlab.ca/2018/03/bad-traffic-sandvines-packetlogic-devices-deploy-government-spyware-turkey-syria/) components. We highlight that this means the TSPU has more means to interfere with users’ traffic than known on-path censorship systems, such as the GFW.

**Characterize TSPU state management:**

<img src="./assets/tspu-state.png" width="65%" alt="TSPU Triggering Sequences" title="TSPU Triggering Sequences">
{: .center }

**Figure 7.** _TSPU Triggering Sequences_
{: .center }

We explore the degree of statefulness when TSPU makes access control decisions. First, we send different TCP sequences between the local and remote machines, alternating source, destination, and TCP flags. We found that different sequences can lead to different blocking behaviors. For example, none of the sequences starting with a packet sent by the remote peer triggers blocking, confirming that censorship is likely not symmetric with respect to inside and outside Russia. Such behavior makes remote measurement extremely challenging. We also note that sequences that contain a remote-sent SYN packet can “un-block” a connection despite the presence of a blocking trigger. We make use of this observation when making recommendations on how clients and servers can circumvent TSPU censorship.

![TSPU handling of IP fragmentation](/assets/tspu-frag.png "TSPU handling of IP fragmentation")
**Figure 8.** _TSPU handling of IP fragmentation_
{: .center}

We also found that TSPU handles IP fragmentation in a quite unique way: TSPU devices buffer incomplete fragments, but does not defragment them before forwarding to the next hop. In addition, when fragments are forwarded to the next hop, the Time-to-live (TTL) field of the first fragment (identified by zero offset) is used for subsequent fragments. Moreover, the fragmentation cache on TSPU devices has a limit of 45 as the maximum number of fragments permitted in a single IP packet. These behaviors are fairly unique, and they ultimately enable us to detect TSPU from the remote side.

**Understand what resources are targeted:**

We curated lists of domains for testing, including samples from the blocking registry, top domain list, and censorship testing list from Citizen Lab. We then tested each domain for both ISP and TSPU blocking. Overall, we found that ISPs fall behind the TSPU in terms of blocking coverage: ISPs do not block “out-registry” domains at all and some of them do not even block domains from the blocking registry effectively. For example, our vantage points in Rostelecom and OBIT only block 1,302 and 3,943 domains from the registry samples, while TSPU blocks the same list of 9,655 domains across ISPs. 

<img src="./assets/tspu-target.png" width="70%" alt="Domains blocked by ISPs and the TSPU" title="Domains blocked by ISPs and the TSPU">
{: .center }

**Figure 9.** _Domains blocked by ISPs and the TSPU_
{: .center }


We note that the majority of domains targeted by TSPU seem to be "in-registry" domains, which means that ISPs are already obligated block them under the "blocklist law". We are concerned that this may suggest that the previous censorship model, which relies on ISP complaince, has been superseded by a more centralized approach, with TSPU being the technical stack of it.


**Locate TSPU devices:**

We remotely detect the location of TSPU devices from outside Russia by exploiting how TSPU handles fragmented IP packets. As described above, the way TSPU handles IP fragmentation is quite unique and can be used as a fingerprint. Furthermore, because TSPU devices overwrite TTLs, the precise location of the device can be identified on a network path. Please refer to the paper for more details on the methodology.

<img src="./assets/tspu-scan.png" alt="Visualization of remote measurement results on TSPU." title="Visualization of remote measurement results on TSPU." width="100%">
**Figure 10.** _Visualization of remote measurement results on TSPU._
{: .center }

Figure 10 shows the result of our large-scale scanning of TSPU devices on Russia’s Internet.  In total, out of 4,005,138 endpoints from 4,986 ASes that we checked, 1,013,600 (25.31%) endpoints from 650 ASes showed TSPU-like IP fragmentation behavior, suggesting that this new TSPU system has already achieved significant deployment within Russia. From the traces where a TSPU device can be located, we identified 6,871 unique TSPU devices. Our TTL-based technique suggests that in 70% cases, the device is located within two hops from the targeted IP. We highlight this is different from the deployment location of the GFW as noted in [previous work](https://web.eecs.umich.edu/~zmao/Papers/china-censorship-pam11.pdf), which measured the GFW in large IXPs, regional gateways, or close to the border.


**Circumvent TSPU**

There are several circumvention strategies that can bypass TSPU censorship, some of which are based on the observations we made about the TSPU device, such as how it inspects packets or how it manages states.

Client side:

* IP fragmentation, TCP segmentation, [TLS padding](https://datatracker.ietf.org/doc/html/rfc7685).
* [Encrypted Clienthello](https://blog.cloudflare.com/encrypted-client-hello/).
* Prepending Clienthellos with other TLS records.

Server Side:

* [Window size reduction](https://github.com/NullHypothesis/brdgrd).
* [TCP Split Handshake](https://nmap.org/misc/split-handshake.pdf).


**Discussion**

To summarize, our study characterized TSPU, a centrally-controlled censorship system in Russia with pervasive deployment. We are concerned that TSPU has changed the censorship model in Russia. Now, the federal government can unilaterally implement __uniform censorship across thousands of privately-owned ISPs__ in real time, without relying on ISPs compliance or their technical capabilities. Moreover, TSPU stands out from other censorship systems by being __at once in-path and close to network edges__. This makes TSPU more suitable for other attacks beyond censorship, such as targeted surveillance or interception.

While our study focused on Russia, we are concerned that this new model of __decentralized deployment, centralized control__, may become a blueprint for other countries. We note that for most countries where networks are commercialized, it is challenging to imitate a highly centralized information control scheme like the ones deployed in China or Iran, which require strict control over the country’s network infrastructure. However, as we have seen in Russia’s case, with law, policies, and government-supplied DPIs, the authorities are still able to unilaterally roll out censorship measures, regardless of the lack of direct ownership of ISPs. Considering that Russia has a history of exporting censorship technologies, we should monitor for their potential deployment in other regions.
