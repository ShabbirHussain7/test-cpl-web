import React from "react";
import TwitterIcon from "../../public/icons/person-details/x.svg?react";
import LinkedInIcon from "../../public/icons/person-details/linkedin.svg?react";
import WebIcon from "../../public/icons/person-details/web.svg?react";

export default function DirectorCard() {
    return (
        <div className="flex flex-col">
            <div className="">
                <img
                    src="assets/roya-ppl-pg.jpg"
                    alt="Portrait of Roya Ensafi"
                    className="mr-auto"
                    style={{ height: "75%", width: "auto", objectFit: "cover", }}
                />
                {/* Row of icons */}
                <div className="flex space-x-2 mt-4">
                <a href="https://ensa.fi" target="_blank" rel="noopener noreferrer">
                        <WebIcon />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/roya-ensafi-954b71309&ved=2ahUKEwjcwtOag_6NAxUMgf0HHZIPI1sQFnoECAkQAQ&usg=AOvVaw373sFrIBnhjczB3Q9dk9X1" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </a>
                    
                </div>
            </div>
            <div className="px-4">

            </div>
        </div>
    );
}