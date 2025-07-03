import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TrophyIcon from '../../public/icons/trophy.svg';


const abbreviateAuthors = (authorStr) => {
  if (!authorStr) return ''; // Handle empty or undefined input

  return authorStr.split(',').map((author) => {
    const parts = author.trim().split(/\s+/); // Split by whitespace
    if (parts.length === 1) return parts[0]; // Single name fallback

    const firstInitial = parts[0][0] + '.'; // First initial
    const lastName = parts[parts.length - 1]; // Always take the last part as the last name

    return `${firstInitial} ${lastName}`;
  }).join(', ');
};

function formatBibtex(bibtex, title) {
  const entries = {};
  const regex = /(\w+)\s*=\s*{([^}]*)}/g;
  let match;
  while ((match = regex.exec(bibtex)) !== null) {
    entries[match[1]] = match[2];
  }
  const requiredFields = ['title', 'author', 'booktitle', 'year'];
  const lines = [];

  // Log title if any required field is missing
  for (const field of requiredFields) {
    if (!entries[field]) {
      console.log(title);
    }
  }

  // Extract original entry type and citation key
  const headerMatch = bibtex.match(/^@(\w+)\s*{\s*([^,]+),/);
  const entryType = headerMatch ? headerMatch[1] : 'inproceedings';
  const citationKey = headerMatch ? headerMatch[2] : '';
  lines.push(`@${entryType}{${citationKey},`);
  // Add required fields in order
  requiredFields.forEach((field) => {
    if (entries[field]) {
      lines.push(`  ${field} = {${entries[field]}},`);
    }
  });
  // Add any other fields
  Object.keys(entries).forEach((key) => {
    if (!requiredFields.includes(key)) {
      lines.push(`  ${key} = {${entries[key]}},`);
    }
  });
  // Remove trailing comma on last line
  if (lines.length > 1) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  }
  // Close entry
  lines.push('}');
  return lines.join('\n');
}


const PublicationItem = ({ pub, isAlternate }) => {
  const [openSection, setOpenSection] = useState(null);
  const MAX_VISIBLE_PRESS = 4;
  const [showAllPress, setShowAllPress] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };
  const hasMedia = !!(pub.talk || pub.slides || (pub.press && pub.press.length > 0));

  return (
    // Two‑column grid: left = details, right = side‑column (awards top, toggles bottom)
    <div className="grid md:grid-cols-[4fr_auto] my-2 md:pl-3">
      
      {/* ───────── Left column ───────── */}
      <div className="">
        {/* Title */}
        <p className="publication-title ">{pub.name}</p>


        {/* Authors + venue */}
        <p className="">
          <span className='publication-author-names '>
            {abbreviateAuthors(pub.authors)}
          </span>
        </p>

<div className="mt-1 hidden md:flex flex-wrap items-center gap-4">
          <span className='publication-tag text-[#595959] small-text '>{pub.area}</span>
          <span className="publication-conference-name">{pub.venue}</span>


        </div>

        {/* Media row (Talk / Slides / Press) */}
        {(
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            {pub.pdf && (
              <>
                <a
                                   href={`${window.location.origin}/${pub.pdf}`}
                  className="publication-card-internal-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF
                </a>
                {pub.talk || pub.slides || pub.press ? (<div className="w-[1px] h-[20px] bg-[#28A199]"></div>) : null}
              </>
            )}
            {pub.talk && (
              <>
                <Link
                  to={pub.talk}
                  className="publication-card-internal-link "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk
                </Link>
                {pub.slides && (<div className="w-[1px] h-[20px] bg-[#28A199]"></div>)}
              </>
            )}
            {pub.slides && (
              <>
                <a
                  href={`${window.location.origin}/${pub.slides}`}                  
                  className="publication-card-internal-link "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slides
                </a>
              </>
            )}
            {pub.press && pub.press.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {pub.talk || pub.slides ? (<div className="w-[1px] h-[20px] bg-[#28A199]"></div>) : null}
                <span className="small-text text-[#595959] ">Press:</span>
                {(showAllPress ? pub.press : pub.press.slice(0, MAX_VISIBLE_PRESS)).map(
                  (press_item, index) => (
                    <Link
                      key={index}
                      to={press_item.link}
                      className='small-text text-[#595959] underline'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {press_item.publisher}
                    </Link>
                  )
                )}

                {pub.press.length > MAX_VISIBLE_PRESS && !showAllPress && (
                  <button
                    className="ml-2 text-sm text-blue-700 underline"
                    onClick={() => setShowAllPress(true)}
                  >
                    +{pub.press.length - MAX_VISIBLE_PRESS} more
                  </button>
                )}
                {showAllPress && pub.press.length > MAX_VISIBLE_PRESS && (
                  <button
                    className="ml-2 text-xs text-blue-700 underline"
                    onClick={() => setShowAllPress(false)}
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>



      {/* ───────── Right column ───────── */}
      <div className="flex flex-col text-right">
        {/* Awards (top of the column) */}
        {pub.awards && pub.awards.length > 0 && (
          <div className="">
            {pub.awards.map((award, index) => (
              <div key={index} className='flex gap-2 justify-end' >
                <img
                  src={TrophyIcon}
                  alt="Trophy background"

                /> <span className='text-[#A06C28] small-text'>{award}</span>
              </div>
            ))}
          </div>
        )}

        {/* Abstract / BibTeX toggles (bottom of the column) */}
        <div className="hidden md:flex gap-1 small-text text-[#595959] text-sm mt-auto justify-end">
          <button onClick={() => toggleSection("abstract")} className="hover:underline">
            Abstract
          </button>
          <span>|</span>
          <button onClick={() => toggleSection("bibtex")} className="hover:underline">
            BibTeX
          </button>
        </div>
      </div>

     

      {/* ───────── Collapsible sections (span both columns) ───────── */}
      
      {openSection === "abstract" && (
        <p className="mt-1 bg-gray-100 text-sm text-[#595959] p-2 border border-gray-300 rounded md:col-span-2">
          {pub.abstract}
        </p>
      )}
      {openSection === "bibtex" && (
        <div className="mt-1 relative bg-gray-100 text-xs border border-gray-300 rounded md:col-span-2">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={() => {
                navigator.clipboard.writeText(pub.bibtex).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000);
                });
              }}
              className="text-gray-900 m-0.5 hover:bg-gray-200 rounded-lg py-1 px-2 text-xs font-medium border border-gray-300 bg-white flex items-center"
            >
              {copied ? (
                "Copied!"
              ) : (
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
              )}
            </button>
          </div>
          <div className="overflow-auto max-h-64 p-2 pr-8">
            <pre id={`bibtex-block-${pub.name}`} className="text-[#595959] whitespace-pre-wrap">
              <code>{formatBibtex(pub.bibtex, pub.name)}</code>
            </pre>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default PublicationItem;