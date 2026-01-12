"use client";

import { useMemo } from "react";

// Deterministic PRNG
function mulberry32(a: number) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

interface ParallaxDebrisProps {
    color: string;
    count?: number;
    seed?: number;
}

export default function ParallaxDebris({ color, count = 10, seed = 1 }: ParallaxDebrisProps) {
    const shards = useMemo(() => {
        const random = mulberry32(seed * 1347);
        return Array.from({ length: count }).map((_, i) => {
            const size = 20 + random() * 40; // 20-60px
            const shapeType = random(); // 0-1
            const r1 = random();
            const r2 = random();
            const r3 = random();
            const r4 = random();
            const r5 = random();
            const r6 = random();

            // Shape Logic
            let borderRadius = '0%';
            let clipPath = 'none';

            if (shapeType < 0.33) {
                // Circle
                borderRadius = '50%';
            } else if (shapeType < 0.66) {
                // Square/Rectangle
                borderRadius = '10%'; // Slight rounding
            } else {
                // Triangle
                clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }

            return {
                width: size,
                height: size * (0.8 + r1 * 0.4), // Vary aspect ratio
                top: `${r2 * 100}%`,
                left: `${r3 * 100}%`,
                rotate: r4 * 360,
                opacity: 0.1 + r5 * 0.2, // Low opacity base
                rotationSpeed: 0.5 + r6, // Deterministic rotation speed
                borderRadius,
                clipPath
            };
        });
    }, [count, seed]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden parallax-debris-container will-change-transform">
            {shards.map((s, i) => (
                <div
                    key={i}
                    className="parallax-shard absolute bg-current"
                    data-rotation-speed={s.rotationSpeed}
                    style={{
                        backgroundColor: color,
                        width: s.width,
                        height: s.height,
                        top: s.top,
                        left: s.left,
                        transform: `rotate(${s.rotate}deg)`,
                        opacity: 0.3 + s.opacity * 0.4, // TRANSLUCENT (0.3 to 0.7)
                        borderRadius: s.borderRadius,
                        clipPath: s.clipPath
                    }}
                />
            ))}
        </div>
    );
}
