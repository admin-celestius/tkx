'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    alpha: number;
    decay: number;
    type: 'dust' | 'smoke' | 'stone';
    color: string;
    rotation?: number;
}

const CometCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Detect touch device and remove custom cursor
        const isTouchDevice =
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0;

        if (isTouchDevice) {
            document.querySelector('.custom-cursor')?.remove();
            return;
        }
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("CometCursor: No Canvas");
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("CometCursor: No Context");
            return;
        }

        // ... rest of code
        // For debug, let's keep the style update below

        // --- Configuration ---
        let width = window.innerWidth;
        let height = window.innerHeight;

        // State
        const pos = { x: width / 2, y: height / 2 };
        const mouse = { x: width / 2, y: height / 2 };

        // Track previous position for raw velocity calculation (for particles only)
        const lastPos = { x: width / 2, y: height / 2 };

        // Visual State
        let currentRotation = Math.PI / 4;

        // Particles 
        const particles: Particle[] = [];

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        // Hover State
        let isHovering = false;

        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            isHovering = !!target.closest('a, button, input, select, textarea, [role="button"], .cursor-hover');
        };

        const onMouseOut = (e: MouseEvent) => {
            const related = e.relatedTarget as HTMLElement;
            if (!related) {
                isHovering = false;
            } else {
                isHovering = !!related.closest('a, button, input, select, textarea, [role="button"], .cursor-hover');
            }
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', checkHover);
        window.addEventListener('mouseout', onMouseOut);
        onResize();

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        // --- Loop ---
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Strict Position Lock (No Physics/Smoothing)
            pos.x = mouse.x;
            pos.y = mouse.y;

            // Calculate raw velocity for particles
            const vx = pos.x - lastPos.x;
            const vy = pos.y - lastPos.y;
            const speed = Math.hypot(vx, vy);

            lastPos.x = pos.x;
            lastPos.y = pos.y;

            // 2. Strict Scale & Rotation (No Smoothing)
            // Scale: 2.2 on hover, 1.0 otherwise. No transition.
            const currentScale = isHovering ? 1.6 : 1.0;

            // Rotation: Constant slow spin for visual flair, but position is locked.
            // Increased speed slightly on hover.
            currentRotation += isHovering ? 0.06 : 0.02;

            // 3. Emitters (INTERPOLATED for continuous trail)
            const dist = Math.hypot(vx, vy);
            const steps = Math.ceil(dist / 2); // Spawn every 2 pixels of movement

            for (let i = 0; i < steps; i++) {
                const t = i / steps;
                const activeX = lastPos.x + (pos.x - lastPos.x) * t;
                const activeY = lastPos.y + (pos.y - lastPos.y) * t;

                // A. Gold Dust
                // Reduced count per step to compensate for increased steps
                if (Math.random() < 0.5) {
                    const r = 20 * currentScale;
                    const angle = Math.random() * Math.PI * 2;
                    const d = Math.random() * r;

                    particles.push({
                        x: activeX + Math.cos(angle) * d,
                        y: activeY + Math.sin(angle) * d,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        life: 1,
                        maxLife: 1,
                        size: random(0.5, 1.5),
                        alpha: random(0.3, 0.8),
                        decay: random(0.01, 0.015), // Extended Life (~1.3s at 60fps)
                        type: 'dust',
                        color: '255, 236, 179'
                    });
                }
            }

            // B. Grey Smoke
            if (speed > 4 && Math.random() < 0.1) {
                particles.push({
                    x: pos.x + random(-10, 10),
                    y: pos.y + random(-10, 10),
                    vx: -vx * 0.1 + random(-0.2, 0.2), // Slight trail effect
                    vy: -vy * 0.1 + random(-0.2, 0.2),
                    life: 1,
                    maxLife: 1,
                    size: random(15, 30),
                    alpha: 0.08,
                    decay: random(0.02, 0.04),
                    type: 'smoke',
                    color: '120, 120, 120'
                });
            }

            // 4. Draw Effect

            // A. Surround Gold Light
            ctx.globalCompositeOperation = 'screen';
            const glowRadius = 30 * currentScale;
            // Immediate drawing, no interpolation
            const ambientGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius);
            const glowOpacity = 0.12;
            ambientGrad.addColorStop(0, `rgba(255, 236, 179, ${glowOpacity})`);
            ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = ambientGrad;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // B. Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life -= p.decay;
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                if (p.type === 'smoke') {
                    ctx.globalCompositeOperation = 'source-over';
                    const currentSize = p.size * (1 + (1 - p.life));
                    const currentAlpha = p.alpha * p.life;

                    const smokeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
                    smokeGrad.addColorStop(0, `rgba(${p.color}, ${currentAlpha})`);
                    smokeGrad.addColorStop(1, `rgba(${p.color}, 0)`);

                    ctx.fillStyle = smokeGrad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                    ctx.fill();

                } else if (p.type === 'dust') {
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.fillStyle = `rgba(${p.color}, ${p.alpha * p.life})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // C. The "X Star" Shape
            ctx.globalCompositeOperation = 'screen';
            ctx.save();
            ctx.translate(pos.x, pos.y);
            ctx.rotate(currentRotation);
            ctx.scale(currentScale, currentScale);

            const starSize = 12;
            const innerSize = 2;

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

            requestAnimationFrame(render);
        };

        const loop = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(loop);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', checkHover);
            window.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999] custom-cursor"
            style={{
                touchAction: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999999
            }}
        />
    );
};

export default CometCursor;
