"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownTimer = () => {
    // Target Date: March 20, 2026 09:00:00 IST
    const targetDate = useMemo(() => new Date("2026-03-20T09:00:00+05:30").getTime(), []);

    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const pad = (num: number) => num.toString().padStart(2, "0");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-12 z-20 py-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 md:gap-10"
            >
                <TimeUnit value={pad(timeLeft.days)} label="DAYS" />
                <Separator title="DAYS" />
                <TimeUnit value={pad(timeLeft.hours)} label="HOURS" />
                <Separator title="HOURS" />
                <TimeUnit value={pad(timeLeft.minutes)} label="MINS" />
                <Separator title="MINS" />
                <TimeUnit value={pad(timeLeft.seconds)} label="SECS" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center gap-2"
            >
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                <div className="text-amber-500/60 text-[10px] md:text-xs font-light tracking-[0.6em] uppercase">
                    March 20 — 22, 2026
                </div>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </motion.div>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: string; label: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col items-center gap-4 group"
        >
            <div className="relative p-[2px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                {/* Animated Gradient Border */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent,rgba(212,175,55,0.6),transparent,transparent,rgba(212,175,55,0.6))] animate-[spin_8s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] transition-all" />

                <div className="relative flex flex-col items-center justify-center min-w-[100px] md:min-w-[170px] h-[110px] md:h-[160px] bg-black/95 backdrop-blur-3xl rounded-[14px] border border-white/10 overflow-hidden">
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-amber-500/25 pointer-events-none" />
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.25),transparent_70%)] pointer-events-none"
                    />

                    {/* Digit Container - Enhanced stability and visibility */}
                    <div className="relative flex items-center justify-center tabular-nums leading-none text-6xl md:text-9xl">
                        {value.split("").map((digit, idx) => (
                            <div key={idx} className="relative w-[0.7em] md:w-[0.8em] h-[1.2em] md:h-[1.3em] flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={digit}
                                        initial={{ y: "60%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: "-60%", opacity: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="absolute font-bold text-gold-premium tracking-tighter"
                                    >
                                        {digit}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <span className="text-[10px] md:text-xs text-amber-200/50 tracking-[0.5em] font-light uppercase group-hover:text-amber-200/80 transition-all duration-500">
                {label}
            </span>

            <style jsx>{`
                .text-gold-premium {
                    background: linear-gradient(
                        to bottom,
                        #ffffff 0%,
                        #ffecb3 20%,
                        #d4af37 45%,
                        #3a2c0f 50%,
                        #99752d 55%,
                        #ffecb3 80%,
                        #bf953f 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
                    background-clip: text; /* Added for standard consistency */
                    color: transparent;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
};

const Separator = ({ title }: { title: string }) => (
    <div className="hidden md:flex flex-col gap-3 opacity-20 translate-y-[-10px]">
        <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
        />
        <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
        />
    </div>
);

export default CountdownTimer;
