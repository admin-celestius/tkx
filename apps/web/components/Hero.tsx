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
        const lineSpeed = 0.008;
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

            // Line animation
            if (phase === "line") {
                lineProgress += lineSpeed;
                if (lineProgress >= 1) {
                    lineProgress = 1;
                    phase = "wind";
                }
            }

            // Draw line (during line phase and after)
            if (phase === "line" || phase === "wind") {
                const currentY = lineProgress * lineTargetY;

                // Line glow
                ctx.beginPath();
                ctx.moveTo(centerX, 0);
                ctx.lineTo(centerX, currentY);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
                ctx.lineWidth = 8;
                ctx.stroke();

                // Main line
                ctx.beginPath();
                ctx.moveTo(centerX, 0);
                ctx.lineTo(centerX, currentY);
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.stroke();

                // Bright tip during descent
                if (phase === "line") {
                    ctx.beginPath();
                    ctx.arc(centerX, currentY, 6, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(centerX, currentY, 3, 0, Math.PI * 2);
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
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


