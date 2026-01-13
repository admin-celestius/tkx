"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface IntroZoomProps {
    onComplete: () => void;
}

export default function IntroZoom({ onComplete }: IntroZoomProps) {
    const container = useRef(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setVisible(false);
                    onComplete();
                }
            });

            // Initialize with full coverage
            gsap.set(container.current, { clipPath: "circle(150% at 50% 50%)" });

            tl.to(".intro-text", { opacity: 1, duration: 1, stagger: 0.2 })
                .to(".intro-text", { opacity: 0, duration: 0.5, delay: 0.5 })
                .fromTo(container.current,
                    { clipPath: "circle(150% at 50% 50%)" },
                    { clipPath: "circle(0% at 50% 50%)", duration: 1.5, ease: "power4.inOut" }
                );
        }, container);

        return () => ctx.revert(); // cleanup
    }, [onComplete]);
    // WAIT. "circle(0%)" CLOSES it. If opacity is 1 (bg-black), closing it makes it DISAPPEAR?
    // No, clipPath clips visible region.
    // If clipPath is circle(0%), we see NOTHING of the black div.
    // So we see what's behind it.
    // YES. 
    // Start: circle(150%) -> Fully visible black div covering everything.
    // End: circle(0%) -> Black div is clipped to nothing. We see the Timeline.


    if (!visible) return null;

    return (
        <div ref={container} className="intro-container fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
            <h1 className="intro-text text-white text-9xl font-black opacity-0">TIME</h1>
            <h1 className="intro-text text-white text-9xl font-black opacity-0 ml-4">LINE</h1>
        </div>
    );
}