"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// 6 projection directions (avoiding center - top/bottom)
type ProjectionDirection = "topLeft" | "left" | "bottomLeft" | "topRight" | "right" | "bottomRight";
type AnimationStage = "hidden" | "appearing" | "growing" | "fading" | "passed";

// Logo configuration: direction and delay offset (~900ms between each)
const logoConfigs: { direction: ProjectionDirection; delayOffset: number }[] = [
    { direction: "topLeft", delayOffset: 0 },
    { direction: "right", delayOffset: 900 },
    { direction: "bottomLeft", delayOffset: 1800 },
    { direction: "topRight", delayOffset: 2700 },
    { direction: "left", delayOffset: 3600 },
    { direction: "bottomRight", delayOffset: 4500 },
    { direction: "topRight", delayOffset: 5400 },
    { direction: "bottomLeft", delayOffset: 6300 },
    { direction: "right", delayOffset: 7200 },
];

// Get transform for each direction
const getDirectionTransform = (direction: ProjectionDirection, stage: AnimationStage) => {
    // Positions pushed further to sides - avoiding center area
    const transforms: Record<ProjectionDirection, Record<string, string>> = {
        topLeft: {
            hidden: "translate3d(-400px, -180px, -800px) scale(0.2)",
            appearing: "translate3d(-400px, -180px, -600px) scale(0.4)",
            growing: "translate3d(-500px, -240px, 0px) scale(1.5)",
            fading: "translate3d(-650px, -350px, 400px) scale(3)",
            passed: "translate3d(-1000px, -550px, 1200px) scale(6)",
        },
        left: {
            hidden: "translate3d(-450px, 0, -800px) scale(0.2)",
            appearing: "translate3d(-450px, 0, -600px) scale(0.4)",
            growing: "translate3d(-550px, 0, 0px) scale(1.5)",
            fading: "translate3d(-700px, 0, 400px) scale(3)",
            passed: "translate3d(-1100px, 0, 1200px) scale(6)",
        },
        bottomLeft: {
            hidden: "translate3d(-400px, 180px, -800px) scale(0.2)",
            appearing: "translate3d(-400px, 180px, -600px) scale(0.4)",
            growing: "translate3d(-500px, 240px, 0px) scale(1.5)",
            fading: "translate3d(-650px, 350px, 400px) scale(3)",
            passed: "translate3d(-1000px, 550px, 1200px) scale(6)",
        },
        topRight: {
            hidden: "translate3d(400px, -180px, -800px) scale(0.2)",
            appearing: "translate3d(400px, -180px, -600px) scale(0.4)",
            growing: "translate3d(500px, -240px, 0px) scale(1.5)",
            fading: "translate3d(650px, -350px, 400px) scale(3)",
            passed: "translate3d(1000px, -550px, 1200px) scale(6)",
        },
        right: {
            hidden: "translate3d(450px, 0, -800px) scale(0.2)",
            appearing: "translate3d(450px, 0, -600px) scale(0.4)",
            growing: "translate3d(550px, 0, 0px) scale(1.5)",
            fading: "translate3d(700px, 0, 400px) scale(3)",
            passed: "translate3d(1100px, 0, 1200px) scale(6)",
        },
        bottomRight: {
            hidden: "translate3d(400px, 180px, -800px) scale(0.2)",
            appearing: "translate3d(400px, 180px, -600px) scale(0.4)",
            growing: "translate3d(500px, 240px, 0px) scale(1.5)",
            fading: "translate3d(650px, 350px, 400px) scale(3)",
            passed: "translate3d(1000px, 550px, 1200px) scale(6)",
        },
    };
    return transforms[direction][stage];
};

const getOpacity = (stage: AnimationStage) => {
    switch (stage) {
        case "hidden": return 0;
        case "appearing": return 1;
        case "growing": return 1;
        case "fading": return 0.3;
        case "passed": return 0;
    }
};

const getTransition = (stage: AnimationStage) => {
    switch (stage) {
        case "hidden":
            return "transform 0s, opacity 0s";
        case "appearing":
            return "transform 0.8s ease-out, opacity 0.6s ease-in";
        case "growing":
            return "transform 2s linear, opacity 0.5s ease-in";
        case "fading":
            return "transform 1.5s linear, opacity 1.2s ease-out";
        case "passed":
            return "transform 1.5s linear, opacity 0.8s ease-out";
    }
};

const imageStyle = {
    objectFit: "contain" as const,
    filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 20px rgba(218, 165, 32, 0.25))",
};

interface XoomProps {
    /** Delay before animations start (ms) - sync with Hero wind phase */
    startDelay?: number;
    /** Use transparent background for overlay mode */
    transparent?: boolean;
}

export default function Xoom({ startDelay = 0, transparent = false }: XoomProps) {
    const [stages, setStages] = useState<AnimationStage[]>(
        logoConfigs.map(() => "hidden") // Start hidden
    );

    useEffect(() => {
        const allTimers: NodeJS.Timeout[] = [];

        logoConfigs.forEach((config, index) => {
            const baseDelay = config.delayOffset;

            // Appearing stage - fade in smoothly
            allTimers.push(
                setTimeout(() => {
                    setStages(prev => {
                        const next = [...prev];
                        next[index] = "appearing";
                        return next;
                    });
                }, startDelay + baseDelay)
            );

            // Growing stage - start the main animation
            allTimers.push(
                setTimeout(() => {
                    setStages(prev => {
                        const next = [...prev];
                        next[index] = "growing";
                        return next;
                    });
                }, startDelay + baseDelay + 600)
            );

            // Fading stage
            allTimers.push(
                setTimeout(() => {
                    setStages(prev => {
                        const next = [...prev];
                        next[index] = "fading";
                        return next;
                    });
                }, startDelay + baseDelay + 2200)
            );

            // Passed stage
            allTimers.push(
                setTimeout(() => {
                    setStages(prev => {
                        const next = [...prev];
                        next[index] = "passed";
                        return next;
                    });
                }, startDelay + baseDelay + 3700)
            );
        });

        return () => allTimers.forEach(clearTimeout);
    }, [startDelay]);

    return (
        <section
            className="relative w-screen h-screen overflow-hidden"
            style={{
                background: transparent ? "transparent" : "#000000",
                perspective: "1200px",
            }}
        >
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
            >
                {logoConfigs.map((config, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            transform: getDirectionTransform(config.direction, stages[index]),
                            opacity: getOpacity(stages[index]),
                            transition: getTransition(stages[index]),
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <Image
                            src="/tk26logo_text.png"
                            alt="Takshashila 2026 Logo"
                            width={400}
                            height={400}
                            priority
                            style={imageStyle}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
