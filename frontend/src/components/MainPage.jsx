import React, {useEffect, useState} from 'react';
import {NavBar, SetlistCard, SongCard} from "./index";
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";
import {useCookies} from "react-cookie";

const MainPage = () => {
    const [cookies, setCookie] = useCookies(['access_token'])
    const token = cookies.access_token
    const [createNewArtist, setCreateNewArtist] = useState(false)
    const [username, setUsername] = useState(decodeToken(token).sub.login)
    const [artistName, setArtistName] = useState('')
    const [artistList, setArtistList] = useState(decodeToken(token).sub.artists)

    useEffect(() => {
        if (artistList.length === 0){
            setCreateNewArtist(true)
        }
    }, [createNewArtist]);
    return (
        <div className="text-white text-500">
            {createNewArtist ?
            <div className="w-screen h-screen bg-black opacity-40 z-0">
                <div className="w-1/2 h-3/4 bg-[#020D14] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 rounded-lg">
                    <div className="flex flex-col z-30">
                        <div className="z-40">
                            Create a new artist
                        </div>
                        <div>
                            Name of the artist
                        </div>
                        <input onChange={e => setArtistName(e.target.value)} value={artistName} type="text" className="border-b bg-no-repeat bg-left message-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your artist name" required/>
                    </div>
                </div>
            <NavBar/>
            <div className="flex flex-row p-5 gap-x-16 justify-evenly">
                <div className="flex flex-col gap-y-5">
                    <div>
                        Previous setlists
                    </div>
                    <div className="self-center h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Create new setlist</div>
                    </div>
                    <SetlistCard date="23 марта" venue="Невесомость" comment="123" city="Сургут"/>
                </div>
                <div className="flex flex-col gap-y-5 w-[50rem]">
                    <div>
                        Setlist
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <div className="h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                            <div className="text-white text-base text-600 leading-normal select-none">Save</div>
                        </div>
                        <div className="h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                            <div className="text-white text-base text-600 leading-normal select-none">Cancel</div>
                        </div>
                    </div>
                    <div>
                        Artist name
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <div>
                            Venue
                        </div>
                        <div>
                            City
                        </div>
                        <div>
                            Date
                        </div>
                        <div>
                            Comment
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <SongCard songId="1" songName="Я уебываю в джаз"/>
                        <SongCard songId="1" songName="Я уебываю в джаз"/>
                        <SongCard songId="1" songName="Я уебываю в джаз"/>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5">
                    <div>
                        Songs
                    </div>
                    <div className="self-center h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">New song</div>
                    </div>
                    <div className="text-white text-500">
                        <input type="text" className="border-b bg-no-repeat bg-left search-icon pl-8 w-[31.5rem]" style={{backgroundColor: "#020D14"}} placeholder="Search" required/>
                    </div>
                    <div className="flex flex-row gap-x-16 text-gray-500 text-[12px]">
                        <div>
                            ORIGINALS
                        </div>
                        <div>
                            COVERS
                        </div>
                        <div>
                            ADDED
                        </div>
                        <div>
                            NOT ADDED
                        </div>
                        <div>
                            ALL
                        </div>
                    </div>
                </div>
            </div>
            </div>
            : <></>}
        </div>
    );
};

export default MainPage;