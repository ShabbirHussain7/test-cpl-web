import React from "react";
import { Link } from "react-router-dom";

export default function PersonCard({ person }) {
    return (
        <Link to={person.link} className="block">
            <div className="bg-white shadow-lg border border-black/10 text-center py-4 h-full flex flex-col justify-between">
                <div className="mx-auto overflow-hidden">
                    <img
                        src={"assets/" + person.avatar}
                        alt={`Portrait of ${person.name}`}
                        className="w-32 h-32 object-cover rounded mx-auto"
                    />
                </div>
                <div className="px-4">
                    <p className="font-medium text-base">{person.name}</p>
                    <p className="text-sm text-gray-600">
                        {person.position}
                        {!person.active && person["now at"] && (
                            <span className="text-xs text-gray-600 italic"> → {person["now at"]}</span>
                        )}
                    </p>
                </div>

            </div>
        </Link>
    );
}