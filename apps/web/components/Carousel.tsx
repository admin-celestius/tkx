"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';

import gsap from 'gsap';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Slide {
    image: string;
    title: string;
}

interface CarouselProps {
    slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Animation refs
    const rotationRef = useRef(0);
    const isSnappingRef = useRef(false);
    const speedRef = useRef(0.026); // 1.3x speed (approx 1.3 * 0.02)
    const baseSpeed = 0.026;
    const hoverSpeed = 0; // Stop on hover
    const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);








    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main ticker
            gsap.ticker.add(() => {
                // Smoothly interpolate speed
                const targetSpeed = isHovering ? hoverSpeed : baseSpeed;
                speedRef.current = gsap.utils.interpolate(speedRef.current, targetSpeed, 0.05);

                // Apply rotation only if not snapping
                if (!isSnappingRef.current) {
                    rotationRef.current += speedRef.current;
                }

                // Update slides
                updateSlides();
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isHovering, slides.length]);

    const handleSlideClick = (index: number) => {
        if (isSnappingRef.current) return;

        isSnappingRef.current = true;
        const total = slides.length;
        const anglePerSlide = 360 / total;

        const currentRotation = rotationRef.current;
        const currentSlideAngle = currentRotation + index * anglePerSlide;

        // Find shortest path to 0
        const normalizedAngle = (currentSlideAngle % 360 + 360) % 360;
        let diff = 0 - normalizedAngle;

        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;

        const targetRotation = currentRotation + diff;

        gsap.to(rotationRef, {
            current: targetRotation,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
                isSnappingRef.current = false;
            }
        });
    };

    const updateSlides = useCallback(() => {
        if (!containerRef.current) return;
        const slideElements = containerRef.current.querySelectorAll('.carousel-slide') as NodeListOf<HTMLDivElement>;
        const total = slides.length;
        const anglePerSlide = 360 / total;

        slideElements.forEach((el, index) => {
            const currentAngle = rotationRef.current + index * anglePerSlide;
            const normalizedAngle = (currentAngle % 360 + 360) % 360; // 0 to 360

            // Calculate 3D position
            // We want a semi-circle/circle.
            // angle 0 = front (z=0 or max Z).
            // actually angle 0 usually is right (x=r, z=0). Let's adjust so 0 or 270 is front.
            // Let's use radiants.
            const rad = (normalizedAngle * Math.PI) / 180;

            // Layout: Circle on XZ plane.
            const radius = 450; // Reduced radius (was 600)
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius - radius; // Shift z so front is at ~0, back is further away

            // Calculate opacity/scale based on Z
            // Front (z close to 0) -> Scale 1, Opacity 1
            // Back (z close to -2*radius) -> Scale 0.5, Opacity 0.5
            // Normalize Z range: [0, -1200]
            // Make the front slide appear larger.

            // Distance from "Front" (angle 0 or 360)
            // Smallest difference from 0 or 360.
            const distFromFront = Math.min(normalizedAngle, 360 - normalizedAngle);
            const isCenter = distFromFront < anglePerSlide / 2;

            // Visual tweaks
            const scale = gsap.utils.mapRange(0, 180, 1.2, 0.6, distFromFront);
            const opacity = gsap.utils.mapRange(0, 180, 1, 0.3, distFromFront);
            const blur = gsap.utils.mapRange(0, 120, 0, 3, distFromFront); // Reduced blur (max 3px)

            // Apply transforms
            gsap.set(el, {
                x: x,
                z: z,
                rotationY: 0, // Keep facing front or rotate slightly?
                // rotating Y looks cooler if they face center? Or face camera?
                // Let's face camera (0) or slightly rotate with position (x * -0.05)
                // rotationY: x * 0.05,
                scale: scale,
                opacity: opacity,
                filter: `blur(${blur}px) brightness(${opacity})`,
                zIndex: Math.round(scale * 100), // Ensure front is on top
            });

            // Highlight active
            const inner = el.querySelector('.slide-inner') as HTMLElement;
            if (inner) {
                if (distFromFront < 20) {
                    inner.style.boxShadow = '0 0 30px 10px rgba(255, 255, 255, 0.3)';
                    inner.style.borderColor = 'rgba(255,255,255,0.8)';
                } else {
                    inner.style.boxShadow = 'none';
                    inner.style.borderColor = 'rgba(255,255,255,0.1)';
                }
            }
        });

    }, [slides.length]);

    // Keyboard helpers
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // In a real implementation we'd tween speedRef or rotationRef
        if (e.key === 'ArrowRight') {
            rotationRef.current -= 10;
        }
        if (e.key === 'ArrowLeft') {
            rotationRef.current += 10;
        }
    };

    return (
        <div
            className="relative w-full h-[600px] flex items-center justify-center overflow-hidden perspective-1000"
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="3D Rotating Carousel"
        >
            {/* Floor Reflection Gradient */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

            {
                slides.map((slide, i) => (
                    <div
                        key={i}
                        className="carousel-slide absolute top-1/2 left-1/2 w-[220px] h-[320px] -ml-[110px] -mt-[160px] transform-style-3d will-change-transform cursor-pointer"
                        onClick={() => {
                            handleSlideClick(i);
                            // Clear existing timer if any
                            if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
                            setIsHovering(true); // Ensure it's paused
                            // Set timer to resume after 15 seconds
                            interactionTimerRef.current = setTimeout(() => {
                                setIsHovering(false);
                            }, 15000);
                        }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => {
                            setIsHovering(false);
                            if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
                        }}
                        onTouchStart={() => setIsHovering(true)}
                        onTouchEnd={() => {
                            setIsHovering(false);
                            if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
                        }}
                    >
                        {/* Slide Content */}
                        <div className="slide-inner w-full h-full rounded-xl overflow-hidden border-2 border-white/10 transition-all duration-300 relative bg-gray-900 group">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold font-sans tracking-wide">{slide.title}</h3>
                            </div>

                            {/* Glossy highlight */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Reflection below */}
                        <div className="absolute top-full left-0 w-full h-full transform scale-y-[-1] opacity-30 mask-gradient pointer-events-none filter blur-sm">
                            <img src={slide.image} alt="" className="w-full h-full object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                    </div>
                ))
            }

            {/* Ambient Light Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.8))] z-20"></div>

            <style jsx global>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .mask-gradient {
            -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        }
      `}</style>
        </div>
    );
};

export default Carousel;
