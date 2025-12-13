"use client";

import Hero from "./Hero";
import Xoom from "./Xoom";

/**
 * HeroXoom - Combines Hero and Xoom components
 * The Xoom animation starts when particles begin moving (wind phase ~3.5s after mount)
 * Wind phase triggers at: 1.5s (floating) + ~2s (line to 50%) = ~3.5s
 */
export default function HeroXoom() {
    // Wind phase starts approximately 3.5s after Hero mounts
    const windPhaseDelay = 3500;

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Hero as background */}
            <div className="absolute inset-0">
                <Hero />
            </div>

            {/* Xoom overlay - starts when wind phase begins */}
            <div className="absolute inset-0 pointer-events-none">
                <Xoom startDelay={windPhaseDelay} transparent={true} />
            </div>
        </div>
    );
}
