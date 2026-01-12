"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Lonver duration for kinetic feel
            lerp: 0.05, // Slower, heavier smoothing (default 0.1)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8, // Reduce scroll speed slightly
            touchMultiplier: 2,
        });

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Use GSAP's ticker to drive Lenis for perfect sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's native lag smoothing to prevent stutter
        gsap.ticker.lagSmoothing(0);

        // --- CUSTOM ANCHOR HANDLING ---
        // 1. Handle Initial Hash (e.g. loading /#events directly)
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash) as HTMLElement;
            if (target) {
                // Short delay to allow layout to settle
                setTimeout(() => {
                    lenis.scrollTo(target, { offset: 0 });
                }, 100);
            }
        }

        // 2. Intercept Anchor Clicks for Smooth Scroll
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href) as HTMLElement;
                if (element) {
                    lenis.scrollTo(element, { offset: 0 });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return null; // Lenis is a logic-only component that attaches to root
}
