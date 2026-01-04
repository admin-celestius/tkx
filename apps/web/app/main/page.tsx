'use client';

import React from 'react';
import LandingPage from '../../components/landing/LandingPage';
import LoadingScreen from '../../components/LoadingScreen';

export default function Page() {
    return (
        <main>
            <LoadingScreen />
            <LandingPage />
        </main>
    );
}
