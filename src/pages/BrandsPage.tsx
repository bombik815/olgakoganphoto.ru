import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

import brand_1 from '../assets/photos/brands/brand_1.jpg';
import brand_2 from '../assets/photos/brands/brand_2.jpg';
import brand_3 from '../assets/photos/brands/brand_3.jpg';
import brand_4 from '../assets/photos/brands/brand_4.jpg';
import portret from '../assets/photos/portret_2.jpg';
import fashion_art from '../assets/photos/fashion_art.jpg';

const brandPhotos = [
  { id: 1, src: brand_1, alt: 'Brand 1' },
  { id: 2, src: brand_2, alt: 'Brand 2' },
  { id: 3, src: brand_3, alt: 'Brand 3' },
  { id: 4, src: brand_4, alt: 'Brand 4' },
];

const portfolioCards = [
  {
    id: 1,
    src: fashion_art,
    alt: 'Fashion&Art',
    category: 'Fashion&Art',
    link: '/portfolio/fashion-art',
  },
  {
    id: 2,
    src: portret,
    alt: 'ПОРТРЕТ',
    category: 'ПОРТРЕТ',
    link: '/portfolio/portrait',
  },
];

const BrandsPage: React.FC = () => {
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
      const newIndex = (prevState.currentIndex - 1 + brandPhotos.length) % brandPhotos.length;
      return {
        ...prevState,
        selectedImage: brandPhotos[newIndex].src,
        currentIndex: newIndex,
        scale: 1,
      };
    });
  };

  const showNextImage = () => {
    setModalState((prevState) => {
      const newIndex = (prevState.currentIndex + 1) % brandPhotos.length;
      return {
        ...prevState,
        selectedImage: brandPhotos[newIndex].src,
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg, #f7f2f2)' }}>
      <div className="fixed top-0 w-full z-50"><Navbar isAboutSection={true} /></div>

      <main className="flex-grow pt-16 sm:pt-20">
        <div className="container mx-auto max-w-[1750px] px-4 sm:px-6">
          <h1 className="text-lg sm:text-[22px] head-main mb-6 sm:mb-8 tracking-wider text-center mt-4 sm:mt-8" 
              style={{ color: 'var(--color-header, #2d2d2d)' }}>
            Бренды
          </h1>

          <div className="mx-0 sm:mx-8 md:mx-20 lg:mx-[75px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2">
              {brandPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="w-full aspect-[3/4] bg-gray-200 cursor-pointer portrait-card"
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
          totalImages={brandPhotos.length}
        />
      )}
    </div>
  );
};

export default BrandsPage;