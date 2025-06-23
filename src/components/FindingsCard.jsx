import React from "react";
import DOMPurify from 'dompurify';

import { Link } from "react-router-dom"; // Import Link component

// src/components/FindingsCard.jsx
export default function FindingsCard({
    title,
    citation,
    link,
    description,
  }) {
    return (
      <div className="w-[413px] p-6 flex flex-col gap-4 border border-[#888888] bg-[#FDFDFD]">
        <h6 className="text-[#28A199] font-serif text-[20px] font-normal leading-[24px] tracking-normal"
        dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(title) }}
        />

       
        <p className="body text-[#121212]"
           dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description)}}
        />
      </div>
    );
  }