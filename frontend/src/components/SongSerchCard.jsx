import React from 'react';
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";

const SongSerchCard = ({songId, songName, handleAddSong, handleDeleteSong}) => {
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
                <FiPlusCircle onClick={() => handleAddSong(songName)}/>
                <FiTrash2 onClick={() => handleDeleteSong(songName)}/>
            </div>
        </div>
    );
};

export default SongSerchCard;