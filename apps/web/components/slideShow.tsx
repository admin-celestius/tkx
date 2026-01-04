"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideShowProps {
    images: string[];
    height?: string;
    interval?: number;
}

const SlideShow: React.FC<SlideShowProps> = ({ images, height = "400px", interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div style={{ height }} className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </AnimatePresence>
            
            {/* Subtle overlay to blend with the gold theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 transition-all duration-500 rounded-full ${
                            i === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
