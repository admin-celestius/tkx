import { Milestone } from "../TimelineTypes";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Year2018({ item }: { item: Milestone }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Framer Motion Transforms for KINETIC elements (Backgrounds)
    // Big Text: Super fast horizontal fly-by
    const xBigText = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    // Shapes - Full Rotation & Massive Position Shifts
    // We only keep the ones NOT handled by GSAP here
    // const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 180]); 
    const yShape = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    const scaleShape = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

    const rotateTriangle = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const xTriangle = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#ccff00] text-black font-sans">
            {/* 1. Background Grid - Subtle Structure */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-black/10" />
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-black/10" />

            {/* 2. Massive Typography - Left Aligned & Structural */}
            {/* GSAP CONTROLLED: 'parallax-text' Class */}
            {/* User requested Entry/Exit Parallax for this */}
            <div className="absolute top-[15%] left-[5%] z-20 mix-blend-darken parallax-text">
                <div className="origin-left">
                    <h1 className="text-[18vw] leading-[0.8] font-black tracking-tighter">
                        2018
                    </h1>
                    <div className="ml-2 mt-4 flex items-center gap-4">
                        <div className="w-16 h-4 bg-black" />
                        <h1 className="text-4xl font-bold tracking-widest uppercase">Momentum</h1>
                    </div>
                </div>
            </div>

            {/* 3. Kinetic Background Typography - Running behind */}
            {/* FRAMER CONTROLLED (Kinetic) */}
            <motion.div
                style={{ x: xBigText }}
                className="absolute bottom-[5%] left-[-20%] whitespace-nowrap z-10 opacity-10 pointer-events-none will-change-transform"
            >
                <span className="text-[20vw] font-black italic tracking-tighter">
                    EXPANSION /// VELOCITY /// EXPANSION /// VELOCITY
                </span>
            </motion.div>

            {/* 4. Structural Geometric Elements */}

            {/* Top Right: Massive Solid Circle Anchor */}
            {/* FRAMER CONTROLLED */}
            <motion.div
                style={{ y: yShape, scale: scaleShape }}
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-black rounded-full mix-blend-multiply opacity-10 z-0 will-change-transform"
            />

            {/* Middle Right: Floating Geometric Cluster - THE HOLLOW SQUARE */}
            {/* GSAP CONTROLLED: 'visual-element' (Entry) + 'parallax-shard' (Continuous Spin) */}
            <div
                className="visual-element parallax-shard absolute top-[30%] right-[10%] w-[25vw] h-[25vw] border-[20px] border-black/80 z-20 will-change-transform"
                data-rotation-speed="0.2"
            />

            {/* Bottom Left: Triangle - SPINNING & MOVING */}
            {/* FRAMER CONTROLLED */}
            <motion.div
                style={{ x: xTriangle, rotate: rotateTriangle }}
                className="absolute bottom-[-10%] left-[10%] w-0 h-0 border-l-[100px] border-l-transparent border-b-[200px] border-b-black/20 border-r-[100px] border-r-transparent z-10 pointer-events-none will-change-transform"
            />

            {/* Decorative Data Points - Static contrast */}
            <div className="absolute top-[30%] left-[55%] font-mono text-xs font-bold tracking-widest opacity-60 parallax-text">
                <p>COORD: 45.92.11</p>
                <p>STATUS: ACTIVE</p>
            </div>

            {/* The Horizontal Cards (GSAP Logic) */}
            {/* The Horizontal Cards (Removed as per user request to 'revert back' to no stages) */}
            {/* 
            <div className="horizontal-scroll-wrapper absolute bottom-12 left-0 flex items-end gap-12 z-30 will-change-transform pb-8">
                ... (Removed) ...
            </div> 
            */}

        </div>
    );
}
