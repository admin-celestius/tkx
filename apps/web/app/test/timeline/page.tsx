"use client";

import { useState } from "react";
import IntroZoom from "../../components/IntroZoom";
import BondTimeline from "../../components/BondTimeline";
import Navbar from "../../components/Navbar";

export default function TimelinePage() {
    return (
        <main className="bg-black min-h-screen relative selection:bg-amber-500 selection:text-black">
            {/* Navbar - Rendered in Root Layout */}

            {/* Timeline - Z-Index 0 */}
            <div className="relative z-0">
                <BondTimeline />
            </div>
        </main>
    );
}
