---
title: "Hyperquack"
permalink: /projects/hyperquack
excerpt: "Scalable Remote Measurement of Application-Layer Disruption"
research: "censorship-detection"
---

## Overview

Quack uses <a class="underline" href="https://tools.ietf.org/html/rfc862" target="_blank" rel="noopener">echo servers</a> to detect DPI blocking of traffic based on request headers. The advantage of using echo servers is that identifying responses that have been interfered with is trivial and arbitrary TCP based protocols (in addition to HTTP) can be tested. By making use of echo's sibling <a class="underline" href="https://tools.ietf.org/html/rfc863" target="_blank" rel="noopener">discard protocol</a>, we are able to determine the directionality of interference.

Hyperquack is a powerful extension to Quack that measures keyword blocking at the application layer using infrastructural web servers as vantage points. Hyperquack detects DPI interference with HTTP and HTTPS traffic by making use of publicly accessible web-servers with consistent behavior. We send requests with the HTTP "Host" header or TLS SNI extension set to a domain we are interested in. If there is a DPI blocking the domain on the path between our measurement machine and the public web-server, we will receive a TCP reset or block page that does not match the web-server's typically response. By making retries and control measurements, we are able to distinguish between mismatches caused by normal network/server flakiness versus DPI interference.

To ensure the safety of our technique, we limit ourselves to ~30,000 infrastructural web-servers. These servers are owned by ISPs or governments rather than an individuals. Even with stringent standards for web-server selection, we still maintain broad coverage with ~103 countries having ≥15 vantage points.
  

## Contact

Quack for Censored Planet is developed and maintained by <a class="underline" href="https://ramakrishnansr.com/" target="_blank" rel="noopener">Ram Sundara Raman</a>  and <a class="underline" href="https://ensa.fi/" target="_blank" rel="noopener">Roya Ensafi</a>.
  
