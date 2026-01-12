"use client";

import { useEffect, useRef, useState } from "react";
import BentoGallery from "@/components/collage/BentoBox";

export default function NewTheoryPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showShootingStar, setShowShootingStar] = useState(false);
    const [currentIteration, setCurrentIteration] = useState(0); // 0-8 for 9 iterations
    const [currentColor, setCurrentColor] = useState(0); // Index into colorPalette
    const [cameraShift, setCameraShift] = useState<'left' | 'right' | 'none'>('none'); // Camera shift direction

    // Color palette for 9 iterations
    const colorPalette = [
        { name: 'gold', head: ['#FFFFFF', '#ffecb3', '#bf953f'], trail: 'rgba(255, 215, 0, 0.8)', overlay: 'rgba(255, 215, 0, 0.08)' },
        { name: 'silver', head: ['#FFFFFF', '#E8E8E8', '#C0C0C0'], trail: 'rgba(192, 192, 192, 0.8)', overlay: 'rgba(192, 192, 192, 0.08)' },
        { name: 'blue', head: ['#FFFFFF', '#B3D9FF', '#4A90E2'], trail: 'rgba(74, 144, 226, 0.8)', overlay: 'rgba(74, 144, 226, 0.08)' },
        { name: 'purple', head: ['#FFFFFF', '#E6CCFF', '#9B59B6'], trail: 'rgba(155, 89, 182, 0.8)', overlay: 'rgba(155, 89, 182, 0.08)' },
        { name: 'red', head: ['#FFFFFF', '#FFB3B3', '#E74C3C'], trail: 'rgba(231, 76, 60, 0.8)', overlay: 'rgba(231, 76, 60, 0.08)' },
        { name: 'green', head: ['#FFFFFF', '#B3FFB3', '#2ECC71'], trail: 'rgba(46, 204, 113, 0.8)', overlay: 'rgba(46, 204, 113, 0.08)' },
        { name: 'orange', head: ['#FFFFFF', '#FFD9B3', '#E67E22'], trail: 'rgba(230, 126, 34, 0.8)', overlay: 'rgba(230, 126, 34, 0.08)' },
        { name: 'pink', head: ['#FFFFFF', '#FFB3E6', '#FF69B4'], trail: 'rgba(255, 105, 180, 0.8)', overlay: 'rgba(255, 105, 180, 0.08)' },
        { name: 'cyan', head: ['#FFFFFF', '#B3F0FF', '#00CED1'], trail: 'rgba(0, 206, 209, 0.8)', overlay: 'rgba(0, 206, 209, 0.08)' },
    ];

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
        const particleCount = 150; // Reduced from 300
        const fogCount = 30;

        // Initialize particles with layers
        for (let i = 0; i < particleCount; i++) {
            const layerRandom = Math.random();
            let baseSpeedY = 0;
            let size = 0;
            let opacity = 0;

            if (layerRandom < 0.6) {
                // Background Stars (Stationary/Very Slow) - 60%
                baseSpeedY = -(Math.random() * 0.05 + 0.01);
                size = Math.random() * 1.5 + 0.5;
                opacity = Math.random() * 0.4 + 0.1;
            } else if (layerRandom < 0.8) {
                // Mid-ground Particles (Slow Floating) - 20% (reduced from 25%)
                baseSpeedY = -(Math.random() * 0.3 + 0.1);
                size = Math.random() * 2 + 1;
                opacity = Math.random() * 0.5 + 0.3;
            } else {
                // Foreground Particles (Active) - 20% (increased from 15%)
                baseSpeedY = -(Math.random() * 1.0 + 0.8);
                size = Math.random() * 2 + 1.0; // Reduced from 3 to 2 max
                opacity = Math.random() * 0.6 + 0.4;
            }

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: size,
                baseSpeedY: baseSpeedY,
                speedX: 0,
                speedY: 0,
                opacity: opacity,
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.02 + 0.01,
            });
        }

        // Initialize fog
        for (let i = 0; i < fogCount; i++) {
            fogLayers.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 500,
                size: Math.random() * 200 + 100,
                speedY: -(Math.random() * 25 + 15),
                opacity: 0,
                drift: (Math.random() - 0.5) * 0.1,
            });
        }

        // Animation state
        let phase: "floating" | "descending" = "floating";
        let cometProgress = 0; // 0 = top, 1.2 = off bottom
        const baseSpeed = 0.008;
        let time = 0;
        let windIntensity = 0;

        // Pause and bounce state
        let pauseStartTime = -1; // When pause started
        let isPaused = false;
        let bounceOffset = 0; // Upward bounce offset
        const pauseDuration = 2000; // 2 seconds in milliseconds

        // New background particles that appear after animation
        const newBgParticles: Particle[] = [];
        let bgParticlesCreated = false;
        let bgFadeProgress = 0; // 0 to 1 for smooth fade-in
        let shootingStarTriggered = false;

        // Start descending after floating
        setTimeout(() => {
            phase = "descending";
        }, 1500);

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.016;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Update and draw Fog - always visible with subtle floating
            fogLayers.forEach((fog) => {
                // Subtle upward drift
                fog.y += fog.speedY * 0.15; // Reduced speed for subtle effect
                fog.x += fog.drift;

                // Gradually fade in fog to subtle opacity
                if (fog.opacity < 0.04) fog.opacity += 0.002; // Lower max opacity

                // Wrap around
                if (fog.y < -300) {
                    fog.y = canvas.height + 300;
                    fog.x = Math.random() * canvas.width;
                    fog.opacity = 0;
                }

                // Draw Fog - subtle and always present
                const gradient = ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.size);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${fog.opacity * 0.3})`);
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(fog.x, fog.y, fog.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Calculate current comet speed for particle synchronization
            // Particles move at CONSTANT HIGH speed - very rapid movement
            let cometSpeed = baseSpeed * 3.5; // Increased from 2.0 to 3.5 for more dramatic effect

            if (phase === "descending" && cometProgress < 1.2) {
                // Particles always move at full speed regardless of comet position
                cometSpeed = baseSpeed * 3.5;

                // Continuously spawn new foreground particles to maintain density
                // Spawn 2-3 particles per frame during descent
                const spawnCount = Math.floor(Math.random() * 2) + 2;
                for (let i = 0; i < spawnCount; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: canvas.height + Math.random() * 50, // Spawn from bottom
                        size: Math.random() * 2 + 1.0,
                        baseSpeedY: -(Math.random() * 1.0 + 0.8), // Foreground speed
                        speedX: 0,
                        speedY: 0,
                        opacity: Math.random() * 0.6 + 0.4,
                        floatOffset: Math.random() * Math.PI * 2,
                        floatSpeed: Math.random() * 0.02 + 0.01,
                    });
                }
            }

            // Gradually fade in new background particles
            if (bgParticlesCreated && bgFadeProgress < 1) {
                bgFadeProgress += 0.01; // Slow fade-in over ~100 frames
            }

            // Trigger shooting star after background fully faded in
            if (bgFadeProgress >= 1.0 && !shootingStarTriggered && cometProgress >= 1.5) {
                shootingStarTriggered = true;
                setShowShootingStar(true);
            }

            // Create new background particles after comet exits
            if (cometProgress >= 1.5 && !bgParticlesCreated) {
                bgParticlesCreated = true;
                // Create 100 new stationary background particles (reduced from 200)
                for (let i = 0; i < 100; i++) {
                    // 30% foreground particles for visual interest
                    const isForeground = i < 30;
                    newBgParticles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: isForeground ? Math.random() * 2 + 1.0 : Math.random() * 1.5 + 0.5,
                        baseSpeedY: 0,
                        speedX: 0,
                        speedY: 0,
                        opacity: isForeground ? Math.random() * 0.7 + 0.5 : Math.random() * 0.6 + 0.2,
                        floatOffset: Math.random() * Math.PI * 2,
                        floatSpeed: Math.random() * 0.02 + 0.01,
                    });
                }
            }

            // Draw original particles - keep rapid movement
            particles.forEach((particle) => {
                if (phase === "floating") {
                    // Slow upward drift during floating phase
                    particle.y -= 0.3; // Slow upward movement

                    // Wrap around
                    if (particle.y < -10) {
                        particle.y = canvas.height + 10;
                    }
                } else if (phase === "descending") {
                    // Smooth transition from slow to fast at start of descent
                    let transitionMultiplier = 1.0;
                    if (cometProgress < 0.25) {
                        // Extended ease-in from slow to fast over first 25% of descent (was 15%)
                        const transitionProgress = cometProgress / 0.25; // 0 to 1
                        // Quadratic ease-in for gentler, smoother acceleration (was cubic)
                        const easedProgress = transitionProgress * transitionProgress;
                        transitionMultiplier = easedProgress;
                    }

                    // Particles move UPWARD (opposite to comet which moves down)
                    // Speed based on layer and comet velocity
                    let particleSpeedMultiplier = 0;

                    // Determine layer based on baseSpeedY (which we stored during init)
                    if (Math.abs(particle.baseSpeedY) < 0.06) {
                        // Background layer - almost stationary
                        particleSpeedMultiplier = 0.1;
                    } else if (Math.abs(particle.baseSpeedY) < 0.4) {
                        // Mid-ground layer - slower
                        particleSpeedMultiplier = 0.5;
                    } else {
                        // Foreground layer - faster
                        particleSpeedMultiplier = 1.0;
                    }

                    // AGGRESSIVE ACCELERATION after comet exits bottom
                    let speedBoost = 1.0;
                    if (cometProgress > 1.0) {
                        // Dramatic speed increase after comet exits
                        const exitProgress = Math.min((cometProgress - 1.0) / 0.2, 1.0); // 0 to 1
                        speedBoost = 1.0 + exitProgress * 0.7; // Up to 1.7x boost
                    }

                    // Move particles upward - VERY FAST with potential boost and smooth transition
                    const particleVelocity = -cometSpeed * 400 * particleSpeedMultiplier * speedBoost * transitionMultiplier;
                    particle.y += particleVelocity;

                    // Wrap around - particles that exit top don't come back
                    if (particle.y < -10) {
                        // Don't wrap - let them exit
                        particle.opacity = 0; // Make invisible
                    }
                    if (particle.y > canvas.height + 10) {
                        particle.y = -10;
                        particle.x = Math.random() * canvas.width;
                    }
                }

                // Only draw if visible
                if (particle.opacity > 0) {
                    // Draw particle with golden glow
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity * 0.15})`;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 200, 50, ${particle.opacity * 0.3})`;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 248, 220, ${particle.opacity})`;
                    ctx.fill();
                }
            });

            // Draw new background particles (smooth fade-in transition)
            newBgParticles.forEach((particle) => {
                // Completely stationary - no floating motion

                // Apply fade-in effect
                const fadeOpacity = particle.opacity * bgFadeProgress;

                // Draw particle with golden glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 215, 0, ${fadeOpacity * 0.15})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 200, 50, ${fadeOpacity * 0.3})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 248, 220, ${fadeOpacity})`;
                ctx.fill();
            });

            // Comet descending animation with pause and bounce
            if (phase === "descending") {
                // Check if we should start pausing (at center zone)
                if (!isPaused && cometProgress >= 0.45 && cometProgress <= 0.55 && pauseStartTime === -1) {
                    isPaused = true;
                    pauseStartTime = Date.now();
                }

                // Handle pause duration
                if (isPaused) {
                    const pauseElapsed = Date.now() - pauseStartTime;

                    if (pauseElapsed < pauseDuration) {
                        // During pause: create upward bounce effect
                        const pauseProgress = pauseElapsed / pauseDuration; // 0 to 1
                        // Sine wave for smooth up and down bounce
                        bounceOffset = Math.sin(pauseProgress * Math.PI * 2) * -15; // Up to 15px upward
                    } else {
                        // Pause complete
                        isPaused = false;
                        bounceOffset = 0;
                    }
                }

                // Dynamic speed based on position
                let currentSpeed = 0;

                if (!isPaused) {
                    if (cometProgress < 0.3) {
                        // Slower initial descent - more cinematic (was 2.5x, now 1.2x)
                        currentSpeed = baseSpeed * 1.2;
                    } else if (cometProgress < 0.45) {
                        // Slow down approaching center
                        const slowProgress = (cometProgress - 0.3) / 0.15;
                        currentSpeed = baseSpeed * (1.2 - slowProgress * 0.9); // 1.2x to 0.3x
                    } else if (cometProgress < 0.55) {
                        // Very slow at center (before/after pause)
                        currentSpeed = baseSpeed * 0.2;
                    } else if (cometProgress < 0.7) {
                        // Start accelerating after pause
                        const accelProgress = (cometProgress - 0.55) / 0.15;
                        currentSpeed = baseSpeed * (0.2 + accelProgress * 1.3); // 0.2x to 1.5x
                    } else {
                        // Full acceleration at exit
                        const exitPos = (cometProgress - 0.7) / 0.3;
                        currentSpeed = baseSpeed * (1.5 + exitPos * 4); // Up to 5.5x speed!
                    }

                    // Add organic turbulence (less during slow phases)
                    const turbulence = 0.5 + 0.5 * Math.sin(time * 8) + 0.3 * Math.sin(time * 13);
                    const turbulenceAmount = cometProgress < 0.45 || cometProgress > 0.6 ? 0.4 : 0.1;
                    currentSpeed *= (0.8 + turbulence * turbulenceAmount);

                    cometProgress += currentSpeed;
                }

                // Trigger wind effect when passing through center
                if (cometProgress >= 0.4 && cometProgress <= 0.6) {
                    windIntensity = Math.min(1, windIntensity + 0.03);
                } else if (windIntensity > 0) {
                    windIntensity = Math.max(0, windIntensity - 0.01);
                }
            }

            // Draw comet
            if (phase === "descending" && cometProgress < 1.2) {
                const trailLength = 250;
                const headY = cometProgress * (canvas.height + 200) + bounceOffset; // Add bounce offset
                const tailY = Math.max(-100, headY - trailLength);

                if (headY > -trailLength && tailY < canvas.height + 100) {
                    // Jitter based on speed
                    let baseJitter = 2.0;
                    if (cometProgress < 0.3 || cometProgress > 0.7) {
                        baseJitter = 5.0;
                    } else {
                        baseJitter = 1.5;
                    }

                    const jitterSpike = Math.random() > 0.9 ? 3.0 : 1.0;
                    const jitterX = (Math.random() - 0.5) * baseJitter * jitterSpike;
                    const jitterY = (Math.random() - 0.5) * baseJitter * jitterSpike * 0.3;

                    // Gradient for main body
                    const gradient = ctx.createLinearGradient(centerX + jitterX, tailY, centerX + jitterX, headY);
                    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                    gradient.addColorStop(0.2, "rgba(255, 215, 0, 0.1)");
                    const turbulenceGrad = Math.sin(time * 15) * 0.1;
                    gradient.addColorStop(0.5 + turbulenceGrad, "rgba(255, 240, 200, 0.4)");
                    gradient.addColorStop(0.9, "rgba(255, 255, 255, 0.9)");
                    gradient.addColorStop(1, "#ffffff");

                    // V-shaped trail
                    const trailHeight = headY - tailY;
                    const coneWidth = trailHeight * 0.4;
                    const tipRadius = 6;

                    const wobble1 = Math.sin(time * 8) * 12 + Math.sin(time * 13) * 5;
                    const wobble2 = Math.sin(time * 10 + 2) * 15 + Math.cos(time * 7) * 6;
                    const wobble3 = Math.sin(time * 6 + 1) * 10 + Math.sin(time * 15) * 4;

                    const trailGradient = ctx.createLinearGradient(centerX, tailY, centerX, headY);
                    trailGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                    trailGradient.addColorStop(0.3, "rgba(255, 200, 100, 0.05)");
                    trailGradient.addColorStop(0.7, "rgba(255, 255, 255, 0.1)");
                    trailGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");

                    const headX = centerX + jitterX;
                    const headPosY = headY + jitterY;

                    ctx.beginPath();
                    ctx.moveTo(headX - tipRadius, headPosY);
                    ctx.quadraticCurveTo(
                        centerX - coneWidth * 0.5 + wobble1,
                        tailY + trailHeight * 0.5,
                        centerX - coneWidth + wobble2,
                        tailY
                    );
                    ctx.lineTo(centerX + coneWidth + wobble3, tailY);
                    ctx.quadraticCurveTo(
                        centerX + coneWidth * 0.5 - wobble1,
                        tailY + trailHeight * 0.5,
                        headX + tipRadius,
                        headPosY
                    );
                    ctx.closePath();
                    ctx.fillStyle = trailGradient;
                    ctx.fill();

                    // Core bright line
                    ctx.beginPath();
                    ctx.moveTo(centerX + jitterX, headY + jitterY);
                    ctx.lineTo(centerX, tailY);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 6;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    // Star at impact point
                    document.body.style.cursor = 'none';
                    const customCursor = document.querySelector('.custom-cursor') as HTMLElement;
                    if (customCursor) customCursor.style.opacity = '0';

                    const starX = centerX + jitterX;
                    const starY = headY + jitterY;

                    ctx.save();
                    ctx.translate(starX, starY);
                    ctx.rotate(time * 2);

                    const currentScale = 1 + 0.1 * Math.sin(time * 10);
                    ctx.scale(currentScale, currentScale);

                    const starSize = 12 * 1.5;
                    const innerSize = 2 * 1.5;

                    const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, starSize);
                    starGrad.addColorStop(0, '#FFFFFF');
                    starGrad.addColorStop(0.5, '#ffecb3');
                    starGrad.addColorStop(1, '#bf953f');

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

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);

            document.body.style.cursor = 'auto';
            const customCursor = document.querySelector('.custom-cursor') as HTMLElement;
            if (customCursor) customCursor.style.opacity = '1';
        };
    }, []);

    // Sequence Controller - Manages 9-iteration loop with camera shifts
    useEffect(() => {
        if (!showShootingStar) return;

        // Total time for one complete sequence:
        // - Stars: 0-4.3s
        // - Collage fade in: 4.3-6.1s
        // - Collage visible: 6.1-11.1s
        // - Collage fade out: 11.1-12.1s
        // - Camera shift: 12.1-14.1s (2 seconds)
        // Total: ~14.1s per iteration

        // Trigger camera shift after collage fades out
        const cameraShiftTimer = setTimeout(() => {
            // Alternate direction: even iterations go right, odd go left
            const direction = currentIteration % 2 === 0 ? 'right' : 'left';
            setCameraShift(direction);
        }, 12100); // Start shift at 12.1s

        // Complete sequence and move to next iteration
        const sequenceTimer = setTimeout(() => {
            // Reset camera shift
            setCameraShift('none');

            // Move to next iteration
            const nextIteration = (currentIteration + 1) % 9;
            setCurrentIteration(nextIteration);

            // Update color for next iteration
            setCurrentColor(nextIteration);

            // Reset shooting star to trigger next sequence
            setShowShootingStar(false);

            // Re-trigger after a brief pause
            setTimeout(() => {
                setShowShootingStar(true);
            }, 100);
        }, 14100); // 14.1 seconds total

        return () => {
            clearTimeout(cameraShiftTimer);
            clearTimeout(sequenceTimer);
        };
    }, [showShootingStar, currentIteration]);

    return (
        <section
            className="relative w-screen h-screen overflow-hidden"
            style={{ minHeight: "100vh", minWidth: "100vw", background: "#000000" }}
        >
            {/* Camera Shift Wrapper */}
            <div
                className={`camera-shift-wrapper ${cameraShift !== 'none' ? `shift-${cameraShift}` : ''}`}
                style={{
                    position: 'absolute',
                    inset: 0,
                    transition: cameraShift !== 'none' ? 'transform 2s ease-in-out' : 'none',
                    transform: cameraShift === 'left' ? 'translateX(-100vw)' :
                        cameraShift === 'right' ? 'translateX(100vw)' :
                            'translateX(0)'
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: "#000000" }}
                />
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-6xl font-bold mb-4 opacity-0 animate-fade-in">
                        New Theory
                    </h1>
                    <p className="text-xl opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        Experimental Hero Section
                    </p>
                </div>
            </div>

            {/* BentoBox Collage (Fades in during small stars 0-1.8s) */}
            {showShootingStar && (
                <div className="collage-wrapper">
                    <BentoGallery images={[
                        "/shoot1/1.png",
                        "/shoot1/10.png",
                        "/shoot1/2.png",
                        "/shoot1/3.png",
                        "/shoot1/4.png",
                        "/shoot1/5.png",
                        "/shoot1/6.png",
                        "/shoot1/7.png",
                        "/shoot1/8.png",
                        "/shoot1/9.png"
                    ]} />
                </div>
            )}

            {/* Subtle Color Overlay (Appears when main star appears at 1.8s) */}
            {showShootingStar && (
                <div className="gold-overlay-static" style={{
                    background: colorPalette[currentColor].overlay
                }}></div>
            )}

            {/* Shooting Star Animation (Gold Main + White Shower) */}
            {
                showShootingStar && (
                    <div className="shooting-star-container">
                        <div className="shooting-star">
                            {/* Trail (Dynamic Color) */}
                            <div className="shooting-star-trail" style={{
                                background: `linear-gradient(to left, ${colorPalette[currentColor].trail}, ${colorPalette[currentColor].trail.replace('0.8', '0.4')}, transparent 100%)`
                            }}></div>
                            {/* Comet Head (Gold Star) */}
                            <div className="shooting-star-head">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <defs>
                                        <radialGradient id="starGradient">
                                            <stop offset="0%" stopColor={colorPalette[currentColor].head[0]} />
                                            <stop offset="50%" stopColor={colorPalette[currentColor].head[1]} />
                                            <stop offset="100%" stopColor={colorPalette[currentColor].head[2]} />
                                        </radialGradient>
                                    </defs>
                                    <path
                                        d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
                                        fill="url(#starGradient)"
                                        stroke="rgba(255, 236, 179, 0.5)"
                                        strokeWidth="0.5"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* --- SHOWER SEQUENCE (White Trails) --- */}

                        {/* 1. Pre-Main (0s - 1.5s) */}
                        <div className="shooting-star-companion" style={{ top: '15%', right: '23%', animationDuration: '1.4s', animationDelay: '0s' }}>
                            <div className="shooting-star-trail" style={{ width: '300px', animationDuration: '1.4s', animationDelay: '0s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '28%', right: '15%', animationDuration: '1.2s', animationDelay: '0.3s' }}>
                            <div className="shooting-star-trail" style={{ width: '250px', animationDuration: '1.2s', animationDelay: '0.3s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '12%', right: '28%', animationDuration: '1.5s', animationDelay: '0.7s' }}>
                            <div className="shooting-star-trail" style={{ width: '350px', animationDuration: '1.5s', animationDelay: '0.7s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '22%', right: '20%', animationDuration: '1.0s', animationDelay: '1.2s' }}>
                            <div className="shooting-star-trail" style={{ width: '200px', animationDuration: '1.0s', animationDelay: '1.2s' }}></div>
                        </div>

                        {/* 2. During-Main (1.5s - 3.5s) */}
                        <div className="shooting-star-companion" style={{ top: '18%', right: '25%', animationDuration: '1.3s', animationDelay: '2.0s' }}>
                            <div className="shooting-star-trail" style={{ width: '280px', animationDuration: '1.3s', animationDelay: '2.0s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '30%', right: '12%', animationDuration: '1.1s', animationDelay: '2.5s' }}>
                            <div className="shooting-star-trail" style={{ width: '220px', animationDuration: '1.1s', animationDelay: '2.5s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '14%', right: '30%', animationDuration: '1.4s', animationDelay: '3.0s' }}>
                            <div className="shooting-star-trail" style={{ width: '320px', animationDuration: '1.4s', animationDelay: '3.0s' }}></div>
                        </div>

                        {/* 3. Post-Main (3.5s - 5.5s) - "Even after disappearance" */}
                        <div className="shooting-star-companion" style={{ top: '25%', right: '18%', animationDuration: '1.2s', animationDelay: '4.2s' }}>
                            <div className="shooting-star-trail" style={{ width: '260px', animationDuration: '1.2s', animationDelay: '4.2s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '10%', right: '32%', animationDuration: '1.6s', animationDelay: '4.8s' }}>
                            <div className="shooting-star-trail" style={{ width: '380px', animationDuration: '1.6s', animationDelay: '4.8s' }}></div>
                        </div>
                        <div className="shooting-star-companion" style={{ top: '20%', right: '22%', animationDuration: '1.0s', animationDelay: '5.2s' }}>
                            <div className="shooting-star-trail" style={{ width: '200px', animationDuration: '1.0s', animationDelay: '5.2s' }}></div>
                        </div>
                    </div>
                )
            }

            <style jsx>{`
                .shooting-star-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 20;
                }

                /* COLLAGE WRAPPER - Appears after main star finishes (4.3s), stays 5s, fades out */
                .collage-wrapper {
                    position: absolute;
                    inset: 0;
                    z-index: 5;
                    opacity: 0;
                    animation: collageFadeInOut 7.8s ease-in-out forwards 4.3s; /* Delay 4.3s */
                    pointer-events: none;
                }

                @keyframes collageFadeInOut {
                    0% { opacity: 0; }
                    23% { opacity: 0.6; } /* Fade in complete at 1.8s (1.8/7.8 = 23%) */
                    87% { opacity: 0.6; } /* Stay visible until 6.8s (6.8/7.8 = 87%) - that's 5s of visibility */
                    100% { opacity: 0; } /* Fade out by 7.8s */
                }

                /* STATIC GOLD OVERLAY - Appears when main star appears (1.8s) */
                .gold-overlay-static {
                    position: absolute;
                    inset: 0;
                    background: rgba(255, 215, 0, 0.08); /* Very subtle gold tint */
                    z-index: 15;
                    opacity: 0;
                    animation: goldFadeIn 0.5s ease-out forwards 1.8s; /* Delay 1.8s */
                    pointer-events: none;
                }

                @keyframes goldFadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                /* Companion / Parallel Stars (White) */

                /* Companion / Parallel Stars (White) */
                .shooting-star-companion {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    transform-origin: center;
                    transform: rotate(155deg);
                    animation: movementFast ease-in-out both; 
                }

                .shooting-star-companion .shooting-star-trail {
                    position: absolute;
                    right: 0;
                    height: 2px; /* Thinner */
                    border-radius: 2px;
                    background: linear-gradient(
                        to left, 
                        rgba(255, 255, 255, 0.4) 0%, 
                        rgba(255, 255, 255, 0.1) 50%, 
                        transparent 100%
                    );
                    width: 0;
                    animation: trailPhases ease-in-out both; 
                }

                /* Faster Movement for Companions - Stops before corner at 75vw */
                @keyframes movementFast {
                    0% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(0);
                    }
                    10% { opacity: 1; }
                    60% { opacity: 1; }
                    90% { 
                        opacity: 0;
                        transform: rotate(155deg) translateX(75vw); 
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(75vw);
                    }
                }

                /* MAIN STAR (Gold) */
                .shooting-star {
                    position: absolute;
                    top: 20%;
                    right: 20%;
                    display: flex;
                    align-items: center;
                    transform-origin: center;
                    transform: rotate(155deg);
                    /* 2.5s Duration, Starts AFTER small stars (1.8s delay) */
                    animation: movement 2.5s ease-in-out both 1.8s;
                }

                .shooting-star-trail {
                    position: absolute;
                    right: 24px; 
                    height: 4px;
                    border-radius: 4px;
                    /* Gold Gradient for Main Star */
                    background: linear-gradient(
                        to left, 
                        rgba(255, 215, 0, 0.8),
                        rgba(255, 215, 0, 0.4), 
                        transparent 100%
                    );
                    width: 0;
                    animation: trailPhases 2.5s ease-in-out both 1.8s;
                }

                .shooting-star-head {
                    position: relative;
                    z-index: 2;
                    /* Gold Glow */
                    filter: drop-shadow(0 0 8px rgba(255, 236, 179, 0.8)) drop-shadow(0 0 15px rgba(255, 236, 179, 0.5));
                    animation: spinHead 2.5s linear infinite 1.8s, headFade 2.5s ease-in-out both 1.8s;
                }

                /* Trajectory Main - stop at 85vw */
                @keyframes movement {
                    0% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(0);
                    }
                    10% { opacity: 1; }
                    /* Move until 60% */
                    60% {
                        opacity: 1;
                        transform: rotate(155deg) translateX(60vw); /* Synced w/ Head Fade */
                    }
                    /* Freeze 90-100% */
                    90% {
                        opacity: 0; 
                        transform: rotate(155deg) translateX(60vw);
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(60vw);
                    }
                }

                /* Trail Phases - Peak 500px */
                @keyframes trailPhases {
                    0% { width: 0px; opacity: 0; }
                    10% { width: 100px; opacity: 1; }
                    50% { width: 500px; opacity: 1; }
                    90% { width: 100px; opacity: 0.8; }
                    100% { width: 0px; opacity: 0; }
                }

                @keyframes spinHead {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes headFade {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    40% { opacity: 1; } 
                    60% { opacity: 0; } /* Gone by 60% */
                    100% { opacity: 0; }
                }
            `}</style>
        </section>
    );
}
