import React from "react";
import updateData from "../data/lab_updates.json";
import { Link } from "react-router-dom";

export default function Updates() {
   
    return (
        <main className="pt-24 pb-4">
            <div className="page-container">
                <h1 className="heading-primary">Updates</h1>

                <div className="">
                    {updateData.map((update, idx) => (
                        <div key={idx} className={idx % 2 === 0 ? "" : "bg-gray-100"} >
                            <div className="border-b border-gray-200 py-1 w-full">
                                {/* leading-none reduces line height to minimum. Don't know why the extra spacing was appearing after date */}
                                <div className="text-xs text-gray-400 leading-none"> 
                                    {update.date.slice(0, 3) + " " + update.date.split(" ")[1]}
                                </div>
                                <div>
                                    <Link
                                        to={update.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-blue-900 hover:underline"
                                    >
                                        {update.tagline}
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
