import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

import fashion_art_1 from '../assets/photos/fashion_art/fashion_art_1.jpg';
import fashion_art_2 from '../assets/photos/fashion_art/fashion_art_2.jpg';
import fashion_art_3 from '../assets/photos/fashion_art/fashion_art_3.jpg';
import fashion_art_4 from '../assets/photos/fashion_art/fashion_art_4.jpg';
import brend from '../assets/photos/brend.jpg';
import portret from '../assets/photos/portret_2.jpg';

const fashionArtPhotos = [
  { id: 1, src: fashion_art_1, alt: 'Fashion&Art 1' },
  { id: 2, src: fashion_art_2, alt: 'Fashion&Art 2' },
  { id: 3, src: fashion_art_3, alt: 'Fashion&Art 3' },
  { id: 4, src: fashion_art_4, alt: 'Fashion&Art 4' },
];

const portfolioCards = [
  {
    id: 1,
    src: brend,
    alt: 'БРЕНДЫ',
    category: 'БРЕНДЫ',
    link: '/portfolio/brands',
  },
  {
    id: 2,
    src: portret,
    alt: 'ПОРТРЕТ',
    category: 'ПОРТРЕТ',
    link: '/portfolio/portrait',
  },
];

const FashionArtPage: React.FC = () => {
  const [modalState, setModalState] = useState({
    selectedImage: null as string | null,
    currentIndex: 0,
    scale: 1,
  });

  const openModal = (image: string, index: number) => {
    setModalState({
      selectedImage: image,
      currentIndex: index,
      scale: 1,
    });
  };

  const closeModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      selectedImage: null,
    }));
  };

  const showPreviousImage = () => {
    setModalState((prevState) => {
      const newIndex = (prevState.currentIndex - 1 + fashionArtPhotos.length) % fashionArtPhotos.length;
      return {
        ...prevState,
        selectedImage: fashionArtPhotos[newIndex].src,
        currentIndex: newIndex,
        scale: 1,
      };
    });
  };

  const showNextImage = () => {
    setModalState((prevState) => {
      const newIndex = (prevState.currentIndex + 1) % fashionArtPhotos.length;
      return {
        ...prevState,
        selectedImage: fashionArtPhotos[newIndex].src,
        currentIndex: newIndex,
        scale: 1,
      };
    });
  };

  const zoomIn = () => {
    setModalState((prevState) => ({
      ...prevState,
      scale: Math.min(prevState.scale + 0.25, 3),
    }));
  };

  const zoomOut = () => {
    setModalState((prevState) => ({
      ...prevState,
      scale: Math.max(prevState.scale - 0.25, 0.5),
    }));
  };

  // Варианты анимации
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg, #f7f2f2)' }}>
      <div className="fixed top-0 w-full z-50"><Navbar isAboutSection={true} /></div>

      <main className="flex-grow pt-16 sm:pt-20">
        <div className="container mx-auto max-w-[1750px] px-4 sm:px-6">
          <h1 className="text-lg sm:text-[22px] head-main mb-6 sm:mb-8 tracking-wider text-center mt-4 sm:mt-8"
            style={{ color: 'var(--color-header, #2d2d2d)' }}>
            Fashion&Art
          </h1>

          <div className="mx-0 sm:mx-8 md:mx-20 lg:mx-[75px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2">
              {fashionArtPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="w-full aspect-[3/4] bg-gray-200 cursor-pointer"
                  onClick={() => openModal(photo.src, index)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 sm:mt-20 mx-0 sm:mx-8 md:mx-20 lg:mx-[75px]">
            <div className="w-full max-w-[1750px] px-4 sm:px-6 mx-auto relative">
              <div className="flex items-center justify-center">
                <div className="flex-grow border-t border-gray-300 mx-2 sm:mx-4" />
                <span className="text-lg sm:text-[22px] head-main tracking-wider px-2"
                  style={{ color: 'var(--color-header, #2d2d2d)' }}>
                  ПОРТФОЛИО
                </span>
                <div className="flex-grow border-t border-gray-300 mx-2 sm:mx-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 sm:mt-[57px]">
              {portfolioCards.map((card) => (
                <div
                  key={card.id}
                  className="w-full aspect-square hover:scale-[98%] transition-transform duration-300"
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="mt-4 text-center bg-transparent">
                    <a
                      href={card.link}
                      className="text-sm sm:text-[16px] hover:underline hover:text-gray-900 transition-colors"
                      style={{ color: 'var(--color-header, #2d2d2d)' }}
                    >
                      {card.category}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {modalState.selectedImage && (
        <Modal
          modalState={modalState}
          closeModal={closeModal}
          showPreviousImage={showPreviousImage}
          showNextImage={showNextImage}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          totalImages={fashionArtPhotos.length}
        />
      )}
    </div>
  );
};

export default FashionArtPage;