import React, { useRef, useEffect, useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
  className?: string;
}

/**
 * Before/After Slider Component
 * Interactive slider showing before/after images with smooth transitions
 * Features:
 * - Mouse drag and touch swipe support
 * - Keyboard navigation
 * - Responsive
 * - Accessibility compliant
 */
const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  height = 500,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isActive, setIsActive] = useState(false);

  // Handle mouse/touch movement
  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isActive) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));

    const newPosition = (x / rect.width) * 100;
    setPosition(newPosition);
  };

  // Handle keyboard navigation (arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('touchmove', handleMouseMove as any);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('touchmove', handleMouseMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-gray-900 group cursor-ew-resize ${className}`}
      style={{ height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="Después"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Before Image (Overlay) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImage}
          alt="Antes"
          className="absolute h-full w-full object-cover"
          style={{ width: `${100}%` }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white transition-shadow duration-200 group-hover:shadow-lg group-hover:shadow-eventflow-primary/50"
        style={{ left: `${position}%` }}
      >
        {/* Handle Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg backdrop-blur-sm">
            <svg
              className="h-6 w-6 text-eventflow-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19l7-7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <div className="inline-block rounded-full bg-eventflow-black/80 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-bold text-white">{beforeLabel}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="inline-block rounded-full bg-eventflow-primary/90 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-bold text-white">{afterLabel}</span>
        </div>
      </div>

      {/* Hint Text (only on first interaction) */}
      {position === 50 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-lg bg-black/70 px-6 py-4 backdrop-blur-sm text-center">
            <p className="text-white text-sm font-medium">Arrastra para comparar</p>
            <p className="text-white/70 text-xs mt-1">O usa las flechas del teclado</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
