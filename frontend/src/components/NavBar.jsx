import React from 'react';
import {Logo} from "./index";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const NavBar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const logout = () =>{
        removeCookie('access_token')
    }
    return (
        <>
            <div className="flex flex-row justify-between px-14 py-9">
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <div className="flex flex-row self-center text-white gap-x-16 text-500 text-lg">
                    <Link to="/account">
                        <div>
                            Account
                        </div>
                    </Link>
                    <Link to="/main">
                        <div>
                            Setlists
                        </div>
                    </Link>
                </div>
                    <div onClick={logout} className="h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex w-[12rem]">
                        <div className="text-white text-base text-600 leading-normal select-none">Logout</div>
                    </div>
            </div>
        </>
    );
};

export default NavBar;