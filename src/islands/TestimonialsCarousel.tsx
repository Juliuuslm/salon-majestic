import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating?: number;
  eventImage?: string; // Foto del evento/fondo
}

interface Props {
  testimonials: Testimonial[];
  autoplayDelay?: number;
}

export default function TestimonialsCarousel({ testimonials, autoplayDelay = 5000 }: Props) {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={true}
        loopAdditionalSlides={1}
        navigation={{
          nextEl: '.testimonial-button-next',
          prevEl: '.testimonial-button-prev',
        }}
        pagination={{
          el: '.testimonial-swiper-pagination',
          clickable: true,
          dynamicBullets: false,
        }}
        className="testimonials-carousel"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            {/* EDITORIAL STYLE CARD - Luxury Magazine Look */}
            <div className="testimonial-card-luxury relative h-96 md:h-[500px] overflow-hidden rounded-2xl group">
              {/* Background Image with Overlay */}
              {testimonial.eventImage ? (
                <img
                  src={testimonial.eventImage}
                  alt={testimonial.company}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-eventflow-primary/40 to-eventflow-base/40"></div>
              )}

              {/* Premium Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-eventflow-black/95 via-eventflow-black/60 to-eventflow-black/30 backdrop-blur-sm"></div>

              {/* Content - positioned at bottom */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full">
                {/* Large Decorative Quote Mark */}
                <div className="mb-6 opacity-40">
                  <svg className="h-20 w-20 text-eventflow-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5C1.72 0 0 2.5 0 5c0 2 .75 6 1 8v6c0 1 .2 3 1 4h2m16 0c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5C21.72 0 20 2.5 20 5c0 2 .75 6 1 8v6c0 1 .2 3 1 4h2" />
                  </svg>
                </div>

                {/* Quote Text - Large and Elegant */}
                <p className="text-2xl md:text-3xl font-light italic mb-8 text-white leading-relaxed max-w-2xl">
                  {testimonial.quote}
                </p>

                {/* Stars */}
                {testimonial.rating && (
                  <div className="mb-6 flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                )}

                {/* Author Section - Avatar + Info */}
                <div className="flex items-center gap-5">
                  {/* Large Avatar */}
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-20 w-20 rounded-full object-cover ring-4 ring-white/20 transition-transform duration-500 group-hover:ring-eventflow-primary/40 flex-shrink-0"
                  />

                  {/* Author Info */}
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-white/80">{testimonial.role}</p>
                    <p className="text-sm text-eventflow-primary">{testimonial.company}</p>
                  </div>
                </div>
              </div>

              {/* Subtle Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons - Positioned outside */}
      <button
        className="testimonial-button-prev absolute -left-16 md:left-0 top-1/2 -translate-y-1/2 z-10 md:absolute md:left-4 p-3 rounded-full bg-eventflow-primary/20 hover:bg-eventflow-primary/40 transition-all duration-300 active:scale-95 hover:scale-110"
        aria-label="Previous testimonial"
        type="button"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="testimonial-button-next absolute -right-16 md:right-0 top-1/2 -translate-y-1/2 z-10 md:absolute md:right-4 p-3 rounded-full bg-eventflow-primary/20 hover:bg-eventflow-primary/40 transition-all duration-300 active:scale-95 hover:scale-110"
        aria-label="Next testimonial"
        type="button"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="testimonial-swiper-pagination mt-8 flex justify-center gap-2"></div>

      <style>{`
        .testimonials-carousel {
          padding: 0;
          width: 100%;
        }

        .testimonial-swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .testimonial-swiper-pagination .swiper-pagination-bullet {
          background-color: rgba(74, 10, 180, 0.3);
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          margin: 0 6px;
        }

        .testimonial-swiper-pagination .swiper-pagination-bullet-active {
          background-color: #4a0ab4;
          width: 36px;
          border-radius: 6px;
          box-shadow: 0 0 20px rgba(74, 10, 180, 0.5);
        }

        @media (max-width: 768px) {
          .testimonial-button-prev,
          .testimonial-button-next {
            width: 40px;
            height: 40px;
            position: relative;
          }
        }
      `}</style>
    </div>
  );
}
