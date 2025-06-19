import React from "react";
import { Link } from "react-router-dom";

export default function ToolCard({ url, name, description }) {
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
      <h3 className="text-[25px] font-bold  font-merriweather leading-[120%] text-[#121212]">{name}</h3>
      <p className="text-[16px] font-inter font-normal leading-[150%] text-[#121212]">{description}</p>
    </Link>
  );
}