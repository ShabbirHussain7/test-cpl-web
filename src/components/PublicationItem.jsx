import React, { useState } from 'react';


const abbreviateAuthors = (authorStr) => {
  return authorStr.split(',').map((author) => {
    const parts = author.trim().split(' ');
    if (parts.length === 1) return author; // single name fallback
    const firstInitial = parts[0][0] + '.';
    //drop middle names
    if (parts.length > 2) {
      return `${firstInitial} ${parts[1]}`;
    }
    // If there are no middle names, just return the first initial and last name

    const lastName = parts.slice(1).join(' ');
    return `${firstInitial} ${lastName}`;
  }).join(', ');
};


const PublicationItem = ({ pub, isAlternate }) => {
  const [openSection, setOpenSection] = useState(null);
  const MAX_VISIBLE_PRESS = 4;
  const [showAllPress, setShowAllPress] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div >
      <div className="flex justify-between items-start">
        {/* Left side: name, authors, venue */}
        <div className=" ">
          <p className="text-base font-semibold">{pub.name}</p>
          <p className="text-sm text-gray-700">{abbreviateAuthors(pub.authors)}  | <span className="underline" >{pub.venue}</span ></p>
        </div>

        {/* Right side: awards */}
        {pub.awards && pub.awards.length > 0 && (
          <div className="min-w-[200px] text-right">
            {pub.awards.map((award, index) => (
              <div key={index} className="text-yellow-700 font-semibold text-sm">
                🏆 {award}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rest of your code remains the same */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-wrap items-center gap-1 text-sm order-2 md:order-1 mt-2 md:mt-0.25">
          <a href={pub.pdf} className="text-blue-700 underline">PDF</a>
          <span className="mx-1">|</span>
          <a href={pub.talk} className="text-blue-700 underline">Talk</a>
          <span className="mx-1">|</span>
          <a href={pub.slides} className="text-blue-700 underline">Slides</a>
          {pub.press && pub.press.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="mx-1">|</span>
              <span className="font-semibold underline">Press:</span>
              {(showAllPress ? pub.press : pub.press.slice(0, MAX_VISIBLE_PRESS)).map((press_item, index) => (
                <a
                  key={index}
                  href={press_item.link}
                  className="px-2 py-0.4 bg-gray-200 text-xs text-black rounded hover:bg-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {press_item.publisher}
                </a>
              ))}
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
        <div className="flex gap-1 text-sm order-1 md:order-2">
          <button onClick={() => toggleSection('abstract')} className="hover:underline">
            {openSection === 'abstract' ? 'Abstract' : 'Abstract'}
          </button>
          <span className="mx-1">|</span>
          <button onClick={() => toggleSection('bibtex')} className="hover:underline">
            {openSection === 'bibtex' ? 'BibTeX' : 'BibTeX'}
          </button>
        </div>
      </div>

      {openSection === 'abstract' && (
        <p className="text-sm text-gray-800 mt-2">{pub.abstract}</p>
      )}
      {openSection === 'bibtex' && (
        <div className="relative bg-gray-100 text-xs mt-2 border border-gray-300 rounded">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={() => {
                navigator.clipboard.writeText(pub.bibtex).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
              className="text-gray-900 m-0.5 hover:bg-gray-200 rounded-lg py-1 px-2 text-xs font-medium border border-gray-300 bg-white flex items-center"
            >
              <svg className="w-3 h-3 mr-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
              {copied ? "Copied" : ""}
            </button>
          </div>
          <div className="overflow-scroll max-h-64 p-2 pt-8">
            <pre id={`bibtex-block-${pub.name}`} className="whitespace-pre-wrap"><code>{pub.bibtex}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicationItem;