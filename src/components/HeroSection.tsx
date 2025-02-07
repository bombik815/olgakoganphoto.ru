import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IconButton from './IconButton';
import { motion, AnimatePresence } from 'framer-motion';

// Константы для легкой настройки
const SLIDE_INTERVAL = 3000; // 4 секунд между слайдами
const ANIMATION_DURATION = 1.2; // Длительность анимации в секундах

interface HeroSectionProps {
  photos: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  if (photos.length === 0) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 font-montserrat">No photos available</p>
      </div>
    );
  }

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
    setIsAutoPlaying(false);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [photos.length, isAutoPlaying]);

  return (
    <div className="h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={photos[currentPhoto]}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          <img
            src={photos[currentPhoto]}
            alt={`Slide ${currentPhoto + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* Десктопная версия */}
      <div className="hidden md:block absolute bottom-8 left-8 z-10">
        <h1 className="text-white text-[46px] leading-none font-montserrat mb-4">
          Olga Kogan
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <IconButton
            icon={ChevronLeft}
            onClick={prevPhoto}
            label="Previous Photo"
            className="text-white hover:text-gray-300"
            iconSize={24}
          />
          <span className="text-white text-sm">
            {currentPhoto + 1} / {photos.length}
          </span>
          <IconButton
            icon={ChevronRight}
            onClick={nextPhoto}
            label="Next Photo"
            className="text-white hover:text-gray-300"
            iconSize={24}
          />
        </div>
      </div>

      {/* Мобильная версия */}
      <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full px-4 z-10">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-white text-[46px] leading-none text-center font-montserrat">
            Olga Kogan
          </h1>
          <div className="flex items-center justify-center space-x-4 w-full max-w-[300px] font-montserrat">
            <IconButton
              icon={ChevronLeft}
              onClick={prevPhoto}
              label="Previous Photo"
              className="text-white hover:text-gray-300 p-2"
              iconSize={24}
            />
            <span className="text-white text-sm min-w-[60px] text-center">
              {currentPhoto + 1} / {photos.length}
            </span>
            <IconButton
              icon={ChevronRight}
              onClick={nextPhoto}
              label="Next Photo"
              className="text-white hover:text-gray-300 p-2"
              iconSize={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;