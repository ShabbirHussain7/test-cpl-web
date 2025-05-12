import React, { useState } from 'react';


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

function formatBibtex(bibtex) {
  const lines = [];
  const regex = /(\w+)\s*=\s*{([^}]*)}/g;
  let match;

  lines.push('@inproceedings{');
  while ((match = regex.exec(bibtex)) !== null) {
    const key = match[1];
    const value = match[2];
    lines.push(`  ${key} = {${value}},`);
  }
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, ''); // Remove trailing comma from the last line
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
    <div className="grid md:grid-cols-[4fr_auto] gap-x-4 gap-y-2">
      {/* ───────── Left column ───────── */}
      <div className="">
        {/* Title */}
        <a href={pub.pdf} className="hover:underline">
          <p className="text-base font-semibold">{pub.name}</p>
        </a>

        {/* Authors + venue */}
        <p className="text-sm text-gray-700">
          {abbreviateAuthors(pub.authors)} |{" "}
          <span className="underline">{pub.venue}</span>
        </p>

        {/* Media row (Talk / Slides / Press) */}
        {hasMedia && (
          <div className="flex flex-wrap items-center gap-1 text-sm">
            {pub.talk && (
              <>
                <a
                  href={pub.talk}
                  className="text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk
                </a>
                <span>|</span>
              </>
            )}
            {pub.slides && (
              <>
                <a
                  href={pub.slides}
                  className="text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slides
                </a>
              </>
            )}
            {pub.press && pub.press.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {pub.talk || pub.slides ? <span>|</span> : null}
                <span className="font-semibold underline">Press:</span>
                {(showAllPress ? pub.press : pub.press.slice(0, MAX_VISIBLE_PRESS)).map(
                  (press_item, index) => (
                    <a
                      key={index}
                      href={press_item.link}
                      className="px-2 py-0.5 bg-gray-200 text-xs text-black rounded hover:bg-gray-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {press_item.publisher}
                    </a>
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
      <div className="min-w-[220px] flex flex-col text-right">
        {/* Awards (top of the column) */}
        {pub.awards && pub.awards.length > 0 && (
          <div className="">
            {pub.awards.map((award, index) => (
              <div key={index} className="text-yellow-700 font-semibold text-sm">
                🏆 {award}
              </div>
            ))}
          </div>
        )}

        {/* Abstract / BibTeX toggles (bottom of the column) */}
        <div className="flex gap-1 text-sm mt-auto justify-end">
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
        <p className="bg-gray-100 text-sm text-gray-800 p-2 border border-gray-300 rounded md:col-span-2">
          {pub.abstract}
        </p>
      )}
      {openSection === "bibtex" && (
        <div className="relative bg-gray-100 text-xs border border-gray-300 rounded md:col-span-2">
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
            <pre id={`bibtex-block-${pub.name}`} className="whitespace-pre-wrap">
              <code>{formatBibtex(pub.bibtex)}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicationItem;