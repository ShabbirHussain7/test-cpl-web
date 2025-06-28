import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Logo from '../../public/icons/new-cp.svg';

export default function ReportCard({ report, idx }) {
  const isExternal = report.external || (report.permalink && report.permalink.startsWith('http'));

  const cardBody = () => (
    <div className='text-[#121212] '>
           <img
        src={report.logo || Logo}
        alt="Lab Logo"
        className="absolute top-0 left-0 m-5 pointer-events-none"
        style={{ height: '21px', width: 'auto' }}
      />
      {/* Top Section */}
      <div className="relative z-10 flex flex-col flex-grow overflow-hidden">
        <div className="mb-2 ">
          <div className="flex justify-end">
            <div className="publication-tag text-[#595959] small-text">
              {report.date}
            </div>
          </div>
          <h5 className="mt-4 overflow-hidden line-clamp-2">
            {report.title}
          </h5>
        </div>

        <div className="mt-2 overflow-hidden flex-grow">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: (props) => (
                <p
                  className="body text-ellipsis line-clamp-3"
                  {...props}
                />
              ),
              strong: (props) => <strong className="font-bold" {...props} />,
              em: (props) => <em className="italic" {...props} />,
              a: (props) => <a className="text-blue-500 underline" {...props} />,
            }}
          >
            {report.excerpt}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );

  const baseClassName =
    "max-w-[1080px] relative flex flex-col bg-white border border-[#888] shadow transition transform hover:scale-102 hover:shadow-md p-5 overflow-hidden";

  if (isExternal) {
    return (
      <a
        key={idx}
        href={report.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
      >
        {cardBody()}
      </a>
    );
  }

  return (
    <Link
      key={idx}
      to={`${window.location.origin}/${report.permalink}`}
      className={baseClassName}
    >
      {cardBody()}
    </Link>
  );
}
