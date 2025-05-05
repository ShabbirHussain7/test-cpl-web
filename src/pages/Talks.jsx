import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import homeData from "../data/home.json";

export default function Talks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

//   get last four characters from date as year using regex
  const years = Array.from(
    new Set(homeData.talks.map(talk => {
      const match = talk.date.match(/(\d{4})$/);
      return match ? match[1] : null;
    }).filter(Boolean))
  ).sort((a, b) => b - a);

  const filteredTalks = homeData.talks
    .filter(talk => talk.link)
    .filter(talk => 
      (
        selectedYear === "All" ||
        (talk.date.match(/(\d{4})$/)?.[1] === selectedYear)
      ) &&
      (talk.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <main className="pt-24">
      <section className="page-container pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search talks..."
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-4">
          {filteredTalks.slice(0, visibleCount).map((talk, idx) => (
            <VideoCard key={idx} video={talk} />
          ))}
        </div>

        {visibleCount < filteredTalks.length && (
            
          <div className="flex justify-center mt-6 mb-2">
            
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}