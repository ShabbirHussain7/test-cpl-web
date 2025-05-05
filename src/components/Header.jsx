import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import homeData from '../data/home.json';

const Header = () => {
  const [isScrolled, setScrolled]   = useState(false);
  const [mobileMenuOpen, setMMOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState(null);   // which submenu is expanded on mobile

  /* ───────── Listen for scroll so we can shrink header ───────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ───────── Top‑level sections definition ───────── */
  const sections = [
    { name: 'Home',        link: '/' },
    { name: 'People',       link: '/people' },
    { name: 'Research',                    // ⬅ no link any more
      sub: homeData.research.map((r, i) => ({
        name: r.name,
        link: `research/${r.url}`,
      }))
    },
    { name: 'Blogs',       link: '/reports' },
    { name: 'Publications',link: '/publications' },
    { name: 'Talks',       link: '/talks' },
    { name: 'Press',       link: '/news' },
    { name: 'Updates',     link: '/updates' },
    { name: 'Join Us',     link: '/join' },
  ];

  /* ───────── Component ───────── */
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
                  ${isScrolled ? 'py-2' : 'py-4'} bg-[#2D4D63]`}>
      <nav className="container mx-auto flex justify-between max-w-screen-xl px-6 md:px-16 items-center">
        <Link to="/">
          <img src="/censoredplanet.svg" alt="Censored Planet Logo" className="h-10 md:h-12" />
        </Link>

          {/*  Desktop menu  */}
        <div className="hidden md:flex gap-6">
          {sections.map(({ name, link, sub }, index) => (
            <div key={name} className="relative group flex items-center">
              {/* ▼ inside the .map() of sections  */}
              <Link to={link} className="text-white hover:text-gray-200 flex items-center">
                {name}
              </Link>
        
              {/* Display pipe symbol except for the last item
              {index < sections.length - 1 && (
                <span className="text-white mx-2">|</span>
              )}
         */}
              {/* dropdown – only if there is a submenu */}
              {sub && (
                <div
                  className="absolute top-full        /* ← no gap */
                             w-72 bg-[#2D4D63] shadow-lg
                             opacity-0 invisible
                             group-hover:opacity-100 group-hover:visible
                             group-focus-within:opacity-100 group-focus-within:visible
                             transition-opacity"
                >
                  {sub.map(({ name: subName, link: subLink }) => (
                    <Link
                      key={subName}
                      to={subLink}
                      className="block px-4 py-4 text-sm text-white hover:bg-[#3A5E78]
                                 whitespace-normal"
                    >
                      {subName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>


        {/*  Mobile menu toggle  */}
        <button
          className="md:hidden text-white"
          onClick={() => setMMOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/*  Mobile menu panel  */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2D4D63] px-4 py-2 space-y-1">
          {sections.map(({ name, link, sub }) => {
            const hasSub = Boolean(sub);
            const open   = openMobileSub === name;
            return (
              <div key={name}>
                <div
                  className="flex items-center justify-between py-2"
                >
                  {link ? (
                      <Link to={link} className="text-white flex-1" onClick={() => setMMOpen(false)}>
                        {name}
                      </Link>
                    ) : (
                      <span className="text-white flex-1">{name}</span>
                    )}
                  {hasSub && (
                    <button
                      onClick={() => setOpenMobileSub(open ? null : name)}
                      className="text-white px-2"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform
                                    ${open ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* mobile submenu */}
                {hasSub && open && (
                  <div className="pl-4 space-y-1">
                    {sub.map(({ name: subName, link: subLink }) => (
                      <Link
                        key={subName}
                        to={subLink}
                        className="block py-1 text-sm text-white/90"
                        onClick={() => setMMOpen(false)}
                      >
                        {subName}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;