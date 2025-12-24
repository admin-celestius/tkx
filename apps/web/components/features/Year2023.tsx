"use client";
import { Milestone } from "../TimelineTypes";

export default function Year2023({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative bg-transparent overflow-hidden font-serif text-[#451a03] flex flex-col justify-between pt-8">

            {/* 0. INJECT STYLES FOR SCROLL ANIMATION */}
            <style jsx global>{`
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-left {
                    animation: scrollLeft 20s linear infinite;
                }
                .animate-scroll-right {
                    animation: scrollRight 20s linear infinite;
                }
            `}</style>

            {/* 1. TOP SCROLL BAND */}
            <div className="w-full border-b border-[#451a03]/20 py-3 md:py-4 overflow-hidden flex whitespace-nowrap bg-[#f5f5f0] z-10 relative">
                <div className="animate-scroll-left flex gap-8 min-w-full">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-xl md:text-3xl uppercase tracking-widest opacity-70">
                            RENAISSANCE - GOLDEN AGE - TIME MACHINE - FUTURE -
                        </span>
                    ))}
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA */}
            <div className="relative flex-grow w-full flex flex-col items-center justify-center z-0">

                {/* YEAR 2023 - Top Left with Hollow Letters */}
                <div className="absolute top-8 left-8 z-20">
                    <h1 className="text-6xl md:text-8xl font-black" style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px #92400e'
                    }}>
                        2023
                    </h1>
                </div>

                {/* DECORATIVE FLOATING SHAPES */}
                <div className="absolute top-[10%] left-[20%] w-16 h-16 bg-[#d97706]/20 rotate-12 blur-[1px]" />
                <div className="absolute top-[40%] right-[15%] w-24 h-24 bg-[#451a03]/5 rounded-full" />
                <div className="absolute bottom-[20%] left-[10%] w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-b-[#d97706]/30 border-r-[20px] border-r-transparent -rotate-12" />

                {/* ROW 1: "TRAVEL" */}
                <div className="relative z-10">
                    <h1 className="text-[11.2vw] leading-[0.8] tracking-tighter">
                        TRAVEL
                    </h1>
                </div>

                {/* ROW 2: "AT" - [IMG] - [LOGO] - [IMG] - "THE" */}
                <div className="w-full flex items-center justify-between px-4 md:px-12 relative h-[30vh]">

                    {/* "AT" */}
                    <span className="text-[8vw] leading-none opacity-80 relative z-10">AT</span>

                    {/* LEFT IMAGE (Portrait of Lady) */}
                    <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[20vw] h-[25vw] bg-gray-200 z-0 overflow-hidden shadow-lg rotate-[-2deg]">
                        <img
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
                            alt="Portrait"
                            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-[#451a03]/10 mix-blend-overlay pointer-events-none"></div>
                    </div>

                    {/* RIGHT IMAGE (Aesthetic Street/City) */}
                    <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[20vw] h-[20vw] bg-gray-200 z-0 overflow-hidden shadow-lg rotate-[3deg]">
                        <img
                            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2156&auto=format&fit=crop"
                            alt="Landscape"
                            className="w-full h-full object-cover grayscale sepia-[.2] hover:sepia-0 transition-all duration-500"
                        />
                    </div>

                    {/* "THE" */}
                    <span className="text-[8vw] leading-none opacity-80 relative z-10 mt-12">THE</span>
                </div>

                {/* ROW 3: "TIME" */}
                <div className="relative z-10 -mt-4">
                    <h1 className="text-[11.2vw] leading-[0.8] tracking-tighter">
                        TIME
                    </h1>
                </div>

            </div>

            {/* 3. BOTTOM SCROLL BAND */}
            <div className="w-full border-t border-[#451a03]/20 py-3 md:py-4 overflow-hidden flex whitespace-nowrap bg-[#f5f5f0] z-10 relative">
                <div className="animate-scroll-right flex gap-8 min-w-full">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-xl md:text-3xl uppercase tracking-widest opacity-70">
                            HISTORY - MEMORY - ARCHITECTURE - DESIGN -
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}