import React from 'react';
import JoinUsCard from '../components/JoinUsCard';
import Handshake from '../../public/icons/handshake.svg';
import GraduationCap from '../../public/icons/graduation-cap.svg';

export default function JoinUs() {

  const joinUsData = [
    {
      title: 'Graduate Students',
      content: 'If you are interested in joining our lab as a graduate student, please include your transcripts, CV, and a paragraph explaining why our research and lab are of interest to you.  Take your time crafting a thoughtful and original statement that reflects your genuine interest and enthusiasm.',
    },
    {
      title: 'Undergraduate Students',
      content: 'In addition to your transcripts, CV, and statement of interest, please include any supporting documents or projects that demonstrate a solid understanding of the contents of courses like Intro to Computer Security, Intro to Operating Systems, or similar topics.',
    },
    {
      title: 'Visiting Students',
      subtitle: '(Especially from Political science, Journalism, and related fields)',
      content: 'We occasionally host visitors at our lab. If you would like to visit, please email us in advance. If you have a recommendation from someone Dr. Roya knows, kindly include their name in your email as well.'
        
    }];
  return (

    <section className='internal-container lg:py-25 py-20 text-[#121212]'>
      <h1 className="new-section-heading">Join Our Team</h1>
      <p className="mt-6">
        Interested in working with us? We welcome passionate students, researchers, and collaborators who want to make a difference in internet freedom and digital rights. You can reach out to us at: <span className='text-blue-700 underline'>ensafi@umich.edu
        </span>
      </p>

      <div className="">

        <div className="flex items-center mt-6">
          <img src={Handshake} alt="Handshake Icon" />
          <h4 className=" ml-2">For Collaborators</h4>
        </div>
        <br />
        <p>
          We collaborate with academics, NGOs, and industry on measurement, analysis, and policy. If you are interested in working with us, drop us an email!
        </p>


        <div className="flex items-center mt-6">
          <img src={GraduationCap} alt="Graduation Cap Icon" />
          <h4 className='ml-2'> For Students</h4>
        </div>

        <br />
        <p>
          Please make sure to read the following before you reach out.
        </p>
        <div
            className={`mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
          >
        {joinUsData.map((item, index) => (
          <JoinUsCard key={index} title={item.title} content= {item.content} subtitle={item.subtitle} />
          
        ))}
        </div>
        


      </div>
    </section>

  );
}
