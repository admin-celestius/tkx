'use client';
import React, { useRef, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '../footer.module.css';

const Footer = () => {
    const pathname = usePathname();
    const isTeamPage = pathname === '/team';
    const containerRef = useRef<HTMLElement>(null);
    const particlesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // use effect kept empty to disable mouse interaction
    }, []);

    return (
        <section
            ref={containerRef}
            className={`relative z-20 pt-20 pb-16 mt-20 ${styles.footerContainer}`}
            data-scroll-section
        >
            {/* Dynamic Mouse Spotlight */}
            <div className={styles.spotlight} />

            {/* Gold Dust Container (Particles injected here) */}
            <div ref={particlesContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-30" />

            {/* Gray Smoke Layers */}
            <div className={styles.smokeContainer}>
                <div className={`${styles.smokeLayer} ${styles.smoke1}`} />
                <div className={`${styles.smokeLayer} ${styles.smoke2}`} />
                <div className={`${styles.smokeLayer} ${styles.smoke3}`} />
            </div>

            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />

            <div className="relative z-40 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

                {/* Column 1: Socials & Logo */}
                <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className={`text-2xl font-bold tracking-wider ${styles.goldText}`}>CONNECT</h3>

                    <div className="flex space-x-4">
                        {[
                            { Icon: FaInstagram, href: "https://www.instagram.com/cittakshashila/" },
                            { Icon: FaFacebookF, href: "https://www.facebook.com/people/CIT-Takshashila/100064056814271/" },
                            { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/cittakshashila/" },
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-yellow-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                                <Icon size={20} className="relative z-10" />
                            </a>
                        ))}
                    </div>


                </div>

                {/* Column 2: Events */}
                <div className="space-y-6 text-center md:text-left">
                    <h3 className={`text-2xl font-bold tracking-wider ${styles.goldText}`}>EVENTS</h3>
                    <ul className="space-y-4">
                        {['Technical Events', 'Non-Technical Events', 'Workshops'].map((item) => (
                            <li key={item}>
                                <Link href="/Events" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/Proshows" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">
                                Proshows
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Links */}
                <div className="space-y-6 text-center md:text-left">
                    <h3 className={`text-2xl font-bold tracking-wider ${styles.goldText}`}>EXPLORE</h3>
                    <ul className="space-y-4">
                        <li><Link href="/" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">Home</Link></li>
                        <li><Link href="https://www.citchennai.edu.in/" target="_blank" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">About CIT</Link></li>
                        <li><Link href="/team" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">Developers</Link></li>
                    </ul>
                </div>
                {/* Column 4: Support */}
                <div className="space-y-6 text-center md:text-left">
                    <h3 className={`text-2xl font-bold tracking-wider ${styles.goldText}`}>INFO</h3>
                    <ul className="space-y-4">
                        <li><Link href="/faq" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">FAQ</Link></li>
                        <li><Link href="/guidelines" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">Guidelines</Link></li>
                        <li><Link href="/terms" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">Terms</Link></li>
                        <li><Link href="/privacy" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 text-sm tracking-wide uppercase font-light block">Privacy</Link></li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="relative z-40 max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between px-6 gap-4">
                <p className="text-gray-500 text-xs tracking-widest uppercase">
                    © {new Date().getFullYear()} Takshashila.
                </p>
                <div className="flex items-center gap-4">
                    {/* Decorative line */}
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                </div>
            </div>

            {!isTeamPage && (
                <div className="absolute bottom-8 right-8 z-50 hidden md:block">
                    <Link href="/team" className={`group relative px-6 py-3 rounded-full bg-black/40 border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-500 backdrop-blur-md overflow-hidden flex items-center gap-3 shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]`}>
                        <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative text-gray-300 group-hover:text-yellow-200 text-xs font-semibold tracking-widest uppercase">Web Team</span>


                    </Link>
                </div>
            )}
        </section>
    );
};

export default Footer;
