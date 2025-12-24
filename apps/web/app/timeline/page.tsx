"use client";

import { useState } from "react";
import IntroZoom from "../../components/IntroZoom";
import BondTimeline from "../../components/BondTimeline";
import Navbar from "../../components/Navbar";

export default function TimelinePage() {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <main className="bg-black min-h-screen relative selection:bg-amber-500 selection:text-black">
            {/* Navbar - Restored */}
            <Navbar />

            {/* Intro Grid - Z-Index 50 */}
            {!introComplete && (
                <div className="fixed inset-0 z-50">
                    <IntroZoom onComplete={() => setIntroComplete(true)} />
                </div>
            )}

            {/* Timeline - Z-Index 0 (Visible underneath when intro fades) */}
            {introComplete && (
                <div className="relative z-0 animate-in fade-in duration-1000">
                    <BondTimeline />
                </div>
            )}
        </main>
    );
}
