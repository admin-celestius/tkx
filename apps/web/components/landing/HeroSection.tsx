"use client";

import React from 'react';
import Hero from '../Hero';
import CountdownTimer from '../CountdownTimer';
import { motion } from 'framer-motion';

interface HeroSectionProps {
    onExplore: () => void;
}

const HeroSection = ({ onExplore }: HeroSectionProps) => {
    return (
        <section className="relative h-screen w-screen overflow-hidden bg-black">
            {/* The interactive particle canvas from Hero.tsx */}
            <div className="absolute inset-0 z-0">
                <Hero />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <CountdownTimer />
                </div>

                {/* Explore Timeline Button - Repositioned to Bottom Left & Redesigned */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-12 z-[30] pointer-events-auto"
                >
                    <button
                        onClick={onExplore}
                        className="group relative px-10 py-4 bg-transparent transition-all duration-500 flex items-center gap-4"
                    >
                        {/* Outer Premium Border with Glow */}
                        <div className="absolute inset-0 border border-amber-500/30 rounded-full group-hover:border-amber-500/60 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]" />

                        {/* Sliding Glow Background */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />

                        {/* Animated Pulse Ring */}
                        <div className="absolute inset-[-4px] border border-amber-500/10 rounded-full animate-pulse group-hover:border-amber-500/20" />

                        {/* Text Label with Premium Gold */}
                        <span className="relative text-gold-premium text-xs md:text-sm tracking-[0.4em] uppercase font-bold transition-all duration-500 group-hover:tracking-[0.5em] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                            10 Years of Takshashila
                        </span>

                        {/* Interactive Arrow Indicator */}
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-amber-500"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.div>
                    </button>
                </motion.div>

                <style jsx>{`
                .text-gold-premium {
                    background: linear-gradient(
                        to bottom,
                        #ffffff 0%,
                        #ffecb3 20%,
                        #d4af37 45%,
                        #3a2c0f 50%,
                        #99752d 55%,
                        #ffecb3 80%,
                        #bf953f 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }
            `}</style>

                {/* Scroll Indicator or tagline could go here */}
            </div>

            {/* Top Right Logo */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute top-12 right-12 z-20"
            >
                <img
                    src="/tk25-gold.svg"
                    alt="TK25 Gold Logo"
                    className="w-36 md:w-50 h-auto opacity-80"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
