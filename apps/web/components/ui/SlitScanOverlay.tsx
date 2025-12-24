"use client";

import { useMemo } from "react";

interface SlitScanProps {
    active: boolean;
    colCount?: number;
}

export default function SlitScanOverlay({ active, colCount = 10 }: SlitScanProps) {
    const columns = useMemo(() => Array.from({ length: colCount }), [colCount]);

    return (
        <div
            className="absolute inset-0 w-full h-full flex pointer-events-none slit-scan-container"
            style={{ display: active ? 'flex' : 'none' }}
        >
            {columns.map((_, i) => (
                <div
                    key={i}
                    className="slit-col relative h-full flex-1 overflow-hidden"
                >
                    {/* The bar itself - animated by GSAP. Inherits color from parent panel */}
                    <div
                        className="slit-bar w-full h-full bg-current transform origin-bottom"
                        style={{ transform: 'scaleY(0)' }}
                    />
                </div>
            ))}
        </div>
    );
}
