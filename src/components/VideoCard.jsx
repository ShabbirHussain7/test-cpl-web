import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
    const videoId = new URL(video.link).searchParams.get("v") || video.link.split("/").pop();
    return (
        <Link to={video.link} className="block transition transform hover:scale-[1.02]">
            <div className="bg-white shadow-md border border-black/10 p-6 h-full flex flex-col justify-between">
                <div className="overflow-hidden">
                    <div key={videoId} className="flex justify-center items-center">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                            title={video.title}
                            allowFullScreen
                            loading="lazy"
                            className="w-80 h-[200px]"
                        ></iframe>
                    </div>
                    <div className="pt-2">
                        <div className="text-gray-600 text-xs">
                            {video.date} | {video.presented_at}
                        </div>
                        <div className="pt-2">
                            <p className="">{video.title.slice(0, 65)}...</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}