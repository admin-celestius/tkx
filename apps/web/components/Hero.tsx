"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas to full screen
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Dust particles
        interface Particle {
            x: number;
            y: number;
            size: number;
            baseSpeedY: number;
            speedX: number;
            speedY: number;
            opacity: number;
            floatOffset: number;
            floatSpeed: number;
        }

        interface Fog {
            x: number;
            y: number;
            size: number;
            speedY: number;
            opacity: number;
            drift: number;
        }

        const particles: Particle[] = [];
        const fogLayers: Fog[] = [];
        const particleCount = 200;
        const fogCount = 40;

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 0.5,
                baseSpeedY: -(Math.random() * 2 + 1.5), // Base upward speed for wind phase
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: 0,
                opacity: Math.random() * 0.5 + 0.2,
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.02 + 0.01,
            });
        }

        // Initialize fog - Shooting Star Speed
        for (let i = 0; i < fogCount; i++) {
            fogLayers.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 500, // Start below screen
                size: Math.random() * 200 + 100,
                speedY: -(Math.random() * 25 + 15), // Much faster upward speed (15-40px per frame)
                opacity: 0, // Start invisible
                drift: (Math.random() - 0.5) * 0.2, // Less drift at high speed
            });
        }

        // Animation phases
        let phase: "floating" | "line" | "wind" = "floating";
        let lineProgress = 0;
        const lineTargetY = canvas.height / 2;
        const lineSpeed = 0.02; // Faster comet descent
        let time = 0;
        let windIntensity = 0;

        // Start line animation after a brief floating period
        setTimeout(() => {
            phase = "line";
        }, 1500);

        // Animation loop
        let animationId: number;
        const animate = () => {
            // Clear canvas
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.016;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Update and draw Fog (only visible/active during wind phase)
            if (phase === "wind") {
                fogLayers.forEach((fog) => {
                    // Move fog up
                    fog.y += fog.speedY * windIntensity;
                    fog.x += fog.drift;

                    // Fade in fog faster
                    if (fog.opacity < 0.15) fog.opacity += 0.01;

                    // Wrap around
                    if (fog.y < -300) {
                        fog.y = canvas.height + 300;
                        fog.x = Math.random() * canvas.width;
                        fog.opacity = 0;
                    }

                    // Draw Fog
                    const gradient = ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.size);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${fog.opacity * 0.5})`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(fog.x, fog.y, fog.size, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            // Draw particles
            particles.forEach((particle) => {
                if (phase === "floating") {
                    // Gentle floating motion
                    particle.x += Math.sin(time * 2 + particle.floatOffset) * 0.3;
                    particle.y += Math.cos(time * 1.5 + particle.floatOffset) * 0.2;
                } else if (phase === "wind") {
                    // Wind effect - accelerate upward
                    particle.speedY = particle.baseSpeedY * windIntensity;
                    particle.x += particle.speedX + Math.sin(time * 3 + particle.floatOffset) * 0.5;
                    particle.y += particle.speedY;

                    // Wrap around
                    if (particle.y < -10) {
                        particle.y = canvas.height + 10;
                        particle.x = Math.random() * canvas.width;
                    }
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                }

                // Draw particle with golden glow
                // Outer golden glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity * 0.15})`;
                ctx.fill();

                // Inner golden glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 200, 50, ${particle.opacity * 0.3})`;
                ctx.fill();

                // Core (white/gold)
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 248, 220, ${particle.opacity})`;
                ctx.fill();
            });

            // Line animation - continues until line reaches center
            if (phase === "line" || (phase === "wind" && lineProgress < 1)) {
                // Organic speed variation - sometimes fast, sometimes slow (turbulence)
                const speedVariation = 0.5 + 0.5 * Math.sin(time * 8) + 0.3 * Math.sin(time * 13); // Multi-frequency noise
                const currentSpeed = lineSpeed * (0.6 + speedVariation * 0.8); // Range: 0.6x to 1.4x base speed

                lineProgress += currentSpeed;
                if (lineProgress > 1) lineProgress = 1;
                // Trigger wind phase at 50% for earlier particle movement
                if (lineProgress >= 0.5 && phase === "line") {
                    phase = "wind";
                }
            }

            // Draw line (during line phase and after)
            if (phase === "line" || phase === "wind") {
                // --- 1. Animation Logic & Trail Calculation ---
                const trailLength = 150; // Shorter, tighter comet trail
                const headY = lineProgress * lineTargetY;
                const tailY = Math.max(-100, headY - trailLength);

                // Only draw if visible
                if (tailY < canvas.height && headY > 0) {

                    // --- 2. Enhanced Jitter/Vibration Effect ---
                    // High-frequency vibration with occasional spikes
                    const baseJitter = phase === "wind" ? 4.0 : 2.0;
                    const jitterSpike = Math.random() > 0.9 ? 3.0 : 1.0; // Occasional big shake
                    const jitterX = (Math.random() - 0.5) * baseJitter * jitterSpike;
                    const jitterY = (Math.random() - 0.5) * baseJitter * jitterSpike * 0.3; // Slight Y jitter too

                    // --- 3. Enhanced "Plasma Skin" Texture ---
                    // Create gradient for the main body - moves with the line
                    const gradient = ctx.createLinearGradient(centerX + jitterX, tailY, centerX + jitterX, headY);

                    // Tail (Fade out)
                    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                    gradient.addColorStop(0.2, "rgba(255, 215, 0, 0.1)"); // Golden fade

                    // Body (Turbulence) - animate overlapping transparency
                    const turbulence = Math.sin(time * 15) * 0.1;
                    gradient.addColorStop(0.5 + turbulence, "rgba(255, 240, 200, 0.4)");

                    // Head (Solid Hot Core)
                    gradient.addColorStop(0.9, "rgba(255, 255, 255, 0.9)");
                    gradient.addColorStop(1, "#ffffff");

                    // --- 4. Draw The Comet (V-Shaped Air Resistance Trail) ---

                    // V-cone dimensions - 45 degree angle from center
                    const trailHeight = headY - tailY;
                    const coneWidth = trailHeight * 0.7; // ~45 degree spread

                    // Tangent offset - trail starts from sides of the tip, not center point
                    const tipRadius = 6;

                    // Irregularity - organic wobble on trail edges
                    const wobble1 = Math.sin(time * 5) * 8;
                    const wobble2 = Math.sin(time * 7 + 2) * 6;
                    const wobble3 = Math.sin(time * 4 + 1) * 10;

                    // A. Create gradient for the V-trail (transparent white fade)
                    const trailGradient = ctx.createLinearGradient(centerX, tailY, centerX, headY);
                    trailGradient.addColorStop(0, "rgba(255, 255, 255, 0)"); // Fully transparent at tail
                    trailGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.03)");
                    trailGradient.addColorStop(0.7, "rgba(255, 255, 255, 0.08)");
                    trailGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)"); // Slightly visible at head

                    // Draw unified V-shaped cone with organic edges (tangent to tip)
                    const headX = centerX + jitterX;
                    const headPosY = headY + jitterY;

                    ctx.beginPath();
                    // Start from left side of tip (tangent)
                    ctx.moveTo(headX - tipRadius, headPosY);
                    // Curve to left edge with wobble
                    ctx.quadraticCurveTo(
                        centerX - coneWidth * 0.5 + wobble1,
                        tailY + trailHeight * 0.5,
                        centerX - coneWidth + wobble2,
                        tailY
                    );
                    // Across the tail with wobble
                    ctx.lineTo(centerX + coneWidth + wobble3, tailY);
                    // Curve back to right side of tip
                    ctx.quadraticCurveTo(
                        centerX + coneWidth * 0.5 - wobble1,
                        tailY + trailHeight * 0.5,
                        headX + tipRadius,
                        headPosY
                    );
                    ctx.closePath();
                    ctx.fillStyle = trailGradient;
                    ctx.fill();

                    // B. Core bright line (thin white center streak)
                    ctx.beginPath();
                    ctx.moveTo(centerX + jitterX, headY + jitterY);
                    ctx.lineTo(centerX, tailY);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    // C. Bright Tip (Impact Point)
                    if (phase === "line" || phase === "wind") {
                        ctx.beginPath();
                        const tipPulse = 1 + 0.15 * Math.sin(time * 25);
                        ctx.arc(centerX + jitterX, headY + jitterY, 6 * tipPulse, 0, Math.PI * 2);
                        ctx.fillStyle = "#ffffff";
                        // Double shadow for intense glow
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = "rgba(255, 200, 100, 0.8)";
                        ctx.fill();
                        ctx.shadowBlur = 40;
                        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
                        ctx.fill();
                        ctx.shadowBlur = 0; // Reset
                    }
                }
            }

            // Gradually increase wind intensity
            if (phase === "wind" && windIntensity < 1) {
                windIntensity += 0.02;
                if (windIntensity > 1) windIntensity = 1;
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section
            className="relative w-screen h-screen overflow-hidden"
            style={{ minHeight: "100vh", minWidth: "100vw", background: "#000000" }}
        >
            {/* Dust particles canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: "#000000" }}
            />

            {/* Content layer */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Hero content goes here */}
            </div>
        </section>
    );
}


