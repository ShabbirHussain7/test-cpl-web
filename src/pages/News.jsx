import React, { useState } from "react";
import news from "../data/press_mentions.json";
import NewsArticleRow from "../components/NewsItem";

export default function News() {
    const [selectedYear, setSelectedYear] = useState('All');

    // Group news articles by year
    const newsByYear = Object.values(news).reduce((acc, article) => {
        const year = article.date ? new Date(article.date).getFullYear() : 'Unknown';
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {});

    const allYears = ['All', ...Object.keys(newsByYear).sort((a, b) => b - a)];

    const filteredNews = selectedYear === 'All' 
        ? Object.values(news).sort((a, b) => new Date(b.date) - new Date(a.date))
        : newsByYear[selectedYear] || [];

    return (
        <main className="lg:px-20 lg:py-25">
            <h1 className="new-section-heading">News</h1>
            <div className="mt-4 flex items-center">
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

            <ul className="mt-4 list-none">
                {filteredNews.map((article, index) => (
                    <li key={index}>
                        <NewsArticleRow article={article} />
                    </li>
                ))}
            </ul>
        </main>
    );
}