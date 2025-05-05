import React from "react";
import { Link } from "react-router-dom";
export default function ResearchArea({ url, name, description }) {

  return (
    <Link to={`/${url}`} className="pb-4 border-b border-black hover:underline">
      <h4 className="text-lg font-semibold mb-2 ">{name}</h4>
      <p className="text-gray-700 text-sm">{description}</p>
    </Link>
  );
}
