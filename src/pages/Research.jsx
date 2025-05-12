import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import researchData from '../data/research.json';
import PublicationItem from '../components/PublicationItem';
import { parsePublications } from '../utils/parsePublications';
// This will clean the HTML and remove anything dangerous (e.g., <script> tags or onerror attributes).
import DOMPurify from 'dompurify';
const markdownFiles = import.meta.glob('../publications/*.md', { query: '?raw', import: 'default', eager: true });
const publications = parsePublications(markdownFiles);
console.log(publications);



export default function Research() {
    const { area } = useParams();
    const [data, setData] = useState(null);
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

    }, [area]);

    if (!data) {
        return <div className="page-container py-24 text-center">Area not found.</div>;
    }
    DOMPurify.sanitize(data.overview, { ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'em', 'strong'] })

    return (
        <main className="pt-20">
            <div
                className='hero-section py-8'
                style={{ backgroundColor: data.backgroundColor }}
            >
                <div className='page-container'>
                    <h1 className="heading-primary">{data.title}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-x-6">


                        <div className="hero-text">
                            <h2 className="heading-secondary">Overview</h2>

                            <p
                                className="paragraph"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(data.overview)
                                }}
                            />
                        </div>
                        <div className='flex justify-end'>

                            <img
                                src={`./research-imgs/${data.image}`}
                                alt={`${area} diagram`}
                                className="hero-img"
                                style={{
                                    borderColor: data.imgBorderColor,
                                    borderStyle: 'solid',
                                    borderWidth: '5px',

                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>

            <section >
                <div className='page-container pt-6 pb-10'>
                    <h2 className="heading-secondary">Research Direction</h2>
                    <p className="paragraph"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.research)
                        }}
                    />
                </div>
            </section>

            <section>
                <div className='page-container pt-6 pb-10'>
                    <h2 className="heading-secondary">Key Findings</h2>
                    {data.findings.map((finding, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(finding.title)
                                }} />
                            <p className="paragraph"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(finding.description)
                                }} />
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <div className="page-container pt-6 pb-10">
                    <h2 className="heading-secondary">Relevant Publications</h2>
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