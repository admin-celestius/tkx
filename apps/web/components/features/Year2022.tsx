"use client";
import { useState } from "react";
import { Milestone } from "../TimelineTypes";

export default function Year2022({ item }: { item: Milestone }) {
    // State for the interactive grid box
    const [isLocked, setIsLocked] = useState(false);

    return (
        <div className="w-full h-full relative bg-gradient-to-br from-[#1a1408] via-[#0f0a05] to-[#0a0702] overflow-hidden font-sans text-[#eab308] select-none">

            {/* 1. SUBTLE BACKGROUND GLOW */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/3 rounded-full blur-[150px]" />

            {/* 2. THE GRID SYSTEM (Dividers with Spacing) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Main Border */}
                <div className="absolute inset-8 border border-[#eab308]/25"></div>

                {/* Vertical Divider at 65% with spacing */}
                <div className="absolute top-8 bottom-8 left-[calc(65%-6px)] w-[12px] border-l border-r border-[#eab308]/25"></div>

                {/* Horizontal Divider 1 at 30% with spacing */}
                <div className="absolute top-[calc(30%-6px)] h-[12px] right-8 left-[calc(65%+6px)] border-t border-b border-[#eab308]/25"></div>

                {/* Horizontal Divider 2 at 65% with spacing */}
                <div className="absolute top-[calc(65%-6px)] h-[12px] left-8 right-8 border-t border-b border-[#eab308]/25"></div>
            </div>

            {/* 3. TOP LEFT: MAIN TITLE AREA - With cut corner */}
            <div
                className="absolute top-8 left-8 w-[calc(65%-24px)] h-[calc(65%-24px)] p-10 flex flex-col justify-center items-start z-10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%)' }}
            >
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#facc15] drop-shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                    RECONNECTION
                </h2>
                <p className="mt-4 text-lg md:text-xl font-mono text-[#ca8a04]/80 tracking-wide">
                    grid systems realigning. The network heals.
                </p>
            </div>

            {/* 4. TOP RIGHT: STATUS AREA */}
            <div className="absolute top-8 left-[calc(65%+16px)] right-8 h-[calc(22%-16px)] p-6 flex flex-col justify-between z-10">
                <span className="font-mono text-xs text-[#ca8a04]/60 tracking-widest uppercase">NET_STATUS</span>

                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold tracking-widest text-[#facc15]">ONLINE</span>
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse"></div>
                </div>
            </div>

            {/* 5. MID RIGHT: INTERACTIVE \"LOCKED\" BOX - Simplified */}
            <div
                className="absolute top-[calc(30%+16px)] bottom-[calc(35%+8px)] left-[calc(65%+16px)] right-8 overflow-hidden cursor-pointer group z-20 border transition-all duration-300"
                style={{
                    borderColor: isLocked ? '#facc15' : 'rgba(202, 138, 4, 0.3)',
                    boxShadow: isLocked ? '0 0 20px rgba(250, 204, 21, 0.2)' : 'none'
                }}
                onMouseEnter={() => setIsLocked(true)}
                onMouseLeave={() => setIsLocked(false)}
                onClick={() => setIsLocked(!isLocked)}
            >
                {/* Diagonal pattern - subtle when locked */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ${isLocked ? "opacity-15" : "opacity-0"}`}
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #facc15 0, #facc15 1px, transparent 0, transparent 15px)"
                    }}
                />

                {/* Text */}
                <div className="w-full h-full flex items-center justify-center bg-[#ca8a04]/5 transition-colors group-hover:bg-[#ca8a04]/10">
                    <h3 className={`text-2xl md:text-3xl font-black uppercase transition-all duration-300 ${isLocked ? "text-[#facc15] tracking-[0.25em]" : "text-[#ca8a04]/40 tracking-normal"}`}>
                        {isLocked ? "LOCKED" : "GRID_LOCK"}
                    </h3>
                </div>

                {/* Simple corner indicators */}
                <div className={`absolute top-2 left-2 w-3 h-3 border-l border-t transition-all duration-300 ${isLocked ? 'border-[#facc15]' : 'border-[#ca8a04]/30'}`} />
                <div className={`absolute bottom-2 right-2 w-3 h-3 border-r border-b transition-all duration-300 ${isLocked ? 'border-[#facc15]' : 'border-[#ca8a04]/30'}`} />
            </div>

            {/* 6. BOTTOM LEFT: DATA CONTROLS */}
            <div className="absolute top-[calc(65%+16px)] bottom-8 left-8 w-[calc(65%-24px)] p-8 flex items-end z-10">
                <div className="flex gap-4">
                    {["SYNC", "LINK", "NODE", "DATA"].map((btn) => (
                        <div key={btn} className="px-6 py-2 border border-[#ca8a04]/30 text-[#ca8a04] font-mono text-xs hover:bg-[#ca8a04] hover:text-black hover:border-[#ca8a04] transition-all cursor-pointer">
                            {btn}
                        </div>
                    ))}
                </div>
            </div>

            {/* 7. BOTTOM RIGHT: YEAR INDICATOR */}
            <div className="absolute top-[calc(65%+16px)] bottom-8 left-[calc(65%+16px)] right-8 flex items-end justify-end p-8 z-10">
                <h1 className="text-7xl md:text-9xl font-bold text-[#facc15] leading-none opacity-90">
                    2022
                </h1>
            </div>

        </div>
    );
}