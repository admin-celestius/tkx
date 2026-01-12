"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100", "300", "400"] });

export default function HeroPage() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date("February 26, 2026 00:00:00").getTime();
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                };
            }
            return { days: 0, hours: 0, minutes: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center bg-black text-white ${inter.className}`}>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(198, 166, 100, 0.15) 0%, rgba(0,0,0,0) 60%)"
                }}
            />

            <h1 className="text-2xl md:text-3xl font-light mb-12 tracking-[0.2em] uppercase text-neutral-400">
                Resurgence In
            </h1>

            <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 w-full max-w-6xl px-4 z-10">
                <TimeBlock value={timeLeft.days} label="DAYS" />
                <Separator />
                <TimeBlock value={timeLeft.hours} label="HOURS" />
                <Separator />
                <TimeBlock value={timeLeft.minutes} label="MINUTES" />
            </div>
        </div>
    );
}

function Separator() {
    return (
        <span className="text-2xl md:text-5xl font-light text-[#C6A664]/40 -mt-4 sm:-mt-6">:</span>
    );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span
                className="text-5xl md:text-7xl font-bold tracking-tighter"
                style={{
                    background: "linear-gradient(180deg, #F2E2A8 0%, #C6A664 50%, #7A5C1F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0px 2px 20px rgba(198, 166, 100, 0.3)"
                }}
            >
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-base tracking-[0.2em] md:tracking-[0.4em] font-medium text-[#C6A664]/60 mt-2 md:mt-4">
                {label}
            </span>
        </div>
    );
}
