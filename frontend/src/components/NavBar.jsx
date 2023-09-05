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
            <div className="flex flex-row justify-between px-16 py-9">
                <Link to={"/"}>
                    <Logo/>
                </Link>
                <div className="flex flex-row self-center text-white gap-x-16 text-500 text-lg">
                    <Link to="/account">
                        <div className="hover:text-gray-400">
                            Account
                        </div>
                    </Link>
                    <Link to="/main">
                        <div className="hover:text-gray-400">
                            Setlists
                        </div>
                    </Link>
                </div>
                <div onClick={logout} className="hover:text-gray-400 text-white text-500 text-lg select-none pr-10">Logout</div>
            </div>
        </>
    );
};

export default NavBar;