import React from "react";
import { useState } from 'react';
// Import as components (this works with SVGR setup)
import GithubIcon from "../../public/icons/github.svg?react";
import TwitterIcon from "../../public/icons/x.svg?react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('censoredplanet@umich.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <footer className="bg-[#2D4D63] text-white pt-10 mt-auto sm:pb-4">
      <div className="max-w-screen-xl sm:px-16 px-8 mx-auto ">
        {/* Top Section */}
        <div className="flex items-start">
          {/* Left Side */}
          <div className="sm:w-[26%] w-[50%] sm:pr-6 text-left">
            <p className="mb-2 text-lg">
              Questions?{" "}
              <button
                onClick={handleCopy}
                className="underline hover:text-gray-200 focus:outline-none"
              >
                {copied ? 'Email Copied!' : 'Email Us'}
              </button>

            </p>

            {/* Address */}
            <div className="text text-gray-300 mb-4 leading-5">
              <p>4908 Bob and Betty Beyster Building</p>
              <p>2260 Hayward St.,</p>
              <p>Ann Arbor, MI 48109</p>
            </div>

            {/* Social Icons */}

            <div className="flex justify-start space-x-4 mt-2 text-white">
              <Link href="https://github.com/censoredplanet" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-6 h-6 " />

              </Link>
              <Link href="https://x.com/CensoredPlanet" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Divider — FIXED with self-stretch */}
          <div className="self-stretch w-[1px] bg-gray-400 mx-2 hidden sm:block" />

          {/* Right Side */}
          <div className="flex-1 pl-6 text-left  font-display">
            <h2 className="text-2xl font-semibold">Censored Planet Observatory</h2>
            <h2 className="text-xl mb-2">Legacy Dashboard</h2>
            {/* <p className="text-md font-semibold mt-1 mb-2">Legacy Dashboard</p> */}
            <p className="text-gray-300 text">
              We developed this dashboard, in collaboration with{" "}
              <span className="font-semibold text-white">Google Jigsaw</span>, for exploring processed Censored Planet data.
            </p>
            <div className="flex space-x-2 mt-4">
              <button className="bg-[#A8EDE9] text-[#2D4D63] text-sm px-3 py-1 rounded hover:bg-[#a0dede]">
                Dashboard
              </button>
              <button className="bg-[#A8EDE9] text-[#2D4D63] text-sm px-3 py-1 rounded hover:bg-[#a0dede]">
                Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 border-t border-gray-500 pt-4 text-sm text-gray-300 flex justify-between">
          <p>&copy; {new Date().getFullYear()} Censored Planet. All rights reserved.</p>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;