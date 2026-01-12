"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, MouseEvent, useMemo } from "react"
import SlideShow from "../slideShow"

const citImages: string[] = ["/1.jpeg", "/2.jpeg", "/3.jpeg"]
const takshashilaImages: string[] = ["/4.JPG", "/5.jpg", "/6.JPG"]

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
                className="absolute inset-0 z-50 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
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

// Hover-based Gold Dust (Follows Cursor)
const RoyalDust: React.FC<{ mouseX: any; mouseY: any }> = ({ mouseX, mouseY }) => {
    const particles = useMemo(() => Array.from({ length: 40 }), [])
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            {particles.map((_, i) => {
                const randomX = Math.random() * 100
                const randomY = Math.random() * 100
                return (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
                        style={{
                            left: randomX + "%",
                            top: randomY + "%",
                            filter: "blur(1px)",
                            boxShadow: "0 0 10px rgba(251, 191, 36, 0.4)",
                            x: useTransform(mouseX, [-500, 500], [Math.random() * 100 - 50, Math.random() * 100 - 50]),
                            y: useTransform(mouseY, [-500, 500], [Math.random() * 100 - 50, Math.random() * 100 - 50]),
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 4,
                        }}
                    />
                )
            })}
        </div>
    )
}

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const citRef = useRef(null)
    const takshashilaRef = useRef(null)
    const isCitInView = useInView(citRef, { once: true, amount: 0.3 })
    const isTakshashilaInView = useInView(takshashilaRef, { once: true, amount: 0.3 })

    const globalMouseX = useMotionValue(0)
    const globalMouseY = useMotionValue(0)
    const springX = useSpring(globalMouseX, { stiffness: 50, damping: 20 })
    const springY = useSpring(globalMouseY, { stiffness: 50, damping: 20 })

    return (
        <section
            ref={sectionRef}
            id="about"
            onMouseMove={(e) => {
                const rect = sectionRef.current?.getBoundingClientRect()
                if (rect) {
                    globalMouseX.set(e.clientX - (rect.left + rect.width / 2))
                    globalMouseY.set(e.clientY - (rect.top + rect.height / 2))
                }
            }}
            className="min-h-[150vh] bg-black/95 z-10 backdrop-blur-sm flex flex-col items-center justify-center py-16 px-4 md:px-16 overflow-hidden relative"
            data-scroll-section
            style={{ perspective: "2000px" }}
        >
            {/* Subtle gold gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-amber-900/5 pointer-events-none" />

            {/* Gold Dust (Only particles following mouse) */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    opacity: useTransform([springX, springY], ([x, y]) => (Math.abs(x as number) > 0 || Math.abs(y as number) > 0 ? 1 : 0))
                }}
            >
                <RoyalDust mouseX={springX} mouseY={springY} />
            </motion.div>

            {/* CIT Section */}
            <motion.div
                ref={citRef}
                initial={{ opacity: 0, rotateY: -90, z: -200 }}
                animate={isCitInView ? { opacity: 1, rotateY: 0, z: 0 } : { opacity: 0, rotateY: -90, z: -200 }}
                transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 50 }}
                className="w-full max-w-[95vw] mx-auto px-2 md:px-4 mb-20 relative z-10"
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* CIT Content */}
                    <TiltCard className="md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isCitInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="space-y-8 bg-black/40 backdrop-blur-2xl p-10 md:p-14 rounded-3xl 
                         shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] hover:shadow-[0_0_70px_-12px_rgba(251,191,36,0.2)] 
                         transition-all duration-700 h-full flex flex-col justify-center min-h-[550px]"
                            style={{ transform: "translateZ(50px)" }}
                        >
                            {/* Gradient Border */}
                            <div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                    padding: '1px',
                                    background: 'linear-gradient(to bottom, #cfc09f 22%, #ffecb3 24%, #3a2c0f 26%, #99752d 27%, #ffecb3 40%, #bf953f 78%)',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor'
                                }}
                            />
                            <h2
                                className="text-4xl font-lexend relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
                           after:bg-gradient-to-r after:from-amber-500 after:to-yellow-600 after:shadow-lg after:shadow-amber-500/50
                           drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-300 
                           hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]"
                                style={{
                                    background: "linear-gradient(to bottom, #cfc09f 22%, #ffecb3 24%, #3a2c0f 26%, #99752d 27%, #ffecb3 40%, #bf953f 78%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}
                            >
                                CIT
                            </h2>
                            <div className="space-y-4 text-gray-200/90 font-lexend-deca">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isCitInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="leading-relaxed"
                                >
                                    A prominent institution ranking amongst the top colleges in Tamil Nadu, was established with an
                                    initiative to provide pragmatic learning. The institution has also partnered with a number of companies
                                    to set a worldwide standard by offering students a diverse range of possibilities that combine education
                                    and recreation.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isCitInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="leading-relaxed"
                                >
                                    The students&apos; appetite for knowledge makes them thrive to prepare for the ready-to-serve industrial
                                    requirements. This is delivered by CIT through professional ethics which is sated by frequent guest
                                    lectures by professionals from various industries and academic backgrounds. Chennai Institute of
                                    Technology has been awarded the National Award of Excellence for Best Placements &amp; has been ranked
                                    Second in Tamil Nadu. Our college has made dreams of thousands of students come true
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isCitInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                    className="border-l-4 border-amber-500 pl-6 bg-gradient-to-r from-amber-900/20 to-transparent py-4 
                             rounded-r-lg shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 transition-all duration-300"
                                    style={{ transform: "translateZ(30px)" }}
                                >
                                    <blockquote className="italic text-xl text-gray-100">
                                        &ldquo;Our objective for establishing CIT is to transfer our knowledge to you, so that you can
                                        transform into a proper engineer&rdquo;
                                    </blockquote>
                                    <cite className="block mt-4 font-semibold text-gold-premium">~ Shri Sriram Parthasarathy</cite>
                                </motion.div>
                            </div>
                        </motion.div>
                    </TiltCard>

                    {/* CIT Slideshow */}
                    <TiltCard className="md:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: 15 }}
                            animate={isCitInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 50, rotateY: 15 }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            className="rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] 
                         hover:shadow-[0_0_70px_-12px_rgba(251,191,36,0.2)] transition-all duration-700 relative"
                            style={{ transform: "translateZ(75px)" }}
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
                            {/* Golden glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/5 to-yellow-500/10 pointer-events-none z-10" />
                            <SlideShow images={citImages} height="550px" interval={4000} />
                        </motion.div>
                    </TiltCard>
                </div>
            </motion.div>

            {/* Takshashila Section */}
            <motion.div
                ref={takshashilaRef}
                initial={{ opacity: 0, rotateY: 90, z: -200 }}
                animate={isTakshashilaInView ? { opacity: 1, rotateY: 0, z: 0 } : { opacity: 0, rotateY: 90, z: -200 }}
                transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 50 }}
                className="w-full max-w-[95vw] mx-auto px-2 md:px-4 mb-8 relative z-10"
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    {/* Takshashila Content */}
                    <TiltCard className="md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isTakshashilaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="space-y-8 bg-black/40 backdrop-blur-2xl p-10 md:p-14 rounded-3xl 
                         shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] hover:shadow-[0_0_70px_-12px_rgba(251,191,36,0.2)] 
                         transition-all duration-700 h-full flex flex-col justify-center min-h-[550px]"
                            style={{ transform: "translateZ(50px)" }}
                        >
                            {/* Gradient Border */}
                            <div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                    padding: '1px',
                                    background: 'linear-gradient(to bottom, #cfc09f 22%, #ffecb3 24%, #3a2c0f 26%, #99752d 27%, #ffecb3 40%, #bf953f 78%)',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor'
                                }}
                            />
                            <h2
                                className="text-4xl font-lexend relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
                           after:bg-gradient-to-r after:from-amber-500 after:to-yellow-600 after:shadow-lg after:shadow-amber-500/50
                           drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-300 
                           hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]"
                                style={{
                                    background: "linear-gradient(to bottom, #cfc09f 22%, #ffecb3 24%, #3a2c0f 26%, #99752d 27%, #ffecb3 40%, #bf953f 78%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}
                            >
                                TAKSHASHILA
                            </h2>
                            <div className="space-y-4 text-gray-200/90 font-lexend-deca">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isTakshashilaInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="leading-relaxed"
                                >
                                    The Grand Annual Cultural Fiesta of Chennai Institute Of Technology is an eminent spectacle that gives
                                    the student community a platform to showcase their talents and sculpt their skills. This memorable
                                    occasion is a perfect fusion of entertainment and knowledge-filled atmosphere with a potpourri of genres
                                    that escalate the vibrance of celebration. The event inculcates a blend of virtues among the students
                                    which makes them shine out of the crowd. This time, Takshashila&apos;s voyage will be an exhilarating
                                    one, full of adventures that are fished straight out of the ocean.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isTakshashilaInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="leading-relaxed"
                                >
                                    Through workshops, competitions, and technical presentations, Takshashila provides a platform for
                                    students to showcase their talents and learn from industry experts.
                                </motion.p>
                            </div>
                        </motion.div>
                    </TiltCard>

                    {/* Takshashila Slideshow */}
                    <TiltCard className="md:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotateY: -15 }}
                            animate={isTakshashilaInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -15 }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            className="rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] 
                         hover:shadow-[0_0_70px_-12px_rgba(251,191,36,0.2)] transition-all duration-700 relative"
                            style={{ transform: "translateZ(75px)" }}
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
                            {/* Golden glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/0 via-amber-500/5 to-yellow-500/10 pointer-events-none z-10" />
                            <SlideShow images={takshashilaImages} height="550px" interval={4000} />
                        </motion.div>
                    </TiltCard>
                </div>
            </motion.div>
        </section >
    )
}

export default AboutSection
