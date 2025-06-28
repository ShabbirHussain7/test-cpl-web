---
title: "Satellite/Iris"
permalink: /projects/satellite
excerpt: "Global Detection Of DNS-Layer Disruption"
research: "censorship-detection"
---

## Overview

Satellite is a tool to detect DNS interference remotely, scalably, ethically, and globally. We begin by identifying open DNS resolvers in the IPv4 space and filtering it to rigorous ethical standards, utilizing only about 10,000 of 10,000,000 resolvers (0.1%) spanning 170 countries. We use the latest Alexa top 1K and Citizen Lab global test list as our input domains, and query every resolver with every domain. Using multiple heuristics to avoid false positives, such as AS number, AS name, and HTTP static content hash we compare with answers from designated control resolvers to determine the occurrence of interference. Furthermore, to confirm censorship, we visit the pages hosted on answer IPs to check for presence of a blockpage.

## Contact

Satellite for Censored Planet is developed and maintained by <a class="underline" href="https://ramakrishnansr.com" target="_blank" rel="noopener">Ram Sundara Raman</a>, <a class="underline" href="https://github.com/eltsai" target="_blank" rel="noopener">Elisa Tsai</a>, <a class="underline" href="https://www.linkedin.com/in/apurva-virkud" target="_blank" rel="noopener">Apurva Virkud</a>,and <a class="underline" href="https://ensa.fi/" target="_blank" rel="noopener">Roya Ensafi</a>.
