import React, { useState } from 'react';
import PublicationItem from '../components/PublicationItem';
import { parsePublications } from '../utils/parsePublications';


const markdownFiles = import.meta.glob('../publications/*.md', { query: '?raw', import: 'default', eager: true });
const publications = parsePublications(markdownFiles);

export default function Publications() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = ['All', ...new Set(Object.values(publications).flat().map(pub => pub.category).filter(Boolean))];

  return (
    <div className="">
      <main className="pt-24 pb-4 page-container">
        <div className="flex justify-between items-center mb-2">
          <h1 className="heading-primary">Publications</h1>
          <div className="flex items-center">
            <label className="mr-2 font-medium">Filter by category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border px-2 py-1 rounded-lg">
              {allCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <table className="w-full  border-gray-400">
          <thead className="text-[#2D4D63] ">
            <tr>
              <th className="text-center px-2 py-1 border-r border-gray-300">Year</th>
              <th className="text-left  px-2 py-1 ">Publication Detail</th>


            </tr>
          </thead>
          <tbody>
            {Object.entries(publications)
              .sort((a, b) => b[0] - a[0])
              .map(([year, pubs]) => {
                const filteredPubs = pubs.filter(pub => selectedCategory === 'All' || pub.category === selectedCategory);
                if (filteredPubs.length === 0) return null;
                return filteredPubs.map((pub, idx) => (
                  <tr key={`${year}-${idx}`} className="border-t border-gray-300 odd:bg-gray-100">
                    <td className="align-top px-4 py-2 text-sm text-gray-500 border-r border-gray-300">{pub.year}</td>
                    <td className="align-top px-2 py-2 "><PublicationItem pub={pub} /></td>
                  </tr>
                ));
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
