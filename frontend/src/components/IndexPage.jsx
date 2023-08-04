import React from 'react';
import {Logo} from "./index";

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
                <div className="w-[580px] text-neutral-500 text-lg text-500 leading-7 text-center select-none mt-[40px]">
                    The night is dark and full of terrors. What is dead may never die. And now his watch is ended. All men must die.
                </div>
                <div className="w-[264px] h-14 px-5 py-4 bg-gradient-to-r from-emerald-500 to-sky-300 rounded-[32px] justify-center items-center gap-2 inline-flex mt-[80px]">
                    <div className="text-white text-base font-semibold leading-normal select-none">Login</div>
                </div>
                <div className="w-[264px] h-14 px-5 py-4 rounded-2xl justify-center items-center gap-2 inline-flex mt-[8px]">
                    <div className="text-white text-base font-semibold leading-normal select-none">Register</div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;