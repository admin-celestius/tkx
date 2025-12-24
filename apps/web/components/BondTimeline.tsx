"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IntroZoom from "./IntroZoom";
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
// Updated to Use ONLY: Circle, Slit, Pixel, Liquid per user request
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
        transition: "pixel"
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
        transition: "slit"
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
        transition: "liquid"
    },
    {
        year: "2025",
        title: "Zenith",
        description: "Rhythm of Life.",
        image: "",
        theme: { bg: "#000000", text: "#ffffff", accent: "#ffffff", font: "font-mono" },
        transition: "circle"
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

export default function BondTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<TimelineProgressHandle>(null);
    const [initialState] = useState(milestones[0]);
    const [introComplete, setIntroComplete] = useState(false);

    useLayoutEffect(() => {
        if (!introComplete) return;

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                const panels = panelsRef.current;

                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: `+=${milestones.length * 100}%`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const totalProgress = self.progress * (milestones.length - 1);
                            const idx = Math.round(totalProgress);

                            if (progressRef.current && milestones[idx]) {
                                progressRef.current.setVisualYear(
                                    milestones[idx].year,
                                    milestones[idx].theme.font || "font-sans"
                                );
                            }
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
                    const wrapper = panel.querySelector(".year-content-wrapper");
                    const logo = panel.querySelector(".fluid-logo-container");
                    const debris = panel.querySelector(".parallax-debris-container");
                    const parallaxElements = [wrapper, logo, debris].filter(Boolean);

                    if (isFirst) {
                        gsap.set(parallaxElements, { yPercent: 0, opacity: 1 });
                    } else {
                        // Start lower and invisible
                        gsap.set(parallaxElements, { yPercent: 40, opacity: 0 });
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

                // --- BUILD TIMELINE LIFECYCLE ---
                panels.forEach((panel, i) => {
                    if (!panel) return;

                    const type = milestones[i].transition;
                    const wrapper = panel.querySelector(".year-content-wrapper");
                    const logo = panel.querySelector(".fluid-logo-container");
                    const debris = panel.querySelector(".parallax-debris-container");
                    // Combine targets for unified parallax
                    const parallaxTargets = [wrapper, logo, debris].filter(Boolean);

                    const startTime = i - 1;
                    const endTime = i;

                    // 1. ENTRY (Transition In) - Only for i > 0
                    if (i > 0) {
                        // Reveal Panel Container (Parent)
                        masterTl.set(panel, { autoAlpha: 1 }, startTime);

                        // Content Parallax Entry (Float Up + Fade In)
                        masterTl.to(parallaxTargets, {
                            yPercent: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power2.out"
                        }, startTime);

                        // Specific Content Transitions (Grid / Slit columns)
                        if (type === "slit") {
                            const cols = panel.querySelectorAll(".slit-col");
                            masterTl.to(cols, {
                                yPercent: 0,
                                duration: 1,
                                ease: "power4.inOut",
                                stagger: { amount: 0.4, from: "edges" }
                            }, startTime);
                        }
                        else if (type === "pixel") {
                            const cells = panel.querySelectorAll(".pixel-cell");
                            // Grid IN
                            masterTl.to(cells, {
                                opacity: 1,
                                scale: 1.05,
                                duration: 0.4,
                                stagger: { amount: 0.15, grid: [10, 10], from: "random" },
                                ease: "steps(1)"
                            }, startTime);

                            // Grid OUT (reveal content underneath)
                            masterTl.to(cells, {
                                opacity: 0,
                                scale: 0,
                                duration: 0.6,
                                stagger: { amount: 0.15, grid: [10, 10], from: "random" },
                                ease: "power2.out"
                            }, startTime + 0.4);
                        }
                        else if (type === "liquid") {
                            const maskCircle = document.getElementById(`mask-circle-${i}`);
                            if (maskCircle) {
                                masterTl.to(maskCircle, {
                                    attr: { r: 2500 },
                                    duration: 1,
                                    ease: "power1.inOut"
                                }, startTime);
                            }
                        }
                        else {
                            // Circle
                            masterTl.to(panel, {
                                clipPath: "circle(150% at 50% 50%)",
                                duration: 1,
                                ease: "power1.inOut"
                            }, startTime);
                        }
                    }

                    // 2. EXIT (Transition Out) - Active for all panels except the very last one
                    if (i < milestones.length - 1) {
                        const nextStartTime = endTime;
                        // Move content UP and Fade OUT as the next panel arrives
                        masterTl.to(parallaxTargets, {
                            yPercent: -60,      // Move UP significantly
                            opacity: 0,         // Fade Out completely
                            scale: 0.85,        // Shrink slightly
                            duration: 1,
                            ease: "power2.in"
                        }, nextStartTime);
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
    }, [introComplete]);

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

            {!introComplete && (
                <div className="fixed inset-0 z-[9999]">
                    <IntroZoom onComplete={() => setIntroComplete(true)} />
                </div>
            )}

            <div
                ref={containerRef}
                className="relative w-full h-screen overflow-hidden"
                style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.8s ease-in' }}
            >
                <TimelineProgress ref={progressRef} milestones={milestones} initialYear={initialState.year} initialFont={initialState.theme.font} />

                {milestones.map((item, i) => {
                    const type = item.transition;
                    const isSlit = type === "slit";
                    const isPixel = type === "pixel";
                    const isLiquid = type === "liquid";

                    // CRITICAL VISIBILITY CSS LOGIC
                    // 1. Non-first items start hidden/invisible (prevents 2016-2022 blank issue)
                    // 2. Slit/Pixel panels are transparent (prevents blocking during transition)

                    const style: React.CSSProperties = {
                        zIndex: i + 1,
                        backgroundColor: (isSlit || isPixel) ? "transparent" : item.theme.bg,
                        color: item.theme.text,
                        visibility: i === 0 ? 'visible' : 'hidden',
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
                            {/* --- UNIFIED VISUALS (Logo + Debris) --- */}
                            <div className="fluid-logo-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 z-40 opacity-10 mix-blend-overlay pointer-events-none">
                                <FluidLogo fillProgress={1} baseColor={item.theme.accent} width={256} height={320} />
                            </div>

                            <div className="parallax-debris-container absolute inset-0 z-30 pointer-events-none mix-blend-plus-lighter">
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
                                    <div className="year-content-wrapper relative z-20 w-full h-full flex items-center justify-center">
                                        <YearSection item={item} />
                                    </div>

                                    {isPixel && (
                                        <PixelGridOverlay active={true} color={item.theme.bg} />
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
