---
layout: report
date: "10 November 2020"
title: "Censored Planet: An Internet-wide, Longitudinal Censorship Observatory"
permalink: /censoredplanet
excerpt: "Exploring 20 months of censorship measurement data collected from 221 countries shows evidence of increasing censorship in many countries."
authors:
  - Ram Sundara Raman
  - Roya Ensafi
affiliations: University of Michigan
border: yes
research: "Censored Planet: An Internet-wide, Longitudinal Censorship Observatory"
link: "/assets/censoredplanet.pdf"
writers: "R. Sundara Raman, P. Shenoy, K. Kohls, and R. Ensafi"
appearing: "ACM SIGSAC Conference on Computer and Communications Security (CCS) 2020"
video: "https://www.youtube-nocookie.com/embed/8dwZdNkJ508"
---


This post highlights findings from our recent [ACM CCS 2020](https://www.sigsac.org/ccs/CCS2020/index.html) paper [“Censored Planet: An Internet-wide, Longitudinal Censorship Observatory”](https://dl.acm.org/doi/10.1145/3372297.3417883), where we analyze 20 months worth of remote censorship measurement data collected in 220 countries. **Censored Planet finds evidence of increasing censorship in over 100 countries**, and we hope that the [continued publication of Censored Planet data](https://censoredplanet.org/data/raw) will enable researchers to continuously monitor the deployment of network interference technologies, track policy changes in censoring nations, and better understand the targets of interference. 


### High-level takeaways 



*   _Censored Planet continuously and remotely tests reachability to more than 2,000 websites each week from over 95,000 vantage points around the world on 6 Internet protocols. Censored Planet has collected more than 21.8 billion data points in over 20 months of operation, covering networks in 221 countries (42%-360% increase compared to [state of](https://ooni.org/) [the art](https://iclab.org/))._
*   _Using time series analysis techniques, Censored Planet reports 15 key censorship events over 20 months, 10 of which were previously not reported, including in reportedly ''free’’ countries. Alarmingly, in many of these events, news websites, and social media domains are increasingly blocked._
*   _Censored Planet detects increasing trends of DNS censorship in more than 100 countries. We also find that censorship of encrypted traffic is also increasing, showing that HTTPS alone is not sufficient to evade censorship._
*   _Qualitative reports such as the [Freedom on the Net](https://freedomhouse.org/report/freedom-net) which only cover a few countries can be significantly complemented through data-driven reports from Censored Planet._
*   _In addition to longitudinal measurements, the modular design of Censored Planet enables rapid focus measurements, where we can analyze certain censorship events in more detail. We explore a case study of rapid focus measurements in Turkmenistan, where we find aggressive IP blocking of Cloudflare services._
*   _Censored Planet data is continuously made public at [www.censoredplanet.org/data/raw](http://www.censoredplanet.org/data/raw), and we hope that it can enhance Internet Freedom by helping to bring transparency to censorship practices and supporting research that seeks to protect the human rights of Internet users around the world._


### Background

Internet censorship, the phenomenon where access to certain websites are blocked, is a global, evolving issue, and therefore should be investigated as such. However, measuring Internet censorship globally and continuously is an extremely challenging problem -- Censorship policies are intentionally opaque, diverse in their timings, methods, and targets, and may vary across space and time. Established efforts to measure Internet censorship rely on [volunteers](https://ooni.org) or [access to machines](https://iclab.org) inside a country of interest, which lead to **limitations regarding scale, coverage, continuity, and safety**. 

A recent line of measurement techniques, called **remote measurements**, have paved the way to measure censorship more scalably and continuously without requiring volunteers or access to machines in specific countries. These techniques, namely [Augur](https://censoredplanet.org/projects/augur), [Satellite/Iris](https://censoredplanet.org/projects/satellite), [Quack](https://censoredplanet.org/projects/quack), and [Hyperquack](https://censoredplanet.org/projects/hyperquack), use side channels in Internet protocols to determine whether two hosts on the Internet can talk to each other, **without any control over either of these hosts**. We use these remote measurement techniques (which can measure Internet censorship on 6 common Internet protocols - TCP, DNS, Echo, Discard, HTTP, HTTPS) as the base for building the Censored Planet observatory.


### The Censored Planet Observatory

<img src="./assets/header.png" width="48%" style="float:left; margin-top: 10%" alt="Remote Measurements from the University of Michigan to vantage points across the world." />

<img src="./assets/cp-design.png" width="48%" style="margin-left:2%" alt="Censored Planet’s modular design" />

**Figure 1.** _(Left) Remote Measurements from the University of Michigan to vantage points across the world. (Right) Censored Planet’s modular design._

The Censored Planet observatory is a global and longitudinal censorship measurement platform that collects censorship data using multiple remote measurement techniques and analyzes the data to create a more complete view of global censorship. The Censored Planet Observatory operates from the [University of Michigan](https://umich.edu/), sending measurements to more than **95,000 vantage point machines** across the world on 6 Internet protocols (Figure 1 (left)). Each week, the observatory tests reachability to more than **2,000 websites**. Censored Planet adopts a modular design (Figure 1 (right)) that allows it to efficiently measure Internet censorship evolution using continuous repeated measurements, as well as dynamically measure certain censorship events in depth, an ability we call **Rapid Focus**. Censored Planet also includes methods to remove false positives from data, obtain a representative metric for censorship in each country, and time series analysis methods to detect anomalous censorship events and trends. **Censored Planet [releases all of the data collected publicly](https://censoredplanet.org/data/raw) so that the community can use the data to track Internet censorship.**

<img src="./assets/cp-vp-map.png" width="48%" style="float:left" alt="Censored Planet’s vantage points in March 2020" />

<img src="./assets/cp-long-vp.png" width="48%" style="margin-left:2%" alt="Censored Planet’s vantage points in March 2020" />

**Figure 2.** _(Left) Censored Planet’s vantage points in March 2020. (Right) Selection of vantage points over time (Error bar shows continuity of selection)._

In our [ACM CCS 2020 paper](https://dl.acm.org/doi/10.1145/3372297.3417883), we explore Censored Planet data collected over **20 months** (August 2018 - March 2020), during which the platform collected more than **21.8 billion data points**. Censored Planet increases the scale of [traditional censorship](https://ooni.org) [measurement platforms](https://iclab.org) by covering networks in 221 countries (Figure 3 (left)), a 42-360% increase. Censored Planet also offers additional coverage by collecting measurements from a median of 8, and a maximum of 9,000 Autonomous Systems per country, with a median increase of 4-7 Autonomous systems per country. By not relying on volunteers and machine access, Censored Planet can reliably collect repeated measurements from the same vantage points over time (Figure 3 (right)). 


### Findings


#### Censorship Events

<div class="tg-wrap">
  <table class="tg">
  <thead>
    <tr>
      <th class="tg-0lax">Country</th>
      <th class="tg-0lax">Period</th>
      <th class="tg-0lax">Method</th>
      <th class="tg-0lax">Category/Domain</th>
      <th class="tg-0lax">Event</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Egypt</td>
      <td>26 Sep 2019</td>
      <td>HTTP, HTTPS</td>
      <td>News Media, wikimedia.com, wikia.com</td>
      <td>Protests</td>
    </tr>
    <tr>
      <td>Iran</td>
      <td>Mar 2020</td>
      <td>HTTP, Echo</td>
      <td>Social Networking</td>
      <td>Policy</td>
    </tr>
    <tr>
      <td>Sri Lanka</td>
      <td>21 Apr -12 May 2019</td>
      <td>HTTP, HTTPS</td>
      <td>Social Networking</td>
      <td>Terrorism</td>
    </tr>
    <tr>
      <td>Venezuela</td>
      <td>12 - 29 Jan 2019</td>
      <td>HTTP, HTTPS</td>
      <td>Social Networking, wikipedia.org</td>
      <td>Unrest</td>
    </tr> 
    <tr>
      <td>Zimbabwe</td>
      <td>20 Jan 2019</td>
      <td>HTTP, HTTPS</td>
      <td>Social Networking</td>
      <td>Protests</td>
    </tr>
    <tr style="border-top: thick solid">
      <td>Ecuador</td>
      <td>8 Oct 2019</td>
      <td>DNS</td>
      <td>Social Networking</td>
      <td>Protests</td>
    </tr>
    <tr>
      <td>India</td>
      <td>6 Sep 2018</td>
      <td>DNS</td>
      <td>Online Dating</td>
      <td>Law</td>
    </tr>
    <tr>
      <td>Israel</td>
      <td>May - June 2019</td>
      <td>DNS</td>
      <td>Foreign Relations and Military</td>
      <td>Conflict</td>
    </tr>
    <tr>
      <td>Japan</td>
      <td>28 Jun 2019</td>
      <td>DNS, Echo</td>
      <td>News Media</td>
      <td>Summit</td>
    </tr>
    <tr>
      <td>Poland</td>
      <td>22 Jul 2019</td>
      <td>DNS, HTTP, HTTPS</td>
      <td>Government, News Media, Human Rights</td>
      <td>Unrest</td>
    </tr>
    <tr>
      <td>Sudan</td>
      <td>11 Apr 2019</td>
      <td>HTTP, HTTPS</td>
      <td>Social Networking</td>
      <td>Unrest</td>
    </tr>
    <tr>
      <td>Cameroon</td>
      <td>25 Nov 2018</td>
      <td>HTTP</td>
      <td>Gambling</td>
      <td>Unknown</td>
    </tr>
    <tr>
      <td>India</td>
      <td>Feb - Mar 2020</td>
      <td>Echo, HTTPS</td>
      <td>Illegal</td>
      <td>Unknown</td>
    </tr>
    <tr>
      <td>Italy</td>
      <td>22 Dec 2019</td>
      <td>Discard</td>
      <td>Human Rights</td>
      <td>Unknown</td>
    </tr>
    <tr>
      <td>Norway</td>
      <td>Dec 2019 - Mar 2020</td>
      <td>DNS</td>
      <td>Multiple</td>
      <td>Unknown</td>
    </tr>
  </tbody>
  </table>
</div>

**Table 1.** _(Left) Key censorship events discovered by Censored Planet. The last 10 events were previously unreported._

Censored Planet detected **15 key censorship events** around the world using its anomaly detection method, augmented by manual confirmation (Table 1). Ten of these events were previously unreported. These events lasted for different time periods, and were caused by different censorship methods, showing the need for diverse and continuous measurements. Social Media and News domains were targeted in most events, while Human Rights domains were also affected. While Censored Planet detects increases in censorship around the period of important political and social events, note that it cannot identify any direct connection to these events. It's also important to note that it's not always government-mandated network censorship that leads to websites being unreachable, Censored Planet also detects increases in censorship over smaller networks.  


#### Censorship Trends

We were able to find increasing levels of DNS censorship in more than 100 countries, the highest being China and Turkmenistan. Our findings show that censorship of encrypted traffic is increasing due to advanced deep packet inspection technology, which is a cause for concern. Our trend analysis also found 11 categories of domains being increasingly blocked, including News Media, Provocative Attire, Human Rights, and Gaming domains.


#### Complementing qualitative reports

We compared Censored Planet findings to an annual qualitative report on Internet Freedom released by the [Freedom House organization](https://freedomhouse.org/) called[ Freedom on the Net](https://freedomhouse.org/report/freedom-net). This report has been instrumental in the Internet Freedom field and has been used by many studies to select countries for measurements. Through our comparison, we found significant censorship in countries labeled as Free by the Freedom House report. Moreover, the Freedom on the Net 2019 report covered only 65 countries, and we observed increasing censorship trends in countries not considered by Freedom House. Our findings show that quantitative results from Censored Planet can significantly complement qualitative reports like Freedom on the Net. 


#### Rapid Focus - Turkmenistan

Getting an indication from [Google Jigsaw](https://jigsaw.google.com/) that several DNS-over-HTTPS (DoH) were being aggressively IP blocked in Turkmenistan, we performed rapid focus Augur (TCP/IP) measurements to 34 vantage points in Turkmenistan, testing reachability to DoH services and Cloudflare IPs. Our findings confirmed that 52.9% of vantage points in Turkmenistan blocked all Cloudflare IPs, restricting access to thousands of services. Other DoH services (e.g. Snopyta) were also blocked. 


### Conclusion

Our results demonstrate Censored Planet’s ability to create a more complete picture of global censorship that is complementary to existing platforms and qualitative reports. We will continue to publish Censored Planet data which will enable researchers to continuously monitor the deployment of network interference technologies, track policy changes in censoring nations, and better understand the targets of interference. Ultimately, we hope that making opaque censorship practices more transparent at a global scale counters the proliferation of these growing restrictions to online freedom.

