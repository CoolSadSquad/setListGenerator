import React from 'react';
import {Logo} from "./index";
import {Link} from "react-router-dom";

const IndexPage = () => {

    return (
        <div className="grid-rows-2 h-screen max-h-full w-screen">
            <div className="h-1/4">
                <div className="pl-14 pt-9">
                    <Logo/>
                </div>
            </div>
            <div className="grid-cols-1 items-center justify-items-center grid">
                <div className="w-[816px] text-center text-white text-[5.8rem] text-600 leading-[112px] select-none">
                    Build your Setlists in minutes
                </div>
                <div className="w-[580px] text-neutral-500 text-lg text-500 leading-7 text-center select-none mt-[40px] mb-[80px]">
                    PunchClub is a user-friendly web app designed for musicians, bands, and performers of all levels to effortlessly craft and organize their perfect music setlists.
                </div>
                <Link to="/login">
                    <div className="hover:from-emerald-600 hover:to-sky-400 w-[264px] h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex">
                        <div className="text-white text-base font-semibold leading-normal select-none">Login</div>
                    </div>
                </Link>
                <Link to="/register">
                    <div className="w-[264px] h-14 px-5 py-4 rounded-2xl justify-center items-center gap-2 inline-flex mt-[8px]">
                        <div className="text-white text-base text-600 leading-normal select-none">Register</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default IndexPage;