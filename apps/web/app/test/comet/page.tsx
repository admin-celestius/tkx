"use client";

import { useState } from "react";

export default function CometTestPage() {
    // Key used to force-reset the animation when 'Replay' is clicked
    const [animationKey, setAnimationKey] = useState(0);

    const handleReplay = () => {
        setAnimationKey((prev) => prev + 1);
    };

    return (
        <main className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">

            <div className="z-10 text-white/50 mb-[400px]">
                Click Replay to trigger animation
            </div>

            {/* Replay Button */}
            <button
                onClick={handleReplay}
                className="absolute z-50 bottom-20 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
                Replay Shooting Star
            </button>

            {/* Shooting Star Container */}
            <div key={animationKey} className="shooting-star-container">
                <div className="shooting-star">
                    {/* Trail (White Gradient) */}
                    <div className="shooting-star-trail"></div>

                    {/* Head (White Star SVG) */}
                    <div className="shooting-star-head">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient id="whiteGlow">
                                    <stop offset="0%" stopColor="#FFFFFF" />
                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                </radialGradient>
                            </defs>
                            <path
                                d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
                                fill="url(#whiteGlow)"
                                stroke="rgba(255, 255, 255, 0.5)"
                                strokeWidth="0.5"
                            />
                        </svg>
                    </div>
                </div>

                /* --- SHOWER SEQUENCE --- */

                /* 1. Pre-Main (0s - 1.5s) */
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

                /* 2. During-Main (1.5s - 3.5s) */
                <div className="shooting-star-companion" style={{ top: '18%', right: '25%', animationDuration: '1.3s', animationDelay: '2.0s' }}>
                    <div className="shooting-star-trail" style={{ width: '280px', animationDuration: '1.3s', animationDelay: '2.0s' }}></div>
                </div>
                <div className="shooting-star-companion" style={{ top: '30%', right: '12%', animationDuration: '1.1s', animationDelay: '2.5s' }}>
                    <div className="shooting-star-trail" style={{ width: '220px', animationDuration: '1.1s', animationDelay: '2.5s' }}></div>
                </div>
                <div className="shooting-star-companion" style={{ top: '14%', right: '30%', animationDuration: '1.4s', animationDelay: '3.0s' }}>
                    <div className="shooting-star-trail" style={{ width: '320px', animationDuration: '1.4s', animationDelay: '3.0s' }}></div>
                </div>

                /* 3. Post-Main (3.5s - 5.5s) - "Even after disappearance" */
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

                /* Companion / Parallel Stars */
                .shooting-star-companion {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    transform-origin: center;
                    transform: rotate(155deg);
                    animation: movementFast ease-in-out both; /* changed to 'both' to hide before start */
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
                    animation: trailPhases ease-in-out both; /* changed to 'both' */
                }

                /* Faster Movement for Companions - Stops before corner */
                @keyframes movementFast {
                    0% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(0);
                    }
                    10% { opacity: 1; }
                    60% { opacity: 1; }
                    90% { 
                        opacity: 0; /* Fade out before stop */
                        transform: rotate(155deg) translateX(75vw); /* Shorter distance than Main (85vw) */
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(75vw);
                    }
                }

                .shooting-star {
                    position: absolute;
                    /* Start Position: Top-Right Quadrant */
                    top: 20%;
                    right: 20%;
                    display: flex;
                    align-items: center;
                    transform-origin: center;
                    /* Rotation: 155deg points more towards Left (Bottom-Left corner for 16:9) */
                    transform: rotate(155deg);
                    
                    /* 2.5s Duration, Starts AFTER small stars (1.8s delay) */
                    animation: movement 2.5s ease-in-out both 1.8s; /* 'both' hides it during 1.8s delay */
                }

                .shooting-star-head {
                    position: relative;
                    z-index: 2;
                    /* Glowing bloom effect */
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
                    /* Spin AND Fade independently. 1.8s Delay to match main movement */
                    animation: spinHead 2.5s linear infinite 1.8s, headFade 2.5s ease-in-out both 1.8s;
                }

                .shooting-star-trail {
                    position: absolute;
                    /* Trail is behind the head */
                    right: 24px; 
                    height: 4px;
                    border-radius: 4px;
                    
                    /* White Gradient Trail */
                    background: linear-gradient(
                        to left, 
                        rgba(255, 255, 255, 1) 0%, 
                        rgba(255, 255, 255, 0.5) 50%, 
                        transparent 100%
                    );
                    
                    width: 0;
                    /* 1.8s Delay */
                    animation: trailPhases 2.5s ease-in-out both 1.8s;
                }

                /* 
                  1. Trajectory Animation 
                  Stop movement at 60% (Head Fade) 
                */
                @keyframes movement {
                    0% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(0);
                    }
                    10% {
                        opacity: 1;
                    }
                    /* Move until 60% */
                    60% {
                        opacity: 1;
                        transform: rotate(155deg) translateX(60vw);
                    }
                    /* Freeze from 60% to 100% (or fade out container opacity) */
                    90% {
                        opacity: 0; /* Container fades out */
                        transform: rotate(155deg) translateX(60vw);
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(155deg) translateX(60vw);
                    }
                }

                /* 
                  2. Trail Lifecycle Animation 
                  Updates: Trail gets much longer in the middle (500px) 
                */
                @keyframes trailPhases {
                    0% {
                        width: 0px;
                        opacity: 0;
                    }
                    10% {
                        width: 100px;
                        opacity: 1;
                    }
                    /* Middle Phase: SUPER LONG TRAIL */
                    50% {
                        width: 500px; /* Peak length */
                        opacity: 1;
                    }
                    90% {
                        width: 100px;
                        opacity: 0.8;
                    }
                    100% {
                        width: 0px; 
                        opacity: 0;
                    }
                }

                @keyframes spinHead {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Independent Head Fade */
                @keyframes headFade {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    40% { opacity: 1; } /* Start fading early */
                    60% { opacity: 0; } /* Gone by 60% of travel */
                    100% { opacity: 0; }
                }
            `}</style>
        </main>
    );
}
