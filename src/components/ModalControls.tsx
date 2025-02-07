import React from 'react';
import IconButton from './IconButton';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ModalControls: React.FC<ModalControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onClose,
  onPrevious,
  onNext,
}) => {
  return (
    <>
      {/* Кнопки в правом верхнем углу */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <IconButton
          icon={ZoomIn}
          onClick={onZoomIn}
          label="Zoom In"
          className="text-gray-700 hover:bg-gray-100"
        />
        <IconButton
          icon={ZoomOut}
          onClick={onZoomOut}
          label="Zoom Out"
          className="text-gray-700 hover:bg-gray-100"
        />
        <IconButton
          icon={X}
          onClick={onClose}
          label="Close Modal"
          className="text-gray-700 hover:bg-gray-100"
        />
      </div>

      {/* Стрелки для переключения */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => {
            onPrevious();
          }}
          className="text-gray-700 bg-transparent rounded-full p-3 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={32} />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => {
            onNext();
          }}
          className="text-gray-700 bg-transparent rounded-full p-3 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </>
  );
};

export default React.memo(ModalControls);
