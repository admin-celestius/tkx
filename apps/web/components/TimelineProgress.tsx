"use client";

import { Milestone } from "./TimelineTypes";
import { forwardRef, useImperativeHandle, useRef } from "react";

export interface TimelineProgressHandle {
    setVisualYear: (year: string, font: string) => void;
}

interface TimelineProgressProps {
    milestones: Milestone[];
    initialYear: string;
    initialFont?: string;
}

const TimelineProgress = forwardRef<TimelineProgressHandle, TimelineProgressProps>(
    ({ milestones, initialYear, initialFont = "font-sans" }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            setVisualYear: (targetYear: string, targetFont: string) => {
                if (!containerRef.current) return;

                // 1. Update Container Font
                const container = containerRef.current;
                container.className = `flex flex-col items-end gap-1 transition-all duration-500 ${targetFont}`;

                // 2. Update Year Item Styles directly
                // Using data attributes to identify nodes
                const items = container.querySelectorAll("[data-year]");
                items.forEach((item) => {
                    const year = item.getAttribute("data-year");
                    const isTarget = year === targetYear;
                    const isMilestone = item.getAttribute("data-is-milestone") === "true";

                    if (isTarget) {
                        // ACTIVE STATE
                        item.className = `transition-all duration-150 leading-none text-white text-5xl md:text-6xl opacity-100 font-bold`;
                    } else {
                        // INACTIVE STATE
                        if (isMilestone) {
                            item.className = `transition-all duration-150 leading-none text-gray-500 text-3xl opacity-40 font-normal`;
                        } else {
                            // Hidden padding years
                            item.className = `transition-all duration-150 leading-none text-gray-500 text-3xl opacity-40 font-normal hidden md:block opacity-10`;
                        }
                    }
                });
            }
        }));

        // Generate visual list with padding
        const visualList = [
            "2032", "2031", "2030", "2029", "2028", "2027",
            ...milestones.map(m => m.year).reverse(),
            "2015", "2014", "2013", "2012", "2011", "2010"
        ];

        return (
            <div className="fixed right-8 top-0 bottom-0 z-[100] flex flex-col justify-center items-end pointer-events-none select-none mix-blend-difference">
                <div
                    ref={containerRef}
                    className={`flex flex-col items-end gap-1 ${initialFont} transition-all duration-500`}
                >
                    {visualList.map((year, i) => {
                        const isActive = year === initialYear;
                        const isMilestone = milestones.some(m => m.year === year);

                        // Initial Class Calculation
                        let className = `transition-all duration-150 leading-none `;
                        if (isActive) {
                            className += "text-white text-5xl md:text-6xl opacity-100 font-bold";
                        } else {
                            className += "text-gray-500 text-3xl opacity-40 font-normal";
                            if (!isMilestone) className += " hidden md:block opacity-10";
                        }

                        return (
                            <div
                                key={i}
                                data-year={year}
                                data-is-milestone={isMilestone}
                                style={{ fontFamily: 'inherit' }}
                                className={className}
                            >
                                {year}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

TimelineProgress.displayName = "TimelineProgress";
export default TimelineProgress;
