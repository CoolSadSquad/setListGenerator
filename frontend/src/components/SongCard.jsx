import React from 'react';
import {RiDraggable} from "react-icons/ri";
import {FiTrash2} from "react-icons/fi";

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
                <RiDraggable/>
                <FiTrash2 color="red" onClick={() => handleDeleteSong(songId)}/>
            </div>
        </div>
    );
};

export default SongCard;