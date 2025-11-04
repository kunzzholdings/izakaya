import React from 'react';
import HeroSection from '../src/components/sections/HeroSection';
import AboutSection from '../src/components/sections/AboutSection';
import ValuesSection from '../src/components/sections/ValuesSection';
import MenuSelectionSection from '../src/components/sections/MenuSelectionSection';
import MapSection from '../src/components/sections/MapSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <MenuSelectionSection />
      <MapSection />
    </div>
  );
}
