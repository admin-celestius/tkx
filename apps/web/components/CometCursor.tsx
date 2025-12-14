'use client';

import React, { useEffect, useRef } from 'react';

// interface Particle moved outside
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
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Configuration ---
        let width = window.innerWidth;
        let height = window.innerHeight;

        // State
        const pos = { x: width / 2, y: height / 2 };
        const mouse = { x: width / 2, y: height / 2 };
        const velocity = { x: 0, y: 0 };

        // Physics - Stabilized Drift
        const drag = 0.15; // Increased drag to stop "shaking/oscillating" (sacking)
        const stiffness = 0.12; // Slightly softer spring

        // Visual State
        let currentScale = 1;
        let currentRotation = Math.PI / 4;

        // Shake Detection
        let shakeCount = 0;
        let lastVxSign = 0;
        let shakeResetTimer: NodeJS.Timeout;

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
            // Check if the target or its ancestors are interactive
            isHovering = !!target.closest('a, button, input, select, textarea, [role="button"], .cursor-hover');
        };

        const onMouseOut = (e: MouseEvent) => {
            // When leaving an element, check where we are going (relatedTarget)
            // If we are going to null (out of window) or non-interactive, isHovering becomes false
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

            // 1. Physics Update
            const dx = mouse.x - pos.x;
            const dy = mouse.y - pos.y;

            velocity.x += dx * stiffness;
            velocity.y += dy * stiffness;
            velocity.x *= (1 - drag);
            velocity.y *= (1 - drag);

            pos.x += velocity.x;
            pos.y += velocity.y;

            // 2. Logic: Shake Detection (Left/Right)
            const vxSign = Math.sign(velocity.x);
            if (Math.abs(velocity.x) > 5 && vxSign !== 0 && vxSign !== lastVxSign) {
                shakeCount++;
                lastVxSign = vxSign;

                clearTimeout(shakeResetTimer);
                shakeResetTimer = setTimeout(() => {
                    shakeCount = 0;
                }, 800);
            }

            // Calculate Target Scale & Rotation
            let targetScale = 1;
            const speed = Math.hypot(velocity.x, velocity.y);

            // Max cursor size to 60px (60px radius = scale of 5, since base is 12px)
            const maxScaleLimit = 5;

            if (isHovering) {
                targetScale = 2.2; // Slightly bigger on hover, but not too big
                currentRotation += 0.06; // Spin slowly
            } else {
                // Reduced threshold from 30 -> 12 per user request ("reduce mouse sacking" -> requiring less shaking)
                if (shakeCount > 12) {
                    targetScale = maxScaleLimit;
                    // Spin fast if shaking
                    currentRotation += 0.2;
                } else {
                    // Reduced growth and cap per user request ("reduce of the mouse" -> smaller cursor)
                    targetScale = 1 + (speed * 0.02); // Reduced from 0.05
                    targetScale = Math.min(targetScale, 1.5); // Reduced cap from 3 -> 1.5

                    // Return to natural rotation
                    const targetRotation = Math.PI / 4 + (velocity.x * 0.005);
                    currentRotation += (targetRotation - currentRotation) * 0.1;
                }
            }

            // Slower growth for smoothness (User requested "grow slow")
            currentScale += (targetScale - currentScale) * 0.1; // Increased visual responsiveness specific for hover interactions to feel snappy, while keep "grow slow" logic loosely applied via currentScale linear interpolation. Changed 0.01 -> 0.1 for better feel on hover entry/exit.

            // 3. Emitters

            // A. Gold Dust (Reduced particle count per user request)
            const dustCount = Math.floor(speed * 0.2); // Reduced from 1 + speed * 0.5
            for (let i = 0; i < dustCount; i++) {
                const r = 20 * currentScale;
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * r;
                particles.push({
                    x: pos.x + Math.cos(angle) * dist,
                    y: pos.y + Math.sin(angle) * dist,
                    vx: (Math.random() - 0.5) * 0.5 - (velocity.x * 0.05),
                    vy: (Math.random() - 0.5) * 0.5 - (velocity.y * 0.05),
                    life: 1,
                    maxLife: 1,
                    size: random(0.5, 1.5),
                    alpha: random(0.3, 0.8),
                    decay: random(0.02, 0.05),
                    type: 'dust',
                    color: '255, 236, 179'
                });
            }

            // B. Stone Speckles removed (was hover only)

            // C. Grey Smoke (Reduced spawn rate)
            if (speed > 4 && Math.random() < 0.05) {
                particles.push({
                    x: pos.x + random(-10, 10),
                    y: pos.y + random(-10, 10),
                    vx: -velocity.x * 0.05 + random(-0.2, 0.2),
                    vy: -velocity.y * 0.05 + random(-0.2, 0.2),
                    life: 1,
                    maxLife: 1,
                    size: random(15, 30),
                    alpha: 0.08,
                    decay: random(0.015, 0.03),
                    type: 'smoke',
                    color: '120, 120, 120'
                });
            }

            // 4. Draw Effect

            // A. Surround Gold Light
            ctx.globalCompositeOperation = 'screen';
            const glowRadius = 30 * currentScale;
            const ambientGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius);
            // Brighten slightly on hover (removed)
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

                } else if (p.type === 'stone') {
                    // Stone Effect - Solid, rotating squares/speckles
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation || 0) + p.life * 5); // Tumble
                    ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); // Square speckle
                    ctx.restore();

                } else {
                    // Dust
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

            // Blur for polished effect
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
            clearTimeout(shakeResetTimer);
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
                zIndex: 9999
            }}
        />
    );
};

export default CometCursor;
