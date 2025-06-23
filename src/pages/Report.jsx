import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';

export default function Report() {

  const { report } = useParams();
  console.log(`Fetching report: ${report}`);
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
    return <div className="section-container py-24 text-center">Page not found.</div>;
  }

  const metaFields = [
    { label: 'Affiliations', value: frontMatter.affiliations },
    { label: 'Authors', value: frontMatter.authors?.join(', ') },

    { label: 'Appearing in', value: frontMatter.appearing },
    { label: 'Research', value: frontMatter.research },
  ];

  return (
    <main className="body ">
      <section className='internal-container  lg:pt-25 lg:pb-4 !bg-[#fdfdfd]' >
        <div className="">
          <h1 className="new-section-heading">{frontMatter.title}</h1>
          <div className='mt-6 lg:flex lg:flex-row relative  '>
            <div className='max-w-[1060px]'>
              {frontMatter.date && <p className="small-text text-[#595959]">{frontMatter.date}</p>}
              {frontMatter.excerpt && (
                <p className="body">{frontMatter.excerpt}</p>
              )}
              {metaFields.map(({ label, value }) =>
                value ? (
                  <p key={label} className="body">
                    <span className='body-medium'>{label}:</span> {value}
                  </p>
                ) : null
              )}
              <div className='flex flex-row space-x-2 mt-2 text-[#28A199]'>
              {frontMatter.link && (
                <p >
                  <a
                    href={frontMatter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17827B] underline"
                  >
                    Download Full Paper
                  </a>
                </p>
              )}

             

              {frontMatter.video && (
                <p >
                   <span> | </span>
                  <a
                    href={frontMatter.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17827B] underline"
                  >
                    Watch Video
                  </a>
                </p>
              )}
              </div>
            </div>

          
          </div>
        </div>

      </section>
      <section className="lg:pt-11 lg:pb-25 !bg-[#E4F7F6]">
        <div className='internal-container'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}

          skipHtml={false}
          components={{
            h1: (props) => <h1 className="text-3xl font-merriweather font-bold my-4" {...props} />,
            h2: (props) => <h2 className="text-2xl font-merriweather font-bold my-4" {...props} />,
            h3: (props) => <h3 className="text-xl font-merriweather font-semibold my-3" {...props} />,
            h4: (props) => <h4 className="text-lg font-merriweather font-semibold my-2" {...props} />,
            p: (props) => <p className="my-2 text-gray-700" {...props} />,
            li: (props) => <li className="list-disc ml-6" {...props} />,
            a: (props) => <a className="text-blue-500 underline" {...props} />,
            img: (props) => <img className="my-4 mx-auto" {...props} />,
          }}
        >
          {markdownContent}
        </ReactMarkdown>
        </div>
      </section> 
    </main>
  );
}