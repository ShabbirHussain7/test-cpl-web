import React from "react";
import { Link } from "react-router-dom";

export default function ResearchArea({ url, name, description, color }) {
  return (
    <Link
      to={`/${url}`}
      className="p-2 pl-3 pb-4 border-l-4 bg-white shadow-md rounded hover:underline"
      style={{ borderColor: color }}
    >
      <h4 className="text-lg font-semibold mb-2">{name}</h4>
      <p className="text-gray-700 text-sm">{description}</p>
    </Link>
  );
}