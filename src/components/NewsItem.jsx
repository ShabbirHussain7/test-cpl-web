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
    <div className="w-full py-1 border-b border-[#888]">
      {/* Top row: Date and Language */}
      <div className="flex small-text justify-between text-[#595959] mb-1">
        <span className='font-normal'>{displayDate}</span>
        <span className='bg-[#E4F7F6] px-2 py-[2px]'>{trimmedArticle.language}</span>
      </div>

      {/* Bottom row: Title and Source */}
      <div className="flex justify-between items-center">
        <Link
          to={trimmedArticle.link}
          target="_blank"
          rel="noopener noreferrer"
          className="news-title  hover:text-white text-[#121212]"
        >
          {trimmedArticle.title}
        </Link>
        <span className="text-[#121212] small-text font-semibold">
          {trimmedArticle.source}
        </span>
      </div>
    </div>
  );
};

export default NewsArticleRow;