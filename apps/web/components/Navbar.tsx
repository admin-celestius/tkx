"use client";
import React, { useState } from "react";

import { usePathname } from "next/navigation";

const navItems = ["HOME", "TIMELINE", "ABOUT", "EVENTS", "WORKSHOPS", "GALLERY", "CONTACT"];

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();
  const isTimelinePage = pathname === "/timeline";

  React.useEffect(() => {
    if (pathname === "/timeline") setActiveIndex(1); // TIMELINE
    else if (pathname === "/") setActiveIndex(0); // HOME
    // For other sections, we keep the clicked state or default to Home
  }, [pathname]);

  return (
    <nav
      id="global-navbar"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50
      bg-black/20 backdrop-blur-xl border border-[#d6b25a]/40
      px-10 py-4 rounded-xl shadow-[0_0_25px_rgba(214,178,90,0.25)]
      whitespace-nowrap w-max"
    >
      <div className="flex space-x-10">
        {navItems.map((item, index) => {
          let href = "";
          if (item === "HOME") href = "/";
          else if (item === "TIMELINE") href = "/timeline";
          else href = isTimelinePage ? `/#${item.toLowerCase()}` : `#${item.toLowerCase()}`;

          return (
            <a
              key={item}
              href={href}
              onClick={() => setActiveIndex(index)}
              className={`group relative text-xs tracking-[0.3em] 
              font-semibold uppercase px-1 transition-all duration-300
              
              ${index === activeIndex
                  ? "text-[#ffda75] nav-gold-glow-active"
                  : "text-[#d6b25a] nav-gold-glow hover:text-[#ffda75]"
                }
            `}
            >
              {item}

              {/* UNDERLINE */}
              <span
                className={`
                absolute left-0 -bottom-1 h-[2px] bg-[#ffda75] rounded-full 
                transition-all duration-500 
                ${index === activeIndex ? "w-full" : "w-0 group-hover:w-full"}
              `}
              />

              {/* SOFT GOLD GLOW (NO SCALE) */}
              {index !== activeIndex && (
                <span
                  className="
                absolute inset-0 rounded-md opacity-0
                group-hover:opacity-20 bg-[#d6b25a]
                transition-all duration-300 blur-sm
              "
                />
              )}

              {/* CLICK GOLD RIPPLE (NO SCALE CHANGE TO TEXT) */}
              <span
                className="
                pointer-events-none absolute inset-0 rounded-md 
                opacity-0 group-active:opacity-40
                bg-[#ffda75]/40 transition-all duration-300 blur-md
              "
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
