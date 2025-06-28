---
area: Exposing Emerging Censorship Threats
date: 2020-10-27
publisher: ACM Internet Measurement Conference (IMC)
name: "Investigating Large Scale HTTPS Interception in Kazakhstan"
awards:
  - Nominated for Best Paper
tags:
  - https
  - kazakhstan
  - interception
collaborators:
  - Ram Sundara Raman
  - Leonid Evdokimov
  - Eric Wustrow
  - J. Alex Halderman
  - Roya Ensafi
pdf: "papers/HTTPSKaz.pdf"
talk: "https://youtu.be/RoYWsfNOCr4"
slides: "slides/kazakhstan_long_slides.pdf"
press:
  - publisher: Google
    link: "https://security.googleblog.com/2019/08/protecting-chrome-users-in-kazakhstan.html"
  - publisher: Mozilla
    link: "https://blog.mozilla.org/blog/2019/08/21/mozilla-takes-action-to-protect-users-in-kazakhstan/"
  - publisher: BBC
    link: "https://www.bbc.com/news/technology-49421729"
  - publisher: CNet
    link: "https://www.cnet.com/news/google-apple-and-mozilla-to-block-internet-surveillance-in-kazakhstan/"
  - publisher: The Register
    link: "https://www.theregister.co.uk/2019/08/21/kazakstan_snooping_blockade/"
  - publisher: Forbes
    link: "https://www.forbes.com/sites/emmawoollacott/2019/08/21/apple-google-and-mozilla-block-kazakh-government-surveillance/"
  - publisher: Ars Technica
    link: "https://arstechnica.com/tech-policy/2019/08/chrome-firefox-and-safari-updated-to-block-kazakhstan-government-spying/"
  - publisher: EFF
    link: "https://www.eff.org/deeplinks/2019/08/browsers-take-stand-against-kazakhstans-invasive-internet-surveillance"
  - publisher: ZDNet
    link: "https://www.zdnet.com/article/kazakhstans-https-interception-efforts-target-facebook-google-twitter-others/"
  - publisher: Private Internet Access
    link: "https://www.privateinternetaccess.com/blog/2019/07/new-research-confirms-kazakhstan-is-spying-on-connections-to-facebook-twitter-vk-instagram-youtube-google-and-more/"
  - publisher: Voice of America
    link: "https://www.voanews.com/silicon-valley-technology/study-russias-web-censoring-tool-sets-pace-imitators"
bibtex: "@inproceedings{sundararaman2020investigating,
  title={Investigating Large Scale HTTPS Interception in Kazakhstan},
  author={R. Sundara Raman, L. Evdokimov, E. Wustrow, A. Halderman, and R. Ensafi},
  booktitle={In ACM Internet Measurement Conference (IMC)},
  year={2020}
  }"
abstract:
  "Increased adoption of HTTPS has created a largely encrypted web, but these security gains are on a collision course with governments that desire visibility into and control over user communications. Last year, the government of Kazakhstan conducted an unprecedented large-scale HTTPS interception attack by forcing users to trust a custom root certificate. We were able to detect the interception and monitor its scale and evolution using measurements from in-country vantage points and remote measurement techniques. We find that the attack targeted connections to 37 unique domains, with a focus on social media and communication services, suggesting a surveillance motive, and that it affected a large fraction of connections passing through the country's largest ISP, Kazakhtelecom. Our continuous real-time measurements indicated that the interception system was shut down after being intermittently active for 21 days. Subsequently, supported by our findings, two major browsers (Mozilla Firefox and Google Chrome) completely blocked the use of Kazakhstan's custom root. However, the incident sets a dangerous precedent, not only for Kazakhstan but for other countries that may seek to circumvent encryption online."
---
