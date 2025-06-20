import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
    const videoId = new URL(video.link).searchParams.get("v") || video.link.split("/").pop();
    return (
        <Link to={video.link} className="block transition transform hover:scale-[1.02] bg-[#fdfdfd]">
            <div className="p-6 h-full flex flex-col justify-between">
                <div className="overflow-hidden">
                    <div key={videoId} className="flex justify-center items-center">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                            title={video.title}
                            allowFullScreen
                            loading="lazy"
                            className="w-90 h-52"
                        ></iframe>
                    </div>
                    <div className="pt-4">
                        <div className="text-gray-600 text-xs">
                            {video.date} | {video.presented_at}
                        </div>
                        <div className="pt-2">
                            <p className="body-medium !font-normal">{video.title.slice(0, 65)}...</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}