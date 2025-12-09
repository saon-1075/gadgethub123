import React from 'react';
import HeroBanner from '../assets/Hero-banner.png'; 

const Hero = () => {
  return (
    <header className="w-full leading-none"> 
      <img 
        src={HeroBanner} 
        alt="Discover the future of technology" 
        className="w-full h-auto [image-rendering:pixelated]" 
      />
    </header>
  );
};

export default Hero;