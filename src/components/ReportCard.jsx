import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReportCard({ report, idx }) {
  return (
    <Link key={idx} to={`/reports/${report.permalink}`} className="flex flex-col bg-white rounded-4xl border border-[#CBD5E1] shadow transition transform hover:scale-[1.02] hover:shadow-md p-6 h-[300px] overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="mb-2 ">
          <div className="bg-[#D6E2EB]  text-[#2D4D63] text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
            {report.date}
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

      {/* Bottom Section */}
      <div className="pt-2">
        {report.project && (
          <p className="text-sm font-semibold text-orange-700">{report.project}</p>
        )}
        {report.affiliations && (
          <div className="text-gray-400 text-xs">{report.affiliations}</div>
        )}
      </div>
    </Link>
  );
}
