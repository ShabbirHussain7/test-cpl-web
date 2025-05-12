import React from "react";
import news from "../data/press_mentions.json";
import NewsArticleRow from "../components/NewsItem";

export default function News() {
    return (
        <main className="pt-24">
            <div className="page-container">
                <h1 className="heading-primary">Media Coverage</h1>

                <ul className="list-none">
                    {news
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (latest to oldest)
                        .map((article, index) => (
                            <li
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"} // Apply bg-gray-100 for odd items
                            >
                                <NewsArticleRow article={article} />
                            </li>
                        ))}
                </ul>
            </div>
        </main>
    );
}