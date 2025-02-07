import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalState {
  selectedImage: string | null;
  currentIndex: number;
  scale: number;
}

interface ModalProps {
  modalState: ModalState;
  closeModal: () => void;
  showPreviousImage: () => void;
  showNextImage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  totalImages: number;
}

const Modal: React.FC<ModalProps> = React.memo(({
  modalState,
  closeModal,
  showPreviousImage,
  showNextImage,
  zoomIn,
  zoomOut,
  totalImages,
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Обработчик скролла мыши
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
    e.preventDefault();
  }, [zoomIn, zoomOut]);

  useEffect(() => {
    if (modalState.scale !== 1) {
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  }, [modalState.scale]);

  // Блокировка скролла и добавление обработчика колеса
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = 'hidden';

    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      html.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && modalState.scale === 1) showNextImage();
    if (isRightSwipe && modalState.scale === 1) showPreviousImage();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPreviousImage();
      if (e.key === 'ArrowRight') showNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, showPreviousImage, showNextImage]);

  return (
    <AnimatePresence>
      {modalState.selectedImage && (
        <div
          className="fixed inset-0 bg-white z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          onTouchMove={(e) => e.preventDefault()} // Блокировка скролла на iOS
        >
          {/* Панель управления */}
          <div className="fixed top-0 left-0 right-0 z-10 bg-white p-4 flex justify-between items-center  h-16">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 bg-gray-100 rounded-full p-1 ">
                <button
                  onClick={zoomOut}
                  className="text-[ #2d2d2d] text-xl hover:bg-gray-200 transition-colors w-8 h-8 rounded-full flex items-center justify-center"
                  aria-label="Уменьшить"
                >
                  <ZoomOut className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  onClick={zoomIn}
                  className="text-[ #2d2d2d] text-xl hover:bg-gray-200 transition-colors w-8 h-8 rounded-full flex items-center justify-center"
                  aria-label="Увеличить"
                >
                  <ZoomIn className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  onClick={showPreviousImage}
                  className="text-black text-2xl hover:bg-gray-200 transition-opacity w-8 h-8 rounded-full flex items-center justify-center"
                  aria-label="Предыдущее изображение"
                >
                  <ChevronLeft className="w-6 h-6" strokeWidth={2} />
                </button>
                <button
                  onClick={showNextImage}
                  className="text-black text-2xl hover:bg-gray-200 transition-opacity w-8 h-8 rounded-full flex items-center justify-center"
                  aria-label="Следующее изображение"
                >
                  <ChevronRight className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={closeModal}
                className="text-[ #2d2d2d] text-2xl hover:bg-gray-200 transition-opacity w-8 h-8 rounded-full flex items-center justify-center"
                aria-label="Закрыть"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>
          </div>
          {/* Скрываем стрелки при зуме */}
          {!isZoomed && (
            <div className="flex items-center gap-4">
              <button onClick={showPreviousImage} className="...">
                <ChevronLeft className="w-6 h-6" strokeWidth={2} />
              </button>
              <button onClick={showNextImage} className="...">
                <ChevronRight className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>
          )}
          {/* Область изображения */}
          <div
            className="absolute inset-0 flex items-center justify-center touch-none pt-16 pb-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              paddingTop: '4rem', // Добавляем отступ сверху
              cursor: isZoomed ? 'grab' : 'default'
            }}
          >
            <motion.img
              key={modalState.selectedImage}
              src={modalState.selectedImage}
              alt="Выбранное изображение"
              className="w-full h-full object-contain mx-0" // Убраны горизонтальные отступы
              style={{
                transform: `scale(${modalState.scale})`,
                maxWidth: '90%',
                maxHeight: '90%',
                touchAction: 'none'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: modalState.scale,
                transition: { type: 'spring', stiffness: 300 }
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              drag={modalState.scale > 1}
              dragConstraints={{
                top: -window.innerHeight / 2,
                left: -window.innerWidth / 2,
                right: window.innerWidth / 2,
                bottom: window.innerHeight / 2
              }}
              dragElastic={0.1}
              whileTap={{ cursor: 'grabbing' }}
              
            />
          </div>

          {/* Индикатор позиции */}
          {!isZoomed && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {Array.from({ length: totalImages }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === modalState.currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
});

export default Modal;