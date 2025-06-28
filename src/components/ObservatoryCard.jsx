// src/components/InfoCard.jsx
import React from 'react';
import DataIcon from '../../public/icons/observatory/data.svg';
import DashboardIcon from '../../public/icons/observatory/dashboard.svg';
import DocumentationIcon from '../../public/icons/observatory/documentation.svg';

export default function InfoCard({
  icon,        // React component for the icon, e.g. an imported SVG
  title,       // string or JSX
  subtitle,    // string or JSX
  className = ''
}) {

   
    
  return (
    <div
      className={
        `max-w-[413px] p-6 flex items-center gap-4 border border-[#888888] bg-[#FDFDFD] ` +
        className
      }
    >
        <div className="flex-shrink-0 w-[52.5px] h-[46.7px]">
            
            <img src={icon} alt="icon" className="w-full h-full" />
         
        </div>
      <div className="text-[#595959]">
        <h5 className="">
          {title}
        </h5>
        <p className="">
          {subtitle}
        </p>
      </div>
    </div>
  );
}