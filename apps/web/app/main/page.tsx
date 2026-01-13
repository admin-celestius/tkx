'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from '../../components/landing/LandingPage';
import LoadingRemastered from '../../components/landing/LoadingRemastered';

export default function Page() {
    const [isLaunched, setIsLaunched] = React.useState(false);

    return (
        <main className="relative min-h-screen bg-black">
            <AnimatePresence mode="wait">
                {!isLaunched ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50"
                    >
                        <LoadingRemastered onFinished={() => setIsLaunched(true)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative z-0"
                    >
                        <LandingPage />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
