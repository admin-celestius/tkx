"use client";
import React, { useState } from "react";

import { usePathname } from "next/navigation";

const navItems = ["HOME", "ABOUT", "EVENTS", "CONTACT"];

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEventsPage = pathname === "/events";

  React.useEffect(() => {
    if (pathname === "/events") setActiveIndex(1); // EVENTS
    else if (pathname === "/") setActiveIndex(0); // HOME
    // For other sections, we keep the clicked state or default to Home
  }, [pathname]);

  return (
    <nav
      id="global-navbar"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center"
    >
      {/* DESKTOP CONTAINER (Hidden on mobile) */}
      <div
        className="hidden md:flex bg-black/20 backdrop-blur-xl border border-[#d6b25a]/40
        px-10 py-4 rounded-xl shadow-[0_0_25px_rgba(214,178,90,0.25)]
        whitespace-nowrap items-center space-x-10"
      >
        {navItems.map((item, index) => (
          <NavItem
            key={item}
            item={item}
            index={index}
            activeIndex={activeIndex}
            isEventsPage={isEventsPage}
            setActiveIndex={setActiveIndex}
            pathname={pathname}
          />
        ))}
      </div>

      {/* MOBILE CONTAINER */}
      <div className="md:hidden relative">
        {/* HAMBURGER BUTTON (Central toggle) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`
            relative z-50 w-14 h-14 rounded-full 
            bg-black/60 backdrop-blur-xl border border-[#d6b25a]/40 
            shadow-[0_0_15px_rgba(214,178,90,0.4)]
            flex flex-col justify-center items-center gap-1.5
            transition-all duration-300
            ${isMobileMenuOpen ? "border-[#ffda75] shadow-[0_0_25px_rgba(255,218,117,0.6)]" : ""}
          `}
        >
          {/* Top Line */}
          <span
            className={`
              w-6 h-0.5 bg-[#d6b25a] rounded-full transition-all duration-300
              ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-[#ffda75]" : ""}
            `}
          />
          {/* Middle Line */}
          <span
            className={`
              w-6 h-0.5 bg-[#d6b25a] rounded-full transition-all duration-300
              ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}
            `}
          />
          {/* Bottom Line */}
          <span
            className={`
              w-6 h-0.5 bg-[#d6b25a] rounded-full transition-all duration-300
              ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#ffda75]" : ""}
            `}
          />
        </button>

        {/* SEMI-CIRCLE MENU (Fan out) */}
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10
            w-[280px] h-[280px] rounded-full
            bg-black/90 backdrop-blur-3xl border border-[#d6b25a]/30
            flex justify-center items-start pt-20
            transition-all duration-500 ease-out origin-center
            ${isMobileMenuOpen
              ? "scale-100 opacity-100 visbile shadow-[0_0_50px_rgba(214,178,90,0.15)] clip-circle-full"
              : "scale-0 opacity-0 invisible"
            }
          `}
          style={{
            clipPath: isMobileMenuOpen ? "none" : "circle(0% at 50% 50%)", // Additional clip for smooth expanding effect
          }}
        >
          {/* SECTOR ITEMS positioned radially */}
          {/* We position them relative to the connection point. 
              The circle is 280px wide. Center is 140px. 
              We want them in the bottom half? Or surrounding?
              User said "semi circle from the box". 
              Let's do a full radial pop-out or a semi-circle below.
              Given "top-6", a full circle might go off-screen top.
              Let's do a semi-circle DOWNWARDS.
           */}

          {/* SECTOR DIVIDERS */}
          {/* Angles to split the 4 items:
               Items are approx at: 240deg (Home), 210deg (About), 150deg (Events), 120deg (Contact)? 
               (Using standard 0=Right, 90=Down, 180=Left).
               Ref: 
               HOME: x=-85 (Left), y=-10 (Up/Mid). ~185 deg.
               ABOUT: x=-45 (Left), y=60 (Down). ~127 deg.
               EVENTS: x=45 (Right), y=60 (Down). ~53 deg.
               CONTACT: x=85 (Right), y=-10 (Up/Mid). ~ -5 deg.
               
               wait my previous math was weird.
               Let's just visually place them.
               Split 1 (Home/About): ~155 deg? (Left-Down-ish)
               Split 2 (About/Events): 90 deg (Straight Down).
               Split 3 (Events/Contact): ~25 deg? (Right-Down-ish)
           */}
          <div className="absolute w-[1px] h-[60px] top-4/9 left-1/3 bg-[#d6b25a]/30 origin-top -translate-x-1/2 rotate-[65deg] translate-y-10" />
          <div className="absolute w-[1px] h-[60px] top-1/2 left-1/2 bg-[#d6b25a]/30 origin-top -translate-x-1/2 rotate-[0deg] translate-y-10" />
          <div className="absolute w-[1px] h-[60px] top-4/9 right-1/3 bg-[#d6b25a]/30 origin-top -translate-x-1/2 rotate-[-65deg] translate-y-10" />


          {/* ITEMS */}
          {navItems.map((item, index) => {
            // Calculate positions for a semi-circle arc downwards
            // Angles: 0 left, 180 right (downwards is 90). 
            // Let's spread 4 items from roughly 135 deg to 45 deg (standard CSS angle system: 0 is right, 90 is down, 180 is left) .
            // Actually, let's use:
            // 1: 210 deg (top-left ish) - wait, menu is below?
            // If toggle is at top, menu should drop down.
            // Angles: 30deg (right-down), 70deg, 110deg, 150deg (left-down)

            // 4 Items. 
            // Index 0 (HOME): -45 deg from bottom center?
            // Let's hardcode precise consistent positions for 4 items in a semi-circle arrangement below the button.
            // We'll use absolute positioning + transform

            const angles = [
              -25,  // Contact (Right) - Reversed order for visual or... wait. Order: Home, About, Events, Contact
              25,
              75,
              125
            ];
            // Let's just use CSS translations for simplicity and robustness
            // We want Home top-left or top-right?

            // Configuration: Semi-circle facing DOWN.
            // Radius approx 100px.
            // Angles (0 is straight down? No usually 0 is right).
            // Let's place them: 
            // Home: Top-Left (relative to center of semi-circle) -> actually let's just use specific coords

            // Manually tuned positions for "Sectors" look
            const positions = [
              "top-[70px] -left-[90px]",  // HOME
              "top-[120px] -left-[45px]", // ABOUT
              "top-[120px] left-[45px]",  // EVENTS
              "top-[70px] left-[90px]"    // CONTACT
            ];

            // Wait, the container is 280x280 centered.
            // Button is in the exact center of this 280x280?
            // No, button is top of page.
            // Let's align the menu so the specific items fall below the button

            // Revised container styling to be "hanging" semi-circle? 
            // Or just a full circle centered on the button is easiest and looks "Arc Reactor" ish.
            // If centered, 0,0 is button.
            // HOME: -100px, 0
            // ABOUT: -50px, 80px
            // EVENTS: 50px, 80px
            // CONTACT: 100px, 0
            // This forms a nice arc below.

            // Let's use translate.

            // Map index to position styles
            const translateClass = [
              "translate-x-[-85px] translate-y-[-10px]", // HOME (Left)
              "translate-x-[-45px] translate-y-[60px]",  // ABOUT (Bottom Left)
              "translate-x-[45px] translate-y-[60px]",   // EVENTS (Bottom Right)
              "translate-x-[85px] translate-y-[-10px]"   // CONTACT (Right)
            ][index];

            return (
              <a
                key={item}
                href={item === "HOME" ? "/" : item === "EVENTS" ? "/events" : (isEventsPage ? `/#${item.toLowerCase()}` : `#${item.toLowerCase()}`)}
                onClick={(e) => {
                  if (item === "EVENTS") {
                    setActiveIndex(index);
                    setIsMobileMenuOpen(false);
                    return;
                  }
                  e.preventDefault();
                  setActiveIndex(index);
                  setIsMobileMenuOpen(false);
                  // ... logic copy ...
                  const targetId = item.toLowerCase();
                  if (targetId === 'home') {
                    if (pathname !== "/") window.location.href = "/";
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    if (pathname !== "/") window.location.href = `/#${targetId}`;
                    else document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`
                  absolute
                  flex items-center justify-center w-16 h-16 rounded-full
                  text-[10px] tracking-widest font-bold text-[#d6b25a]
                  hover:text-[#ffda75] hover:scale-110
                  transition-all duration-300 ease-out
                  ${translateClass}
                `}
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-32px', // half height
                  marginLeft: '-32px' // half width
                }}
              >
                {item}
              </a>
            )
          })}


        </div>
      </div>
    </nav >
  );
};

// Extracted NavItem for reuse/cleanliness
const NavItem = ({ item, index, activeIndex, isEventsPage, setActiveIndex, pathname }: any) => {
  let href = "";
  if (item === "HOME") href = "/";
  else if (item === "EVENTS") href = "/events";
  else href = isEventsPage ? `/#${item.toLowerCase()}` : `#${item.toLowerCase()}`;

  return (
    <a
      href={href}
      onClick={(e) => {
        if (item === "EVENTS") {
          setActiveIndex(index);
          return;
        }

        e.preventDefault();
        setActiveIndex(index);
        const targetId = item.toLowerCase();
        if (targetId === 'home') {
          if (pathname !== "/") {
            window.location.href = "/";
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          if (pathname !== "/") {
            window.location.href = `/#${targetId}`;
          } else {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }}
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

      {/* CLICK GOLD RIPPLE */}
      <span
        className="
        pointer-events-none absolute inset-0 rounded-md 
        opacity-0 group-active:opacity-40
        bg-[#ffda75]/40 transition-all duration-300 blur-md
      "
      />
    </a>
  );
}
export default NavBar;
