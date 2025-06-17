import React from "react";
import { Link } from "react-router-dom";


export default function ResearchArea({ url, icon, label, name, description }) {
  return (
    <Link
      to={`/${url}`}
      className="
        relative
        flex flex-col items-start
        w-[413px]
        p-8
        gap-4
        hover:shadow-lg
        transition-shadow
        transform
        hover:scale-102
        transition-transform
        duration-300
      "
      style={{
        border: `1px solid var(--divider, #888)`,
        background: `var(--Background, #FDFDFD)`,
       
      }}
    >
      <div className="flex justify-center items-center w-[52.5px] h-[46.7px]">
        {icon && <img src={icon} alt="icon" />}
      </div>

      {label && (
        // <span className="absolute right-8 top-8 px-4 py-2 font-medium text-[14px] text-[#121212] bg-[#E4F7F6] gap-1">
        <span className="absolute right-8 top-8 px-4 py-1 font-medium text-[14px] text-white bg-[#28A199] gap-1">
          {label}
        </span>
      )}
      <h5 className="text-[25px] font-bold  font-merriweather leading-[120%] text-[#121212]">
        {name}
      </h5>
      <p className="text-[16px] font-inter font-normal leading-[150%] text-[#121212]">
        {description}
      </p>
    </Link>
  );
}