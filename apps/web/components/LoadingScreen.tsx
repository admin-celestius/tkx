"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants} from "framer-motion";

// Define the solid X path as a constant for reuse
const SOLID_X_PATH = "M 46 46 L 102 46 L 117 133 L 31 133 L 46 46 M 117 46 L 102 133 L 46 133 L 31 46 L 117 46";

export default function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState("hidden");
  const [progress, setProgress] = useState(0);

  // --- Configuration ---
  const svgSize = 148;
  const center = svgSize / 2;
  
  const strokeW = 32; 
  
  const paddingY = 8;  
  const paddingX = 15; 
  const skew = 12;

  const mergeFlashScale = 1; 
  const shockwaveMaxSize = 1500;  

  const ends = {
    tl: { x: paddingX + skew, y: paddingY },
    tr: { x: svgSize - paddingX + skew, y: paddingY },
    br: { x: svgSize - paddingX - skew, y: svgSize - paddingY },
    bl: { x: paddingX - skew, y: svgSize - paddingY }
  };

  useEffect(() => {
    const dotTimer = setTimeout(() => setStage("dot"), 100);
    const growTimer = setTimeout(() => setStage("grow"), 2000);
    const orbitTimer = setTimeout(() => setStage("orbit"), 4200);
    const mergeTimer = setTimeout(() => setStage("merge"), 7200);
    const revealTimer = setTimeout(() => setStage("reveal"), 7900);
    const endTimer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
    }, 10000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 2;
      });
    }, 100);

    return () => {
      clearTimeout(dotTimer);
      clearTimeout(growTimer);
      clearTimeout(orbitTimer);
      clearTimeout(mergeTimer);
      clearTimeout(revealTimer);
      clearTimeout(endTimer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  // --- VARIANTS ---

  const dotVariant: Variants = {
    hidden: { scale: 0, opacity: 0 },
    dot: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
    grow: { scale: 1, opacity: 1 },
    orbit: { scale: 0.6, opacity: 0.4, boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)" },
    merge: { scale: 0.8, opacity: 1, boxShadow: "0 0 60px rgba(255, 215, 0, 1)", transition: { duration: 0.4, type: "spring", stiffness: 200 } },
    reveal: { scale: 0, opacity: 0 }
  };

  const containerVariant: Variants = {
    hidden: { rotate: 0 },
    dot: { rotate: 0 },
    grow: { rotate: 0 },
    orbit: { rotate: 360, transition: { duration: 3.5, ease: "linear", repeat: Infinity } },
    merge: { rotate: 720, transition: { duration: 0.8, ease: "circIn" } },
    reveal: { rotate: 720 }
  };

  const armVariant: Variants = {
    hidden: { pathLength: 0, opacity: 0, x: 0, y: 0 },
    dot: { pathLength: 0, opacity: 0, x: 0, y: 0 },
    grow: { pathLength: 1, opacity: 1, x: 0, y: 0, transition: { duration: 2.5, ease: "easeInOut" } },
    orbit: (custom: string) => {
      const dist = 55;
      let x = 0, y = 0;
      if (custom === 'tl') { x = -dist; y = -dist; }
      if (custom === 'tr') { x = dist; y = -dist; }
      if (custom === 'br') { x = dist; y = dist; }
      if (custom === 'bl') { x = -dist; y = dist; }
      return { pathLength: 1, opacity: 0.9, x, y, transition: { duration: 1.2, ease: "easeInOut" } };
    },
    merge: { pathLength: 0.15, opacity: 0, x: 0, y: 0, transition: { duration: 0.5, ease: "backIn" } }
  };
  
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden">
      
      {/* ATMOSPHERE */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, #1a1410 0%, #0d0a08 40%, #000000 100%)" }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(184, 134, 11, 0.15) 0%, transparent 70%)", filter: "blur(60px)" }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/shattered.png')" }} />
      
      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full" style={{ width: Math.random() * 4 + "px", height: Math.random() * 4 + "px", background: i % 3 === 0 ? "#FFE55C" : i % 3 === 1 ? "#DAA520" : "#b8860b", left: Math.random() * 100 + "%", top: Math.random() * 100 + "%", opacity: 0.4, boxShadow: "0 0 8px currentColor" }} animate={{ y: [0, -150], x: Math.sin(i) * 40, opacity: [0, 0.6, 0] }} transition={{ duration: 5 + Math.random() * 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }} />
        ))}
      </div>

      {/* CENTER STAGE */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        
        <svg className="absolute w-full h-full" viewBox="0 0 600 600" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="solidGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a3000" />
              <stop offset="25%" stopColor="#b8860b" />
              <stop offset="50%" stopColor="#fffac0" />
              <stop offset="75%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#4a3000" />
            </linearGradient>
            
            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="20%" stopColor="#FFFACD" opacity="0" />
              <stop offset="50%" stopColor="#FFFACD" opacity="0.5" />
              <stop offset="80%" stopColor="#FFFACD" opacity="0" />
            </linearGradient>

            {/* Realistic Drop Shadow */}
            <filter id="realisticShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
              <feFlood floodColor="#000" floodOpacity="0.5" result="offsetColor" />
              <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
              <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Enhanced 3D Bevel with multiple light sources */}
            <filter id="goldBevel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
              <feOffset in="blur" dx="1" dy="2" result="offsetBlur" />
              <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.5" specularExponent="45" lightingColor="#ffecb3" result="specOut1">
                <fePointLight x="-8000" y="-12000" z="20000" />
              </feSpecularLighting>
              <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1" specularExponent="30" lightingColor="#fff7e6" result="specOut2">
                <fePointLight x="8000" y="12000" z="20000" />
              </feSpecularLighting>
              <feComposite in="specOut1" in2="SourceAlpha" operator="in" result="specOut1" />
              <feComposite in="specOut2" in2="SourceAlpha" operator="in" result="specOut2" />
              <feMerge result="specOut">
                <feMergeNode in="specOut1"/>
                <feMergeNode in="specOut2"/>
              </feMerge>
              <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
            </filter>

            {/* Inner edge glow for realism */}
            <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceAlpha" operator="erode" radius="1" result="erode" />
              <feGaussianBlur in="erode" stdDeviation="1" result="blur" />
              <feComposite in="blur" in2="SourceAlpha" operator="out" result="inverse" />
              <feFlood floodColor="#fffac0" floodOpacity="0.8" result="color" />
              <feComposite in="color" in2="inverse" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="glow" />
              </feMerge>
            </filter>

            <filter id="mergeFlash" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="coloredBlur" />
              <feFlood floodColor="#ff8c00" floodOpacity="1" result="glowColor" />
              <feComposite in="glowColor" in2="coloredBlur" operator="in" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. THE REVOLVING GROUP */}
          {stage !== "reveal" && (
            <motion.g
              initial="hidden"
              animate={stage}
              variants={containerVariant}
              style={{ transformOrigin: "300px 300px" }}
            >
              <motion.circle cx="300" cy="300" r="22" fill="url(#solidGold)" filter="url(#goldBevel)" variants={dotVariant} />
              <motion.circle cx="300" cy="300" r="22" fill="none" stroke="#FFE55C" strokeWidth="1" opacity="0.5" variants={dotVariant} />

              <g transform="translate(226, 226)">
                {/* Top Left */}
                <motion.path d={`M ${center} ${center} L ${ends.tl.x} ${ends.tl.y}`} stroke="url(#solidGold)" strokeWidth={strokeW} strokeLinecap="butt" filter="url(#realisticShadow) url(#goldBevel) url(#innerGlow)" custom="tl" variants={armVariant} />
                <motion.path d={`M ${center} ${center} L ${ends.tl.x} ${ends.tl.y}`} stroke="url(#shine)" strokeWidth={strokeW - 10} strokeLinecap="butt" opacity="0.4" style={{ mixBlendMode: "overlay" }} custom="tl" variants={armVariant} />
                
                {/* Top Right */}
                <motion.path d={`M ${center} ${center} L ${ends.tr.x} ${ends.tr.y}`} stroke="url(#solidGold)" strokeWidth={strokeW} strokeLinecap="butt" filter="url(#realisticShadow) url(#goldBevel) url(#innerGlow)" custom="tr" variants={armVariant} />
                <motion.path d={`M ${center} ${center} L ${ends.tr.x} ${ends.tr.y}`} stroke="url(#shine)" strokeWidth={strokeW - 10} strokeLinecap="butt" opacity="0.4" style={{ mixBlendMode: "overlay" }} custom="tr" variants={armVariant} />

                {/* Bottom Right */}
                <motion.path d={`M ${center} ${center} L ${ends.br.x} ${ends.br.y}`} stroke="url(#solidGold)" strokeWidth={strokeW} strokeLinecap="butt" filter="url(#realisticShadow) url(#goldBevel) url(#innerGlow)" custom="br" variants={armVariant} />
                <motion.path d={`M ${center} ${center} L ${ends.br.x} ${ends.br.y}`} stroke="url(#shine)" strokeWidth={strokeW - 10} strokeLinecap="butt" opacity="0.4" style={{ mixBlendMode: "overlay" }} custom="br" variants={armVariant} />

                {/* Bottom Left */}
                <motion.path d={`M ${center} ${center} L ${ends.bl.x} ${ends.bl.y}`} stroke="url(#solidGold)" strokeWidth={strokeW} strokeLinecap="butt" filter="url(#realisticShadow) url(#goldBevel) url(#innerGlow)" custom="bl" variants={armVariant} />
                <motion.path d={`M ${center} ${center} L ${ends.bl.x} ${ends.bl.y}`} stroke="url(#shine)" strokeWidth={strokeW - 10} strokeLinecap="butt" opacity="0.4" style={{ mixBlendMode: "overlay" }} custom="bl" variants={armVariant} />
              </g>
            </motion.g>
          )}

          {/* 2. MERGE FLASH */}
          {stage === "merge" && (
            <>
              <motion.circle cx="300" cy="300" r="10" fill="#ff8c00" filter="url(#mergeFlash)" initial={{ scale: 0, opacity: 1 }} animate={{ scale: [0, mergeFlashScale, 0], opacity: [1, 1, 0] }} transition={{ duration: 0.8, ease: "easeOut" }} />
              <motion.circle cx="300" cy="300" r="10" fill="none" stroke="#FFE55C" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: [0, mergeFlashScale * 0.8, 0], opacity: [0.8, 0.4, 0] }} transition={{ duration: 1, ease: "easeOut", delay: 0.1 }} />
            </>
          )}
        </svg>

        {/* 3. LOGO REVEAL */}
        <AnimatePresence>
          {stage === "reveal" && (
            <>
              <motion.div className="absolute rounded-full border border-[#a18b1e]" style={{ width: 400, height: 400 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0.6, 0], scale: 1 }} transition={{ duration: 1.4, ease: "easeOut" }} />
              <motion.div className="absolute rounded-full border border-[#99761e]" style={{ width: 540, height: 540 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0.4, 0], scale: 1 }} transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }} />
              <motion.div key="final-logo" className="absolute flex items-center justify-center z-10" initial={{ scale: 0.08, opacity: 0, rotate: -180, filter: "blur(30px)" }} animate={{ scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}>
                <img src="/tk-logo.svg" alt="Takshashila Logo" className="w-80 h-auto object-contain" style={{ mixBlendMode: "screen", filter: "contrast(1.4) brightness(0.95) drop-shadow(0 0 40px rgba(255, 229, 92, 0.8))" }} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* 4. SHOCKWAVES */}
        {stage === "reveal" && (
          <>
            <motion.div className="absolute rounded-full border border-[#4b4526]" initial={{ width: 0, height: 0, opacity: 1 }} animate={{ width: shockwaveMaxSize, height: shockwaveMaxSize, opacity: 0 }} transition={{ duration: 1.4, ease: "easeOut" }} style={{ filter: "blur(15px)", borderWidth: "60px" }} />
            <motion.div className="absolute rounded-full border border-[#af8f3d]" initial={{ width: 0, height: 0, opacity: 1 }} animate={{ width: shockwaveMaxSize * 0.66, height: shockwaveMaxSize * 0.66, opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }} style={{ filter: "blur(8px)", borderWidth: "40px" }} />
          </>
        )}
      </div>

      {/* PROGRESS */}
      {stage !== "reveal" && (
        <motion.div className="absolute bottom-10 font-mono text-xs tracking-[0.3em] text-[#b99d12]" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}>INITIALIZING::{Math.round(progress)}%</motion.div>
      )}
    </div>
  );
}