---
layout: report
date: "11 February 2020"
title: "FilterMap: Internet-Wide Detection of Filter Deployment"
permalink: /filtermap
excerpt: "Investigation into the global proliferation of content filtering technologies used for censorship using FilterMap, a novel framework that can scalably monitor content filtering technologies worldwide"
authors:
  - Ram Sundara Raman
  - Roya Ensafi
affiliations: University of Michigan
border: yes
research: "Measuring the Deployment of Network Censorship Filters at Global Scale"
link: "/assets/filtermap.pdf"
writers: "R. Sundara Raman,  A. Stoll,  J. Dalek, R. Ramesh, W. Scott, and R. Ensafi"
appearing: "Network and Distributed System Security Symposium (NDSS), 2020"
video: "https://www.youtube-nocookie.com/embed/R8VlHOwakQk" 
---

In this post, we describe our investigation into the global proliferation of content filtering technologies used for censorship using **FilterMap, a novel framework that can scalably monitor content filtering technologies worldwide**. In our study, FilterMap compiled data from Censored Planet (Quack and Hyperquack) and OONI data to gather blockpages from filter deployments. It then clusters the observed blockpages generating signatures for longitudinal tracking. 

In the study, FilterMap was able to identify **censorship filter deployments associated with 90 vendors and actors and observe filtering in 103 countries**. We detected the use of commercial filtering technologies for censorship in 36 out of 48 countries labeled as ‘Not Free' or ‘Partly Free' by the Freedom House [''Freedom on the Net'' report](https://freedomhouse.org/report/freedom-net/freedom-net-2018). The unrestricted transfer of content filtering technologies have led to high availability, low cost, and highly effective filtering techniques becoming easier to deploy and harder to circumvent. 

The data collected using Hyperquack and Quack is available at [https://censoredplanet.org/observatory/raw](https://censoredplanet.org/observatory/raw) and OONI data is publicly available at [https://ooni.org/data/](https://ooni.org/data/) 

## High Level Takeaways:
*   “Dual-use” technologies, such as DPI-based network management and filtering, are on the rise. Our novel framework, FilterMap, scalably and longitudinally detects censorship filter deployments by collecting and clustering blockpages from measurement data. 
*   By collecting and analyzing more than 379 million remote measurements from 45,000 remote vantage points against more than 18,000 sensitive test domains, and adding direct censorship measurement data from OONI, we are able to identify censorship filter deployments associated with 90 vendors and actors and observe filtering in 103 countries.
*   Among these 90 filters are products from well-known commercial manufacturers including Palo Alto Networks, Cisco, and Fortinet whose blockpages contain an explicit indication of the vendor. FilterMap also detected Government, ISP and organizational blockpages corresponding to filter deployments. 
*   Pornography and Gambling websites are most commonly blocked by these filters, followed by websites  featuring provocative attire and anonymization tools.
*   Of the 90 filters identified by FilterMap, 70 were detected in a large scale measurement conducted in October 2018, and 20 additional filters were detected in 3 months of longitudinal measurements, showing FilterMap’s capability to continuously detect censorship filters. 
*   Blockpage clusters generated by FilterMap are labeled using signatures (HTML patterns) that can uniquely identify the cluster. These signatures can be used to find filter responses in public datasets. We were able to identify responses matching 14 filters from public IP addresses in 154 countries in [Censys](https://censys.io/) data. 

Visit [https://censorerdplanet.org/filtermap/results](https://censoredplanet.org/filtermap/results) to see in detail the filters identified by FilterMap, their unique signatures, some example blockpages for each filter, and the countries they were identified in. 


## Background 
''Dual-use'' technologies, such as DPI-based network management and filtering, are on the rise. Filters are increasingly being used by network operators to control their users' communication, most notably for censorship and surveillance. These products enable advanced filtering, particularly on application-layer data. 

Monitoring the use of filtering technologies for censorship can drive change in the regulation and behavior of companies selling filtering products. For instance, [Citizen Lab](https://citizenlab.ca/) conducted investigations of a Canadian content filtering vendor Netsweeper showing how their products were employed in censorship systems around the world. The investigation, which was the result of several years of manual effort,[ led to changes in Netsweeper’s filtering behavior](https://motherboard.vice.com/en_us/article/3kgznn/netsweeper-says-its-stopped-alternative-lifestyles-censorship). 

Measuring the deployment of filters has been a cumbersome process as it involves manually identifying a unique _signature_ for a small set of filter products, often while having physical access to a sample product and the assistance of on-the-ground collaborators, and then performing network scans using the signatures to detect deployments. Moreover, monitoring their deployment continuously requires sustainable systems. As a result, [the censorship measurement community has only identified a handful of filters over the years](http://conferences.sigcomm.org/imc/2013/papers/imc112s-dalekA.pdf). 

![Previous work involves cumbersome manual effort in collecting signatures](/assets/filtermap_previous_work.png "Previous work involves cumbersome manual effort in collecting signatures")

**Figure 1**: _Previous work involves cumbersome manual effort in collecting signatures_

The inability to monitor the proliferation of filters more broadly withholds researchers, regulators, and citizens from efficiently discovering and responding to the misuse of these ''dual-use technologies''.

## FilterMap: Internet-Wide Detection of Filter Deployment
![The FilterMap pipeline](/assets/filtermap_pipeline.png "The FilterMap pipeline")

**Figure 2**: _The FilterMap pipeline_	

We introduce FilterMap, a framework for semi-automatically identifying filters that are configured to censor with user-observable blockpages, and we apply the technique to measure censorship filter deployments around the globe. FilterMap consists of two main phases: 



1. **Data collection** - Blockpages are retrieved using network interference measurement techniques. 
2. **Data analysis** - The collected data is processed to generate clusters of blockpages, each labeled by a unique signature, which identify filter deployments in different countries.

Our data collection consists of a new remote measurement method, **[Hyperquack](https://censoredplanet.org/projects/hyperquack)**, the application-layer censorship measurement technique **[Quack](https://censoredplanet.org/projects/quack)**, and **[OONI's public censorship dataset](https://ooni.org)**. Hyperquack and Quack run tests from our measurement location in North America to thousands of vantage points (i.e. HTTP, HTTPS, and Echo servers) in more than 190 countries. We complement the resulting dataset by downloading OONI's web connectivity test data collected by OONI volunteers.

In our data analysis section, we identify blockpages using two techniques, **Iterative Classification and Image Clustering**, on HTML content extracted from disrupted measurements in our collected data. These techniques help with generating large groups of pages that have either content similarity or visual similarity. Since filters often return the same blockpage for all undesirable content, the injected responses group in large clusters.

The clusters generated using both techniques are labeled by a HTML signature that uniquely identifies the blockpages in that cluster. FilterMap’s data collection and analysis techniques significantly reduces the manual effort in collecting and processing blockpages. We analyzed more than 379 million measurements in this study. 


In our study, we conducted two kinds of measurements:


1. A **latitudinal measurement** where we tested 18,736 domains from more than 45,000 Quack and Hyperquack vantage points, and added OONI’s public web connectivity test data collected in October 2018.
2. A **longitudinal measurement** where we tested around 2,100 domains twice a week using Quack and Hyperquack scans for 3 months from November 2018 - January 2019. 

### Ethical Considerations

Aiming to set a high ethical standard, we discussed the study's design with internal and external colleagues in our community and follow the best practices outlined in [Quack](https://censoredplanet.org/projects/quack), [ZMap](https://zmap.io/) and the [Menlo reports](https://www.caida.org/publications/papers/2012/menlo_report_actual_formatted/). For our remote measurements, we only choose vantage points known to be _Organizational_ i.e. We do not use end-user machines for measurement. We make it easy for anyone investigating our measurement machine's IP addresses to determine that our exchanged traffic is part of a measurement research experiment. To minimize the burden on servers we spread our measurements over many servers within a country, make a single request at a time, add delays between requests, and use a round-robin schedule to maximize the time between trials involving the same server. 


## Results
FilterMap finds widespread use of filters for censorship. FilterMap's data analysis phase generated **90 blockpage clusters **in which the blockpages identify either the commercialized vendor that manufactures the filter or the actor that deploys it (e.g. government, ISP, or organization). These filters are located in many locations in **103 countries** revealing the diverse and widespread use of content filtering technologies. We observed blockpages in **14 languages**. Most blockpages cite a **legal concern** for blocking access to content.

### Commercial Filters

FilterMap identified **15 commercial filters in 102 countries**. The availability and ease of deployment of commercial filters has galvanized the process of restriction of Internet freedom in many countries. 

![World Map of commercial filter deployments](/assets/filtermap_worldmap.png "World Map of commercial filter deployments")
    
**Figure 3**: _World Map of commercial filter deployments_

While a small portion of commercial filters are locally manufactured and deployed (e.g. VAS Experts in Russia), most suppliers are headquartered in the United States. The export of these products to countries with poor records in Internet freedom is a cause for concern. We find commercial filters in **36 out of 48 countries labelled as 'Not Free' or 'Partly Free'** by the Freedom House ''Freedom on the Net'' report. Pornography and Gambling websites are most commonly blocked across all products, followed by websites featuring provocative attire and anonymization tools. 


### Filters with Government, ISP and Organizational Blockpages
We identified primary Government blockpages in **Bahrain, Iran, Saudi Arabia and the Republic of Korea**. (Refer to Table 2 for the blockpages). FilterMap was able to detect **41 ISPs** restricting access to content in Russia, as well as other ISPs in a large number of countries in Asia.  ISP blockpages are predominantly in the local language. FilterMap was also able to detect some organizational blockpages.

## Conclusion
The unrestricted transfer of content filtering technologies have led to high availability, low cost, and highly effective filtering techniques becoming easier to deploy and harder to circumvent. Identifying filtering deployments highlights policy and corporate social responsibility issues, and adds accountability to filter manufacturers. Our continued publication of FilterMap data will help the international community track the scope, scale and evolution of content-based censorship.

Visit [https://censorerdplanet.org/filtermap/results](https://censoredplanet.org/filtermap/results) to see in detail the filters identified by FilterMap, their unique signatures, some example blockpages for each filter, and the countries they were identified in. 

