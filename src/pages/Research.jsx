import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import researchData from '../data/research.json';
import PublicationItem from '../components/PublicationItem';
import { parsePublications } from '../utils/parsePublications';
import FindingsCard from '../components/FindingsCard';
import ObservatoryCard from '../components/ObservatoryCard';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const markdownFiles = import.meta.glob('../publications/*.md', { query: '?raw', import: 'default', eager: true });
const publications = parsePublications(markdownFiles);

export default function Research() {
    const { area } = useParams();
    const [data, setData] = useState(null);
    const [svg, setSvg] = useState(null); // State to store the imported SVG
    const [isSvgLoaded, setIsSvgLoaded] = useState(false); // State to track SVG loading

    const areaMapping = {
        'obfuscation': 'Advancing Traffic Obfuscation',
        'securing-pets': 'Securing VPN and Circumvention Tool Ecosystem',
        'dpis': 'Evaluating Network Middlebox Deployments',
        'censorship-detection': 'Monitoring Censorship at Global Scale',
        "rapid-response": "Exposing Emerging Censorship Threats",
        "splintering-net": "Characterizing Internet Splintering"
    };

    const observatoryData = [
        { label: 'Dashboard', url: 'https://dashboard.censoredplanet.org/', icon: 'icons/observatory/dashboard.svg', subtitle: 'Explore insights and analytics' },
        { label: 'Data Access', url: 'https://data.censoredplanet.org/raw', icon: 'icons/observatory/data.svg', subtitle: 'Access unprocessed data' },
        { label: 'Documentation', url: 'https://docs.censoredplanet.org/', icon: 'icons/observatory/documentation.svg', subtitle: 'Find detailed guides and resources' }
    ];

    useEffect(() => {
        if (researchData[area]) {
            setData(researchData[area]);
        }

        if (area) {
            
            setSvg(`background/research/${area}.svg`);
        }
    }, [area]);

    if (!data) {
        return <div className="page-container py-24 text-center">Area not found.</div>;
    }

    DOMPurify.sanitize(data.overview, { ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'em', 'strong'] });

    return (
        <main className="bg-[#fdfdfd]">
            <section id='top' className='lg:px-20 lg:pt-25 text-[#121212] relative overflow-visible'>
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
                            {svg && (
                                <img
                                    src={isSvgLoaded ? svg : `background/research-png/${area}.png`}
                                    alt=""
                                    className="absolute top-4 max-h-[590px] z-0 pointer-events-none"
                                    onLoad={() => setIsSvgLoaded(true)} // Set SVG as loaded when it finishes loading
                                />
                            )}
                        </div>
                    </div>
                    {area === 'censorship-detection' && (
                        <section className='mt-20 !bg-[#FDFDFD]'>
                            <div className=''>
                                <h4 className="">Censored Planet Observatory</h4>
                                <p className='pt-4 max-w-[700px]'>The flagship project behind our efforts to understand, measure, and expose online censorship. Censored Planet Observatory is a measurement platform that collects data using multiple remote measurement techniques in more than <strong>200 countries</strong>.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {observatoryData.map((link, index) => (
                                        <Link
                                            key={index}
                                            to={link.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <ObservatoryCard
                                                title={link.label}
                                                subtitle={link.subtitle}
                                                icon={link.icon}
                                                className="mt-6"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {area === 'securing-pets' && (
                        <section className='mt-20 !bg-[#FDFDFD]'>
                            <div className=''>
                                <h4 className="">VPNalyzer</h4>
                                <p className='pt-4 max-w-[700px]'> Is your VPN provider delivering on its promise of privacy and security? We can help you find out!</p>
                                <p className='max-w-[700px]'> Download the VPNalyzer app below and receive immediate results showing whether any threats were identified.</p>
                                <Link
                                    to={'https://vpnalyzer.org/release'}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='mt-4 !inline-flex items-center gap-2 secondary-button'>
                                    <img src="icons/VPNalyzer.svg" alt="icon" className="w-6 h-6 flex-shrink-0" />
                                    <span>Download VPNalyzer</span>
                                </Link>
                            </div>
                        </section>
                    )}
                </div>
            </section>

            

            <section id='middle' className='relative lg:px-20 lg:py-15 mt-20 border-t border-t-[#888] z-[10] !bg-[#E4F7F6]' >
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


            <section id= 'bottom' className='lg:px-20 lg:pb-25 mt-10'>
                <div className="">
                    <h4 className="">Relevant Publications</h4>
                    <div className='mt-6'>
                   
                    {Object.entries(publications)
                        .sort((a, b) => b[0] - a[0])
                        .map(([year, pubs]) => {
                            const filteredPubs = pubs.filter((pub) => pub.area === areaMapping[area]);
                            if (filteredPubs.length === 0) return null;

                            return (
                                <table className=' w-full'>

                                        {filteredPubs.map((pub, idx) => (
                                             <tr key={`${year}-${idx}`} className="border-b border-[#888]">
                                             <td className="publication-year w-[92px] text-center border-r border-[#888] align-top pt-2">
                                                 {pub.year}
                                             </td>
                                            <td>
                                                <PublicationItem pub={pub} />
                                            </td>
                                            </tr>
                                        ))}
                                       

                                  

                                </table>

                            );
                        })}
                         </div>
                </div>
            </section>
        </main>
    );
}