import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SponsorSection from './SponsorSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';
import NavBar from '../Navbar';

const LandingPage = () => {
    return (
        <div className="w-full h-full overflow-x-hidden bg-black">
            <NavBar />
            <HeroSection />
            <AboutSection />
            <SponsorSection />
            <ContactSection />
            <FooterSection />
        </div>
    );
};

export default LandingPage;
