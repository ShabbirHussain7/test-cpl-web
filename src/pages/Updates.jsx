import React from "react";
import homeData from "../data/home.json";
import { Link } from "react-router-dom";

export default function Updates() {
    return (
        <main className="pt-24 pb-4">
            <div className="page-container">
                <h1 className="heading-primary">Updates</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-[1fr_10fr] gap-y-2">
                    {homeData.lab_updates.map((update, idx) => (
                        <>
                            <div className="text-[#2D4D63] font-medium">{update.date.slice(0, 3) + " " + update.date.split(" ")[1]}</div>
                            <div>
                                <p className="text text-gray-700">{update.tagline} {update.link && (
                                    <Link to={update.link} target="_blank" rel="noopener noreferrer" className="underline text-[#1E3A4C] hover:text-[#12303F] transition">Read More</Link>
                                )}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>

        </main>
    );
}
// This is a placeholder component for the Updates page.