import React from 'react';
import bin from "../assets/images/bin.svg";

const SongCard = ({songId, songName, handleDeleteSong}) => {
    return (
        <div className='flex flex-row justify-between text-500'>
            <div className='flex flex-row gap-x-2'>
                <div className="text-3xl">
                    {songId}
                </div>
                <div className="align-text-bottom">
                    {songName}
                </div>
            </div>
            <div className='flex flex-row gap-x-3'>
                <img src={bin} width="16px" height="16px" alt="" onClick={() => handleDeleteSong(songId)}/>
            </div>
        </div>
    );
};

export default SongCard;