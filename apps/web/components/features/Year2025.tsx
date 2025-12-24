import { Milestone } from "../TimelineTypes";
import { motion } from "framer-motion";

export default function Year2025({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center font-sans">

            {/* 1. DEEP SPACE / BIOLUMINESCENT BACKGROUND */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                {/* Radial Gradients imitating light sources */}
                <div className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] bg-emerald-900/40 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] bg-teal-800/30 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            {/* 2. ORGANIC PARALLAX SHAPES */}
            {/* Background Layer: Slow moving large blobs */}
            <div className="absolute inset-0 parallax-bg pointer-events-none opacity-30">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-20"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            {/* Mid Layer: Floating "Spores" */}
            <div className="absolute inset-0 parallax-shard pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400 rounded-full glow-sm"
                        style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
                    />
                ))}
            </div>

            {/* 3. MAIN COMPOSITION (Center) */}
            <div className="relative z-10 w-full max-w-6xl px-8 flex flex-col md:flex-row items-center justify-between">

                {/* Left: Typography */}
                <div className="text-left md:w-1/2">
                    <div className="parallax-text">
                        <span className="block text-emerald-500 font-mono text-xs tracking-[0.5em] mb-4 uppercase">
                            Frequency Detected
                        </span>
                        <h1 className="text-8xl md:text-[10rem] leading-[0.9] font-thin text-white tracking-tighter mix-blend-difference">
                            2025
                        </h1>
                    </div>

                    <div className="parallax-text mt-8">
                        <h2 className="text-4xl md:text-6xl font-serif italic text-emerald-200/90">
                            Rhythm of Life
                        </h2>
                        <div className="w-full h-[1px] bg-gradient-to-r from-emerald-500 to-transparent mt-6" />
                    </div>
                </div>

                {/* Right: The Visualizer (Foreground Parallax) */}
                <div className="parallax-text md:w-1/3 mt-12 md:mt-0">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">

                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        </div>

                        <p className="text-lg text-emerald-100/80 font-light leading-relaxed mb-6">
                            {item.description}
                        </p>

                        {/* Simulated Waveform */}
                        <div className="flex items-end gap-1 h-20 opacity-80">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-emerald-400 rounded-t-sm"
                                    animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                                    transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* 4. FOREGROUND OVERLAY */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-20" />

        </div>
    );
}
