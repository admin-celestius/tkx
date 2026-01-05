"use client";

import { useMemo } from "react";

interface PixelGridProps {
    active: boolean;
    color: string;
}

export default function PixelGridOverlay({ active, color }: PixelGridProps) {
    // Generate a fixed number of blocks for the grid
    const blocks = useMemo(() => Array.from({ length: 100 }), []);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-wrap pixel-grid-container px-0 py-0">
            {blocks.map((_, i) => (
                <div
                    key={i}
                    className="pixel-cell w-[10%] h-[10%]"
                    style={{ backgroundColor: color, opacity: 0 }}
                />
            ))}
        </div>
    );
}
