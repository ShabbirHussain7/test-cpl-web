import React from "react";
import { Link } from "react-router-dom";

export default function ToolCard({ url, name, icon, description }) {
  return (
    <Link
      to={url}
      className="
        relative
        flex flex-col items-start
        lg:min-h-[166px]
        px-6
        py-4
        gap-2
        hover:shadow-lg
        transition-shadow
        transform
        hover:scale-102
        transition-transform
        duration-300
      "
      target="_blank"
      rel="noopener noreferrer"
      style={{
        border: `1px solid var(--divider, #888)`,
        background: `var(--Background, #FDFDFD)`,
       
      }}
    >
      
    <div className="flex items-center w-full justify-between space-x-2">
    <h3 className="md:text-[25px] text-[20px] font-bold  font-merriweather leading-[120%] text-[#121212]">{name}</h3>
    <img src={icon} alt="Logo" className="md:h-10 h-8 md:w-10 w-8  cursor-pointer" /> 
    </div>
    
      <p className="text-[16px] font-inter font-normal leading-[150%] text-[#121212]">{description}</p>
    </Link>
  );
}