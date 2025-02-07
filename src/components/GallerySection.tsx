import React from 'react';
import GalleryCard from './GalleryCard';

interface GallerySectionProps {
  photos: string[];
  onPhotoClick: (image: string, index: number) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ photos, onPhotoClick }) => {
  // Обработчик для запрета контекстного меню
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section 
      className="bg-white py-12 md:py-16 lg:py-24"
      onContextMenu={handleContextMenu} // Добавляем обработчик
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1750px]">
        <h2 className="text-stone-900 text-2xl md:text-3xl lg:text-[34px] head-main mb-8 md:mb-12 lg:mb-16 tracking-wider text-center">
          ГАЛЕРЕЯ
        </h2>
        
        {/* Убираем паддинги у карточек и увеличиваем отступы в сетке */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {photos.map((photo, index) => (
            <GalleryCard
              key={`${photo}-${index}`}
              imageUrl={photo}
              onClick={() => onPhotoClick(photo, index)}
              className="aspect-square" // Убрали внутренние отступы p-0.5 sm:p-1 md:p-1.5
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(GallerySection);