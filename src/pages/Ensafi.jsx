import React from "react";
import updateData from "../data/lab_updates.json";
import { Link } from "react-router-dom";
import TwitterIcon from "../../public/icons/person-details/x.svg?react";
import LinkedInIcon from "../../public/icons/person-details/linkedin.svg?react";
import WebIcon from "../../public/icons/person-details/web.svg?react";
import GoogleScholarIcon from "../../public/icons/person-details/google_scholar.svg?react";

/**
 * Stand‑alone profile page for Prof. Roya Ensafi.
 * This page is intentionally more detailed than the short “Meet the Director”
 * snippet on People.jsx but still excludes sections already covered on the
 * main lab site (publications, projects, team, etc.).  It focuses on a brief
 * bio plus a full “Teaching” section that does not exist elsewhere.
 */

/* ---------- DATA: Research highlights ---------- */
const highlights = [
  {
    name: "Censored Planet",
    url: "https://censoredplanet.org",
    blurb:
      "A global platform providing continuous data on Internet censorship practices in 220+ countries."
  },
  {
    name: "VPNalyzer",
    url: "https://vpnalyzer.org",
    blurb:
      "Multi‑pronged investigation of commercial VPN security and privacy, combining tooling, user studies, and provider surveys."
  },
  {
    name: "Splintering Net",
    url: "https://splintering.net",
    blurb:
      "Measuring how sanctions, regulations, and geo‑equity issues increasingly fragment users’ Internet experience."
  }
];

const courses = [
  {
    code: "EECS 388",
    title: "Introduction to Security",
    term: "Winter 2020, Fall 2022, Fall 2023",
    description:
      "This undergraduate course teaches the security mindset and introduces the principles and practices of computer security as applied to software, host systems, and networks.",
    prereqs: "EECS 281 required; EECS 201 and EECS 370 recommended."
  },
  {
    code: "EECS 588",
    title: "Computer and Network Security",
    term: "Fall 2020, Winter 2022",
    description:
      "An intensive graduate research seminar covering foundations, research literature, and current topics in computer systems security. Students gain hands‑on experience designing and evaluating secure systems.",
    prereqs:
      "EECS 482 Operating Systems, EECS 489 Computer Networks, EECS 388 Introduction to Security, or graduate standing."
  },
  {
    code: "EECS 598‑12",
    title: "Censorship & Privacy Tech",
    term: "Fall 2019",
    description:
      "Graduate special‑topic course on detecting and resisting online threats, including censorship detection and circumvention, web‑tracking counter‑measures, and anonymity systems such as Tor. Students complete original research projects.",
    prereqs:
      "Open to advanced undergraduates who have taken EECS 388 and (recommended) EECS 489, or graduate standing."
  }
];

export default function Ensafi() {
  return (
    <div>
      {/* ---------- HERO SECTION ---------- */}
      <section className="internal-container pt-20 lg:pt-25 bg-[#fdfdfd]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-10 items-start">
          {/* Portrait + social icons */}
          <div className="flex flex-col">
            <img
              src="people_imgs/image.png"
              alt="Portrait of Roya Ensafi"
              className="max-w-xs w-full object-cover"
            />
            <div className="flex space-x-3 mt-3">
              <a href="https://ensa.fi" target="_blank" rel="noopener noreferrer">
                <WebIcon />
              </a>
              <a
                href="https://twitter.com/royaensafi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
              <a href="https://scholar.google.com/citations?user=1eDQjxcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                        <GoogleScholarIcon />
                    </a>
              <a
                href="https://www.linkedin.com/in/roya-ensafi-954b71309"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Bio & quick links */}
          <div>
            <h2 className="new-section-heading mb-4">Roya Ensafi</h2>

            <p className="body">
              I am <strong>Morris Wellman Associate Professor</strong> of{" "}
              <em>Computer Science &amp; Engineering</em> at the University of
              Michigan and founder of <em>Censored Planet</em>. My research
              focuses on Internet security, privacy, and online censorship.

              I develop data‑driven approaches to detect and analyze
              network interference worldwide and have received the <Link to="https://cse.engin.umich.edu/stories/roya-ensafi-selected-for-sloan-fellowship" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#28A199' }}>
                    {' '}Sloan Research Fellowship
                  </Link>,{' '}
                  <Link to="https://cse.engin.umich.edu/stories/roya-ensafi-receives-nsf-career-award-for-efforts-to-combat-censorship-worldwide" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#28A199' }}>
                    NSF CAREER
                  </Link>,{' '}
                  <Link to="https://cse.engin.umich.edu/stories/three-cse-faculty-selected-for-google-faculty-research-awards" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#28A199' }}>
                    Google Faculty Research Award
                  </Link>,{' '}
                  multiple{' '}
                  <Link to="https://www.irtf.org/anrp/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#28A199' }}>
                    IRTF Applied Networking Research Prizes
                  </Link>,{' '}
                  and the{' '}
                  <Link to="https://cse.engin.umich.edu/stories/roya-ensafi-named-inaugural-consumer-reports-digital-lab-fellow" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#28A199' }}>
                    Consumer Reports Digital Lab Fellowship
                  </Link>
                  .{' '}
            </p>

            {/* Quick positions */}
            <ul className="body-small mt-4 list-disc list-inside space-y-1">
              <li>
                <a
                  href="https://www.opentech.fund/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  OTF Advisory Council&nbsp;
                </a>
              </li>
              <li>
                Founder &amp; Director,{" "}
                <a
                  href="https://censoredplanet.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Censored Planet Lab
                </a>
              </li>
              <li>
                <a
                  href="https://safecomputing.umich.edu/events/dissonance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Dissonance Organizing Committee
                </a>
              </li>
            </ul>


            {/* External profiles */}
            <div className="body-small mt-4">
              More about me:&nbsp;
              <a
                href="https://scholar.google.com/citations?user=1eDQjxcAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Scholar
              </a>
              ,&nbsp;
              <a
                href="https://cse.engin.umich.edu/stories/her-fight-for-your-rights"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                UMich Stories
              </a>
              ,&nbsp;
              <a
                href="https://www.mlive.com/news/2023/07/from-an-office-in-ann-arbor-fighting-internet-censorship-around-the-world.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                MLive News
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <a href="mailto:ensafi@umich.edu" className="primary-button">
                Email
              </a>
              <a
                href="https://ensa.fi/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
              >
                View&nbsp;CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- RESEARCH HIGHLIGHTS ---------- */}
      <section className="internal-container py-12">
        <h2 className="new-section-heading">Research Highlights</h2>

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {highlights.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-300 hover:shadow-sm transition p-6"
            >
              <h4 className="mb-2">{p.name}</h4>
              <p className="body-small text-gray-700">{p.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- LAB UPDATES ---------- */}
      <section className="internal-container py-12">
        <h2 className="new-section-heading">Updates from Lab</h2>

        <ul className="mt-8 space-y-4">
          {updateData.slice(0, 6).map((u, i) => (
            <li
              key={i}
              className="grid grid-cols-[9ch_1fr] gap-6 border-b border-gray-100 pb-3"
            >
              <span className="text-xs font-medium text-gray-500">{u.date}</span>
              <Link
                to={u.link}
                target="_blank"
                rel="noopener noreferrer"
                className="body-small hover:underline"
              >
                {u.tagline}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link to="/updates" className="secondary-button">
            View all updates →
          </Link>
        </div>
      </section>

      {/* ---------- TEACHING SECTION ---------- */}
      <section className="internal-container pt-12 pb-20">
        <h2 className="new-section-heading">Teaching</h2>

        <div className="mt-10 flex flex-col gap-12">
          {courses.map(({ code, title, term, description, prereqs }, idx) => (
            <div key={idx}>
              <h4>
                {code} {title}
              </h4>
              <p className="body-medium mb-2">
                University of Michigan{" "}
                <span className="small-text">[{term}]</span>
              </p>
              <p className="body">
                <strong>Course Description:</strong> {description}
              </p>
              <p className="body mt-2">
                <strong>Prerequisites:</strong> {prereqs}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}