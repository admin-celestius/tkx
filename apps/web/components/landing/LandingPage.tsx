import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SponsorSection from './SponsorSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

const LandingPage = () => {
    return (
        <div className="w-full h-full overflow-x-hidden bg-black">
            <HeroSection />
            <AboutSection />
            <SponsorSection />
            <ContactSection />
            <FooterSection />
        </div>
    );
};

export default LandingPage;
