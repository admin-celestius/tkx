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
        const particleCount = 300; // Increased for space feel
        const fogCount = 30; // Increased fog

        // Initialize particles with layers
        for (let i = 0; i < particleCount; i++) {
            const layerRandom = Math.random();
            let baseSpeedY = 0;
            let size = 0;
            let opacity = 0;

            if (layerRandom < 0.6) {
                // Background Stars (Stationary/Very Slow) - 60%
                baseSpeedY = -(Math.random() * 0.05 + 0.01); // Almost stationary
                size = Math.random() * 1.5 + 0.5; // Small
                opacity = Math.random() * 0.4 + 0.1; // Dimmer
            } else if (layerRandom < 0.85) {
                // Mid-ground Particles (Slow Floating) - 25%
                baseSpeedY = -(Math.random() * 0.3 + 0.1);
                size = Math.random() * 2 + 1;
                opacity = Math.random() * 0.5 + 0.3;
            } else {
                // Foreground Particles (Active) - 15%
                baseSpeedY = -(Math.random() * 0.6 + 0.3); // Visible movement but still space-like slow
                size = Math.random() * 3 + 1.5; // Larger
                opacity = Math.random() * 0.6 + 0.4;
            }

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: size,
                baseSpeedY: baseSpeedY,
                speedX: 0, // Strictly vertical
                speedY: 0,
                opacity: opacity,
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
                drift: (Math.random() - 0.5) * 0.1, // Less drift for cleaner look
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

                    // Fade in fog - more subtle
                    if (fog.opacity < 0.08) fog.opacity += 0.005;

                    // Wrap around
                    if (fog.y < -300) {
                        fog.y = canvas.height + 300;
                        fog.x = Math.random() * canvas.width;
                        fog.opacity = 0;
                    }

                    // Draw Fog - more subtle
                    const gradient = ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.size);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${fog.opacity * 0.3})`);
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
                    // Gentle floating motion - Vertical only
                    // particle.x += Math.sin(time * 2 + particle.floatOffset) * 0.3; // Removed horizontal

                    // Allow even stationary stars to breathe slightly
                    particle.y += Math.cos(time * 0.5 + particle.floatOffset) * 0.1;
                } else if (phase === "wind") {
                    // Wind effect - accelerate upward
                    particle.speedY = particle.baseSpeedY * (0.2 + windIntensity * 0.8); // Ensure minimum movement

                    // particle.x += particle.speedX + Math.sin(time * 3 + particle.floatOffset) * 0.5; // Removed horizontal
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
                const trailLength = 250; // Length 250 as requested
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

                    // --- 4. Draw The Comet (V-Shaped Flaming Trail) ---

                    // V-cone dimensions - 30 degree angle
                    const trailHeight = headY - tailY;
                    const coneWidth = trailHeight * 0.4; // Reverted cone width

                    // Tangent offset - trail starts from sides of the tip
                    const tipRadius = 6;

                    // Irregularity - intense wobble for chaotic flame effect
                    const wobble1 = Math.sin(time * 8) * 12 + Math.sin(time * 13) * 5;
                    const wobble2 = Math.sin(time * 10 + 2) * 15 + Math.cos(time * 7) * 6;
                    const wobble3 = Math.sin(time * 6 + 1) * 10 + Math.sin(time * 15) * 4;

                    // A. Create gradient for the V-trail
                    const trailGradient = ctx.createLinearGradient(centerX, tailY, centerX, headY);
                    trailGradient.addColorStop(0, "rgba(255, 255, 255, 0)"); // Transparent at tail
                    trailGradient.addColorStop(0.3, "rgba(255, 200, 100, 0.05)"); // Warm glow
                    trailGradient.addColorStop(0.7, "rgba(255, 255, 255, 0.1)");
                    trailGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)"); // Near head

                    // Draw V-shaped cone with organic edges (tangent to tip)
                    const headX = centerX + jitterX;
                    const headPosY = headY + jitterY;

                    ctx.beginPath();
                    // Start from left side of tip (tangent)
                    ctx.moveTo(headX - tipRadius, headPosY);

                    // Curve to left edge of V with wobble
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
                    ctx.lineWidth = 6; // Thicker center line
                    ctx.lineCap = "round";
                    ctx.stroke();

                    // C. Comet Cursor Style Star (Impact Point)
                    if (phase === "line" || phase === "wind") {
                        // REMOVED LOCAL CURSOR HIDING - Relying on Global Settings
                        const starX = centerX + jitterX;
                        const starY = headY + jitterY;

                        // Ported from CometCursor.tsx
                        ctx.save();
                        ctx.translate(starX, starY);
                        // Rotate based on time to simulate cursor spin
                        ctx.rotate(time * 2);

                        // Pulsate scale slightly
                        const currentScale = 1 + 0.1 * Math.sin(time * 10);
                        ctx.scale(currentScale, currentScale);

                        const starSize = 12 * 1.5; // Slightly larger for the hero animation
                        const innerSize = 2 * 1.5;

                        const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, starSize);
                        starGrad.addColorStop(0, '#FFFFFF');
                        starGrad.addColorStop(0.5, '#ffecb3'); // Gold light
                        starGrad.addColorStop(1, '#bf953f');   // Gold dark

                        ctx.fillStyle = starGrad;
                        ctx.strokeStyle = 'rgba(255, 236, 179, 0.5)';
                        ctx.lineWidth = 1;
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = 'rgba(255, 236, 179, 0.5)';

                        ctx.beginPath();
                        for (let i = 0; i < 4; i++) {
                            ctx.lineTo(starSize, 0);
                            ctx.lineTo(innerSize, innerSize);
                            ctx.rotate(Math.PI / 2);
                        }
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();

                        ctx.restore();
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
            // REMOVED LOCAL CURSOR RESTORATION
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


