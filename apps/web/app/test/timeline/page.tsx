"use client";

import { useState } from "react";
import BondTimeline from "../../../components/BondTimeline";

export default function TimelinePage() {
    return (
        <main className="bg-black min-h-screen relative selection:bg-amber-500 selection:text-black">
            {/* Timeline - Z-Index 0 */}
            <div className="relative z-0">
                <BondTimeline />
            </div>
        </main>
    );
}
