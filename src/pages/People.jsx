import React from 'react';
import peopleData from '../data/people.json';
import { Link } from 'react-router-dom';
import PersonCard from '../components/PersonCard';
import DirectorCard from '../components/DirectorCard';

export default function People() {
  return (
    <main className="pt-10">
      <div>
        <section className="lg:px-20 lg:pt-15 bg-[#fdfdfd] ">

          <div className='grid grid-cols-1 md:grid-cols-[5fr_2fr] gap-0'>


            <div className=''>
              <h2 className="new-section-heading">About Us</h2>
              <div className="body mt-6">
                <p >
                  Censored Planet is a research lab that investigates how internet access is being shaped and restricted around the world. As censorship tactics become more complex and harder to detect, we develop new ways to study these systems and understand who they affect. We focus on internet measurement, network security, and privacy to produce research and tools that support journalists, civil society, and the broader internet freedom community.

                </p>
                <br />

                <p>
                  Our approach to research has been defined by a combination of perseverance, choosing pragmatic problems, and enthusiastically leading collaborations within academia and beyond. Perseverance has
                  enabled us to take research efforts all the way from novel concepts to operating production platforms with global reach. Choosing pragmatic problems has ensured that our work is not only academically novel but also serves the needs
                  of real people. Finally, what most defines our style of problem solving is that it involves contributions from many kinds of people.
                </p>
              </div>
            </div>

            <img
              src="background/about-us-bg.svg"
              alt="Portrait of Roya Ensafi"
              className='object-cover h-full w-full'

            />
          </div>

        </section>
        <section className="lg:px-20 lg:py-10 bg-[#fdfdfd] ">

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-[35px]'>

            <DirectorCard />
            <div className=''>
              <h2 className="new-section-heading">Meet the Director</h2>
              <div className="body mt-6">
                <p >
                  Roya Ensafi is a
                  {' '}
                  <Link to={'https://cse.engin.umich.edu/people/honors-and-awards/faculty-honors-and-awards/morris-wellman-faculty-development-professorships/'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline text-[#28A199]'>
                    Morris Wellman
                  </Link> <strong>Associate Professor</strong> of <em>Computer Science and Engineering</em> at the
                  {' '}
                  <strong>University of Michigan</strong>
                  ,
                  where her research focuses on <em>Internet Security</em> and <em>Privacy</em>, with the goal of creating techniques and systems to better protect users online. She is particularly passionate about <em>online censorship</em>, <em>geo-discrimination</em>, <em>surveillance</em>, and related threats to <em>Internet freedom</em>.
                </p>
                <br />
                <p>
                  Prof. Ensafi is the founder of <em>Censored Planet</em>, a global censorship observatory. She has studied Russia’s throttling of Twitter, HTTPS interception in Kazakhstan, and China’s Great Cannon attack, among many other instances of network interference. She is a recipient of the
                  <Link to="https://cse.engin.umich.edu/stories/roya-ensafi-selected-for-sloan-fellowship" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#28A199' }}>
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
                  Her work has been cited in popular publications such as
                  {' '}<em>The New York Times</em>, <em>Newsweek</em>, <em>Business Insider</em>, <em>Wired</em>, and <em>Ars Technica</em>.
                </p>

              </div>
            </div>




          </div>

        </section>

        <section className="lg:px-20 lg:pt-10 lg:pb-25 !bg-[#E4F7F6]" >
          <h2 className="new-section-heading">Our Team</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">

            {peopleData.Team.map((member, idx) => (
              PersonCard({ person: member, key: idx })
            ))}

          </div>
        </section>


      </div>
    </main>
  );
}
