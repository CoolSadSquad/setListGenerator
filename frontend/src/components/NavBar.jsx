import React from 'react';
import {Logo} from "./index";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <div className="flex flex-row justify-between px-14 py-9">
                <Logo/>
                <div className="flex flex-row self-center text-white gap-x-16 text-500 text-lg">
                    <Link to="/profile">
                        <div>
                            Account
                        </div>
                    </Link>
                    <Link to="/songs">
                        <div>
                            Songs
                        </div>
                    </Link>
                    <Link to="/setlists">
                        <div>
                            Setlists
                        </div>
                    </Link>
                </div>
                <Link to="/login">
                    <div className="h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Logout</div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default NavBar;