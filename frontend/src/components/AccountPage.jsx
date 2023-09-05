import React, {useEffect, useState} from 'react';
import {NavBar} from "./index";
import {useCookies} from "react-cookie";
import {decodeToken} from "react-jwt";
import {FiEye, FiEyeOff} from "react-icons/fi";

const AccountPage = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const token = cookies.access_token
    const [username, setUsername] = useState(decodeToken(token).sub.login)
    const [currentArtistName, setCurrentArtistName] = useState('')
    const [artistList, setArtistList] = useState([])
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [oldInput, setOldInput] = useState(false)
    const [newInput, setNewInput] = useState(false)
    const [repeatedInput, setRepeatedInput] = useState(false)
    const [newMember, setNewMember] = useState('')
    const [country, setCountry] = useState('')
    const [organization, setOrganization] = useState('')
    const [isValidCredentials, setIsValidCredentials] = useState(true)
    const [currentUserId, setCurrentUserId] = useState(decodeToken(token).sub.id)
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setIsValidEmail(emailRegex.test(e.target.value))
    }

    const changeCredentials = () => {
        if(isValidEmail && currentArtistName.length !== 0 && email.length !== 0){
            setIsValidCredentials(true)
            fetch(BACKEND_URL + '/users/',{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: currentUserId, newjson: {email: email, }})
            })
        }
        else{
            setIsValidCredentials(false)
        }
    }
    const addNewMember = () => {
        if(newMember.length !== 0){
            fetch(BACKEND_URL + '/users/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: currentUserId, newjson: {email: email, }})
            })
        }
    }
    const deleteAccount = () => {
        fetch(BACKEND_URL + `/users/${currentUserId}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(() => removeCookie('access_token'))
    }
    useEffect(() => {
        fetch(BACKEND_URL + `/users/login/${username}`)
            .then(response => response.json())
            .then(data => {
                setEmail(data.email)
                setArtistList(data.artists)
                setCurrentUserId(data.id)
                setCurrentArtistName(data.artists[0])
            })
    }, []);
    return (
        <div className="text-white text-500">
            <NavBar/>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col w-1/3 items-center gap-y-7">
                    <div className="text-3xl">
                        Information
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="text-xl">
                            Artist
                        </div>
                        <div className="border-b border-solid">
                            <input onChange={e => setCurrentArtistName(e.target.value)} type="text" className="border-none focus:border-none bg-no-repeat bg-left username-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your artist name" value={currentArtistName} required/>
                        </div>
                        <div className="text-xl">
                            Email
                        </div>
                        <div className="border-b border-solid">
                            <input onChange={handleEmailChange} type="text" className="border-none focus:border-none bg-no-repeat bg-left message-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} value={email} placeholder="Enter your email" required/>
                        </div>
                        <div className="text-xl">
                            Country
                        </div>
                        <div className="border-b border-solid">
                            <input onChange={e => setCountry(e.target.value)} type="text" className="border-none focus:border-none bg-no-repeat bg-left city-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} value={country} placeholder="Enter your country" required/>
                        </div>
                        <div className="text-xl">
                            Organization
                        </div>
                        <div className="border-b border-solid">
                            <input onChange={e => setOrganization(e.target.value)} type="text" className="border-none focus:border-none bg-no-repeat bg-left organization-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} value={organization} placeholder="Enter your organization" required/>
                        </div>
                    </div>
                    <div onClick={changeCredentials} className="hover:from-emerald-600 hover:to-sky-400 h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Save changes</div>
                    </div>
                    {isValidCredentials ? <></> :
                        <div className="text-red-800 text-500">
                            Please enter your credentials
                        </div>
                    }
                    <div className="flex flex-col gap-y-2">
                        <div className="text-xl">
                            Add new member
                        </div>
                        <div className="border-b border-solid">
                            <input onChange={e => setNewMember(e.target.value)} type="text" className="border-none focus:border-none bg-no-repeat bg-left username-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} value={newMember} placeholder="Enter member to add" required/>
                        </div>
                    </div>
                    <div onClick={addNewMember} className="hover:from-emerald-600 hover:to-sky-400 h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Add member</div>
                    </div>
                </div>
                <div className="flex flex-col w-1/3 items-center gap-y-7">
                    <div className="text-3xl">
                        Change password
                    </div>
                        <div className="flex flex-col gap-y-3">
                            <div className="text-xl">
                                Old password
                            </div>
                            <div className="text-white text-500 mb-4 flex justify-between items-center w-[24.4rem] border-b">
                            <input onChange={e => setOldPassword(e.target.value)} value={oldPassword} type={oldInput ? "text" : "password"} className="border-none focus:border-none bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your old password" required/>
                                {oldInput ? <FiEyeOff className="reveal" onClick={() => setOldInput(!oldInput)} /> : <FiEye className="reveal" onClick={() => setOldInput(!oldInput)}/>}
                            </div>
                            <div className="text-xl">
                                New password
                            </div>
                            <div className="text-white text-500 mb-4 flex justify-between items-center w-[24.4rem] border-b">
                                <input onChange={e => setNewPassword(e.target.value)} value={newPassword} type={newInput ? "text" : "password"} className="border-none focus:border-none bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your new password" required/>
                                {newInput ? <FiEyeOff className="reveal" onClick={() => setNewInput(!newInput)} /> : <FiEye className="reveal" onClick={() => setNewInput(!newInput)}/>}
                            </div>
                            <div className="text-xl">
                                Confirm password
                            </div>
                            <div className="text-white text-500 mb-4 flex justify-between items-center w-[24.4rem] border-b">
                                <input onChange={e => setRepeatedPassword(e.target.value)} value={repeatedPassword} type={repeatedInput ? "text" : "password"} className="border-none focus:border-none bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Confirm your password" required/>
                                {repeatedInput ? <FiEyeOff className="reveal" onClick={() => setRepeatedInput(!repeatedInput)} /> : <FiEye className="reveal" onClick={() => setRepeatedInput(!repeatedInput)}/>}
                            </div>
                        </div>
                    <div className="hover:from-emerald-600 hover:to-sky-400 h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Update password</div>
                    </div>
                    <div className="text-3xl">
                        Delete your account
                    </div>
                    <div onClick={deleteAccount} className="hover:from-emerald-600 hover:to-sky-400 h-12 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Delete account</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;