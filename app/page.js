'use client';

import React from 'react';
import HeroSection from '../src/components/sections/HeroSection';
import AboutSection from '../src/components/sections/AboutSection';
import ValuesSection from '../src/components/sections/ValuesSection';
import MenuSelectionSection from '../src/components/sections/MenuSelectionSection';
import MapSection from '../src/components/sections/MapSection';
import { useSmoothScroll } from '../src/hooks/useSmoothScroll';

export default function Home() {
  useSmoothScroll();

  return (
    <div className="snap-container">
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <MenuSelectionSection />
      <MapSection />
    </div>
  );
}
