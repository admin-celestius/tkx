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

            {/* Centralized Branding Layer */}
            <div className="relative z-10 h-full w-full pointer-events-none">
                {/* Logo centered higher up */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                    animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                    transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                    className="absolute top-[40%] left-1/2 pointer-events-auto"
                >
                    <img
                        src="/tk25-gold.svg"
                        alt="TK25 Gold Logo"
                        className="w-72 md:w-180 h-auto"
                    />
                </motion.div>

                {/* Timer positioned slightly higher */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: '-50%' }}
                    animate={{ opacity: 1, scale: 1, x: '-50%' }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="absolute top-[52%] left-1/2 pointer-events-auto z-20"
                >
                    <CountdownTimer onExplore={onExplore} />
                </motion.div>
            </div>

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
        </section>
    );
};

export default HeroSection;
