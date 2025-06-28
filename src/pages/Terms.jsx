

import React from 'react';

export default function Terms() {
  return (
    <div className=" pt-[70px]">
      <section className="text-[#2D4D63] text-center py-8">
        <div className="max-w-screen-lg mx-auto px-6">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
      </section>

      <section className="max-w-screen-lg mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Use of Services</h2>
        <p className="mb-4 text-gray-700">You must follow all policies made available to you within the Services. You also agree:</p>
        <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
          <li>to use the Services only for lawful purposes, in a manner which is not expressly prohibited by these terms, and in a manner that does not infringe the rights or interests of University or third parties;</li>
          <li>to abstain from any activity that could damage, overload, harm, or impede the normal functioning of the Services;</li>
          <li>to not attempt to gain or give others unauthorized access to our Services, our website, or any server, computer, or database connected to our Services;</li>
          <li>not to rent, loan, sub-license, lease, attempt to grant other rights to Content or material based on the Content to third parties;</li>
          <li>to follow community best practices in responsibly disclosing any found vulnerabilities (e.g., <a className="text-blue-600 underline" href="https://www.cert.org/vulnerability-analysis/vul-disclosure.cfm" target="_blank" rel="noopener noreferrer">CERT Vulnerability Disclosure</a>).</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Attribution</h2>
        <p className="mb-8 text-gray-700">Attribution is required for material based on our Content. Academic works should cite Censored Planet and link to the Censored Planet website.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Disclaimer</h2>
        <p className="mb-8 text-gray-700">Your access to and use of the Services is at your own risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. THE REGENTS OF THE UNIVERSITY OF MICHIGAN AND ITS AFFILIATES, AGENTS, PARTNERS, AND SUBSIDIARIES DISCLAIM ANY WARRANTIES, EXPRESS OR IMPLIED.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">User Responsibilities</h2>
        <p className="mb-8 text-gray-700">You are responsible for safeguarding any credentials associated with your account. Use a strong password unique to our Services.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Copyright Infringement</h2>
        <p className="mb-8 text-gray-700">If you believe that content on our site violates your copyright, please notify us at <a href="mailto:censoredplanet@umich.edu" className="text-blue-600 underline">censoredplanet@umich.edu</a>.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Information We Collect</h2>
        <p className="mb-8 text-gray-700">We may monitor use of the Services to provide, protect, and improve them. We may share anonymized data publicly. When you contact us, we may retain communications to address issues and improve services.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Feedback</h2>
        <p className="mb-8 text-gray-700">Any feedback you provide regarding the Services is voluntary and may be used without obligation to you.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Termination</h2>
        <p className="mb-8 text-gray-700">You may terminate this agreement by discontinuing use of the Services. We may terminate access to Services at any time without notice.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Changes</h2>
        <p className="mb-8 text-gray-700">We may modify these terms at any time. Continued use of Services after modifications constitutes agreement to the new terms.</p>

        <h2 className="text-2xl font-bold mb-2 text-[#2D4D63]">Contact Us</h2>
        <p className="mb-8 text-gray-700">Please contact us at <a href="mailto:censoredplanet@umich.edu" className="text-blue-600 underline">censoredplanet@umich.edu</a> with any questions or concerns about these terms.</p>
      </section>
    </div>
  );
}