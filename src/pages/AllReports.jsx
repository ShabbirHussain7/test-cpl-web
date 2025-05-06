import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import matter from 'gray-matter';
import ReportCard from '../components/ReportCard';

// Dynamically import all markdown files
const markdownFiles = import.meta.glob('../reports/*.md', { query: '?raw', import: 'default', eager: true });

// Parse frontmatter and sort by date (earliest to oldest)
const reports = Object.values(markdownFiles)
  .map((raw) => {
    const { data } = matter(raw);
    if (data.permalink && data.permalink.startsWith('/')) {
      data.permalink = data.permalink.slice(1);
    }
    return data;
  })
  .sort((b, a) => new Date(a.date) - new Date(b.date)); // Sort by date in ascending order

export default function AllReports() {
  const [search, setSearch] = useState('');

  return (
    <main className="pt-24">
      <section className="page-container">
        <div className="">
          <h1 className="heading-primary">Research Blogs: Quick Insights from Our Work</h1>
          <p className="text-gray-700 text-lg w-full text-justify"> Our deep-dive studies, distilled into short briefs you can act on.              </p>
        </div>

        <div className="pt-4 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
            <div className="relative w-full mx-auto md:w-auto bg-white bg-opacity-90 rounded shadow-sm">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 " />
              <input
                type="text"
                placeholder="Search by keyword..."
                className="pl-10 pr-4 py-2 rounded-lg md:w-180 "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 pb-6">
          {reports
            .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
            .map((report, idx) => (
              <ReportCard key={idx} report={report} idx={idx} />
            ))}
        </div>

        <div className="text-center pb-8">

          <Link to="/join" className="text-[#2D4D63] hover:underline font-medium">Have Questions? Reach Out!</Link>

        </div>
      </section>
    </main>
  );
}