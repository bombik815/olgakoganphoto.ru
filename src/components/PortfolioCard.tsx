import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioCardProps {
  title: string;
  imageUrl: string;
  link: string;
  className?: string; // Добавляем className в интерфейс
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  imageUrl,
  link,
  className
}) => {
  return (
    <div className={`relative ${className || ''}`}>
      <motion.a
        href={link}
        className="block overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </motion.a>

      {/* Текст под фото */}
      <div className="mt-4 text-center">
        <h3 className="text-[#2d2d2d] text-lg">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default PortfolioCard;