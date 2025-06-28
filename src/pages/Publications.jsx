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

    <main className="internal-container lg:py-25 py-20">

      <h1 className="new-section-heading">Publications</h1>

      {/* <div className="mt-4 font-inter lg:text-[16px] lg:pr-53 text-[#121212] leading-[150%] space-y-6">
      Our research community is a vibrant and growing subfield that exists at the intersection of networking, security and privacy, Internet measurement, and social and political science. Our major publication venues include systems security and privacy conferences (USENIX Security, IEEE S&P, ACM CCS, NDSS, PETS, and SIGCOMM) and measurement conferences (ACM IMC), as well as more specialized interdisciplinary workshops (USENIX FOCI).
      </div> */}

      <div className='text-[#121212]'>
        <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 ">
          <div className="flex items-center lg:max-w-none max-w-[300px]">
            <label className="md:mr-5 font-medium ">Filter by theme:</label>
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
            <label className="md:mr-5 mr-2 font-medium">Filter by year:</label>
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
            <th className="hidden md:table-cell border-r border-[#888]">Year</th>
            <th className="hidden md:table-cell text-left px-2 py-1 ">Publication Detail</th>
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
              return (
                <React.Fragment key={year} >
                  {/* Year header visible only on mobile */}
                  <tr className="md:hidden">
                    <td colSpan="2" className="bg-[#E4F7F6] text-center px-2 py-1 font-semibold text-[#121212]">
                      {year}
                    </td>
                  </tr>
                  {filteredPubs.map((pub, idx) => (
                    <tr key={`${year}-${idx}`} className="border-t border-gray-300">
                      <td className="hidden md:table-cell text-center md:w-[90px] md:border-r border-[#888] align-top pt-2">
                        {pub.year}
                      </td>
                      <td className="px-2 py-1">
                        <PublicationItem pub={pub} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </main>

  );
}