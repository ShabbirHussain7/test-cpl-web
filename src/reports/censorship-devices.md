---
layout: report
date: "06 December 2022"
title: "Locating and Examining Censorship Devices"
permalink: /censorship-devices
excerpt: "We release novel network measurement methods for locating and examining censorship devices"
authors:
  - Ram Sundara Raman^1
  - Mona Wang^2
  - Jakub Dalek^3
  - Jonathan Mayer^2
  - Roya Ensafi^1
affiliations: 
  - (1) University of Michigan
  - (2) Princeton University
  - (3) The Citizen Lab
border: yes
research: "Network measurement methods for locating and examining censorship devices"
link: "/assets/censorship-devices.pdf"
writers: "R. Sundara Raman,  M. Wang,  J. Dalek, J. Mayer, and R. Ensafi"
appearing: "CoNEXT '22: Proceedings of the 18th International Conference on emerging Networking EXperiments and Technologies"
code:
 - (1) Censorship Traceroute Tool-- <a href="https://github.com/censoredplanet/CenTrace" target="_blank"><img src="https://badgen.net/badge/censoredplanet/CenTrace/black?icon=github"/></a>
 - (2) Censorship Fuzzing Tool-- <a href="https://github.com/censoredplanet/CenFuzz" target="_blank"><img src="https://badgen.net/badge/censoredplanet/CenFuzz/black?icon=github"/></a>
 - (3) Network Device Probing Tool-- <a href="https://github.com/censoredplanet/CenProbe" target="_blank"><img src="https://badgen.net/badge/censoredplanet/CenProbe/black?icon=github"/></a> 

---

_This post highlights findings discussed in our [CoNEXT 2022](https://conferences2.sigcomm.org/co-next/2022/#!/home) paper [Network measurement methods for locating and examining censorship devices](https://dl.acm.org/doi/10.1145/3555050.3569133)._

Recent years have witnessed a [number of large-scale censorship events](https://censoredplanet.org/reports), enabled by the parallel advances of authoritarianism in multiple countries and the continuing rise of technologies enabling Internet censorship. While a [long line of research](https://censoredplanet.org/publications) has [focused on the victims and impact of Internet censorship](https://ooni.org/reports/), longstanding gaps remain in how to track and measure the network devices that enable Internet censorship. However, this knowledge is crucial--combined with [advocacy for better standards and policies from network device vendors](https://www.vice.com/en/article/43bemg/canadian-company-netsweeper-blocking-lgbtq-content-abroad) and actors deploying censorship---to bring more transparency into censorship policies, prevent overblocking, and inform circumvention efforts.

In a collaboration between researchers at the [University of Michigan](https://censoredplanet.org), Princeton University, and [the Citizen Lab](https://citizenlab.ca), we build novel network measurement methods that democratize technical in-depth investigation of censorship devices deployed across the world.


## Contributions

[![CenTrace Traceroute Tool](https://badgen.net/badge/censoredplanet/CenTrace/black?icon=github)](https://github.com/censoredplanet/CenTrace)
[![CenFuzz Fuzzing Tool](https://badgen.net/badge/censoredplanet/CenFuzz/black?icon=github)](https://github.com/censoredplanet/CenFuzz)
[![CenProbe Probing Tool](https://badgen.net/badge/censoredplanet/CenProbe/black?icon=github)](https://github.com/censoredplanet/CenProbe)

1. We build a general-purpose, robust **[censorship traceroute mechanism (CenTrace)](https://github.com/censoredplanet/CenTrace)** that identifies the network location of devices performing censorship. 
2. We identify the manufacturers of censorship devices and study their features using **[active probing (CenProbe)](https://github.com/censoredplanet/CenProbe)**
3. We develop a **[censorship fuzzer (CenFuzz)](https://github.com/censoredplanet/CenFuzz)** to understand the rules and triggers of censorship devices 
4. We use features from CenTrace, CenFuzz, and CenProbe to cluster censorship devices and understand common deployment and implementation characteristics
5. We use the above measurements to study censorship devices in four countries-- _Azerbaijan, Belarus, Kazakhstan, and Russia_ --using both in-country as well as remote measurements. 


## High-level findings

1. We find that censorship devices are often deployed in an ISP close to the user, but in some cases we find _censorship devices deployed in ISPs that are upstream to many residential ISPs_. This has implications for censorship measurement platforms such as Censored Planet and OONI that report censorship based on the user’s ISP.
2. We find censorship devices deployed in _one country (Russia) blocking traffic destined to/from another country (Kazakhstan)_. Such extraterritorial imposition of censorship has implications for policymakers advocating for better censorship practices. 
3. We find and account for a large _number of censorship techniques_--such as packet drops and injection--and device deployment behaviors. Our findings can inform future measurement studies in capturing different types of blocking. 
4. We identify _19 network devices manufactured by commercial vendors_ such as Cisco and Fortinet, that are deployed in the four countries which we study, and block access to a variety of information. 
5. We learn that devices from different manufacturers or devices deployed in different countries have variance in the manner they parse network requests. We find that applying fuzzing practices such as providing an alternate HTTP path, TLS version, and TLS ciphersuite _evade detection by censorship devices_. 

Our results show that there is a significant need for continued monitoring of these devices, and improvements to network protocols that make them resilient to blocking. With the help of our open-source tools and datasets, we hope to advance mainstream censorship research with in-depth understanding of censorship and the technology that enables it. 


## Locating Censorship Devices

A key challenge for understanding internet censorship is to discover where the censorship activity occurs—that is, where along the network path between client and server, and where geographically. Prior work has been constrained by the location of the servers used for measurement, which we show in our work yields an inaccurate estimate, and on measurements that only track known characteristics of specific censorship devices.  

To address these historical limitations, we have developed a general-purpose method to determine device location that we call CenTrace. By monitoring the path between client and endpoint using probes with limited Time to Live (TTL) values, assessing the points of termination or dropped packets, observing the placement of devices in or outside the path from client to endpoint, and extracting related IP addresses, we can determine the network and approximate location of the censoring devices.


![An overview of CenTrace's operation](/assets/centrace-operation.png "An overview of CenTrace's operation")

**Figure 1:** _An overview of CenTrace’s operation: We begin by selecting a client device under our control, then select a remote endpoint and a Test Domain that is likely to be censored on the path from the client to the endpoint. We then send TTL-limited probes to establish the path between the client and the endpoint. The results indicate the responses observed to repeatedTTL-limited  probes sent first along the route to a Control Domain, then to the Test Domain._
{: .center }    

Our CenTrace tool accounts for network path variance and considers different types of devices such as ones that are deployed in-path vs on-path, ones that drop packets, and ones that copy TTL values from incoming packets (see _Figure 1_). Using CenTrace, we collect over 12,600 traceroute measurements in AZ, KZ, BY, and RU, among which 1,430 show clear signs of blocking. 

We identify that most blocking occurs close to the host inside the country (within 1--10 hops), but sometimes in an upstream ISP. In an area where attribution is difficult and censorship is often reported by the client ASN, our findings shed light on the importance of understanding where censorship occurs. CenTrace measurements performed in Azerbaijan and Kazakhstan showed that the packet drops were occurring in one of each country's larger ISPs. In Kazakhstan, it was the state-owned ISP, as shown in _Figure 2_. This finding regarding censorship in "upstream" networks suggests that existing measurement methods such as OONI—which only report results based on the client's own network—may not provide a complete picture of censorship policies in a region. 

![Censorship Traceroute measurements from inside Kazakhstan](/assets/centrace-kz-incountry.png "Censorship Traceroute measurements from inside Kazakhstan")

**Figure 2:** _Censorship Traceroute measurements from inside Kazakhstan. Red links indicate the location of censorship. AS 203087 is the location of the client inside Kazakhstan, and the servers are located outside Kazakhstan. AS 9198 is JSC Kazakhtelecom, the state-owned ISP, where censorship devices are deployed._ 
{: .center } 

Notably, in measurements from outside Kazakhstan, more than one third of the packet drops occurred along the route through networks in Russia (See _Figure 3_). This shows that remote censorship measurements of a certain country can be affected by policies in a different country on the path, which has significant implications for censorship measurement research. In Belarus, our measurements found that devices are deployed closer to the user, and they are deployed off the path injecting reset packets. We also observed specialized behavior of some devices in Russia that made them harder to detect. 

![Remote censorship traceorute measurements to Kazakhstan](/assets/centrace-kz-remote.png "Remote censorship traceorute measurements to Kazakhstan")

**Figure 3:** _Remote censorship traceroute measurements from the US to endpoints in Kazakhstan. Red links indicate the location of censorship. While most blocking happens within Kazakhstan, certain requests are blocked in Russia even before the request enters Kazakhstan._ 
{: .center } 


## Fuzzing Censorship Devices

In order to collect more information about devices’ behavior and identify their rules and triggers, we developed an HTTP and TLS request fuzzing tool called CenFuzz, which sends modified (or “fuzzed”) versions of regular HTTP and TLS requests and observes how the censorship changes. For example, instead of using the standard HTTP GET method, we attempt to use other methods such as PUT. See _Figure 4_ for an example of the parts of a HTTP request that can be modified. 


![HTTP Request](/assets/cenfuzz-http-request.png "HTTP Request")
{: .center } 

**Figure 4:** _Parts of a typical HTTP request that we fuzz”by modifying the elements in order to observe how censorship devices and policies respond._
{: .center } 

We implement 16 HTTP request and 8 TLS Client Hello fuzzing strategies that automatically attempt to evade detection by censorship devices. We perform 221,786 CenFuzz measurements in AZ, BY, KZ, and RU, and observe that certain strategies result in successful evasion. For example, using alternate HTTP Methods other than GET (such as PUT and PATCH) in 0.44%--90.58% of fuzzed requests evade censorship deployments. We identify several strategies that evade the censor but are parsed correctly by web servers, resulting in circumvention.


## Probing Censorship Devices

To date, censorship measurement has relied heavily on known attributes of specific types of censorship devices, using those "fingerprints" to track associated activity. Blockpages have also served as an important vector for measurement, since page content and packet headers injected by censors usually contain identifying information.

Though standard HTTP has always allowed censors to view the data moving between client and server—and inject content such as blockpages into the path—the increasing default to the HTTPS protocol and fully encrypted communication has required censors to broaden their methods. 

In the four studied countries, we found that the basic identifying information visible from devices performing censorship themselves—"banner" information, such as device name or software version—can help attribute censorship activity, and can be especially valuable when blockpages are not in use. 

By probing the potential IP devices found using our CenTrace measurements, we obtained indication of any filtering software running on these devices by running probes on the HTTP(S), SSH, Telnet, FTP, SMTP, and SNMP protocols (wherever open ports made those respective services available). Such protocol information has already been used in efforts to "fingerprint" network devices. 

Combining these results, further manual investigation, and data from public fingerprint repositories, we were able to label many devices with filtering technology used (among those that responded to our banner grabs). Of the devices accessible to banner grabs, nearly 40% showed a clear indication of firewall software used for censorship. Many commercial firewall devices were detected, including from popular network device vendors such as Cisco and Fortinet. Our paper notes certain limitations to the measurements we used, including a bias toward devices with open ports that reveal banner information, and the use of manual analysis to identify potential IP addresses. 


## Profiling Censorship Devices

Using the results of our traceroutes, probes, and fuzzing measurements, we compiled the different censorship strategies that were observed from different devices and clustered them to observe their proximity to each other. 

![Clustering of censorship devices](/assets/clustering-devices.png "Clustering of censorship devices")
{: .center } 

**Figure 5:** _Clustering of censorship devices. We see high positive correlation in behavior of censorship devices deployed in the same ISP. We also see positive correlations among devices manufactured by the same vendor (e.g. Cluster 3 and Cluster 6)_
{: .center } 

Our data analysis determined that similar censorship deployments can be identified by a set of attributes—a censorship "fingerprint". Devices known to have the same manufacturer observed strong positive correlations with similar censorship strategies. 

In addition to correlations between censorship behaviors and manufacturers, we also observed clusters of similar strategies that correlated with geographical location or Autonomous System (AS), i.e., network location (See Figure ).  Taken together, the results show that devices manufactured by the same vendor or those deployed by the same actor exhibit highly similar censorship properties. These properties can be used to help fingerprint devices and identify other censorship activity.


## Conclusion

Deeper knowledge about internet censorship activity—particularly these under-investigated elements—will enable more effective action, foster a more knowledgeable, better-equipped research community, and engage regulators, legislators, funders, advocates, media, and even technologists and technology companies themselves. We hope that our initial work in the four countries studied can galvanize the growing community of practice in the measurement of internet censorship devices across a range of implementations and country contexts. 

We have already begun to integrate our tools into censorship measurement platforms such as [Censored Planet](https://censoredplanet.org), to help advance mainstream censorship research through more in-depth understanding of underlying censorship technologies. Over time, these expanded approaches to censorship measurement can inform the development of new standards, not only in measurement, but in device manufacturing and deployment, and in the creation of policies and rules.