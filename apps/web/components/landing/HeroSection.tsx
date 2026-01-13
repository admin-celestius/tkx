"use client";

import React from 'react';
import Hero from '../Hero';
import CountdownTimer from '../CountdownTimer';

const HeroSection = () => {
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

                {/* Scroll Indicator or tagline could go here */}
            </div>
        </section>
    );
};

export default HeroSection;
