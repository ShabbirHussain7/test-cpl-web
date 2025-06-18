import React, { useState } from 'react';
import PublicationItem from '../components/PublicationItem';
import { parsePublications } from '../utils/parsePublications';

const markdownFiles = import.meta.glob('../publications/*.md', { query: '?raw', import: 'default', eager: true });
const publications = parsePublications(markdownFiles);

export default function Publications() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const allCategories = [
    'All',
    ...new Set(
      Object.values(publications)
        .flat()
        .map(pub => pub.area)
        .filter(Boolean)
        .filter(category => category !== 'Other') // Exclude "Other" initially
    ),
    'Other' // Append "Other" at the end
  ]; 
  const allYears = ['All', ...new Set(Object.keys(publications).sort((a, b) => b - a))];

  return (

    <main className="lg:px-20 lg:py-25">

      <h1 className="new-section-heading">Publications</h1>

      {/* <div className="mt-4 font-inter lg:text-[16px] lg:pr-53 text-[#121212] leading-[150%] space-y-6">
      Our research community is a vibrant and growing subfield that exists at the intersection of networking, security and privacy, Internet measurement, and social and political science. Our major publication venues include systems security and privacy conferences (USENIX Security, IEEE S&P, ACM CCS, NDSS, PETS, and SIGCOMM) and measurement conferences (ACM IMC), as well as more specialized interdisciplinary workshops (USENIX FOCI).
      </div> */}

      <div className='text-[#121212]'>
        <div className="mt-6 flex items-center space-x-4">
          <div className="flex items-center">
            <label className="mr-5 font-medium">Filter by theme:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#888] px-2 py-1 text-[#595959]">
              {allCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-5 font-medium">Filter by year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-[#888] px-2 py-1 text-[#595959]">
              {allYears.map((year, idx) => (
                <option key={idx} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>



      <table className="mt-6 ">
        <thead className="publication-detail-heading">
          <tr>
            <th className="border-r border-[#888]">Year</th>
            <th className="text-left px-2 py-1 ">Publication Detail</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(publications)
            .sort((a, b) => b[0] - a[0])
            .map(([year, pubs]) => {
              if (selectedYear !== 'All' && year !== selectedYear) return null;

              const filteredPubs = pubs.filter(
                (pub) => selectedCategory === 'All' || pub.area === selectedCategory
              );
              if (filteredPubs.length === 0) return null;

              return filteredPubs.map((pub, idx) => (
                <tr key={`${year}-${idx}`} className="border-t border-gray-300">
                  <td className="publication-year w-[92px] text-center border-r border-[#888] align-top pt-2">
                    {pub.year}
                  </td>
                  <td>
                    <PublicationItem pub={pub} />
                  </td>
                </tr>
              ));
            })}
        </tbody>
      </table>
    </main>

  );
}