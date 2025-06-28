import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../../public/icons/new-cp.svg';
import home_data from '../data/home.json';

export default function Header() {
  const navItems = [
    { label: 'About', to: '/about' },
    { label: 'Research', subItems: home_data.research.map(item => ({
      label: item['short-name'],
      to: `/research/${item.url}`
    })) },
    { label: 'Blogs', to: '/blogs' },
    { label: 'Publications', to: '/publications' },
    { label: 'Tools', to: '/tools' },
    { label: 'Media', subItems: [
      { label: 'News', to: '/news' },
      { label: 'Talks', to: '/talks' },
      // { label: 'Lab Updates', to: '/updates' },
    ] },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Tracks active submenu for mobile

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <header className={`fixed top-0 left-0 w-full  ${isOpen ? 'bg-white' : 'bg-[rgba(253,253,253,0.4)]'} backdrop-blur-xs z-[9999]`}>
     <div className="internal-container flex items-center justify-between py-3 lg:py-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={Logo} alt="Censored Planet logo" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Nav links + Join button */}
        <nav>
          <ul className="hidden md:flex items-center">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className={`group relative px-4 first:pl-0 last:pr-0`}
              >
                <Link
                  to={item.to}
                  className="header-button"
                >
                  {item.label}
                </Link>
              {/* Dropdown for subItems */}
                {item.subItems && item.subItems.length > 0 && (
                  <ul
                    className={`absolute top-full bg-white shadow-lg z-10 ${
                      item.subItems.length <= 3 ? 'w-35' : 'w-70'
                    }  hidden group-hover:block`}
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label} className="px-6 py-2 hover:bg-gray-100">
                        <Link
                          to={subItem.to}
                          className="block text-sm text-gray-700 py-1"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {/* Join Us button */}
            <li className="pl-4">
              <Link
                to="/join"
                className="
                  primary-button 
                  hover:opacity-90
                  transition-opacity
                "
              >
                Join Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile nav */}
        <div className={`md:hidden absolute top-full bottom-0 right-0 w-full bg-white h-screen px-8 py-5 z-20 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col space-y-8">
            {navItems.map((item, index) => (
              <li key={item.label} className="relative">
                <div className="flex justify-between items-center">
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="text-[#121212] text-[18px] font-medium leading-[120%] tracking-[var(--spacing-spacing-tight)] text-center font-[Inter] hover:text-gray-700"
                  >
                    {item.label}
                  </Link>
                  {item.subItems && item.subItems.length > 0 && (
                    <button
                      onClick={() => toggleSubMenu(index)}
                      className="focus:outline-none"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={activeSubMenu === index ? "M6 18L18 6M6 6l12 12" : "M19 9l-7 7-7-7"}
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Dropdown for subItems */}
                {item.subItems && item.subItems.length > 0 && activeSubMenu === index && (
                  <ul className="mt-2 space-y-5 pt-5">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label} className="pl-6">
                        <Link
                          to={subItem.to}
                          onClick={() => setIsOpen(false)}
                          className="block text hover:text-gray-700"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link
                to="/join"
                onClick={() => setIsOpen(false)}
                className="text-[#121212] text-[18px] font-medium leading-[120%] tracking-[var(--spacing-spacing-tight)] text-center font-[Inter] hover:text-gray-700"
              >
                Join Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}