import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LabLogo from '../../public/censoredplanetBlack.svg';

export default function ReportCard({ report, idx }) {
  return (
    <Link key={idx} to={`/reports/${report.permalink}`} className="relative flex flex-col bg-white rounded-sm border border-[#CBD5E1] shadow transition transform hover:scale-[1.02] hover:shadow-md p-5  overflow-hidden">
            <img
              src={LabLogo}
              alt="Lab Logo"
              className="absolute top-0 left-0  m-5 w-35 pointer-events-none"
            />
      {/* Top Section */}
      <div className="relative z-10 flex flex-col flex-grow overflow-hidden">
        <div className="mb-2 ">
        <div className="flex justify-end">
          <div className="bg-[#D6E2EB]  text-[#2D4D63] text-xs rounded-sm font-semibold px-3 py-1 mb-4 inline-block">
            {report.date}
          </div>
          </div>
          <h2 className="text-lg font-bold mb-2 overflow-hidden text-ellipsis line-clamp-2">
            {report.title}
          </h2>
        </div>

        <div className="overflow-hidden flex-grow">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: (props) => (
                <p className="text-gray-700 text-base leading-relaxed overflow-hidden text-ellipsis line-clamp-[6]" {...props} />
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
    </Link>
  );
}
