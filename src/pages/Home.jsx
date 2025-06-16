import React, { useState } from 'react';
import PublicationItem from '../components/PublicationItem';
import { Link } from 'react-router-dom';
import { parsePublications } from '../utils/parsePublications';
import ResearchArea from '../components/ResearchArea';
import VideoCard from '../components/VideoCard';
import ToolCard from '../components/ToolCard';
import homeData from "../data/home.json";
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import newsData from "../data/press_mentions.json";
import HeroBg from '../../public/background/hero-bg.svg';


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <section id="hero" className='h-[689px]' >

        {/* BACKGROUND IMAGE */}
        <div className='justify-end flex'>
          <img
            src={HeroBg}
            alt="Hero background"
            className="w-[70%]"
          
          />

        </div>

        {/* Hero Text & Buttons */}
        <div className="absolute lg:top-[206px] top-[70px] lg:px-20 px-10 lg:w-[815px] sm:top-[30px]">
       
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
                className="bg-black text-white text-[16px] font-medium  font-[Inter] h-[40px] px-6 flex items-center justify-center"
              >
                Publications
              </Link>
              <Link
                to="/people"
                className="border border-black text-black text-[16px] font-medium  font-[Inter] h-[40px] px-6 flex items-center justify-center"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        {/* NEWS BAR */}
        <div className="w-full bg-[#F2FAFB]">
          <div
            className="flex items-center justify-between mx-auto px-20 py-2">
            <Link to='/news' className="text-[#28A199] text-[14px] font-medium whitespace-nowrap pr-4 hover:underline">
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
                  className="text-[#28A199] hover:underline "
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


      </section>

      <div id="" >

        {/* Insert just above <section id="us-and-updates"> */}

        {/* About Us and Latest at the Lab side-by-side section */}
        <section id="what-we-do" className="lg:px-20 lg:py-25">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12">
            {/* About Us */}
            <div className='w-[522px] '>
              <h2 className="lg:text-[49px] text-[#121212] leading-[120%] font-merriweather">
                What We Do
              </h2>
              <div className="mt-4 font-inter lg:text-[16px] text-[#121212] leading-[150%] space-y-4">
                <p>
                  Our research lies at the intersection of networking, security and privacy, and Internet measurement. We take a data-driven approach to detecting and defending against powerful network intermediaries, government threat actors, and technologies and practices that impact users’ freedom of expression online.
                </p>
                <p>
                  We design safe, scalable methods that don’t rely on in-country infrastructure, so our work can support journalists, researchers, and advocates working to hold those in power accountable.
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
                    { metric.unit && <span className="text-[23px] font-merriweather ml-1 leading-[120%]">{metric.unit}</span>}
                  </div>
                  <p className="font-inter text-[16px] leading-[150%]">
                    {metric.description}
                  </p>
                </div>
              ))}
    
            </div>
          </div>
        </section>


        <section id="research-themes" className="">
          <div className='page-container pt-6 pb-10'>
            {/* Research Themes Subsection */}

            <h2 className="heading-primary">Research Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 ">
              {/* map each research area to researcharea component */}
              {homeData.research.map((area, idx) => (
                <ResearchArea key={idx} url={`research/${area.url}`} name={area.name} description={area.description} color={area.color} />
              ))}
            </div>
          </div>

        </section>


        <section id="selected-publications">
          <div className='page-container pt-6 pb-10' >
            <h2 className="heading-primary">Selected Publications</h2>
            <div className="space-y-4">
              {Object.entries(selected_publications).sort((a, b) => b[0] - a[0]).map(([year, pubs]) => (
                <ul key={year}>
                  {pubs.map((pub, idx) => <PublicationItem key={idx} pub={pub} />)}
                </ul>
              ))}
              <div className="text-center">
                <Link to="/publications" className="text-[#2D4D63] hover:underline font-medium">View All Publications</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="open-source ">
          <div className="page-container pt-6 pb-10 ">
            <h2 className="heading-primary">Open-Source Projects</h2>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8`}
            >
              {/* map each research area to researcharea component */}
              {homeData.tools.map((tool, idx) => (
                <ToolCard
                  key={idx}
                  url={`https://github.com/CensoredPlanet/${tool.repo}`}
                  name={tool.name}
                  description={tool.tagline}
                />
              ))}
            </div>

          </div>
        </section>

        <section id="talks">
          <div className="page-container pt-6 pb-10">
            <h2 className="heading-primary">Recent Talks</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-4">
              {homeData.talks
                .filter(talk => talk.link)
                .slice(0, 3)
                .map((talk, idx) => {
                  return (
                    <VideoCard video={talk} key={idx} />
                  );
                })}
            </div>
            <div className="text-center">
              <Link to="/talks" className="text-[#2D4D63] hover:underline font-medium ">View All Talks</Link>
            </div>
          </div>
        </section>
      </div>
    </main>

  );
}