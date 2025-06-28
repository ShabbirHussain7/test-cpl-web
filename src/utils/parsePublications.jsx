import matter from 'gray-matter';

export function parsePublications(markdownFiles) {
  const parsedPublications = Object.values(markdownFiles).map((raw) => {
    const { data } = matter(raw);
    if (data.collaborators && Array.isArray(data.collaborators)) {
      data.authors = data.collaborators.join(', ');
    }
    if (data.publisher) {
      data.venue = data.publisher;
    }
    data.pdf = data.pdf || '';
    data.talk = data.talk || '';
    data.slides = data.slides || '';
    data.bibtex = data.bibtex || '';
    data.abstract = data.abstract || '';
    data.category = data.category || '';
    data.year = data.date ? new Date(data.date).getFullYear() : 'Unknown';
    return data;
  });

  const publicationsByYear = parsedPublications.reduce((acc, pub) => {
    const year = pub.date ? new Date(pub.date).getFullYear() : 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {});

  return publicationsByYear;
}
