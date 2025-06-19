import React from "react";
import ToolCard from "../components/ToolCard";
import ToolData from "../data/tools.json";
import ToolsBg from '../../public/background/tools-pg-bg.svg';

export default function Tools() {

    return (
        <section className="text-[#121212] overflow-hidden z-0">
            {/* BACKGROUND IMAGE */}
            <img
                src={ToolsBg}
                alt="Hero background"
                className="absolute z-[-1]"
                style={{
                    transform: 'scale(0.874)',
                    transformOrigin: 'top right',
                    top: 0,
                    right: 0,
                }}
            />
            <div className="lg:px-20 lg:py-25  z-10">
                <h1 className="new-section-heading">Tools</h1>
                <p className="body mt-6 max-w-[620px]">
                    Censored Planet develops and maintains a suite of open source tools for investigating internet censorship and network interference.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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
        </section>
    );
}
