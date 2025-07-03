import React, { useState } from "react";
import ToolCard from "../components/ToolCard";
import ToolData from "../data/tools.json";
import homeData from "../data/home.json";
import FlagshipCard from '../components/FlagshipCard';

export default function Tools() {
    const [isSvgLoaded, setIsSvgLoaded] = useState(false); // State to track SVG loading

    return (
       

       
        <section className="relative overflow-hidden z-0">
            {/* BACKGROUND IMAGE */}
            
           
            <div className="internal-container text-[#121212]  md:py-25 py-20  z-10">
                <h1 className="new-section-heading">Tools</h1>
                <p className="body mt-6 max-w-[620px]">
                    Censored Planet develops and maintains a suite of open source tools for investigating internet censorship and network interference.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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
                    {ToolData.map((tool, idx) => (
                        <ToolCard
                            key={idx}
                            url={`https://github.com/CensoredPlanet/${tool.repo}`}
                            name={tool.name}
                            description={tool.description}
                        />
                    ))}
                </div>
            </div>
            <div>
            <img
                src={isSvgLoaded ? 'background/tools-pg-bg.svg' : "background/tools-pg-bg.png"}
                alt="Hero background"
                className="absolute bottom-0 right-0  z-[-1] min-h-[100%] hidden sm:block"
                style={{
                    
                    
                }}
                onLoad={() => setIsSvgLoaded(true)} // Set SVG as loaded when it finishes loading
            />
            
            <div
                className="absolute top-0 left-0 w-full h-full z-[-1]"
                style={{
                  background: 'linear-gradient(180deg, #fdfdfd 0%, rgba(253, 253, 253, 0.00) 52%, #fdfdfd 100%)',
                  pointerEvents: 'none', // Ensures it doesn't block interactions with other elements
                }}
              ></div>
            </div>
            
        </section>
       
    );
}
