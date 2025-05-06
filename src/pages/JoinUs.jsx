import React from 'react';
import { GraduationCap, Handshake } from 'lucide-react';
import ContactCard from '../components/ContactCard';

export default function JoinUs() {
  return (
    <main className="pt-24">
      <section className="page-container">
        <h1 className="heading-primary">Join Us</h1>
        <p className="mb-5 paragraph">
          Interested in working with us? We welcome passionate students, researchers, and collaborators who want to make a difference in internet freedom and digital rights. You can reach out to us at: <span className='text-blue-700 underline'>ensafi@umich.edu
          </span>
        </p>

        <div className="space-y-8 pb-16">
        <ContactCard
            icon={Handshake}
            title="For Collaborators"
            titleColor="text-orange-800"
            borderColor="border-orange-700"
          
          >
            <p>
              We collaborate with academics, NGOs, and industry on measurement, analysis, and policy. If you have a project idea, we’d love to hear from you.
            </p>
          </ContactCard>
          <ContactCard
            icon={GraduationCap}
            title="For Students"
            titleColor="text-blue-800"
            borderColor="border-blue-700"
          >
            <p>
              Please make sure to read the following before you reach out.
            </p>
            <br />
            <strong>Graduate Students: </strong>
            <p>In your email please include your transcripts, CV, and a paragraph stating why my research and lab are of interest to you. Please be sure to take time on your statement and use your own words.</p>
            <br />
            <strong>Undergraduate Students: </strong>
            <p> In addition to the information above, please also include any supporting document or project that can show me you have a good grasp on the contents of Intro to Computer Security, and Intro to Operating System or any similar courses.</p>

            <br />
            <strong>Visiting Students: </strong> <em>(Especially from Political science, Journalism, and related fields)            </em>
            <p> I am happy to be able to occasionally host visitors. If you would like to visit our lab, please email us in advance. If you have a recommendation from someone Dr. Roya knows, please be sure to include their name in your email as well.
            </p>

          </ContactCard>

         
        </div>
      </section>
    </main>
  );
}
