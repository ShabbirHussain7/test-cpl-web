import React from "react";
import { useState } from 'react';
// Import as components (this works with SVGR setup)
import GithubIcon from "../../public/icons/github.svg?react";
import TwitterIcon from "../../public/icons/x.svg?react";
import { Link } from "react-router-dom";
import Logo from '../../public/icons/new-cp-white.svg';


const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('censoredplanet@umich.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <footer className="bg-[#121212] mt-auto text-[#FDFDFD] lg:px-20 lg:py-15">
       <Link to="/">
            <img src={Logo} alt="Censored Planet logo" className="h-[68px] " />
          </Link>
      <div className="mt-6 flex flex-col lg:flex-row justify-between gap-8 font-inter">
        <div className="flex flex-col items-start gap-4">
         
          <div>
            <h2 className="text-[24px] font-semibold">Do you have a question?</h2>
            <p className="text-[24px] font-semibold">Get in touch</p>
          </div>
          <address className="not-italic text-[16px] leading-[120%]">
            4908 Bob and Betty Beyster Building<br />
            2260 Hayward St.,<br />
            Ann Arbor, MI 48109
          </address>
          <button onClick={handleCopy} className="underline text-[16px]">
            {copied ? "Copied!" : "censoredplanet@umich.edu"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8 text-[16px]">
          <div className="flex flex-col gap-2">
          
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/blog" className="hover:underline">Blog</Link>
            <Link to="/publications" className="hover:underline">Publications</Link>
            <Link to="/tools" className="hover:underline">Tools</Link>
            <Link to="/news" className="hover:underline">Press</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Observatory</h3>
            
            <Link to="https://dashboard.censoredplanet.org/" target="_blank" rel="noopener noreferrer" className="pl-4 hover:underline">Dashboard</Link>
            <Link to="https://censoredplanet.org/data/raw" target="_blank" rel="noopener noreferrer" className="pl-4 hover:underline">Raw Data</Link>
            <Link to="https://docs.censoredplanet.org/" target="_blank" rel="noopener noreferrer" className="pl-4 hover:underline">Documentations</Link>
            
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-semibold text-[18px]">Social media</h3>
          <div className="flex gap-4">
            <a href="https://twitter.com/CensoredPlanet" target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="w-6 h-6" />
            </a>
            <a href="https://github.com/CensoredPlanet" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-20 ">
        <div className="flex items-center gap-6 text-[14px]">
          <span>© 2025 Censored Planet</span>
          <span className="inline-block border-l border-[#FDFDFD] h-4"></span>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>

  );
};

export default Footer;