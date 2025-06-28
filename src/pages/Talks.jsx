import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import VideoCard from '../components/VideoCard';
import talkData from "../data/talks.json";

export default function Talks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  //   get last four characters from date as year using regex
  const years = Array.from(
    new Set(talkData.map(talk => {
      const match = talk.date.match(/(\d{4})$/);
      return match ? match[1] : null;
    }).filter(Boolean))
  ).sort((a, b) => b - a);

  const filteredTalks = talkData
    .filter(talk => talk.link)
    .filter(talk =>
      (
        selectedYear === "All" ||
        (talk.date.match(/(\d{4})$/)?.[1] === selectedYear)
      ) &&
      (talk.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <main className="pt-10 bg-[#fdfdfd]">
      <section className="internal-container  md:pt-15 pt-10 ">
        <h1 className="new-section-heading">Talks</h1>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
            <div className="relative md:mr-auto p-2 border border-[#8E8E8E] flex items-center w-[100%]">

              <Search className="" />
              <input
                type="text"
                placeholder="Search by keyword..."
                className="ml-2 body-medium w-full border-none  "
                style={{ outline: 'none', boxShadow: 'none' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
       
          <select
            className="border !border-[#888] px-2 !py-2 !text-[#595959] !min-w-[100px]"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="md:pt-10 pb-15 md:pb-25 border-t border-t-[#888] !bg-[#E4F7F6]" >
        <div className="internal-container mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {filteredTalks.map((talk, idx) => (
            <VideoCard key={idx} video={talk} />
          ))}
        </div>

       
      </section>

    </main>
  );
}