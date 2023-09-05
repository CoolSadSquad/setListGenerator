import React, {useState} from 'react';
import wallpaper from '../assets/images/wallpaper.jpg'
import {Link, useNavigate} from "react-router-dom";
import {Logo} from "./index";
import {FiEye, FiEyeOff} from "react-icons/fi"
const RegisterPage = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [passwordEqual, setPasswordEqual] = useState(true)
    const [credentialsValid, setCredentialsValid] = useState(true)
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [showRepeatedInput, setShowRepeatedInput] = useState(false);
    const [userExists, setUserExists] = useState(false)
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setIsValidEmail(emailRegex.test(e.target.value))
    }
    const Registration = () => {
        if (username.length !== 0 && password.length !== 0 && email.length !== 0 && isValidEmail){
            setCredentialsValid(true)
            if (password === repeatedPassword){
                setPasswordEqual(true)
                fetch(BACKEND_URL+'/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({login: username, email: email, password: password}),
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.error !== undefined){
                            setUserExists(true)
                        }else{
                            navigate("/login")
                        }

                    }
                    )
            }
            else {
                setPasswordEqual(false)
            }
        }
        else {
            setCredentialsValid(false)
        }
    }
    return (
        <div>
            <div className="absolute logo-right pt-6">
                <Link to="/">
                    <Logo/>
                </Link>
            </div>
            <div className="grid grid-login h-screen w-screen items-center">
                <div>
                    <img className="h-screen object-cover left-0 top-0 rounded-tr-[40px] rounded-br-[40px]" src={wallpaper} alt="wallpaper"/>
                </div>
                <div className="flex flex-col pl-16">
                    <div className="text-500 text-white text-3xl mb-8 select-none">
                        Sign up
                    </div>
                    <div className="text-white text-base text-500 mb-2 select-none">
                        Already have an account?
                    </div>
                    <div className="bg-clip-text text-base text-gradient bg-gradient-to-r from-emerald-500 to-sky-300 text-600 select-none">
                        <Link to="/login">
                            Login
                        </Link>
                    </div>
                    <div className="text-white text-500 mt-14 select-none mb-2 text-[13px]">
                        Email
                    </div>
                    <div className="text-white text-500 mb-12">
                        <input onChange={handleEmailChange} value={email} type="text" className="border-b bg-no-repeat bg-left message-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your email address"  required/>
                    </div>
                    <div className="text-white text-500 select-none mb-2 text-[13px]">
                        Username
                    </div>
                    <div className="text-white text-500 mb-12">
                        <input onChange={e => setUsername(e.target.value)} value={username} type="text" className="border-b bg-no-repeat bg-left username-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your username"  required/>
                    </div>
                    <div className="text-white text-500 text-[13px] mb-2 select-none">
                        Password
                    </div>
                    <div className="text-white text-500 mb-12 flex justify-between items-center w-[24.4rem] border-b">
                        <input onChange={e => setPassword(e.target.value)} value={password} type={showInput ? "text" : "password"} className="border-none focus:border-none bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your password"  required/>
                        {showInput ? <FiEyeOff className="reveal" onClick={() => setShowInput(!showInput)} /> : <FiEye className="reveal" onClick={() => setShowInput(!showInput)}/>}
                    </div>
                    <div className="text-white text-500 text-[13px] mb-2 select-none">
                        Confirm Password
                    </div>
                    <div className="text-white text-500 mb-16 flex justify-between items-center w-[24.4rem] border-b">
                        <input onChange={e => setRepeatedPassword(e.target.value)} value={repeatedPassword} type={showRepeatedInput ? "text" : "password"} className="border-none focus:border-none bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Confirm your password" required/>
                        {showRepeatedInput ? <FiEyeOff className="reveal" onClick={() => setShowRepeatedInput(!showRepeatedInput)} /> : <FiEye className="reveal" onClick={() => setShowRepeatedInput(!showRepeatedInput)}/>}
                    </div>
                    {credentialsValid ? <></> :
                        <div className="text-red-800 text-500 mb-16">
                        Please enter your credentials
                    </div>}
                    {passwordEqual ? <></> :
                    <div className="text-red-800 text-500 mb-16">
                        Passwords dont match
                    </div>}
                    {userExists ? <div className="text-red-800 text-500 mb-16">
                        User already exists
                    </div> :
                       <></> }
                    <div onClick={Registration} className="hover:from-emerald-600 hover:to-sky-400 h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[24.4rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Register</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;