'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from '../components/landing/LandingPage';
import LoadingRemastered from '../components/landing/LoadingRemastered';

export default function Page() {
  const [isLaunched, setIsLaunched] = React.useState(false);
  const [isCheckingSession, setIsCheckingSession] = React.useState(true);

  React.useEffect(() => {
    const hasLoaded = sessionStorage.getItem('tkx-loaded');
    if (hasLoaded) {
      setIsLaunched(true);
    }
    setIsCheckingSession(false);
  }, []);

  const handleFinished = () => {
    sessionStorage.setItem('tkx-loaded', 'true');
    setIsLaunched(true);
  };

  if (isCheckingSession) {
    return <div className="min-h-screen bg-black" />; // Minimal blank screen during check
  }

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
            <LoadingRemastered onFinished={handleFinished} />
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
