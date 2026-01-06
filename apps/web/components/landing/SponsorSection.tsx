"use client";

import { useEffect, useRef } from "react";
import SponsorCard from "./SponsorCard";

const sponsors = [
  { name: "AGS Cinemas", logo: "AGS" },
  { name: "Aswins", logo: "ASW" },
  { name: "BIG FM", logo: "BIG" },
  { name: "Deyga Organics", logo: "DEY" },
  { name: "Krafton Gaming", logo: "KFT" },
  { name: "Pepsi", logo: "PEP" },
  { name: "Vikatan Media", logo: "VIK" },
];

const SponsorSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* ========= ENTRY ANIMATION ========= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("enter-active");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-32 overflow-visible enter-section"
    >
      {/* ================= TITLE ================= */}
      <div className="relative z-10 mb-20 text-center font-lexend">
        <h2 className="text-4xl tracking-tight text-white md:text-6xl lg:text-7xl">
          Our{" "}
          <span className="relative inline-block">
            <span className=" bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Sponsors
            </span>

            {/* Gold underline */}
            <span className="absolute -bottom-4 left-0 right-0 h-[3px] rounded-full bg-linear-to-r from-transparent via-amber-300 to-transparent opacity-70" />
          </span>
        </h2>

        
      </div>

      {/* ================= SLIDER ================= */}
      <div className="relative z-10 mt-36">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-linear-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-linear-to-l from-black to-transparent" />

        <div className="sponsor-track flex w-max">
          {[...sponsors, ...sponsors].map((s, i) => (
            <div key={i} className="sponsor-item">
              <SponsorCard name={s.name} logo={s.logo} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        /* -------- ENTRY -------- */
        .enter-section {
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 0.9s ease,
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .enter-section.enter-active {
          opacity: 1;
          transform: translateY(0);
        }

        /* -------- SCROLL -------- */
        .sponsor-track {
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Pause scroll when ANY card hovered */
        .sponsor-track:has(.sponsor-item:hover) {
          animation-play-state: paused;
        }

        /* -------- SPACING -------- */
        .sponsor-item {
          padding: 0 10px;
          position: relative;
          z-index: 1;
        }

        /* -------- HOVER SCALE -------- */
        .sponsor-item:hover {
          z-index: 100;
        }

        .sponsor-item:hover .sponsor-card {
          transform: scale(1.15);
        }

        .sponsor-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        /* -------- GRADIENT TEXT -------- */
        .gradient-text {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default SponsorSection;
