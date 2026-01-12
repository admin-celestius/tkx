"use client";
import { Milestone } from "../TimelineTypes";

export default function Year2021({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative bg-transparent overflow-hidden font-sans text-white">

            {/* 1. CYBER BACKGROUND - Radial glows and atmospheric effects */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />

            {/* 2. HUGE 2021 NUMBER (Top Left) - Enhanced with glow */}
            <h1 className="absolute top-[8%] left-[5%] text-[18vw] md:text-[20vw] font-thin tracking-tighter leading-none select-none font-mono text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300 drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                2021
            </h1>

            {/* 3. FLOATING CUBES - Enhanced cyber elements with glows */}
            <div className="absolute top-[30%] left-[40%] w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-md border border-blue-400/40 rotate-12 z-10 animate-pulse shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
            <div className="absolute top-[20%] left-[45%] w-10 h-10 bg-blue-600/20 border border-cyan-400/30 -rotate-12 z-0 shadow-[0_0_20px_rgba(34,211,238,0.2)]" />
            <div className="absolute bottom-[40%] right-[30%] w-20 h-20 bg-gradient-to-tl from-cyan-500/10 to-blue-500/5 border border-blue-400/20 rotate-45 blur-[1px] shadow-[0_0_25px_rgba(59,130,246,0.2)]" />
            <div className="absolute top-[60%] right-[20%] w-12 h-12 bg-blue-500/30 opacity-60 rounded-sm rotate-6 shadow-[0_0_20px_rgba(59,130,246,0.4)]" />

            {/* Additional floating particles */}
            <div className="absolute top-[15%] right-[15%] w-6 h-6 bg-cyan-400/40 rounded-full blur-sm animate-pulse" />
            <div className="absolute bottom-[25%] left-[20%] w-4 h-4 bg-blue-400/50 rounded-full blur-sm" />
            <div className="absolute top-[70%] left-[35%] w-3 h-3 bg-cyan-300/60 rounded-full animate-pulse" />

            {/* 5. TITLE BLOCK (Top Right) - Enhanced with glow effects */}
            <div className="absolute top-[12%] right-[8%] text-right z-30">
                <h2 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    ISOLATION
                </h2>
                <p className="text-cyan-400 font-mono text-sm md:text-base tracking-widest mt-2 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    PROTOCOL_INITIATED
                </p>
            </div>

            {/* 6. DESCRIPTION HUD (Bottom Left) - Enhanced bracket style */}
            <div className="absolute bottom-[15%] left-[8%] max-w-md p-6 border-l-2 border-b-2 border-cyan-500/60 bg-gradient-to-tr from-blue-900/20 via-blue-800/10 to-transparent backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <p className="text-lg md:text-2xl font-light leading-relaxed text-blue-100 font-mono drop-shadow-[0_0_10px_rgba(147,197,253,0.3)]">
                    "Silence in the void. Building from within."
                </p>
            </div>

            {/* 7. TECHNICAL STATS (Bottom Right) - Enhanced HUD */}
            <div className="absolute bottom-[15%] right-[8%] flex flex-col items-end space-y-1 z-30 font-mono text-xs md:text-sm text-cyan-400/90">
                <div className="flex gap-4 border-b border-cyan-500/40 pb-1 mb-2 w-full justify-end shadow-[0_2px_10px_rgba(34,211,238,0.2)]">
                    <span>STATUS:</span>
                    <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">ONLINE</span>
                </div>
                <p className="drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">DISTRIBUTION: MAX</p>
                <p className="drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">PROXIMITY: 0%</p>
                <p className="drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">SIGNAL: LOST</p>

                {/* Decorative hud lines with glow */}
                <div className="w-8 h-1 bg-cyan-400 mt-2 self-end shadow-[0_0_10px_rgba(34,211,238,0.7)]"></div>
                <div className="w-16 h-[1px] bg-cyan-400/60 mt-1 self-end shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
            </div>

            {/* 8. CYBER SCAN LINES - Subtle glowing lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.2)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.15)] pointer-events-none" />

            {/* Additional corner accents */}
            <div className="absolute top-[10%] left-[5%] w-20 h-20 border-l-2 border-t-2 border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]" />
            <div className="absolute bottom-[10%] right-[5%] w-20 h-20 border-r-2 border-b-2 border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]" />

        </div>
    );
}