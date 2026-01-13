import React, { useState } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SponsorSection from './SponsorSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';
import NavBar from '../Navbar';
import YearSection from '../YearSection';
import BondTimeline from '../BondTimeline';

const LandingPage = () => {
    const [showTimeline, setShowTimeline] = useState(false);

    return (
        <div className="w-full h-full overflow-x-hidden bg-black">
            <NavBar />
            {!showTimeline ? (
                <HeroSection onExplore={() => setShowTimeline(true)} />
            ) : (
                <BondTimeline onClose={() => setShowTimeline(false)} />
            )}
            <AboutSection />
            <SponsorSection />
            <ContactSection />
            <FooterSection />
        </div>
    );
};

export default LandingPage;
