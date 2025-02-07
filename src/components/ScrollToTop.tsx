import React, { useState, useEffect } from 'react';

type ScrollToTopProps = {
  threshold?: number;
  bottom?: string;
  right?: string;
  buttonSize?: string; // Добавлено для настройки размера кнопки
};

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 300,
  bottom = '2rem',
  right = '2rem',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Проверяем мобильное устройство

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > threshold);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // Обновляем состояние при изменении размера окна
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', handleResize); // Добавляем обработчик изменения размера
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', handleResize); // Убираем обработчик при размонтировании
    };
  }, []);
  
    // Возвращаем null, если это мобильное устройство
    if (isMobile) {
      return null;
    }
    
  return (
    <div 
      className="fixed z-50 transition-opacity duration-300"
      style={{
        bottom,
        right,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.3s ease-in-out',
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
      }}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 3px 8px 1px rgba(0, 0, 0, 0.15)',
          color: 'var(--color-text-bright)',
          fontSize: '18px',
          lineHeight: '36px',
          textAlign: 'center',
          width: '60px', // Задаем ширину
          height: '60px', // Задаем высоту
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;