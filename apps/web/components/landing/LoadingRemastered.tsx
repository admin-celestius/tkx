"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function LoadingRemastered() {
    // We use a key to force-remount the animation for the demo loop
    const [loopKey, setLoopKey] = useState(0);

    return (
        <HybridXLoader key={loopKey} onComplete={() => setLoopKey(k => k + 1)} />
    );
}

function HybridXLoader({ onComplete }: { onComplete?: () => void }) {
    const [stage, setStage] = useState<
        | "logo"
        | "logo-hold"
        | "flip"
        | "hold"
        | "shrink-out"
    >("logo");

    useEffect(() => {
        // --- TIMELINE ---
        // 0-3s:   Logo enters
        // 3.0s:   Logo Hold
        // 3.5s:   Logo Flips Out / TKX Flips In
        // 6.0s:   Hold TKX
        // 7.5s:   ZOOM START (X flies into camera)
        // 8.8s:   Unmount (Shortened slightly to sync with the zoom impact)

        const logoHoldTimer = setTimeout(() => setStage("logo-hold"), 3000);
        const flipTimer = setTimeout(() => setStage("flip"), 3500);
        const holdTimer = setTimeout(() => setStage("hold"), 4500);
        const shrinkTimer = setTimeout(() => setStage("shrink-out"), 5500);

        // Loop restart instead of unmount
        const endTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 9000); // Give it a bit more time to sit in the "zoomed" state (empty) before looping

        return () => {
            clearTimeout(logoHoldTimer);
            clearTimeout(flipTimer);
            clearTimeout(holdTimer);
            clearTimeout(shrinkTimer);
            clearTimeout(endTimer);
        };
    }, [onComplete]);

    // --- VARIANTS ---

    const logoVariant: Variants = {
        logo: {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            filter: "brightness(1)",
            transition: { duration: 0 }
        },
        "logo-hold": {
            scale: 1,
            rotateY: 0,
            opacity: 1,
            filter: "brightness(1)",
            transition: { duration: 0.5 }
        },
        flip: {
            rotateY: 90,
            scale: 1.1,
            opacity: 0,
            filter: "brightness(2)",
            transition: { duration: 0.5, ease: "easeIn" }
        }
    };

    const tkxVariant: Variants = {
        initial: {
            rotateY: -90,
            scale: 1.1,
            opacity: 0,
            filter: "brightness(2)"
        },
        flip: {
            rotateY: 0,
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            transition: { duration: 0.5, ease: "easeOut", delay: 0.5 }
        },
        hold: {
            rotateY: 0,
            scale: 1,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "brightness(1)",
            transition: { duration: 0.5 }
        },
        // --- SHRINK OUT ---
        "shrink-out": {
            rotateY: 0,
            scale: 1,
            clipPath: "inset(50% 0% 50% 0%)",
            opacity: 1,
            filter: "brightness(1)",
            transition: {
                duration: 1.5,
                ease: "easeInOut"
            }
        }
    };

    const boxContainerVariant: Variants = {
        hidden: {
            opacity: 0,
            scale: 1,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            scale: 1.5,
            transition: {
                opacity: { duration: 0.2 },
                scale: { delay: 1.5, duration: 0.5, ease: "easeInOut" }
            }
        }
    };

    const centerShapeVariant: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 2.0, duration: 0.5, ease: "easeOut" }
        }
    };

    const showLogo = stage === "logo" || stage === "logo-hold" || stage === "flip";
    const showTkx = stage === "flip" || stage === "hold" || stage === "shrink-out";
    const showBox = stage === "shrink-out";

    // Helper to detect if we are in the final stage
    const isShrinking = stage === "shrink-out";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 overflow-hidden">
            {/* BACKGROUND LAYER: 
              Fades to transparent slightly BEFORE the X is finished shrinking.
            */}
            <motion.div
                className="absolute inset-0 bg-black"
            // Kept solid during defill
            />

            <motion.div
                className="absolute inset-0"
                // Kept visible
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)"
                }}
            />

            {/* PARTICLES (Fade out cleanly before shrink hits) */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                animate={{ opacity: isShrinking ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                {[...Array(35)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                            background: i % 3 === 0 ? "#8B6914" : i % 3 === 1 ? "#6B4F0A" : "#4a3000",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                            opacity: 0.5,
                        }}
                        animate={{ y: [0, -120], x: Math.sin(i) * 30, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 6 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
                    />
                ))}
            </motion.div>

            <div
                className="relative w-[300px] h-[300px] flex items-center justify-center"
                style={{ perspective: "1000px" }}
            >
                {/* LOGO */}
                <AnimatePresence>
                    {showLogo && (
                        <motion.div
                            key="logo-container"
                            className="absolute flex items-center justify-center z-10"
                            variants={logoVariant}
                            initial="logo"
                            animate={stage}
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            <motion.img
                                src="/tk-logo-animated.svg"
                                alt="Takshashila Logo"
                                className="w-36 h-36 object-contain relative z-20"
                                style={{
                                    mixBlendMode: "screen",
                                    filter: "contrast(1.3) brightness(0.9)",
                                    transform: "translateZ(0)"
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* START BOX - INLINED SVG FOR GRANULAR CONTROL */}
                <motion.div
                    key="box-container"
                    className="absolute flex items-center justify-center z-10 pointer-events-none"
                    variants={boxContainerVariant}
                    initial="hidden"
                    animate={showBox ? "visible" : "hidden"}
                    style={{
                        width: "140px",
                        height: "140px",
                        filter: "drop-shadow(0 0 10px rgba(198, 166, 100, 0.4))"
                    }}
                >
                    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#C6A664", stopOpacity: 1 }} />
                                <stop offset="30%" style={{ stopColor: "#F2E2A8", stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: "#C6A664", stopOpacity: 1 }} />
                                <stop offset="80%" style={{ stopColor: "#917232", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#7A5C1F", stopOpacity: 1 }} />
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                <feOffset dx="2" dy="2" result="offsetblur" />
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.3" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* OUTER BOX - Shows immediately (just opacity fade in with container) */}
                        <path
                            d="M 75 100 L 95 80 L 115 100 L 95 120 Z"
                            fill="url(#goldGradient)"
                            filter="url(#shadow)"
                        />

                        {/* CENTER SHAPE - Animates in LATER */}
                        <motion.path
                            d="M 79 100 L 95 84 L 111 100 L 110 101 L 95 86 L 80 101 L 79 100 Z"
                            fill="black"
                            variants={centerShapeVariant}
                        />
                    </svg>
                </motion.div>

                {/* TKX - ZOOM THROUGH */}
                {showTkx && (
                    <motion.div
                        key="tkx-container"
                        className="absolute flex items-center justify-center z-10 pointer-events-none"
                        variants={tkxVariant}
                        initial="initial"
                        animate={stage}
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <motion.img
                            src="/test-x.svg"
                            alt="TKX"
                            className="w-[140px] object-contain"
                            style={{
                                transform: "translateZ(0)",
                                willChange: "transform, opacity"
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
