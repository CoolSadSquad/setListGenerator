import React from 'react';
import wallpaper from '../assets/images/wallpaper.jpg'
import {Link} from "react-router-dom";
import {Logo} from "./index";
const RegisterPage = () => {
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
                        <input type="text" className="border-b bg-no-repeat bg-left message-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your email address"  required/>
                    </div>
                    <div className="text-white text-500 select-none mb-2 text-[13px]">
                        Username
                    </div>
                    <div className="text-white text-500 mb-12">
                        <input type="text" className="border-b bg-no-repeat bg-left username-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your username"  required/>
                    </div>
                    <div className="text-white text-500 text-[13px] mb-2 select-none">
                        Password
                    </div>
                    <div className="text-white text-500 mb-12">
                        <input type="text" className="border-b bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Enter your password"  required/>
                    </div>
                    <div className="text-white text-500 text-[13px] mb-2 select-none">
                        Confirm Password
                    </div>
                    <div className="text-white text-500 mb-16">
                        <input type="text" className="border-b bg-no-repeat bg-left password-icon pl-8 w-[24.4rem]" style={{backgroundColor: "#020D14"}} placeholder="Confirm your password"  required/>
                    </div>
                    <Link to="/login">
                        <div className="h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[24.4rem]">
                            <div className="text-white text-base text-600 leading-normal select-none">Register</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;