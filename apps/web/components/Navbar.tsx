"use client";
import React, { useState } from "react";

const navItems = ["HOME", "TIMELINE", "EVENTS"];

const NavBar = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Set TIMELINE active by default for this page

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 mix-blend-difference text-white">
            {/* Left: Brand */}
            <div className="flex flex-col leading-none select-none">
                {/* <span className="text-2xl font-black tracking-widest font-sans">TAKSHASHILA</span> */}
                <span className="text-xs tracking-[0.3em] opacity-60 font-light">THE TIMELINE</span>
            </div>

            {/* Right: Links & Action */}
            <div className="flex items-center gap-10">
                <ul className="flex items-center gap-8 text-sm font-bold tracking-widest hidden md:flex">
                    {navItems.map((item, index) => (
                        <li
                            key={item}
                            className={`cursor-pointer hover:text-gray-300 transition-colors relative group ${index === activeIndex ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {item}
                            {/* Underline for active state */}
                            <span className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300 ${index === activeIndex ? "w-full" : "w-0 group-hover:w-full"}`} />
                        </li>
                    ))}
                </ul>
                <button className="px-6 py-2 border border-white/40 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                    GET TICKETS
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
