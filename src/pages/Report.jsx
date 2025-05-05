import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';

export default function Report() {
  const { report } = useParams();
  const [frontMatter, setFrontMatter] = useState({});
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        const mdModule = await import(`../reports/${report}.md`);
        const response = await fetch(mdModule.default);
        let rawText = await response.text();

        // Strip any Kramdown attribute lists like "{:.center}"
        rawText = rawText.replace(/\{\:\s*[^}]+\}/g, '');
        const { data, content } = matter(rawText);
        setFrontMatter(data);
        setMarkdownContent(content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMarkdown();
  }, [report]);

  if (loading) {
    return <div className="section-container py-24 text-center">Loading...</div>;
  }

  if (!markdownContent) {
    return <div className="section-container py-24 text-center">Report not found.</div>;
  }

  const metaFields = [
    { label: 'Affiliations', value: frontMatter.affiliations },
    { label: 'Authors', value: frontMatter.authors?.join(', ') },
    { label: 'Writers', value: frontMatter.writers },
    { label: 'Appearing in', value: frontMatter.appearing },
    { label: 'Research', value: frontMatter.research },
  ];

  return (
    <main className="pt-24 ">
      <section className="page-container mb-10">
        <div className="mb-6">
          <h1 className="heading-primary">{frontMatter.title}</h1>
          {frontMatter.date && <p className="text-gray-500 text-sm">{frontMatter.date}</p>}
          {frontMatter.excerpt && (
            <p className="mt-2 text-lg text-gray-700">{frontMatter.excerpt}</p>
          )}
          {metaFields.map(({ label, value }) =>
            value ? (
              <p key={label} className="mt-1 text-gray-600 text-sm">
                <strong>{label}:</strong> {value}
              </p>
            ) : null
          )}
          {frontMatter.link && (
            <p className="mt-2">
              <a
                href={frontMatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2D4D63] underline"
              >
                Download PDF
              </a>
            </p>
          )}
        </div>

        {frontMatter.video && (
          <div className="flex justify-center my-8">
            <div className="w-[560px] h-[315px] relative">
              <iframe
                src={frontMatter.video}
                title="Embedded video"

                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}

          skipHtml={false}
          components={{
            h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
            h2: (props) => <h2 className="text-2xl font-bold my-4" {...props} />,
            h3: (props) => <h3 className="text-xl font-semibold my-3" {...props} />,
            h4: (props) => <h4 className="text-lg font-semibold my-2" {...props} />,
            p: (props) => <p className="my-2 text-gray-700" {...props} />,
            li: (props) => <li className="list-disc ml-6" {...props} />,
            a: (props) => <a className="text-blue-500 underline" {...props} />,
            img: (props) => <img className="my-4" {...props} />,
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </section>
    </main>
  );
}