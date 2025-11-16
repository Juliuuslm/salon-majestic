import React, { useEffect, useRef } from 'react';
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
}

interface Props {
  testimonials: Testimonial[];
  autoplayDelay?: number;
}

export default function TestimonialsCarousel({ testimonials, autoplayDelay = 5000 }: Props) {
  const swiperRef = useRef(null);

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
        ref={swiperRef}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={true}
        loopAdditionalSlides={2}
        navigation={{
          nextEl: '.testimonial-swiper-next',
          prevEl: '.testimonial-swiper-prev',
        }}
        pagination={{
          el: '.testimonial-swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        }}
        className="testimonials-carousel"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card overflow-hidden rounded-lg border border-eventflow-border-dark p-6 transition-all duration-500 hover:shadow-xl hover:shadow-eventflow-primary/30 hover:-translate-y-2 bg-white dark:bg-eventflow-black-dark text-gray-900 dark:text-white h-full flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-eventflow-primary/30 transition-all duration-500 hover:scale-125 hover:ring-eventflow-primary float-bob-y"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role} en <span className="font-medium">{testimonial.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              {testimonial.rating && (
                <div className="mb-4 flex gap-1">{renderStars(testimonial.rating)}</div>
              )}

              <p className="text-gray-700 dark:text-white/90 italic leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <button
        className="testimonial-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-eventflow-primary/20 hover:bg-eventflow-primary/30 dark:hover:bg-eventflow-primary/40 transition-colors duration-300"
        aria-label="Previous testimonial"
      >
        <svg className="h-6 w-6 text-eventflow-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="testimonial-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-eventflow-primary/20 hover:bg-eventflow-primary/30 dark:hover:bg-eventflow-primary/40 transition-colors duration-300"
        aria-label="Next testimonial"
      >
        <svg className="h-6 w-6 text-eventflow-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="testimonial-swiper-pagination mt-8 flex justify-center gap-2"></div>

      <style>{`
        .testimonials-carousel {
          padding: 0 60px;
        }

        .testimonial-swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .testimonial-swiper-pagination .swiper-pagination-bullet {
          background-color: rgba(74, 10, 180, 0.3);
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .testimonial-swiper-pagination .swiper-pagination-bullet-active {
          background-color: #4a0ab4;
          width: 30px;
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .testimonials-carousel {
            padding: 0 40px;
          }

          .testimonial-swiper-prev,
          .testimonial-swiper-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
