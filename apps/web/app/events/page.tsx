'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from '../../components/Carousel';
import NavBar from '../../components/Navbar';

const categories = [
    { title: "TECHNICAL", image: "/images/event/tech/TECHQUIZ.jpg" },
    { title: "NON-TECHNICAL", image: "/images/event/nontech/IPLAUCTION.png" },
    { title: "WORKSHOPS", image: "/images/event/workshops/github.jpeg" },
    { title: "PROSHOWS", image: "/images/event/u1-bg-lap.png" },
    { title: "CIDA", image: "/images/event/web cida mobile.png" },
];

const allEvents = [
    // Technical Events
    { id: 1, title: "Tech Quiz", category: "TECHNICAL", description: "Test your technical knowledge in this intense quiz competition.", image: "/images/event/tech/TECHQUIZ.jpg" },
    { id: 2, title: "Code Relay", category: "TECHNICAL", description: "Collaborative coding challenge to solve complex problems.", image: "/images/event/tech/tech-hero.jpg" },

    // Non-Technical Events
    { id: 3, title: "IPL Auction", category: "NON-TECHNICAL", description: "Experience the thrill of a real-life IPL auction strategy.", image: "/images/event/nontech/IPLAUCTION.png" },
    { id: 4, title: "Treasure Hunt", category: "NON-TECHNICAL", description: "Solve clues and race against time to find the hidden treasure.", image: "/images/event/nontech/treasure.jpg" },

    // Workshops
    { id: 5, title: "GitHub & Git Masterclass", category: "WORKSHOPS", description: "Learn the essentials of version control and collaboration.", image: "/images/event/workshops/github.jpeg" },
    { id: 6, title: "AI & Machine Learning", category: "WORKSHOPS", description: "Hands-on workshop on the latest AI technologies.", image: "/images/event/workshops/ai.jpg" },

    // Proshows
    { id: 7, title: "Grand Concert", category: "PROSHOWS", description: "A night of music and magic with top-tier artists.", image: "/images/event/u1-bg-lap.png" },

    // CIDA
    { id: 8, title: "Innovation Expo", category: "CIDA", description: "Showcasing the most innovative projects from across the region.", image: "/images/event/web cida mobile.png" },
];

export default function EventsPage() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filteredEvents = activeFilter
        ? allEvents.filter(event => event.category === activeFilter)
        : allEvents;

    return (
        <main className="relative min-h-screen bg-black text-white overflow-x-hidden select-none">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(214,178,90,0.05),transparent_70%)]" />
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
            </div>

            <NavBar />

            <div className="relative z-10 pt-24 pb-20 flex flex-col items-center w-full px-4 md:px-10">
                {/* Carousel Section */}
                <div className="w-full max-w-7xl mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-[0.3em] text-[#d6b25a] mb-4">
                            CATEGORIES
                        </h2>

                    </motion.div>

                    <Carousel slides={categories} onSelect={(title) => setActiveFilter(title)} />
                    <br></br>
                    <br></br>
                </div>

                {/* Filter Status */}
                <div className="w-full max-w-7xl mb-10 flex flex-col md:flex-row items-center justify-between border-b border-[#d6b25a]/20 pb-6">
                    <div>
                        <h3 className="text-2xl font-bold tracking-widest text-white">
                            {activeFilter || "ALL EVENTS"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Showing {filteredEvents.length} events
                        </p>
                    </div>

                    {activeFilter && (
                        <button
                            onClick={() => setActiveFilter(null)}
                            className="mt-4 md:mt-0 px-6 py-2 bg-transparent border border-[#d6b25a]/50 text-[#d6b25a] rounded-full hover:bg-[#d6b25a] hover:text-black transition-all duration-300 text-sm tracking-widest"
                        >
                            CLEAR FILTER
                        </button>
                    )}
                </div>

                {/* Events Grid */}
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d6b25a]/50 transition-colors duration-500"
                            >
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] tracking-[0.2em] text-[#d6b25a] border border-[#d6b25a]/30 px-2 py-1 rounded">
                                            {event.category}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-[#d6b25a] transition-colors">
                                        {event.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {event.description}
                                    </p>
                                    <button className="w-full py-3 bg-[#d6b25a]/10 border border-[#d6b25a]/30 text-[#d6b25a] font-bold tracking-widest text-xs rounded hover:bg-[#d6b25a] hover:text-black transition-all duration-300">
                                        REGISTER NOW
                                    </button>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#d6b25a]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
