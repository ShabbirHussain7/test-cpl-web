import React from "react";
import { Link } from "react-router-dom";

export default function PersonCard({ person }) {
    return (
        <Link to={person.link} className="min-h-[250px]">
            <div className="bg-[#fdfdfd] text-center p-5 h-full flex flex-col justify-between">
                <div className="mx-auto overflow-hidden">
                    <img
                        src={person.avatar}
                        alt={`Portrait of ${person.name}`}
                        className="w-32 h-32 object-cover  "
                    />
                </div>
                <div>
                    <p className="font-medium text-base">{person.name}</p>
                    <p className="text-sm text-gray-600">
                        {person.position}
                        
                    </p>
                    <p>{!person.active && person["now at"] && (
                            <span className="text-xs text-gray-600 italic"> Next Role: {person["now at"]}</span>
                        )}</p>
                </div>

            </div>
        </Link>
    );
}