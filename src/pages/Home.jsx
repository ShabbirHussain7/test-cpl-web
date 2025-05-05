import React, { useState } from 'react';
import PublicationItem from '../components/PublicationItem';
import { Link } from 'react-router-dom';
import { parsePublications } from '../utils/parsePublications';
import homeData from "../data/home.json";
import { ChevronUp, ChevronDown } from 'lucide-react';
import ResearchArea from '../components/ResearchArea';
import VideoCard from '../components/VideoCard';


export default function Home() {
  // Dynamically import all markdown files in publications
  // read markdown files that end with -homepage.md
  const markdownFiles = import.meta.glob('../publications/*-homepage.md', { query: '?raw', import: 'default', eager: true });
  const selected_publications = parsePublications(markdownFiles);
  const [showAllTools, setShowAllTools] = useState(false);
  const toolsToShow = showAllTools ? homeData.tools : homeData.tools.slice(0, 4);

  return (
    <div className="">


      <main className="pt-[50px] pb-4">
        <section id="hero" className="relative text-white">
          <div className="relative">
            <div className="absolute inset-0">

            </div>
            <img src="hero-banner.jpeg" alt="Background" className="w-full h-full object-cover" />
            {/* Call to Action */}
        <div className="relative z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 py-2 sm:py-4 px-4 sm:px-8 rounded-lg w-full max-w-[90vw] sm:max-w-3xl mx-auto text-center z-10 hidden sm:block">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
                {homeData.mission.title}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-3">
                {homeData.mission.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/join"
                  className="bg-[#2D4D63] font-semibold text-white px-4 py-2 rounded-lg hover:bg-[#223B4C] transition-shadow shadow-md hover:shadow-lg"
                >
                  Join Us
                </Link>
                <Link
                  to="/research"
                  className="bg-white font-semibold text-[#2D4D63] px-4 py-2 rounded-lg hover:bg-gray-200 transition-shadow shadow-md hover:shadow-lg"
                >
                  Explore our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Call to Action for Mobile */}
      <div className="sm:hidden sticky bottom-0 bg-black/60 py-2 px-4 flex justify-center gap-4 z-20">
        <Link
          to="/join"
          className="bg-[#2D4D63] font-semibold text-white px-4 py-2 rounded-lg hover:bg-[#223B4C] transition-shadow shadow-md hover:shadow-lg"
        >
          Join Us
        </Link>
        <Link
          to="/research"
          className="bg-white font-semibold text-[#2D4D63] px-4 py-2 rounded-lg hover:bg-gray-200 transition-shadow shadow-md hover:shadow-lg"
        >
          Explore our Work
        </Link>
      </div>
      {/* Solid background strip for bottom of hero */}
      <div className="relative bottom-0 w-full h-[115px] bg-[#2D4D63] z-0 hidden sm:block"></div>
        </section>

        <div id="other-than-hero" className='page-container'>
          {/* About Us and Latest at the Lab side-by-side section */}
          <section id="us-and-updates" className="pt-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12"
          >
            {/* About Us */}
            <div>
              <h2 className="heading-primary">
                What We Do
              </h2>
              <div className="paragraph">
                <p>
                  Our research lies at the intersection of networking, security and privacy, and Internet measurement. We take a data-driven approach to detecting and defending against powerful network intermediaries, government threat actors, and technologies and practices that impact users’ freedom of expression online. Our work has won honors like the <strong>Internet Defense Prize</strong> and multiple <strong>IRTF research awards</strong>, has been featured in <strong>130+ news articles</strong>, resulted in <strong>60+ security disclosures</strong>, and has been cited by <strong>Congressional reports</strong> calling for regulatory action. Since 2018, our observatory has conducted <strong>68 billion measurements</strong> across over 220 countries, aiding <strong>100+ advocacy organizations</strong>.
                </p>
              </div>
            </div>

            {/* Latest at the Lab */}
            <div className="w-full flex justify-center md:justify-end ">
              <div className="rounded flex flex-col w-full ">
                <h2 className="heading-primary">
                  Latest at the Lab
                </h2>
                <div className="text-gray-700 text-sm  overflow-y-auto h-[250px]">
                  {homeData.lab_updates.slice(0, 5).map((update, idx, arr) => (
                    <div key={idx}>
                      <p className="font-semibold text-gray-500">{update.date}</p>
                      <p>{update.tagline} {update.link && (
                                    <Link to={update.link} target="_blank" rel="noopener noreferrer" className="underline text-[#1E3A4C] hover:text-[#12303F] transition">Read More</Link>
                                )}</p>
                      {idx < arr.length && (
                        <div className="w-20 border-t border-gray-300 mt-1 mb-4"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <Link to="/updates" className="text-[#2D4D63] hover:underline text-sm font-medium">View All Updates</Link>
                </div>
              </div>
            </div>


          </section>


          <section id="research-themes" className="pt-8">
            {/* Research Themes Subsection */}

            <h2 className="heading-primary">Research Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
              {/* map each research area to researcharea component */}
              {homeData.research.map((area, idx) => (
                <ResearchArea key={idx} url={`research/${area.url}`} name={area.name} description={area.description} />
              ))}
            </div>

          </section>

          <section id="selected-publications" className=" pt-12 ">
            <h2 className="heading-primary">Selected Publications</h2>
            <div className="space-y-4">
              {Object.entries(selected_publications).sort((a, b) => b[0] - a[0]).map(([year, pubs]) => (
                <ul>
                  {pubs.map((pub, idx) => <PublicationItem key={idx} pub={pub} />)}
                </ul>
              ))}
              <div className="text-center">
                <Link to="/publications" className="text-[#2D4D63] hover:underline font-medium">View All Publications</Link>
              </div>
            </div>
          </section>

          <section id="open-source" className=" pt-8 ">
            <h2 className="heading-primary">Open-Source Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_6fr] gap-y-4 ">
              {toolsToShow.map((tool, idx) => (
                <>
                  <div className="text-[#2D4D63] font-medium">{tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}</div>
                  <div>
                    <p className="text-sm text-gray-700">{tool.tagline}
                      <Link to={`https://github.com/CensoredPlanet/${tool.repo}`} target="_blank" rel="noopener noreferrer" className="ml-2 underline text-sm text-[#1E3A4C] hover:text-[#12303F] transition">GitHub ↗</Link>
                    </p>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowAllTools(!showAllTools)}
                aria-label="Toggle tool visibility"
              >
                {showAllTools ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
          </section>

          <section id="talks" className=" pt-8">
            <h2 className="heading-primary">Recent Talks</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-x-6 mb-4">
              {homeData.talks
                .filter(talk => talk.link)
                .slice(0, 3)
                .map((talk, idx) => {
                 
                  
                  return (
                    <VideoCard  video={talk} />
                  );
                })}
            </div>
            <div className="text-center">
              <Link to="/talks" className="text-[#2D4D63] hover:underline font-medium ">View All Talks</Link>
            </div>
          </section>

          <section id="news-and-media" className=" pt-8">
            <h2 className="heading-primary">In The News</h2>
            <div className="mb-4">
              <p className="mb-5 paragraph">
                Our work has been featured in various media outlets, including:
              </p>
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-start justify-center">
                {homeData.news_logos.map((logo) => (
                  <a
                    key={logo.name}
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition"
                  >
                    <img
                      src={logo.imgSrc}
                      alt={logo.name}
                      className="h-10 mx-auto object-contain"
                    />
                  </a>
                ))}
              </div>
              <div className="text-center">
                <Link to="/news" className="text-[#2D4D63] hover:underline text font-medium">See Full Media Coverage</Link>
              </div>


            </div>

          </section>
        </div>
      </main>




    </div>
  );
}