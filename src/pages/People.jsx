import React from 'react';
import peopleData from '../data/people.json';
import { Link } from 'react-router-dom';
import PersonCard from '../components/PersonCard';

export default function People() {
  return (
    <main className="pt-24 ">
      <section className="page-container pb-4">


        <section className="">
          <h1 className="heading-primary"> Our Team </h1>
          <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mb-4 '>


            <div className='w-full text-justify'>

              <h2 className="heading-secondary">Meet the Director</h2>
              <blockquote className="italic text-orange-800 border-l-4 border-orange-600 pl-4 mb-2">
                "We are a team of people from various backgrounds, including students, vulnerable users, journalists, activists, researchers and organizations from the technology industry and censorship research."
              </blockquote>
              <p>
                Dr. Roya Ensafi is an Associate Professor at the University of Michigan and the founder of the <strong>Censored Planet Lab</strong>. Her research focuses on network security, internet measurement, and digital rights. She is the founder of <strong>Censored Planet Observatory</strong>, the world’s first fully remote global censorship observatory, which has uncovered previously hidden censorship practices in countries like <strong>Russia</strong> and <strong>Kazakhstan</strong>. Her innovative research has challenged conventional assumptions about detecting censorship, enabling researchers to uncover previously hidden practices by authoritarian regimes.
              </p>
              <p className='py-2'>
                Dr. Ensafi’s contributions have been recognized with numerous prestigious awards, including the <strong>Alfred P. Sloan Research Fellowship</strong>, the <strong>NSF CAREER Award</strong>, and multiple <strong>IRTF Applied Networking Research Prizes</strong>. Her research has been featured in prominent publications such as <em>The New York Times</em>, <em>Wired</em>, and <em>Ars Technica</em>.
              </p>
              <div >
                <Link to="https://ensa.fi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Profile</Link>
              </div>

            </div>

            <div className='w-full flex justify-center md:justify-end '>
              <img
                src={"assets/" + peopleData.Director.avatar}
                alt="Portrait of Roya Ensafi"
                className="w-80 h-96 border border-white border-20 rounded shadow-lg object-cover object-right md:self-start"
              />
            </div>


          </div>

        </section>

        <section className="mb-12">
          <h2 className="heading-secondary">Lab Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
            {/* call personcard for each member */}
            {peopleData.Team.map((member, idx) => (
              PersonCard({ person: member, key: idx })
            ))}

          </div>


        </section>


      </section>
    </main>
  );
}
