import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResearchBg from '../../public/background/research-theme-bg.svg';
import ResearchBg1 from '../../public/background/research-theme-bg1.svg';
import { Search } from 'lucide-react';
import matter from 'gray-matter';
import ReportCard from '../components/ReportCard';
import externalReports from '../data/external_reports.json';
import BlogBg from '../../public/background/blog-bg.svg';

// Dynamically import all markdown files
const markdownFiles = import.meta.glob('../reports/*.md', { query: '?raw', import: 'default', eager: true });

// Parse frontmatter and sort by date (earliest to oldest)
const mdReports = Object.values(markdownFiles)
  .map((raw) => {
    const { data } = matter(raw);
    if (data.permalink && data.permalink.startsWith('/')) {
      data.permalink = data.permalink.slice(1);
    }
    return data;
  })
  .sort((b, a) => new Date(a.date) - new Date(b.date)); // Sort by date in ascending order

const combinedReports = [...mdReports, ...externalReports].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export default function AllReports() {
  const [search, setSearch] = useState('');

  return (
       <section className="text-[#121212] relative overflow-hidden z-0">
                        <div>
              {/* Background Images */}
              <img
                src={ResearchBg}
                alt="Hero background"
                className="fixed right-[0px] min-h-[100%] transform z-[-1]"
                style={{
                  transform: 'scale(0.95)', // Scale down the image to 80% of its original size
                  transformOrigin: 'top right', // Ensure scaling happens from the top-right corner
                }}
              />
              <img
                src={ResearchBg1}
                alt="Hero background"
                className="shrink-0 fixed min-h-[100%] -bottom-[400px] left-[0px] z-[-1]"
                style={{
                  transform: 'scale(0.75)', // Scale down the image to 80% of its original size
                  transformOrigin: 'bottom left', // Ensure scaling happens from the bottom-left corner
                }}
              />
            
              {/* Gradient Overlay */}
              <div
                className="fixed top-0 left-0 w-full h-full z-[-1]"
                style={{
                  background: 'linear-gradient(180deg, #fdfdfd 0%, rgba(253, 253, 253, 0.00) 51.92%, #fdfdfd 100%)',
                  pointerEvents: 'none', // Ensures it doesn't block interactions with other elements
                }}
              ></div>
            </div>
    
      <div className="internal-container md:py-25 py-20 px-10 z-10">
        <div className="">
          <h1 className="new-section-heading">Research Blogs</h1>
          <p className="body mt-6">
            Our deep-dive studies, distilled into overviews for a wider audience
          </p>
        </div>
    
        <div className="mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative md:mr-auto p-2 border border-[#8E8E8E] flex items-center md:w-[40%] w-[100%]">
              <Search className="" />
              <input
                type="text"
                placeholder="Search by keyword..."
                className="ml-2 body-medium w-full border-none"
                style={{ outline: 'none', boxShadow: 'none' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
    
        <div className="mt-6 space-y-5">
          {combinedReports
            .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
            .map((report, idx) => (
              <ReportCard key={idx} report={report} idx={idx} />
            ))}
        </div>
      </div>
    </section>
  );
}