import { useEffect, useState } from 'react';

export default function V({ videoId }) {
  const [meta, setMeta] = useState<{ title: string; thumbnail: string } | null>(null);

  useEffect(() => {
    // oEmbed doesn’t require an API key
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then((data) => {
        setMeta({
          title: data.title,
          thumbnail: data.thumbnail_url,
        });
      })
      .catch(err => {
        console.error('Failed to fetch YouTube oEmbed:', err);
      });
  }, [videoId]);

  if (!meta) return null; // or a spinner/skeleton

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative group cursor-pointer">
        {/* Thumbnail */}
        <img
          src={meta.thumbnail}
          alt={meta.title}
          className="w-full block"
        />
        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-16 h-16 text-white drop-shadow-lg"
            viewBox="0 0 68 48"
            fill="currentColor"
          >
            <path d="M66.52 7.02a8.272 8.272 0 00-5.82-5.84C56.35.64 34 .64 34 .64S11.65.64 5.18 1.18A8.272 8.272 0 00-.64 7.02C-.64 7.02 0 24 0 24s0 16.98.54 26.7a8.272 8.272 0 005.82 5.84c4.35.54 26.7.54 26.7.54s22.35 0 26.7-.54a8.272 8.272 0 005.82-5.84C68 40.98 68 24 68 24s0-16.98-1.48-16.98zM27 33V15l18 9-18 9z"/>
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-snug">
          {meta.title}
        </h3>
      </div>
    </div>
  );
}