// components/ScrollAwareNavbar.tsx
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ScrollAwareNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    const handleScroll = () => {
      const shouldShow = window.scrollY > 40;
      setIsScrolled(shouldShow);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 transition-transform duration-300 
      ${isMobile ? 'transform' : 'hidden'} 
      ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <Navbar />
    </div>
  );
};

export default ScrollAwareNavbar;