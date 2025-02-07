import React from 'react';
import GalleryCard from './GalleryCard';

interface GallerySectionProps {
  photos: string[];
  onPhotoClick: (image: string, index: number) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ photos, onPhotoClick }) => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <h2 className="text-stone-900 text-2xl md:text-3xl lg:text-[34px] head-main mb-8 md:mb-12 lg:mb-16 tracking-wider text-center">
          ГАЛЕРЕЯ
        </h2>
        
        {/* Сетка с адаптивными отступами */}
        <div className="grid grid-cols-3 
          gap-1.5   /* 6px на маленьких экранах */
          sm:gap-3  /* 12px на 640px+ */
          md:gap-4  /* 16px на 768px+ */
          lg:gap-5  /* 20px на 1024px+ */
          xl:gap-6  /* 24px на 1280px+ */
        ">
          {photos.map((photo, index) => (
            <GalleryCard
              key={`${photo}-${index}`}
              imageUrl={photo}
              onClick={() => onPhotoClick(photo, index)}
              className="aspect-square p-0.5 sm:p-1 md:p-1.5"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(GallerySection);