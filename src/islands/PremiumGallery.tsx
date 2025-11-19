import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  width?: number;
  height?: number;
}

interface PremiumGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
}

/**
 * Premium Gallery Component with Photoswipe Lightbox
 * Features:
 * - Responsive masonry layout
 * - Smooth lightbox with thumbnails
 * - Category filtering
 * - Full-screen slideshow
 * - Keyboard navigation
 */
const PremiumGallery: React.FC<PremiumGalleryProps> = ({
  images,
  columns = 3,
  gap = 16,
}) => {
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(images);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const galleryRef = useRef<HTMLDivElement>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map((img) => img.category)))];

  // Update filtered images when active category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(images);
    } else {
      const filtered = images.filter((img) => img.category === activeCategory);
      setFilteredImages(filtered);
    }
  }, [activeCategory, images]);

  // Filter images by category
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Open Photoswipe lightbox
  const openLightbox = (index: number) => {
    const items = filteredImages.map((img) => ({
      src: img.image,
      w: img.width || 1200,
      h: img.height || 800,
      title: img.title,
    }));

    const pswp = new PhotoSwipe({
      dataSource: {
        items,
      },
      index,
    });

    pswp.init();
  };

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const gapClass = {
    12: 'gap-3',
    16: 'gap-4',
    20: 'gap-5',
    24: 'gap-6',
  }[gap] || 'gap-4';

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white shadow-lg'
                : 'border border-eventflow-border-dark bg-transparent text-white hover:border-eventflow-primary hover:text-eventflow-primary'
            }`}
          >
            {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div
        ref={galleryRef}
        className={`grid ${gridColsClass} ${gapClass}`}
      >
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-xl bg-gray-800"
            data-animate
          >
            <div
              className="aspect-square w-full overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <img
                src={image.image}
                alt={image.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-eventflow-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 h-24 w-24 bg-eventflow-primary/10 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-eventflow-primary/20" />
            </div>

            {/* Info Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mb-2 inline-block rounded-full bg-eventflow-primary/90 px-3 py-1 text-xs font-semibold text-white capitalize">
                {image.category}
              </div>
              <h3 className="text-lg font-bold text-white">{image.title}</h3>
              {image.description && (
                <p className="mt-1 text-sm text-white/80 line-clamp-2">{image.description}</p>
              )}
            </div>

            {/* Icon - Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-lg">
            No hay imágenes en esta categoría
          </p>
        </div>
      )}
    </div>
  );
};

export default PremiumGallery;
