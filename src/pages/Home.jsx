import React, { useState, useEffect } from 'react';
import PublicationItem from '../components/PublicationItem';
import { Link } from 'react-router-dom';
import { parsePublications } from '../utils/parsePublications';
import ResearchArea from '../components/ResearchArea';
import ToolCard from '../components/ToolCard';
import homeData from "../data/home.json";
import toolData from "../data/tools.json";
import FlagshipCard from '../components/FlagshipCard';

import GlobeIcon from '../../public/icons/research/GlobeIcon.svg';
import ShieldIcon from '../../public/icons/research/ShieldIcon.svg';
import NetworkIcon from '../../public/icons/research/NetworkIcon.svg';
import DatabaseIcon from '../../public/icons/research/DatabaseIcon.svg';
import FingerprintIcon from '../../public/icons/research/FingerprintIcon.svg';
import LockIcon from '../../public/icons/research/LockIcon.svg';



import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import newsData from "../data/press_mentions.json";
import HeroBg from '../../public/background/hero-bg.svg';
import ResearchBg from '../../public/background/research-theme-bg.svg';
import ResearchBg1 from '../../public/background/research-theme-bg1.svg';
import HomeEnd from '../../public/background/home-end.svg';


export default function Home() {
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = HeroBg;
    img.onload = () => setIsSvgLoaded(true);
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const iconMap = {
    GlobeIcon,
    ShieldIcon,
    NetworkIcon,
    DatabaseIcon,
    FingerprintIcon,
    LockIcon
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? latestNews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === latestNews.length - 1 ? 0 : prevIndex + 1
    );
  };


  // Dynamically import all markdown files in publications
  // read markdown files that end with -homepage.md
  const markdownFiles = import.meta.glob('../publications/*-homepage.md', { query: '?raw', import: 'default', eager: true });
  const selected_publications = parsePublications(markdownFiles);


  // get latest news from newsData from the date field
  const latestNews = newsData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  const currentNews = latestNews[currentIndex];


  return (



    <main className=''>



      {/* HERO SECTION */}
      <section id="hero" className="relative z-0">
        <div className='relative overflow-hidden z-0'>

          {/* BACKGROUND IMGS */}
          <div>
            <img
               src={isSvgLoaded ? HeroBg : "background/hero-bg.png"}
              alt="Hero background"
              className="absolute right-[0px] min-h-[350px] max-h-[520px] h-full transform  z-[-1] object-cover md:opacity-100 opacity-60 "
            />
          </div>
          <div className="relative md:py-35 py-7 md:mt-0 mt-12 z-10">

            <div className="internal-container flex flex-col lg:gap-6 gap-3">
              <h1 className="md:text-[61px] text-[35px] font-bold font-merriweather leading-[120%] text-[#121212] ">
                Censored Planet
              </h1>
              <p className="md:text-[16px]  md:w-[590px] text-[16px] font-inter font-normal leading-[150%] text-[#121212] ">
                {homeData.mission.description}
              </p>
              <div className="flex flex-col space-y-4 w-full text-center md:flex-row md:space-x-4 md:space-y-0 md:w-auto">
                <Link
                  to="/publications"
                  className="primary-button"
                >
                  Publications
                </Link>
                <Link
                  to="/about"
                  className="secondary-button"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* NEWS BAR */}
      <section id="" className="z-0">

        <div className="-mt-[2px] bg-[#E4F7F6] border-t border-b border-[#888] text-black relative z-20">
          <div
            className="internal-container flex flex-col md:flex-row md:items-center justify-between py-2">
            <Link to='/news' className="text-[#17827b] text-[16px] font-medium whitespace-nowrap md:pr-4 hover:underline">
              Latest News
            </Link>

            <div className="px-10 cursor-pointer hidden md:block" onClick={handlePrevious}>
              <ChevronLeft className="text-xs text-[#5E5E5E]" />
            </div>

            <div className="flex-1 md:mx-4 md:overflow-hidden">
              <div className="md:truncate md:text-[16px] text-[14px] text-black md:text-center font-inter">
                <span className="hidden md:inline"><span className='font-semibold'>{currentNews.date}</span>–</span> {" "}
                <Link
                  to={currentNews.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline "
                >
                  {currentNews.title}
                </Link>
                , <em>{currentNews.source}</em>
              </div>
            </div>
            <div className="cursor-pointer hidden md:block" onClick={handleNext}>
              <ChevronRight className="text-[#5E5E5E]" />
            </div>
          </div>
        </div>
      </section>


      {/* WHAT WE DO */}
      <section id="what-we-do" className="md:py-25 py-5">
        <div className="internal-container grid grid-cols-1 md:grid-cols-2 md:gap-y-12 gap-y-8">
          <div className='max-w-[540px] xl:pr-0 md:pr-16'>
            <h2 className="new-section-heading">
              What We Do
            </h2>
            <div className="mt-4  font-inter lg:text-[16px] text-[#121212] leading-[150%] space-y-6">
              <p>
                Our research lies at the intersection of <strong>Networking</strong>, <strong>Security & Privacy</strong>, and <strong>Internet Measurements</strong>. We take a data-driven approach to detect and defend against powerful network intermediaries and government threat actors.
              </p>
              <p>We have won numerous awards including the <strong>Internet Defense Prize</strong>, <strong>IRTF Applied Networking Research Prizes</strong>, and <strong>Distinguished</strong> and <strong>Practical Paper awards</strong>.
                Additionaly, our collaboration with <span className='underline  text-[#28A199]'>
                  <Link to="https://www.consumerreports.org/" target="_blank" rel="noopener noreferrer" >
                    Consumer Reports
                  </Link></span> has been cited by members of Congress in urging the <em>Federal Trade Commission (FTC)</em> to regulate the VPN ecosystem.
              </p>
              <p>
                Censored Planet has a track-record of perseverance, pragmatism, and broad collaboration—attributes that have helped us achieve positive impacts within the complex landscape of Internet Freedom research.

              </p>


            </div>
          </div>

          {/* Metrics Grid */}
          <div className="max-w-[630px] grid grid-cols-2 gap-x-8 md:gap-y-12 gap-y-8">{

            homeData.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <h3 className="font-ibm text-[16px] text-[#121212]">
                  {metric.title}
                </h3>
                <div className="flex items-baseline">
                  <span className="md:text-[49px] text-[30px] font-merriweather leading-[120%]">{metric.number}</span>
                  {metric.unit && <span className="md:text-[23px] text-[18px] font-merriweather ml-1 leading-[120%]">{metric.unit}</span>}
                </div>
                <p className="font-inter text-[16px] leading-[150%]">
                  {metric.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      <section id="research-themes" className="relative">

        <div className='relative overflow-hidden z-0'>

          {/* BACKGROUND IMGS */}
          <div>
            <img
              src={ResearchBg}
              alt="Hero background"
              className=" absolute right-[0px] h-[1095px] -top-[2px] transform  z-[-1]"
            />

            <img
              src={ResearchBg1}
              alt="Hero background"
              className="shrink-0 absolute -bottom-[340px] left-[0px] h-[1095px]  z-[-1]"
            />
          </div>


          <div className='md:py-15 py-5 relative z-10' style={{
            background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(253, 253, 253, 0.00) 51.92%, var(--Background, #FDFDFD) 100%)',
          }}>
            <div className='internal-container'>
              {/* Research Themes Subsection */}
              <h2 className="new-section-heading">
                What We're Investigating
              </h2>
              <p className="mt-2 text-[16px] max-w-[34rem] font-inter leading-[150%] text-[#121212]">
                The internet is changing fast. We're investigating censorship systems to shed light on how they operate and who they affect
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* map each research area to researcharea component */}
                {homeData.research.map((area, idx) => (
                  <ResearchArea
                    key={idx}
                    url={`research/${area.url}`}
                    icon={iconMap[area.icon]}
                    label={area.label}
                    name={area.name}
                    description={area.description}

                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      <section id="open-source ">
        <div className="internal-container  md:py-15 py-5  ">
          {/* Research Themes Subsection */}
          <h2 className="new-section-heading">
            Tools We've Built
          </h2>
          <p className="mt-2 text-[16px] max-w-[530px] font-inter leading-[150%] text-[#121212]">
            We build and share the tools we use to investigate internet censorship so others can replicate, extend, and build on our work.
          </p>
          <div
            className={`mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
          >
            {/* map each research area to researcharea component */}
            {homeData.flagship.map((flagship, idx) => (
              <FlagshipCard
                key={idx}
                url={flagship.url}
                icon={flagship.icon}
                label={flagship.label}
                name={flagship.name}
                description={flagship.description}
              />
            ))}

            {toolData.slice(0, 4).map((tool, idx) => (
              <ToolCard
                key={idx}
                url={`https://github.com/CensoredPlanet/${tool.repo}`}
                name={tool.name}
                description={tool.description}
              />
            ))}
          </div>

          <div className='mt-6 text-right'>
            <Link
              to="/tools"
              className="border border-black text-black text-[16px] font-medium  font-[Inter] py-2 px-6"
            >
              See All Tools
            </Link>
          </div>

        </div>
      </section>

      <section id="selected-publications">
        <div className='internal-container md:py-15 py-5 ' >
          <h2 className="new-section-heading">
            Our Distinguished Publications
          </h2>
          <div className="mt-6 ">
            <table className="w-full">
              <tbody>
                {Object.entries(selected_publications)
                  .sort((a, b) => b[0] - a[0])
                  .map(([year, pubs]) =>
                    pubs.map((pub, idx) => (
                      <tr key={`${year}-${idx}`} className="border-b border-[#888]">
                        <td className="hidden md:table-cell text-center md:w-[90px] md:border-r border-[#888] align-top pt-2">
                          {pub.year}
                        </td>
                        <td>
                          <PublicationItem key={idx} pub={pub} />
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>


            <div className='mt-6 text-right'>
              <Link
                to="/publications"
                className="border border-black text-black text-[16px] font-medium  font-[Inter] py-2 px-6"
              >
                See All Publications
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="join-us" className="relative">

        <div
          className='relative overflow-hidden z-0'

        >

          {/* BACKGROUND IMGS */}
          <div>
            <img
              src={HomeEnd}
              alt="Home end background"
              className=" absolute right-[0px] -top-[2px] transform  z-[-1]"
            />

          </div>

          <div className='md:pt-15 pt-5 pb-10 lg:pb-40 ' style={{
            background: 'linear-gradient(180deg, var(--Background, #FDFDFD) 0%, rgba(253, 253, 253, 0.00) 57.28%)',
          }}>
            <div className='internal-container '>
              <h2 className="new-section-heading">
                Join Our Team
              </h2>
              <p className="mt-2 text-[16px] max-w-[530px] font-inter leading-[150%] text-[#121212]">
                We’re always looking for curious, motivated people to work with us.
                Whether you’re a student, researcher, developer, or just interested in the space, we’d love to hear from you.
              </p>
              <div className='mt-4 text-left'>
                <Link
                  to="/join"
                  className="primary-button"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>





    </main>

  );
}