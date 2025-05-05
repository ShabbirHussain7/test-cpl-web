import React from "react";
import { Link } from "react-router-dom";
import news from "../data/news.json";


export default function News() {
    return (
        <main className="pt-24">
            <div className="page-container">
                <h1 className="heading-primary">Media Coverage</h1>

                <ul className="list-none space-y-2 mt-6">
                    {Object.entries(
                        news.reduce((acc, item) => {
                            if (!acc[item.website]) acc[item.website] = [];
                            acc[item.website].push(item);
                            return acc;
                        }, {})
                    ).map(([website, articles]) => (
                        <li key={website}>
                            <span className="font-semibold">▪ [{website}]</span> —{" "}
                            {articles.map((article, i) => (
                                <React.Fragment key={i}>
                                    <Link
                                        to={article.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-black underline"
                                    >
                                        {article.title}
                                    </Link>
                                    {i !== articles.length - 1 && <span className="mx-2 text-gray-500">|</span>}
                                </React.Fragment>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
// This is a placeholder component for the Updates page.