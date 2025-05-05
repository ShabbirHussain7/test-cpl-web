import React from 'react';

export default function ContactCard({ icon: Icon, title, titleColor, borderColor, children, link, linkText, linkColor }) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow border-l-4 ${borderColor}`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`${titleColor} w-6 h-6`} />
        <h2 className={`text-xl font-semibold ${titleColor}`}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
