import React from "react";
import { Link } from "react-router-dom";

export default function ToolCard({ url, name, description }) {
  return (
    <Link
      to={url}
      className="p-5 bg-white shadow-md rounded hover:underline"
    >
      <h4 className="text-xl font-semibold mb-2">{name}</h4>
      <p className="text-gray-700 ">{description}</p>
    </Link>
  );
}