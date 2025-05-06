import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

export default function Research() {
    const { area } = useParams();
    const [frontMatter, setFrontMatter] = useState({});
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        async function fetchMarkdown() {
            try {
                const mdModule = await import(`../research/${area}.md`);
                const response = await fetch(mdModule.default);
                let rawText = await response.text();

                // Strip any Kramdown attribute lists like "{:.center}"
                rawText = rawText.replace(/\{\:\s*[^}]+\}/g, '');
                const { data, content } = matter(rawText);
                setFrontMatter(data);

                const tree = unified().use(remarkParse).parse(content);
                const sectionList = [];
                let current = null;
                tree.children.forEach((node) => {
                    if (node.type === 'heading' && node.depth === 2) {
                        if (current) sectionList.push(current);
                        current = { title: node.children.map(n => n.value).join(''), content: '' };
                    } else if (current) {
                        current.content += content.slice(node.position.start.offset, node.position.end.offset);
                    }
                });
                if (current) sectionList.push(current);
                setSections(sectionList);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchMarkdown();
    }, [area]);

    if (loading) {
        return <div className="page-container py-24 text-center">Loading...</div>;
    }

    if (sections.length === 0) {
        return <div className="page-container py-24 text-center">Area not found.</div>;
    }

    return (
        <main className="pt-24">
            <section className="page-container pb-5">
                <h1 className="heading-primary">{frontMatter.title}</h1>
                <section>
                    {sections.map((sec, idx) => (
                        <div key={idx} className="mb-4">
                            <h2 className="heading-secondary">{sec.title}</h2>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                skipHtml={false}
                                components={{
                                    h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
                                    h2: (props) => <h2 className="text-2xl font-bold my-4" {...props} />,
                                    h3: (props) => <h3 className="text-xl font-semibold my-3" {...props} />,
                                    h4: (props) => <h4 className="text-lg font-semibold my-2" {...props} />,
                                    p: (props) => <p className="paragraph" {...props} />,
                                    li: (props) => <li className="list-disc pl-4 ml-4 my-2 paragraph" {...props} />,
                                    a: (props) => <a className="text-blue-500 underline" {...props} />,
                                }}
                            >
                                {sec.content}
                            </ReactMarkdown>
                        </div>
                    ))}
                </section>
            </section>
        </main>
    );
}