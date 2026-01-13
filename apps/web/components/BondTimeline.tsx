"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import FluidLogo from "./FluidLogo";
import YearSection from "./YearSection";
import TimelineProgress, { TimelineProgressHandle } from "./TimelineProgress";
import ParallaxDebris from "./ui/ParallaxDebris";
import PixelGridOverlay from "./ui/PixelGridOverlay";
import { Milestone } from "./TimelineTypes";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// DEFINING THE ERA DATA & TRANSITIONS
const milestones: Milestone[] = [
    {
        year: "2016",
        title: "Genesis",
        description: "The spark that started it all.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        theme: { bg: "#020617", text: "#38bdf8", accent: "#0ea5e9", font: "font-sans" },
        transition: "circle"
    },
    {
        year: "2017",
        title: "Growth",
        description: "Roots taking hold in the new digital soil.",
        image: "https://images.unsplash.com/photo-1518531933037-9a8472a0342d?q=80&w=2000&auto=format&fit=crop",
        theme: { bg: "#022c22", text: "#6ee7b7", accent: "#10b981", font: "font-serif" },
        transition: "pixel"
    },
    {
        year: "2018",
        title: "Momentum",
        description: "Breaking boundaries with speed.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        theme: { bg: "#bef264", text: "#000000", accent: "#000000", font: "font-mono" },
        transition: "slit"
    },
    {
        year: "2019",
        title: "Chaos",
        description: "Entropy increases as the system expands.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
        theme: { bg: "#4c0519", text: "#fda4af", accent: "#fb7185", font: "font-black" },
        transition: "liquid"
    },
    {
        year: "2020",
        title: "Digital Shift",
        description: "The great glitch. Reality went virtual.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        theme: { bg: "#000000", text: "#ef4444", accent: "#ff0000", font: "font-mono" },
        transition: "pixel"
    },
    {
        year: "2021",
        title: "Isolation",
        description: "Silence in the void. Building from within.",
        image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop",
        theme: { bg: "#0a0a0a", text: "#60a5fa", accent: "#3b82f6", font: "font-thin" },
        transition: "slit"
    },
    {
        year: "2022",
        title: "Reconnection",
        description: "Grid systems realigning. The network heals.",
        image: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=2000&auto=format&fit=crop",
        theme: { bg: "#2a1b0c", text: "#facc15", accent: "#ca8a04", font: "font-sans" },
        transition: "circle"
    },
    {
        year: "2023",
        title: "Renaissance",
        description: "Golden age of precision and art.",
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
        theme: { bg: "#f5f5f0", text: "#451a03", accent: "#ea580c", font: "font-serif" },
        transition: "liquid"
    },
    {
        year: "2024",
        title: "Ascension",
        description: "Around the World.",
        image: "",
        theme: { bg: "#e0e0e0", text: "#000000", accent: "#000000", font: "font-sans" },
        transition: "slit"
    },
    {
        year: "2025",
        title: "Zenith",
        description: "Rhythm of Life.",
        image: "",
        theme: { bg: "#000000", text: "#ffffff", accent: "#ffffff", font: "font-mono" },
        transition: "pixel"
    },
    {
        year: "2026",
        title: "Future",
        description: "We are the architects of the next horizon.",
        image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop",
        theme: { bg: "#1e002e", text: "#e9d5ff", accent: "#d8b4fe", font: "font-black" },
        transition: "circle"
    }
];

export default function BondTimeline({ onClose }: { onClose?: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<TimelineProgressHandle>(null);
    const [initialState] = useState(milestones[0]);


    useLayoutEffect(() => {


        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                const panels = panelsRef.current;

                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: `+=${milestones.length * 270}%`, // Reduced from 300% (10% Faster Scroll)
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const totalProgress = self.progress * (milestones.length - 1);
                            // SYNC FIX: Switch at 42% (User Requested "Very slow, maybe do 42%")
                            const idx = Math.floor(totalProgress + 0.58);

                            if (progressRef.current && milestones[idx]) {
                                progressRef.current.setVisualYear(
                                    milestones[idx].year,
                                    milestones[idx].theme.font || "font-sans"
                                );
                            }

                            // NAVBAR FADE LOGIC REMOVED (User requested "keep the navbar on top forever")
                        }
                    }
                });

                // --- INITIALIZE GSAP STATES ---
                panels.forEach((panel, i) => {
                    if (!panel) return;

                    const isFirst = i === 0;
                    const type = milestones[i].transition;

                    gsap.set(panel, { zIndex: i + 1 });

                    // IMPORTANT: We handle initial visibility via CSS style prop below to prevent FOUC,
                    // but we ensure GSAP knows about the autoAlpha state here too.
                    if (!isFirst) {
                        gsap.set(panel, { autoAlpha: 0 });
                    } else {
                        gsap.set(panel, { autoAlpha: 1 });
                    }

                    // Prepare Parallax Elements
                    const wrappers = panel.querySelectorAll(".year-content-wrapper"); // SELECT ALL (Fixes Slit bug)
                    const logo = panel.querySelector(".fluid-logo-container");
                    const debris = panel.querySelector(".parallax-debris-container");

                    // Initial State: Hidden & Offset
                    if (isFirst) {
                        gsap.set([wrappers, logo, debris], { yPercent: 0, opacity: 1 });
                    }

                    if (!isFirst) {
                        gsap.set([wrappers, logo, debris], { yPercent: 40, opacity: 0 });
                    }

                    // FORCE LOGO POSITION (Overrides previous sets)
                    if (logo) {
                        gsap.set(logo, { top: "45%", yPercent: -50, xPercent: -50 });
                    }

                    // Reset Transition Specifics
                    if (!isFirst) {
                        if (type === "slit") {
                            gsap.set(panel, { clipPath: "inset(0 0 0 0)" });
                            const cols = panel.querySelectorAll(".slit-col");
                            cols.forEach((col, cI) => {
                                gsap.set(col, { yPercent: cI % 2 === 0 ? 100 : -100 });
                            });
                        } else if (type === "pixel") {
                            gsap.set(panel, { clipPath: "inset(0 0 0 0)" });
                            const cells = panel.querySelectorAll(".pixel-cell");
                            gsap.set(cells, { opacity: 0, scale: 0.5 });
                        } else if (type === "liquid") {
                            gsap.set(panel, { clipPath: "none" });
                            const mask = document.getElementById(`mask-circle-${i}`);
                            if (mask) gsap.set(mask, { attr: { r: 0 } });
                        } else {
                            gsap.set(panel, { clipPath: "circle(0% at 50% 50%)" });
                        }
                    }
                });

                // --- BUILD TIMELINE LIFECYCLE (Time Slot Architecture) ---
                panels.forEach((panel, i) => {
                    if (!panel) return;

                    // TARGETS: Text/Logo (Content) separate from Background
                    const wrappers = panel.querySelectorAll(".year-content-wrapper");
                    const logo = panel.querySelector(".fluid-logo-container");
                    const debris = panel.querySelector(".parallax-debris-container");

                    const contentTargets = [...Array.from(wrappers)].filter(Boolean); // REMOVED LOGO from Parallax
                    const debrisTarget = debris;

                    const enterStartTime = i - 1;
                    const exitStartTime = i;

                    // --- TIME SLOT LOGIC ---
                    // 0.0 - 0.6: Text Exit (Old)
                    // 0.2 - 0.6: Text Entry (New) -> OVERLAP ACTIVE
                    // "As it ghosts out, next page comes"

                    // --- TIME SLOT LOGIC (SPEED UP 35%) ---
                    // 0.0 - 0.4: Text Exit (Old) [Was 0.6]
                    // 0.2 - 0.6: Text Entry (New) [Still overlaps]

                    const SLOT_ENTRY_START = enterStartTime + 0.2;
                    const SLOT_EXIT_START = exitStartTime;
                    const TRANSITION_DUR = 0.31; // Reduced 10% (0.35 -> 0.31)
                    const PARALLAX_DUR = 2.0;

                    // --- SYMMETRIC PARALLAX LOGIC ---
                    // "Neatly come together on the middle": Forced Symmetry (From = -To).
                    // "Distinct Styles": Pure Axis movements.

                    let pConfig = { from: { yPercent: 0, xPercent: 0, scale: 1, rotation: 0 }, to: { yPercent: 0, xPercent: 0, scale: 1, rotation: 0 } };

                    if (i <= 2) {
                        // PHASE 1: ASCENT (Pure Vertical)
                        // 25% Range. Symmetric.
                        pConfig.from = { yPercent: 25, xPercent: 0, scale: 1, rotation: 0 };
                        pConfig.to = { yPercent: -25, xPercent: 0, scale: 1, rotation: 0 };
                    }
                    else if (i <= 5) {
                        // PHASE 2: SHIFT (Pure Horizontal)
                        // 20% Range. Symmetric.
                        pConfig.from = { yPercent: 0, xPercent: 20, scale: 1, rotation: 0 };
                        pConfig.to = { yPercent: 0, xPercent: -20, scale: 1, rotation: 0 };
                    }
                    else if (i <= 8) {
                        // PHASE 3: DEPTH (Pure Scale)
                        // 0.8 -> 1.2. Symmetric around 1.0.
                        pConfig.from = { yPercent: 0, xPercent: 0, scale: 0.8, rotation: 0 };
                        pConfig.to = { yPercent: 0, xPercent: 0, scale: 1.2, rotation: 0 };
                    }
                    else {
                        // PHASE 4: ZENITH (Vertical Return)
                        pConfig.from = { yPercent: 25, xPercent: 0, scale: 1, rotation: 0 };
                        pConfig.to = { yPercent: -25, xPercent: 0, scale: 1, rotation: 0 };
                    }

                    if (i === 0) {
                        // GENESIS
                        masterTl.fromTo(contentTargets,
                            { yPercent: 0, xPercent: 0, scale: 1, rotation: 0 },
                            { yPercent: -50, duration: 1, ease: "none" },
                            0
                        );
                        if (debrisTarget) masterTl.fromTo(debrisTarget, { yPercent: 0 }, { yPercent: -100, duration: 1, ease: "none" }, 0);

                        // TEXT FADE ONLY (Added Logo)
                        masterTl.to([contentTargets, logo], { opacity: 0, duration: 0.4, ease: "power2.in" }, 0);
                        if (debrisTarget) masterTl.to(debrisTarget, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0);

                    } else {
                        // ALL OTHER PANELS

                        // 1. CONTENT PARALLAX (DOCKING LOGIC)
                        // "Should stop when everything aligns perfectly"
                        // 0-45%: Move In. 45-55%: DOCK (Center). 55-100%: Move Out.
                        masterTl.to(contentTargets, {
                            keyframes: {
                                "0%": { ...pConfig.from as any },
                                "45%": { yPercent: 0, xPercent: 0, scale: 1, rotation: 0 }, // DOCK
                                "55%": { yPercent: 0, xPercent: 0, scale: 1, rotation: 0 }, // HOLD
                                "100%": { ...pConfig.to as any }
                            },
                            duration: PARALLAX_DUR,
                            ease: "none"
                        }, enterStartTime);

                        // 1.5 DEBRIS PARALLAX (Robus Logic)
                        // Pre-calculate values to avoid runtime errors in Keyframes
                        if (debrisTarget) {
                            const dMult = 1.5;
                            // FORCE VERTICAL DRIFT: If Text has no Y movement (Phase 2/3), force Debris to drift Y anyway
                            const baseY = (pConfig.from as any).yPercent;
                            const forceY = baseY === 0 ? 30 : baseY; // If 0, use 30% drift

                            const dFromY = forceY * dMult;
                            const dFromX = (pConfig.from as any).xPercent * dMult;
                            const dFromS = (pConfig.from as any).scale !== 1 ? (pConfig.from as any).scale * 0.5 : 1;

                            const baseToY = (pConfig.to as any).yPercent;
                            const forceToY = baseToY === 0 ? -30 : baseToY; // If 0, use -30% drift

                            const dToY = forceToY * dMult;
                            const dToX = (pConfig.to as any).xPercent * dMult;
                            const dToS = (pConfig.to as any).scale !== 1 ? (pConfig.to as any).scale * 1.5 : 1;

                            masterTl.to(debrisTarget, {
                                keyframes: {
                                    "0%": { yPercent: dFromY, xPercent: dFromX, scale: dFromS },
                                    "45%": { yPercent: 0, xPercent: 0, scale: 1 },
                                    "55%": { yPercent: 0, xPercent: 0, scale: 1 },
                                    "100%": { yPercent: dToY, xPercent: dToX, scale: dToS }
                                },
                                duration: PARALLAX_DUR,
                                ease: "none"
                            }, enterStartTime);
                        }

                        // 2. VISIBILITY (Text & Debris Fade In - Fast 0.2s)
                        masterTl.fromTo([contentTargets, debrisTarget, logo], // Added Logo here for Fade Only
                            { opacity: 0 },
                            { opacity: 1, duration: 0.2, ease: "power2.out" },
                            SLOT_ENTRY_START
                        );

                        // 3. BACKGROUND / ENTRY TRANSITION
                        const type = milestones[i].transition;

                        if (type === "slit") {
                            const cols = panel.querySelectorAll(".slit-col");
                            if (cols.length) {
                                masterTl.fromTo(cols,
                                    { yPercent: (index) => index % 2 === 0 ? 100 : -100 },
                                    { yPercent: 0, duration: TRANSITION_DUR, ease: "power4.inOut", stagger: { amount: 0.15, from: "edges" } },
                                    SLOT_ENTRY_START
                                );
                            }
                        }
                        else if (type === "pixel") {
                            const cells = panel.querySelectorAll(".pixel-cell");
                            if (cells.length) {
                                // REVERSE: Start SOLID (1.5 scale covers gaps) -> Shrink/Fade OUT (Reveal Page)
                                masterTl.fromTo(cells,
                                    { opacity: 1, scale: 1.5 },
                                    { opacity: 0, scale: 0, duration: TRANSITION_DUR, stagger: { amount: 0.1, grid: [10, 10], from: "random" }, ease: "power2.out" },
                                    SLOT_ENTRY_START
                                );
                            }
                        }
                        else if (type === "liquid") {
                            const maskCircle = document.getElementById(`mask-circle-${i}`);
                            if (maskCircle) {
                                masterTl.fromTo(maskCircle,
                                    { attr: { r: 0 } },
                                    { attr: { r: 2500 }, duration: TRANSITION_DUR + 0.2, ease: "power1.inOut" },
                                    SLOT_ENTRY_START
                                );
                            }
                        }
                        else {
                            // Circle default
                            masterTl.fromTo(panel,
                                { clipPath: "circle(0% at 50% 50%)" },
                                { clipPath: "circle(150% at 50% 50%)", duration: TRANSITION_DUR + 0.2, ease: "power4.in" }, // Power4.in keeps it small/center longer
                                SLOT_ENTRY_START
                            );

                            // SHOCKWAVE RING & BURST ANIMATION
                            const ring = panel.querySelector(".shockwave-ring");
                            const burst = panel.querySelector(".color-burst");

                            if (ring) {
                                masterTl.fromTo(ring,
                                    { scale: 0, opacity: 1, borderWidth: "50px" },
                                    { scale: 1.5, opacity: 0, borderWidth: "0px", duration: TRANSITION_DUR + 0.5, ease: "power1.out" },
                                    SLOT_ENTRY_START
                                );
                            }
                            if (burst) {
                                masterTl.fromTo(burst,
                                    { opacity: 0.5 }, // Start visible (Flash of Previous Color)
                                    { opacity: 0, duration: TRANSITION_DUR + 0.3, ease: "power2.out" },
                                    SLOT_ENTRY_START
                                );
                            }
                        }

                        // 4. EXIT (Faster 0.4s)
                        if (i < milestones.length - 1) {
                            masterTl.to([contentTargets, logo], { // Added Logo to Exit Fade
                                opacity: 0,
                                duration: 0.4,
                                ease: "power2.in"
                            }, SLOT_EXIT_START);
                            if (debrisTarget) {
                                masterTl.to(debrisTarget, {
                                    opacity: 0,
                                    duration: 0.4,
                                    ease: "power2.in"
                                }, SLOT_EXIT_START);
                            }
                        }

                        // GHOSTING FIX: Fade Panel IN instead of Setting (Allows Opacity Overlap)
                        // If we just 'set', the background covers the previous ghost.
                        masterTl.fromTo(panel,
                            { autoAlpha: 0 },
                            { autoAlpha: 1, duration: TRANSITION_DUR, ease: "power2.inOut" },
                            SLOT_ENTRY_START
                        );
                    }
                });

                // Ensure timeline length covers all panels
                masterTl.to({}, { duration: 0, x: 0 }, milestones.length - 1);

            }, containerRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <div className="timeline-wrapper relative w-full h-full bg-black">
            {/* SVG FILTERS & MASKS */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <defs>
                    <filter id="liquidFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="warp" />
                        <feDisplacementMap in="SourceGraphic" in2="warp" scale="60" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    {milestones.map((_, i) => (
                        <mask key={`mask-def-${i}`} id={`inkMask-${i}`}>
                            <circle
                                id={`mask-circle-${i}`}
                                cx="50%"
                                cy="50%"
                                r="0"
                                fill="white"
                                filter="url(#liquidFilter)"
                            />
                        </mask>
                    ))}
                </defs>
            </svg>



            <div
                ref={containerRef}
                className="relative w-full h-screen overflow-hidden"
                style={{ opacity: 1 }}
            >
                <TimelineProgress ref={progressRef} milestones={milestones} initialYear={initialState.year} initialFont={initialState.theme.font} />

                {onClose && (
                    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[110] flex flex-col items-center gap-4 pointer-events-none">
                        <button
                            onClick={onClose}
                            className="pointer-events-auto group relative flex flex-col items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white opacity-60 group-hover:opacity-100 transition-opacity"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </div>
                            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-light group-hover:text-white/80 transition-all duration-300 vertical-text">
                                Back
                            </span>
                        </button>
                        <style jsx>{`
                            .vertical-text {
                                writing-mode: vertical-rl;
                                transform: rotate(180deg);
                            }
                        `}</style>
                    </div>
                )}

                {milestones.map((item, i) => {
                    const type = item.transition;
                    const isSlit = type === "slit";
                    const isPixel = type === "pixel";
                    const isLiquid = type === "liquid";
                    const isCircle = type === "circle";

                    // LOGIC: Use CURRENT text color (Incoming Theme) for Burst/Ring
                    const burstColor = item.theme.text;

                    // VISIBILITY ROBUSTNESS
                    // Reverted Radial Gradient. Using Overlay instead for "Previous Color" effect.
                    const style: React.CSSProperties = {
                        zIndex: i + 1,
                        background: (isSlit || isPixel) ? "transparent" : item.theme.bg,
                        color: item.theme.text,
                        opacity: i === 0 ? 1 : 0
                    };

                    if (isLiquid) {
                        style.maskImage = `url(#inkMask-${i})`;
                        style.WebkitMaskImage = `url(#inkMask-${i})`;
                    }

                    return (
                        <div
                            key={item.year}
                            ref={(el) => { (panelsRef.current[i] as any) = el }}
                            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
                            style={style}
                        >
                            {/* --- UNIFIED VISUALS --- */}
                            {/* Logo Lifted: top-[45%] (User requested "do top 45%") */}
                            <div className="fluid-logo-container absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 z-[60] opacity-80 pointer-events-none">
                                <FluidLogo fillProgress={1} baseColor={item.theme.text} width={256} height={320} />
                            </div>

                            {/* DEBRIS VISIBILITY FIX: Z-Index 100 + No Blend Mode */}
                            <div className="parallax-debris-container absolute inset-0 z-[100] pointer-events-none">
                                <ParallaxDebris color={item.theme.accent} count={6} seed={i} />
                            </div>


                            {/* --- SLIT SCAN LAYOUT --- */}
                            {isSlit ? (
                                <div className="absolute inset-0 w-full h-full flex z-20">
                                    {[...Array(5)].map((_, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className="slit-col relative h-full flex-1 overflow-hidden"
                                            style={{ backgroundColor: item.theme.bg }}
                                        >
                                            <div
                                                className="absolute top-0 h-full w-[100vw]"
                                                style={{ left: `-${colIndex * 20}vw` }}
                                            >
                                                {/* REMOVED INNER BG HACK: Restoring original noise/gradients for Pixel/Slit */}
                                                <div className="year-content-wrapper relative w-full h-full flex items-center justify-center p-8">
                                                    <YearSection item={item} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* --- STANDARD LAYOUT --- */
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* REMOVED INNER BG HACK */}
                                    <div className="year-content-wrapper relative z-20 w-full h-full flex items-center justify-center">
                                        <YearSection item={item} />
                                    </div>

                                    {isPixel && (
                                        <PixelGridOverlay active={true} color={item.theme.text} />
                                    )}

                                    {/* COLOR BURST & SHOCKWAVE (For Circle ONLY, and NOT Genesis) */}
                                    {isCircle && i > 0 && (
                                        <>
                                            {/* COLOR BURST */}
                                            <div
                                                className="color-burst absolute inset-0 z-0 pointer-events-none"
                                                style={{ backgroundColor: burstColor }}
                                            />
                                            {/* SHOCKWAVE RING */}
                                            <div
                                                className="shockwave-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 pointer-events-none"
                                                style={{
                                                    width: '100vmax',
                                                    height: '100vmax',
                                                    borderColor: burstColor,
                                                    borderStyle: 'solid'
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
