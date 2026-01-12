"use client"

import React, { useRef, useMemo, MouseEvent, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { PhoneIcon, UserIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

// --- Reused Components from AboutSection for Consistency ---

// 3D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    const cardRef = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })

    const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })
    const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set((e.clientX - centerX) / (rect.width / 2))
        mouseY.set((e.clientY - centerY) / (rect.height / 2))
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`${className} group relative perspective-1000`}
        >
            <motion.div
                className="absolute inset-0 z-50 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [glareX, glareY],
                        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(251, 191, 36, 0.5) 0%, transparent 70%)`
                    ),
                }}
            />
            {children}
        </motion.div>
    )
}

const coordinators = [
    {
        name: "Vijay S",
        role: "Student Coordinator",
        phone: "+91 93616 35716",
        email: "vijay@example.com"
    },
    {
        name: "Thaman R",
        role: "Student Coordinator",
        phone: "+91 93630 20563",
        email: "thaman@example.com"
    },
    {
        name: "Sudharsan S",
        role: "Student Coordinator",
        phone: "+91 63820 59942",
        email: "sudharsan@example.com"
    }
]

const ContactSection = () => {
    const [isMapActive, setIsMapActive] = useState(false)
    return (
        <section className="min-h-screen py-20 px-4 md:px-8 relative bg-black/95 overflow-hidden flex flex-col items-center justify-center">
            {/* Subtle gold gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-amber-900/5 pointer-events-none" />

            <div className="max-w-[95vw] w-full mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 font-lexend">
                        <span className="text-gold-premium">Get in Touch</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-lexend-deca max-w-2xl mx-auto">
                        Have questions? Reach out to our coordinators or visit us at our campus.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Coordinators Card */}
                    <TiltCard className="h-full">
                        <div
                            className="h-full bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-3xl 
                             shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] hover:shadow-[0_0_70px_-12px_rgba(251,191,36,0.2)] 
                             transition-all duration-700 relative flex flex-col justify-center"
                            style={{ transform: "translateZ(30px)" }}
                        >
                            {/* Gradient Border */}
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                                style={{
                                    padding: '1px',
                                    background: 'linear-gradient(to bottom, #cfc09f 22%, #ffecb3 24%, #3a2c0f 26%, #99752d 27%, #ffecb3 40%, #bf953f 78%)',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor'
                                }}
                            />

                            <div className="space-y-10 relative z-10">
                                {coordinators.map((coord, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.2, duration: 0.5 }}
                                        className="flex items-start md:items-center space-x-6 group"
                                    >
                                        <div className="p-4 rounded-full bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors duration-300">
                                            <UserIcon className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                <h3 className="text-2xl font-bold text-gray-100 group-hover:text-gold-premium transition-colors duration-300">
                                                    {coord.name}
                                                </h3>
                                                <span className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                                                    <PhoneIcon className="w-4 h-4 text-amber-500" /> {coord.phone}
                                                </span>
                                            </div>
                                            <p className="text-amber-500/80 font-medium">{coord.role}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TiltCard>

                    {/* Map Card */}
                    <TiltCard className="h-full min-h-[400px]">
                        <div
                            className="h-full bg-black/40 backdrop-blur-2xl p-4 md:p-6 rounded-3xl 
                             shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] hover:shadow-[0_0_70px_-12px_rgba(251,191,36,0.2)] 
                             transition-all duration-700 relative overflow-hidden flex flex-col"
                            style={{ transform: "translateZ(30px)" }}
                        >
                            {/* Gradient Border */}
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                                style={{
                                    padding: '1px',
                                    background: 'linear-gradient(to bottom, #cfc09f 22%, #ffecb3 24%, #3a2c0f 26%, #99752d 27%, #ffecb3 40%, #bf953f 78%)',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor'
                                }}
                            />

                            <div className="flex items-center gap-3 mb-6 px-2">
                                <MapPinIcon className="w-6 h-6 text-amber-400" />
                                <h3 className="text-2xl font-bold text-gold-premium">Locate Us</h3>
                            </div>

                            <div
                                className="flex-1 w-full rounded-2xl overflow-hidden relative z-10 border border-amber-500/10 grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                                onMouseLeave={() => setIsMapActive(false)}
                            >
                                <div
                                    className={`absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all duration-300 cursor-pointer ${isMapActive ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"}`}
                                    onClick={() => setIsMapActive(true)}
                                >
                                    <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10 shadow-lg">
                                        Click to Interact with Map
                                    </span>
                                </div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0829399187654!2d80.04044997454746!3d13.029868713589437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52602e19a44d41%3A0xe54728c70098f486!2sChennai%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1709663738450!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    className={isMapActive ? "pointer-events-auto" : "pointer-events-none"}
                                    style={{ border: 0, minHeight: '400px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
