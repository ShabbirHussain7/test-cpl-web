import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';
import { parsePublications } from '../utils/parsePublications';
import PublicationItem from '../components/PublicationItem';
import NotFound from './NotFound';

const redirectMap = {
  'satellitev2': 'https://github.com/censoredplanet/censoredplanet/issues/12',
  'hyperquackv2': 'https://github.com/censoredplanet/censoredplanet/issues/16'
};



export default function Projects() {

  const { proj } = useParams();
  console.log(`Fetching proj: ${proj}`);
  const [frontMatter, setFrontMatter] = useState({});
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectURL = redirectMap[proj];
    if (redirectURL) {
      window.location.href = redirectURL;
    }
    if (redirectMap[proj]) {
      return <p>Redirecting to external project page…</p>;
    }
  
    async function fetchMarkdown() {
      try {

        const mdModule = await import(`../projects/${proj}.md`);
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
  }, [proj]);

  if (loading) {
    return <div className="section-container py-24 text-center">Loading...</div>;
  }

  if (!markdownContent) {
    return <NotFound />; 
  }
  //   // read markdown files that end with -homepage.md
  const allMarkdownFiles = import.meta.glob('../publications/*_project.md', { query: '?raw', import: 'default', eager: true });

  const markdownFiles = Object.fromEntries(
    Object.entries(allMarkdownFiles).filter(([path]) =>
      path.includes(`-${proj}_project.md`)
    )
  );
  const selected_publications = parsePublications(markdownFiles);


  return (
    <main className="body ">
      <section className='internal-container  lg:pt-25 pt-20 pb-5 !bg-[#fdfdfd]' >
        <div className="">
          <h1 className="new-section-heading">{frontMatter.title}</h1>
          <div className='mt-6 lg:flex lg:flex-row relative  '>
            <div className='max-w-[1060px]'>
             
              {frontMatter.excerpt && (
                <p className="body">{frontMatter.excerpt}</p>
              )}       
            </div>

          
          </div>
        </div>

      </section>
      <section className="pt-5 lg:pb-25 pb-20 !bg-[#E4F7F6]">
        <div className='internal-container'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}

          skipHtml={false}
          components={{
            h1: (props) => <h1 className="text-3xl font-merriweather font-bold my-4" {...props} />,
            h2: (props) => <h5 className="my-4" {...props} />,
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
        <h5 className='my-4'>Publications </h5>
        <table className="w-full !bg-[#fdfdfd]">
              <tbody>
                {Object.entries(selected_publications)
                  .sort((a, b) => b[0] - a[0])
                  .map(([year, pubs]) =>
                    pubs.map((pub, idx) => (
                      <tr key={`${year}-${idx}`} className="border-b border-t border-[#888]">
                        <td className="hidden md:table-cell text-center md:w-[90px] md:border-r border-[#888] align-top pt-2">
                          {pub.year}
                        </td>
                        <td className='pr-4' >
                          <PublicationItem key={idx} pub={pub}/>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
        </div>
        
      </section> 
    </main>
  );
}