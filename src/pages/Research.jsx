import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import researchData from '../data/research.json';
import PublicationItem from '../components/PublicationItem';
import { parsePublications } from '../utils/parsePublications';
import FindingsCard from '../components/FindingsCard';
// This will clean the HTML and remove anything dangerous (e.g., <script> tags or onerror attributes).
import DOMPurify from 'dompurify';
const markdownFiles = import.meta.glob('../publications/*.md', { query: '?raw', import: 'default', eager: true });
const publications = parsePublications(markdownFiles);



export default function Research() {
    const { area } = useParams();
    const [data, setData] = useState(null);
    const [svg, setSvg] = useState(null); // State to store the imported SVG
    // define mapping between the area from the URL and the area in the researchData
    const areaMapping = {
        'obfuscation': 'Advancing Traffic Obfuscation',
        'securing-pets': 'Securing VPN and Circumvention Tool Ecosystem',
        'dpis': 'Evaluating Network Middlebox Deployments',
        'censorship-detection': 'Monitoring Censorship at Global Scale',
        "rapid-response": "Exposing Emerging Censorship Threats",
        "splintering-net": "Characterizing Internet Splintering"

    };

    useEffect(() => {
        if (researchData[area]) {
            setData(researchData[area]);
        }

        if (area) {
            const basePath = process.env.NODE_ENV === 'development' 
                ? '../../public/' 
                : '/';
            // Serve SVG from public folder as static asset
            setSvg(`${basePath}background/research/${area}.svg`);
        }

    }, [area]);

    if (!data) {
        return <div className="page-container py-24 text-center">Area not found.</div>;
    }
    DOMPurify.sanitize(data.overview, { ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'em', 'strong'] })

    return (
        <main className="lg:py-25 bg-[#fdfdfd]">
            
            <section
                className='lg:px-20 text-[#121212] overflow-hidden'
               
            >
                
                <div className=''>
                    <h1 className="new-section-heading">{data.title}</h1>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-x-6">


                        <div className="">
                            <h4 className="">Overview</h4>

                            <p
                                className="body mt-4 max-w-[740px]"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(data.overview)
                                }}
                            />
                        </div>
                        <div className='flex justify-end'>
                        {svg && <img src={svg} alt={``} className="absolute top-0 max-h-[570px]" />}

                           
                        </div>
                    </div>
                </div>
            </section>

            <section className='lg:px-20 lg:py-15 mt-16 !bg-[#E4F7F6]' >
                <div className=''>
                    <h4 className="">Research Direction</h4>
                    <p className="body mt-4 max-w-[1000px]"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.research)
                        }}
                    />
                </div>

                <div className='mt-20'>
                    <h4 className="">Key Findings</h4>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {data.findings.map((finding, index) => (
                        <FindingsCard
                          key={index}
                          title={finding.title}
                          citation={finding.citation}
                          link={finding.link}
                          description={finding.description}
                        />
                      ))}
                    </div>
                </div>
            </section>

            <section>
                
            </section>
            <section className='lg:px-20 '>
                <div className="">
                    <h4 className="heading-secondary">Relevant Publications</h4>
                    {Object.entries(publications)
                        .sort((a, b) => b[0] - a[0])
                        .map(([year, pubs]) => {
                            const filteredPubs = pubs.filter((pub) => pub.area === areaMapping[area]);
                            if (filteredPubs.length === 0) return null;

                            return (
                                <div key={year}>
                                    {/* <h3 className="text-lg font-semibold text-gray-700">{year}</h3> */}
                                    <ul >
                                        {filteredPubs.map((pub, idx) => (
                                            <li key={`${year}-${idx}`} className="border-b border-gray-300 pb-2">
                                                <PublicationItem pub={pub} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                </div>
            </section>
        </main>
    );
}