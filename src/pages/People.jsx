import React from 'react';
import peopleData from '../data/people.json';
import { Link } from 'react-router-dom';
import PersonCard from '../components/PersonCard';
import DirectorCard from '../components/DirectorCard';

export default function People() {
  return (
    <main className="lg:px-20 lg:py-25 bg-[#fdfdfd]">
      <div>
        <section className="">

          <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr]'>

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

        

        <section>

          <h2 className="new-section-heading">Lab Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">
            {/* call personcard for each member */}
            {peopleData.Team.map((member, idx) => (
              PersonCard({ person: member, key: idx })
            ))}

          </div>



        </section>


      </div>
    </main>
  );
}
