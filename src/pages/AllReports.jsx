import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        
        <div className='internal-container lg:py-25 px-10 z-10'>
        <div className="">
          <h1 className="new-section-heading">Research Blogs — Quick Insights from Our Work</h1>
          <p className="body mt-6"> Our deep-dive studies, distilled into overviews for a wider audience</p>
        </div>

        <div className="mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
            <div className="relative md:mr-auto p-2 border border-[#8E8E8E] flex items-center md:w-[40%] w-[100%]">
              
              <Search className="" />
              <input
                type="text"
                placeholder="Search by keyword..."
                className="ml-2 body-medium w-full border-none  "
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

        <img
              src={BlogBg}
              alt="Hero background"
              className=" absolute bottom-0 right-0  z-[-1]"
            />
    </section>
  );
}