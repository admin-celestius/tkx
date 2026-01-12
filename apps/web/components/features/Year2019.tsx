"use client";
import { Milestone } from "../TimelineTypes";

export default function Year2019({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative bg-[#050002] overflow-hidden font-sans">

            {/* 1. HUGE 2019 (Background Layer) */}
            {/* Reduced size and adjusted alignment for better aesthetics */}
            <div className="absolute top-[8%] left-[2%] z-0 select-none leading-none pointer-events-none">
                <h1 className="text-[20vw] font-black text-[#e8e8e8] tracking-tighter">
                    20
                </h1>
                {/* The "19" is shifted up and right to overlap the "20" - now visible with bright pink color */}
                <h1 className="text-[20vw] font-black text-[#ff0f4d] tracking-tighter -mt-[13vw] ml-[11vw]">
                    19
                </h1>
            </div>

            {/* 2. THE IMAGE (Right Side) - Tilted 20 degrees left */}
            {/* Image positioned and rotated with glitch effect matching textbox */}
            {item.image && (
                <div className="absolute top-[15%] right-[8%] z-10">
                    {/* Red semi-transparent glitch shadow */}
                    <div className="absolute w-[24vw] h-[36vw] bg-[#ff0f4d]/50 transform -rotate-[20deg] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3"></div>

                    {/* Red background rectangle */}
                    <div className="absolute w-[24vw] h-[36vw] bg-[#ff0f4d] transform -rotate-[20deg]"></div>

                    {/* Main image container */}
                    <div className="relative w-[24vw] h-[36vw] bg-zinc-900 border border-zinc-800/50 transform -rotate-[20deg] origin-center">
                        <img
                            src={item.image}
                            alt={item.title}
                            // Increased contrast and brightness slightly for that "blown out" aesthetic
                            className="w-full h-full object-cover grayscale contrast-[1.3] brightness-110"
                        />
                        {/* subtle texture overlay */}
                        <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none"></div>
                    </div>
                </div>
            )}

            {/* 3. THE PINK "ENTROPY" BANNER (Center overlap) */}
            {/* Repositioned lower for better spacing */}
            <div className="absolute top-[70%] left-[10%] w-[42vw] max-w-2xl z-20">

                {/* A. White Glitch Shadow (Offset Background) */}
                {/* Tighter offset for a cleaner glitch look */}
                <div className="absolute inset-0 bg-[#e8e8e8] transform translate-x-1.5 translate-y-1.5 md:translate-x-3 md:translate-y-3 z-[-1]"></div>

                {/* B. Main Pink Container */}
                {/* Reduced padding and size for better aesthetics */}
                <div className="relative bg-[#ff0f4d] p-4 md:p-7 border-2 border-transparent">
                    {/* FONT SIZE REDUCED */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase text-black leading-[0.9] tracking-tight max-w-[95%]">
                        ENTROPY INCREASES AS THE SYSTEM EXPANDS
                    </h2>
                    {/* SUBTEXT FONT SIZE REDUCED */}
                    <p className="mt-2 md:mt-4 font-mono font-bold text-black/80 text-[10px] md:text-xs tracking-[0.25em] uppercase">
                        /// SYSTEM_FAILURE_DETECTED
                    </p>
                </div>
            </div>

            {/* 4. DECORATIVE GEOMETRY (Subtle floating shapes for depth) */}
            <div className="absolute bottom-[15%] left-[12%] w-12 h-12 bg-[#3d0815] transform rotate-12 opacity-60 z-0 blur-[1px]" />
            <div className="absolute bottom-[8%] left-[35%] w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-b-[#ff0f4d]/30 border-r-[20px] border-r-transparent transform rotate-[30deg] blur-[2px]" />
        </div>
    );
}