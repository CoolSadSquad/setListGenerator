import React from 'react';
import {Logo} from "./index";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="grid-rows-2 h-screen max-h-full w-screen">
            <div className="h-1/4">
                <div className="pl-14 pt-9">
                    <Link to="/">
                        <Logo/>
                    </Link>
                </div>
            </div>
            <div className="grid-cols-1 items-center justify-items-center grid gap-y-20">
                <div className="w-[816px] text-center text-white text-[5.8rem] text-600 leading-[112px] select-none">
                    Error 404. There is nothing here
                </div>
                <Link to="/">
                    <div className="w-[264px] h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex">
                        <div className="text-white text-base font-semibold leading-normal select-none">Go Back</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;