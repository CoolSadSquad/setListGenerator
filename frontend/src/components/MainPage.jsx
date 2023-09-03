import React, {useEffect, useState} from 'react';
import {NavBar, SetlistCard, SongCard} from "./index";
import { isExpired, decodeToken } from "react-jwt";
import {useCookies} from "react-cookie";
import {FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import SongSerchCard from "./SongSerchCard";
import moment from "moment";

const MainPage = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const [cookies, setCookie] = useCookies(['access_token'])
    const token = cookies.access_token
    const [createNewArtist, setCreateNewArtist] = useState(false)
    const [username, setUsername] = useState(decodeToken(token).sub.login)
    const [artistName, setArtistName] = useState('')
    const [artistList, setArtistList] = useState(decodeToken(token).sub.artists)
    const [userList, setUserList] = useState([])
    const [songList, setSongList] = useState([''])
    const [searchInput, setSearchInput] = useState('')
    const [setlists, setSetlists] = useState([])
    const [currentVenue, setCurrentVenue] = useState('')
    const [currentCity, setCurrentCity] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [currentComment, setCurrentComment] = useState('')
    const [currentSetlist, setCurrentSetlist] = useState({})
    const [currentArtistName, setCurrentArtistName] = useState('')
    const [currentArtistId, setCurrentArtistId] = useState('')
    const [addNewSong, setAddNewSong] = useState(false)
    const [addedNewSongName, setAddedNewSongName] = useState('')
    const updateUserList = (user) =>{
        const updatedUserList = [...userList]
        updatedUserList.append(user)
        setUserList(updatedUserList)
    }
    const updateSongList = (index, song) => {
        const updatedSongList = [...songList]
        updatedSongList[index] = song
        setSongList(updatedSongList)
    }
    const addSongValue = () => {
        setSongList([...songList, ""])
    }
    const deleteSongValue = (index) => {
        if (index !== 0){
            const updateSongList = [...songList]
            updateSongList.splice(index,1)
            setSongList(updateSongList)
        }
    }
    const addSong = () => {
        fetch(BACKEND_URL + '/artists/song/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: currentArtistId, song: addedNewSongName})
        })
            .then(response => response.json())
            .then(() => getSongs(currentArtistName))
    }
    const addSongToSetlist = (song) => {
        const updatedCurrentSetlist = [...currentSetlist.songs]
        updatedCurrentSetlist.push(song)
        setCurrentSetlist({...currentSetlist, songs: updatedCurrentSetlist})
    }

    const deleteSongFromSetlist = (index) => {
        const updateCurrentSetlist = [...currentSetlist.songs]
        updateCurrentSetlist.splice(index-1,1)
        setCurrentSetlist({...currentSetlist, songs: updateCurrentSetlist})
    }
    const deleteSong = (song) => {
        fetch(BACKEND_URL + '/artists/song/', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: currentArtistId, song: song})})
            .then(response => response.json())
            .then(() => getSongs(currentArtistName))
    }

    const getSongs = (artistName) => {
        fetch(BACKEND_URL + `/artists/name/${artistName}`)
            .then(response => response.json())
            .then(data => {
                setCurrentArtistName(data.name)
                setSongList(data.songs)
                setUserList(data.users)
                setCurrentArtistId(data.id)
            })
    }
    const getSetlists = (artistName) => {
        fetch(BACKEND_URL + `/setlists/artist/${artistName}`)
            .then(response => response.json())
            .then(data => {if(data.length !== 0){
                setCurrentArtistName(artistList[0])
                setSetlists(data)}})
    }
    const getSetlist = (artistName) => {
        fetch(BACKEND_URL + `/setlists/artist/${artistName}`)
            .then(response => response.json())
            .then(data => {if(data.length !== 0){
                setCurrentArtistName(artistList[0])
                setSetlists(data)
                setCurrentSetlist(data[0])
                }
            })
            .then(() => {
                setCurrentCity(currentSetlist.city)
                setCurrentVenue(currentSetlist.venue)
                setCurrentDate(moment(currentSetlist.date).utc().format('DD/MM/YYYY'))
                setCurrentComment(currentSetlist.comment)
            })
    }
    const saveSetlist = () => {
        fetch(BACKEND_URL + `/setlists/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: currentSetlist.id, new_json: {venue: currentVenue, city: currentCity, date: currentSetlist.date, comment: currentComment, songs: currentSetlist.songs}}),
        })
            .then(response => response.json())
            .then(() => getSetlist(currentArtistName))
    }
    const createSetlist = () => {
        fetch(BACKEND_URL + '/setlists/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({venue: "", city: "", date: Date.now().toString(), comment: "", artist: currentArtistName, songs: []})
        })
            .then(response => response.json())
            .then(data => {
                setCurrentSetlist(data)
                setCurrentDate(moment(data.date).utc().format('DD/MM/YYYY'))
                setCurrentCity(data.city)
                setCurrentVenue(data.venue)
                setCurrentComment(data.comment)
            })
            .then(() => getSetlists(currentArtistName))
    }
    const deleteSetlist = (setlistId) => {
        fetch(BACKEND_URL + `/setlists/${setlistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                if(data.delete_count !== 0) {
                    getSetlist(currentArtistName)
                }
            })
    }
    const editSetlist = (setlistId) => {
        fetch(BACKEND_URL + `/setlists/${setlistId}`)
            .then(response => response.json())
            .then(data => {
                setCurrentSetlist(data)
                setCurrentDate(moment(data.date).utc().format('DD/MM/YYYY'))
                setCurrentCity(data.city)
                setCurrentVenue(data.venue)
                setCurrentComment(data.comment)
            })
    }
    const downloadSetlist = (setlistId, venue) => {
        fetch(BACKEND_URL + `/setlists/pdf/${setlistId}`)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = venue + '.pdf'; // Set the desired file name
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
    }
    const createArtist = () => {
        if (artistName !== ''){
            fetch(BACKEND_URL + '/artists/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: artistName, songs: songList, users: [username]})
            })
                .then(response => response.json())
                .then(()=>
                    fetch(BACKEND_URL + `/users/login/${username}`)
                        .then(response => response.json())
                        .then((data)=> setArtistList(data.artists))
                        .then(() => setCurrentArtistName(artistList[0]))
                )

        }
    }
    useEffect(() => {
        if (artistList.length === 0){
            setCreateNewArtist(true)
        }else{
            setCreateNewArtist(false)
            getSongs(artistList[0])
            getSetlist(artistList[0])
        }
    }, [artistList]);
    return (
        <div className="text-white text-500">
            {createNewArtist ?
                <>
                <div className="w-1/2 h-3/4 bg-[#020D14] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 rounded-lg">
                    <div className="flex flex-col items-center gap-y-8">
                        <div className="flex flex-col gap-y-3 pt-12">
                            <div className="text-600 text-white text-3xl select-none">
                                Create a new artist
                            </div>
                            <div className="text-500 text-white text-xl select-none">
                                Name of the artist
                            </div>
                            <input onChange={e => setArtistName(e.target.value)} type="text" className="border-b bg-no-repeat bg-left username-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your artist name" required/>
                            <div className="text-500 text-white text-xl select-none">
                                Songs
                            </div>
                            {songList.map((song, index) =>(
                                <div className="flex flex-row items-center border-b w-[24.4rem] gap-x-1" key={index}>
                                    <input onChange={(e) => updateSongList(index, e.target.value)} type="text" className="border-none focus:border-none bg-no-repeat bg-left song-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your artist`s songs" required/>
                                    <FiPlusCircle onClick={addSongValue}/>
                                    <FiMinusCircle onClick={() => deleteSongValue(index)}/>
                                </div>
                            ))}
                        </div>
                        <div className="h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                            <div className="text-white text-base text-600 leading-normal select-none" onClick={createArtist}>Create Artist</div>
                        </div>
                    </div>
                </div>
            <div className="w-screen h-screen bg-black opacity-40 z-0">

            <NavBar/>
            <div className="flex flex-row p-5 gap-x-16 justify-evenly">
                <div className="flex flex-col gap-y-5">
                    <div>
                        Previous setlists
                    </div>
                    <div className="self-center h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Create new setlist</div>
                    </div>
                    <SetlistCard date="23 марта" venue="Невесомость" comment="Рок-концерт" city="Сургут"/>
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
                        <SongCard songId="1" songName="Танцуй"/>
                        <SongCard songId="2" songName="Ты так красива"/>
                        <SongCard songId="3" songName="Кукла колдуна"/>
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
                    <SongSerchCard songId={1} songName={"Genesis"}/>
                    <SongSerchCard songId={2} songName={"After Dark"}/>
                    <SongSerchCard songId={3} songName={"Supersonic (My Existence)"}/>
                </div>
            </div>
            </div>
                </>
            :
                <>
                <NavBar/>
                    <div className="flex flex-row p-5 gap-x-16 justify-evenly">
                        <div className="flex flex-col gap-y-5">
                            <div>
                                Previous setlists
                            </div>
                            <div onClick={createSetlist} className="self-center h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                                <div className="text-white text-base text-600 leading-normal select-none">Create new setlist</div>
                            </div>
                            {setlists.map((setlist, index) =>
                                    <SetlistCard key={index} handleDownloadSetlist={downloadSetlist} handleEditSetlist={editSetlist} handleDeleteSetlist={deleteSetlist} date={moment(setlist.date).utc().format('DD/MM/YYYY')} venue={setlist.venue} comment={setlist.comment} city={setlist.city} setlistId={setlist.id} />
                                )}

                    </div>
                    <div className="flex flex-col gap-y-5 w-[50rem]">
                        <div>
                            Setlist
                        </div>
                        <div className="flex flex-row justify-evenly">
                            <div onClick={saveSetlist} className="h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                                <div className="text-white text-base text-600 leading-normal select-none">Save</div>
                            </div>
                        <div onClick={() => getSetlist(currentArtistName)} className="h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                            <div className="text-white text-base text-600 leading-normal select-none">Cancel</div>
                            </div>
                        </div>
                        <div>
                            {currentArtistName}
                        </div>
                        <div className="flex flex-row justify-evenly">
                            {currentSetlist.venue !== undefined && currentSetlist.city !== undefined && currentSetlist.date !== undefined && currentSetlist.comment !== undefined ? <>
                                <div>
                                    <input onChange={e => setCurrentVenue(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="Venue" value={currentVenue} required/>
                                </div>
                                <div>
                                    <input onChange={e => setCurrentCity(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="City" value={currentCity} required/>
                                </div>
                                <div>
                                    <input onChange={e => setCurrentDate(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="Date" value={currentDate} required/>
                                </div>
                                <div>
                                    <input onChange={e => setCurrentComment(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="Comment" value={currentComment} required/>
                                </div>
                            </> : <>
                                <div>
                                    <input onChange={e => setCurrentVenue(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="Venue" required/>
                                </div>
                                <div>
                                    <input onChange={e => setCurrentCity(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="City" required/>
                                </div>
                                <div>
                                    <input onChange={e => setCurrentDate(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="Date" required/>
                                </div>
                                <div>
                                    <input onChange={e => setCurrentComment(e.target.value)} type="text" className="border-b bg-no-repeat bg-left pl-1 w-[11rem]" style={{backgroundColor: "#020D14"}} placeholder="Comment" required/>
                                </div>
                            </>}
                        </div>
                        <div className="flex flex-col gap-y-3">
                            {currentSetlist.songs !== undefined ?
                            currentSetlist.songs.map((song, index) =>(
                                <SongCard songId={index+1} songName={song} handleDeleteSong={deleteSongFromSetlist}/>
                            )) : <></>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div>
                            Songs
                        </div>
                        <div onClick={() => setAddNewSong(!addNewSong)} className="self-center h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                            <div className="text-white text-base text-600 leading-normal select-none">Add new song</div>
                        </div>
                        {addNewSong ?
                            <>
                                <input onChange={e => setAddedNewSongName(e.target.value)} type="text" className="border-b bg-no-repeat bg-left song-icon pl-8 w-[31.5rem]" style={{backgroundColor: "#020D14"}} value={addedNewSongName} placeholder="Enter song name" required/>
                                <div onClick={addSong} className="self-center h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                                    <div className="text-white text-base text-600 leading-normal select-none">Submit</div>
                                </div>
                            </>
                            : <></>}
                    <div className="text-white text-500">
                    <input onChange={e => setSearchInput(e.target.value)} type="text" className="border-b bg-no-repeat bg-left search-icon pl-8 w-[31.5rem]" style={{backgroundColor: "#020D14"}} placeholder="Search" required/>
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
                        {songList.map((song, index) => (
                            song.toLowerCase().includes(searchInput.toLowerCase()) ? <SongSerchCard handleDeleteSong={deleteSong} handleAddSong={addSongToSetlist} key={index+1} songId={index+1} songName={song} /> : <></>
                        ))}
                        </div>
                    </div>
                </>}
        </div>
    );
};

export default MainPage;