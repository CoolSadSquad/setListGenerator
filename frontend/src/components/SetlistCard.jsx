import React from 'react';
import download from "../assets/images/download.svg"
import lyrics from "../assets/images/lyrics.svg"
import bin from "../assets/images/bin.svg"
import edit from "../assets/images/edit.svg"
const SetlistCard = ({venue, city, date, comment, setlistId, handleDeleteSetlist, handleEditSetlist, handleDownloadSetlist}) => {
    return (
        <div key={setlistId} className="border-sky-300 border-2 rounded-md text-white text-500 select-none max-w-[250px]">
            <div className="flex flex-row justify-between p-2 gap-x-5">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-x-2">
                        <div>
                            {venue}
                        </div>
                        <div>
                            {city}
                        </div>
                    </div>
                    <div>
                        {date}
                    </div>
                    <div>
                        {comment}
                    </div>
                    <div className="flex flex-row gap-x-2 text-[10px]">
                        <img src={download} width="16px" height="16px" alt=""/>
                        <div onClick={() => handleDownloadSetlist(setlistId, venue)}>
                            Download
                        </div>
                        <img src={lyrics} width="16px" height="16px" alt=""/>
                        <div>
                            Lyrics
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <img onClick={() => handleEditSetlist(setlistId)} src={edit} width="16px" height="16px" alt=""/>
                    <img onClick={() => handleDeleteSetlist(setlistId)} src={bin} width="16px" height="16px" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default SetlistCard;