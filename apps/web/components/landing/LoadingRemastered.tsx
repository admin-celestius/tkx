"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function LoadingRemastered({ onFinished }: { onFinished?: () => void }) {
    return (
        <HybridXLoader onComplete={onFinished} />
    );
}

function HybridXLoader({ onComplete }: { onComplete?: () => void }) {
    const [stage, setStage] = useState<
        | "logo"
        | "logo-hold"
        | "flip"
        | "hold"
        | "shrink-out"
        | "ready-to-launch"
        | "launching"
    >("logo");

    useEffect(() => {
        const logoHoldTimer = setTimeout(() => setStage("logo-hold"), 3000);
        const flipTimer = setTimeout(() => setStage("flip"), 3500);
        const holdTimer = setTimeout(() => setStage("hold"), 4500);
        const shrinkTimer = setTimeout(() => setStage("shrink-out"), 5500);
        const readyTimer = setTimeout(() => setStage("ready-to-launch"), 7000);

        return () => {
            clearTimeout(logoHoldTimer);
            clearTimeout(flipTimer);
            clearTimeout(holdTimer);
            clearTimeout(shrinkTimer);
            clearTimeout(readyTimer);
        };
    }, []);

    const handleLaunch = () => {
        if (stage === "ready-to-launch") {
            setStage("launching");
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 1000); // Slightly faster
        }
    };

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
        "shrink-out": {
            rotateY: 0,
            scale: 0.8,
            clipPath: "inset(50% 0% 50% 0%)",
            opacity: 0,
            transition: {
                duration: 1.5,
                ease: "easeInOut"
            }
        },
        "ready-to-launch": {
            opacity: 0,
            transition: { duration: 0.5 }
        },
        launching: {
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    const boxContainerVariant: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            scale: 1.3,
            transition: {
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 1.5, ease: "easeInOut" }
            }
        },
        "ready-to-launch": {
            opacity: 1,
            scale: [1.3, 1.35, 1.3],
            transition: {
                scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        },
        launching: {
            scale: 1.5,
            opacity: 0,
            filter: "blur(20px)",
            transition: {
                duration: 0.8,
                ease: "easeOut"
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
    const showBox = stage === "shrink-out" || stage === "ready-to-launch" || stage === "launching";
    const isInteractive = stage === "ready-to-launch";

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black overflow-hidden cursor-none`}>
            {/* Background layers */}
            <motion.div
                className="absolute inset-0 bg-neutral-900"
                animate={{ opacity: stage === "launching" ? 0 : 1 }}
                transition={{ duration: 1 }}
            />

            {/* PARTICLES */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                animate={{ opacity: (stage === "ready-to-launch" || stage === "launching") ? 0 : 1 }}
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

            {/* Pulsing Glow behind box */}
            <AnimatePresence>
                {isInteractive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px]"
                    />
                )}
            </AnimatePresence>

            <div className="relative w-[300px] h-[300px] flex items-center justify-center" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="popLayout">
                    {showLogo && (
                        <motion.div
                            key="logo-container"
                            variants={logoVariant}
                            initial="logo"
                            animate={stage}
                            className="absolute z-20"
                        >
                            <img src="/tk-logo-animated.svg" className="w-36 h-36" alt="Logo" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="popLayout">
                    {showTkx && (
                        <motion.div
                            key="tkx-container"
                            variants={tkxVariant}
                            initial="initial"
                            animate={stage}
                            exit="ready-to-launch"
                            className="absolute z-10"
                        >
                            <img src="/test-x.svg" className="w-[140px]" alt="TKX" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    key="box-container"
                    variants={boxContainerVariant}
                    initial="hidden"
                    animate={stage}
                    onClick={handleLaunch}
                    className={`absolute z-50 flex items-center justify-center ${isInteractive ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`}
                    style={{ width: "140px", height: "140px" }}
                >
                    <svg width="100%" height="100%" viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#785A14" />
                                <stop offset="50%" stopColor="#F5D76E" />
                                <stop offset="100%" stopColor="#B98C23" />
                            </linearGradient>
                            <filter id="shadow">
                                <feGaussianBlur stdDeviation="0.5" />
                            </filter>
                        </defs>
                        <path d="M 75 100 L 95 80 L 115 100 L 95 120 Z" fill="url(#goldGradient)" filter="url(#shadow)" />
                        <motion.path
                            d="M 79 100 L 95 84 L 111 100 L 110 101 L 95 86 L 80 101 L 79 100 Z"
                            fill="black"
                            variants={centerShapeVariant}
                            initial="hidden"
                            animate={showBox ? "visible" : "hidden"}
                        />
                    </svg>

                    {isInteractive && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-40 w-max text-amber-500/60 text-[10px] tracking-[0.8em] uppercase font-light"
                        >
                            Click to Explore
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
