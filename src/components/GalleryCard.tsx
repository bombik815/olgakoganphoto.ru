import React from 'react';

interface GalleryCardProps {
  imageUrl: string;
  onClick: () => void;
  className?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, onClick, className }) => {
  return (
    <div 
      className={`relative overflow-hidden cursor-pointer transition-transform 
        duration-300 hover:scale-105 ${className || ''}
        min-w-[100px]`} // Минимальная ширина
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="Gallery item"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default React.memo(GalleryCard); 