import React, { useState, useEffect } from 'react';
import PublicationItem from '../components/PublicationItem';
import { Link } from 'react-router-dom';
import { parsePublications } from '../utils/parsePublications';
import ResearchArea from '../components/ResearchArea';
import ToolCard from '../components/ToolCard';
import homeData from "../data/home.json";
import toolData from "../data/tools.json";
// Import icons for research areas (

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


      <div>
        {/* HERO SECTION */}
        <section id="hero" className="hero relative overflow-hidden z-0">

          {/* BACKGROUND IMAGE */}
          <img
            src={isSvgLoaded ? HeroBg : "background/hero-bg.png"}
            alt="Hero background"
            className="relative ml-auto z-[-1]"
          />


          {/* Hero Text & Buttons */}
          <div className="absolute lg:top-[206px] top-[70px] lg:px-20 px-10 lg:w-[815px] sm:top-[30px] z-10">

            <div className="flex flex-col lg:gap-6 gap-3">
              <h1 className="lg:text-[61px] text-[20px] font-bold font-merriweather leading-[120%] text-[#121212] ">
                Censored Planet
              </h1>
              <p className="lg:text-[16px] text-[12px] lg:w-[590px] w-[250px] font-inter font-normal leading-[150%] text-[#121212] ">
                {homeData.mission.description}
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/publications"
                  className="primary-button"
                >
                  Publications
                </Link>
                <Link
                  to="/people"
                  className="secondary-button "
                >
                  About
                </Link>
              </div>
            </div>
          </div>




        </section>


        {/* NEWS BAR */}
        <div id="" className="z-0">

          <div className="-mt-[2px] w-full bg-[#E4F7F6] border-t border-b border-[#888] text-black relative z-20">
            <div
              className="flex items-center justify-between mx-auto px-20 py-2">
              <Link to='/news' className="text-[#17827b] text-[14px] font-medium whitespace-nowrap pr-4 hover:underline">
                Latest News
              </Link>

              <div className="px-10 cursor-pointer" onClick={handlePrevious}>
                <ChevronLeft className="text-xs text-[#5E5E5E]" />
              </div>

              <div className="flex-1 mx-4 overflow-hidden">
                <div className="truncate text-[14px] text-black text-center font-inter">
                  <span className="font-bold">{currentNews.date}</span> –{" "}
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
              <div className="cursor-pointer" onClick={handleNext}>
                <ChevronRight className="text-[#5E5E5E]" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* WHAT WE DO */}
      <section id="what-we-do" className="lg:px-20 lg:py-25">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12">
          <div className='w-[540px] '>
            <h2 className="new-section-heading">
              What We Do
            </h2>
            <div className="mt-4 font-inter lg:text-[16px] text-[#121212] leading-[150%] space-y-6">
              <p>
                Our research lies at the intersection of <strong>Networking</strong>, <strong>Security & Privacy</strong>, and <strong>Internet Measurements</strong>. We take a data-driven approach to detect and defend against powerful network intermediaries and government threat actors.
              </p>
              <p>We have won honors the <strong>Internet Defense Prize</strong> and multiple <strong>IRTF research awards</strong>.
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
          <div className="w-[630px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">{

            homeData.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <h3 className="font-ibm text-[16px] text-[#121212]">
                  {metric.title}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-[49px] font-merriweather leading-[120%]">{metric.number}</span>
                  {metric.unit && <span className="text-[23px] font-merriweather ml-1 leading-[120%]">{metric.unit}</span>}
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


          <div className='lg:px-20 lg:py-15 relative z-10' style={{
            background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(253, 253, 253, 0.00) 51.92%, var(--Background, #FDFDFD) 100%)',
          }}>
            {/* Research Themes Subsection */}
            <h2 className="new-section-heading">
              What We're Investigating
            </h2>
            <p className="mt-2 text-[16px] w-[530px] font-inter leading-[150%] text-[#121212]">
              The internet is changing fast. We're investigating censorship systems to shed light on how they operate and who they affect
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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

      </section>

      <section id="open-source ">
        <div className="lg:px-20 lg:py-15 ">
          {/* Research Themes Subsection */}
          <h2 className="new-section-heading">
            Tools We've Built
          </h2>
          <p className="mt-2 text-[16px] w-[530px] font-inter leading-[150%] text-[#121212]">
            We build and share the tools we use to investigate internet censorship so others can replicate, extend, and build on our work.
          </p>
          <div
            className={`mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
          >
            {/* map each research area to researcharea component */}
            {toolData.slice(0, 3).map((tool, idx) => (
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
        <div className='lg:px-20 lg:py-15' >
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
                        <td className="publication-year w-[92px] text-center border-r border-[#888] align-top pt-2">
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

          <div className='lg:px-20 lg:pt-15 lg:pb-40 ' style={{
            background: 'linear-gradient(180deg, var(--Background, #FDFDFD) 0%, rgba(253, 253, 253, 0.00) 57.28%)',
          }}>
            <h2 className="new-section-heading">
              Join Our Team
            </h2>
            <p className="mt-2 text-[16px] w-[530px] font-inter leading-[150%] text-[#121212]">
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
      </section>





    </main>

  );
}