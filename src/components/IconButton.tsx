import React from 'react';
import { LucideIcon } from "lucide-react";



interface IconButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
  className?: string;
  iconSize?: number; // Добавляем пропс
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  className,
  iconSize = 24 // Значение по умолчанию
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`rounded-full p-2 transition-colors ${className}`}
    >
      <Icon size={iconSize} /> {/* Используем пропс */}
    </button>
  );
};


export default React.memo(IconButton); // Оптимизация с помощью React.memo