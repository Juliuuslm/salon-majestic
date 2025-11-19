import React, { useState } from 'react';

interface Hotspot {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  title: string;
  capacity?: string;
  dimensions?: string;
  features?: string[];
  icon?: string;
}

interface FloorPlanConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
  dimensions?: string;
  maxCapacity?: number;
}

interface InteractiveFloorPlanProps {
  floorPlans: FloorPlanConfig[];
  height?: number;
  className?: string;
}

/**
 * Interactive Floor Plan Component
 * Features:
 * - Multiple floor plans with tabs
 * - Interactive hotspots with info popover
 * - Hover effects and animations
 * - Responsive design
 * - Accessibility support
 */
const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({
  floorPlans,
  height = 600,
  className = '',
}) => {
  const [activeFloor, setActiveFloor] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const currentFloor = floorPlans[activeFloor];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Floor Plan Selector Tabs */}
      <div className="flex flex-wrap gap-3">
        {floorPlans.map((floor, index) => (
          <button
            key={floor.id}
            onClick={() => {
              setActiveFloor(index);
              setActiveHotspot(null);
              setHoveredHotspot(null);
            }}
            className={`rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${
              activeFloor === index
                ? 'bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white shadow-lg'
                : 'border border-eventflow-border-dark bg-transparent text-white hover:border-eventflow-primary hover:bg-eventflow-primary/10'
            }`}
          >
            {floor.name}
          </button>
        ))}
      </div>

      {/* Floor Plan Container */}
      <div className="relative overflow-hidden rounded-xl bg-gray-900 group">
        {/* Floor Plan Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: `${height}px` }}
        >
          <img
            src={currentFloor.image}
            alt={currentFloor.name}
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-eventflow-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hotspots */}
          {currentFloor.hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="absolute"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Hotspot Button */}
              <button
                onClick={() =>
                  setActiveHotspot(
                    activeHotspot === hotspot.id ? null : hotspot.id
                  )
                }
                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                className="relative group/hotspot"
                aria-label={`${hotspot.title} - ${hotspot.capacity || ''}`}
              >
                {/* Outer Pulse Ring */}
                <div className="absolute inset-0 h-16 w-16 rounded-full bg-eventflow-primary/30 animate-pulse -translate-x-1/2 -translate-y-1/2" />

                {/* Middle Ring */}
                <div className="absolute inset-0 h-12 w-12 rounded-full bg-eventflow-primary/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover/hotspot:h-14 group-hover/hotspot:w-14 group-hover/hotspot:bg-eventflow-primary" />

                {/* Inner Circle with Icon */}
                <div className="absolute h-10 w-10 flex items-center justify-center rounded-full bg-white text-eventflow-primary font-bold text-lg -translate-x-1/2 -translate-y-1/2 shadow-lg transition-all duration-300 group-hover/hotspot:h-12 group-hover/hotspot:w-12">
                  {hotspot.icon || '📍'}
                </div>
              </button>

              {/* Tooltip on Hover */}
              {hoveredHotspot === hotspot.id && (
                <div className="absolute top-full mt-2 -left-24 w-48 bg-eventflow-black/95 border border-eventflow-primary/50 rounded-lg p-3 z-20 pointer-events-none">
                  <p className="font-bold text-white text-sm">{hotspot.title}</p>
                  {hotspot.capacity && (
                    <p className="text-eventflow-primary text-xs mt-1">
                      👥 {hotspot.capacity}
                    </p>
                  )}
                  {hotspot.dimensions && (
                    <p className="text-gray-300 text-xs mt-1">
                      📐 {hotspot.dimensions}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Overlay - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <div className="glass-card p-4">
            <h3 className="text-lg font-bold text-white">{currentFloor.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{currentFloor.description}</p>
          </div>
        </div>
      </div>

      {/* Hotspot Details Panel */}
      {activeHotspot && (
        <div className="glass-card p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          {(() => {
            const hotspot = currentFloor.hotspots.find(
              (h) => h.id === activeHotspot
            );
            if (!hotspot) return null;

            return (
              <>
                {/* Close Button */}
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Title */}
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">{hotspot.icon || '📍'}</span>
                    {hotspot.title}
                  </h3>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {hotspot.capacity && (
                    <div>
                      <p className="text-gray-400 text-sm">Capacidad</p>
                      <p className="text-white font-semibold text-lg">
                        {hotspot.capacity}
                      </p>
                    </div>
                  )}
                  {hotspot.dimensions && (
                    <div>
                      <p className="text-gray-400 text-sm">Dimensiones</p>
                      <p className="text-white font-semibold text-lg">
                        {hotspot.dimensions}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                {hotspot.features && hotspot.features.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Características</p>
                    <ul className="space-y-2">
                      {hotspot.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-white text-sm"
                        >
                          <span className="text-eventflow-primary">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mt-4"
                >
                  Inquirir Disponibilidad
                </a>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="bg-eventflow-black-dark/50 rounded-lg p-4 border border-eventflow-border-dark">
        <p className="text-sm text-gray-400">
          💡 <span className="text-white font-semibold">Tip:</span> Haz clic en
          los puntos para ver detalles. Los números indican diferentes áreas del
          espacio.
        </p>
      </div>
    </div>
  );
};

export default InteractiveFloorPlan;
