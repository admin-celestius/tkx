import { Milestone } from "../TimelineTypes";
import { motion } from "framer-motion";

export default function Year2024({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative overflow-hidden bg-transparent flex items-center justify-center font-mono text-black">
            {/* 1. TECHNICAL GRID BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* 2. PARALLAX ELEMENTS: BLUEPRINT MARKERS */}
            {/* These need to be separated for GSAP targeting (.parallax-bg vs .parallax-text) */}

            {/* Center Globe Diagram (Background Parallax) */}
            <div className="absolute inset-0 flex items-center justify-center parallax-bg pointer-events-none opacity-10">
                <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw]">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="0.2" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="black" strokeWidth="0.1" strokeDasharray="2 2" />
                    <path d="M50,2 L50,98 M2,50 L98,50" stroke="black" strokeWidth="0.1" />
                    <path d="M15,50 Q50,0 85,50 Q50,100 15,50" fill="none" stroke="black" strokeWidth="0.1" />
                </svg>
            </div>

            {/* Floating Data Cards (Mid-Ground Parallax) */}
            <div className="absolute top-[20%] left-[10%] bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] parallax-shard hidden md:block">
                <div className="text-[10px] font-bold tracking-widest mb-1">DESTINATION</div>
                <div className="text-xl font-black">TOKYO / HND</div>
                <div className="mt-2 h-1 w-full bg-black/10 overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-red-600 w-1/2"
                    />
                </div>
            </div>

            <div className="absolute bottom-[20%] right-[10%] bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] parallax-shard hidden md:block">
                <div className="text-[10px] font-bold tracking-widest mb-1">FLIGHT STATUS</div>
                <div className="text-xl font-black text-green-600">ON TIME</div>
                <div className="text-xs uppercase mt-1">Alt: 32,000ft / Spd: 580kn</div>
            </div>

            {/* 3. MAIN CONTENT (Foreground Parallax) */}
            <div className="relative z-20 text-center max-w-4xl px-4">

                {/* Year - Huge Stencil */}
                <div className="parallax-text mb-8">
                    <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 opacity-90 mix-blend-multiply">
                        2024
                    </h1>
                </div>

                {/* Badge Title */}
                <div className="parallax-text inline-block relative">
                    <div className="absolute inset-0 bg-yellow-400 rotate-2 translate-y-2 z-0" />
                    <div className="relative bg-black text-white px-8 py-4 z-10 border-2 border-transparent">
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest">
                            Around The World
                        </h2>
                    </div>
                </div>

                {/* Editorial Description */}
                <div className="mt-12 parallax-text">
                    <div className="bg-white/90 backdrop-blur border-l-4 border-red-500 p-6 text-left shadow-lg max-w-xl mx-auto transform -rotate-1">
                        <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                            {item.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-red-500 uppercase">Live Tracking Active</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 4. PLANE ANIMATION LAYER */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
                <motion.path
                    d="M-100,600 C 200,600 400,-100 800,300 S 1200,600 1500,100"
                    fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="8 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "linear" }}
                />
                <motion.foreignObject width="40" height="40">
                    <motion.div
                        className="text-4xl"
                        style={{ offsetPath: "path('M-100,600 C 200,600 400,-100 800,300 S 1200,600 1500,100')" }}
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                    >
                        ✈️
                    </motion.div>
                </motion.foreignObject>
            </svg>

        </div>
    );
}
