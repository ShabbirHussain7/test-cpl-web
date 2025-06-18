

import React from 'react';

export default function JoinUsCard({ title, content, subtitle='' }) {
  return (
    <div
      className="
        
        p-8
        gap-2
        border border-[#888]
        bg-[#E4F7F6]
      "
    >
      <h5 >{title}</h5>
      {subtitle && <p className="body-medium pt-[1px]">{subtitle}</p>}
      <div className="body pt-2 flex-1 w-full text-[16px] leading-[1.5]">
        {content}
      </div>
    </div>
  );
}