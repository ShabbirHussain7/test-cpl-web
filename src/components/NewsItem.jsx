import React from 'react';
import { Link } from 'react-router-dom';

const NewsArticleRow = ({ article }) => {
  if (!article) return null;

  const trimmedArticle = {
    ...article,
    date: article.date?.trim(),
    title: article.title?.trim(),
    source: article.source?.trim(),
    language: article.language?.trim(),
    url: article.url?.trim(),
  };

  const date = new Date(trimmedArticle.date);
  const displayDate = isNaN(date) ? trimmedArticle.date : date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className="w-full py-1 border-b border-gray-200">
      {/* Top row: Date and Language */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>{displayDate}</span>
        <span>{trimmedArticle.language}</span>
      </div>

      {/* Bottom row: Title and Source */}
      <div className="flex justify-between items-center">
        <Link
          to={trimmedArticle.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-900 hover:underline"
        >
          {trimmedArticle.title}
        </Link>
        <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
          {trimmedArticle.source}
        </span>
      </div>
    </div>
  );
};

export default NewsArticleRow;