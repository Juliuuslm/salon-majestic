import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  dateTime: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  delay?: number;
}

export default function HeroSlider({
  slides,
  autoplay = true,
  delay = 5000,
}: HeroSliderProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  // Animate progress bar
  useEffect(() => {
    if (!progressRef.current) return;

    const progressBar = progressRef.current;
    progressBar.style.animation = 'none';

    // Trigger reflow to restart animation
    void progressBar.offsetWidth;

    progressBar.style.animation = `progress-bar ${delay}ms linear forwards`;

    return () => {
      progressBar.style.animation = 'none';
    };
  }, [activeIndex, delay]);

  // Add progress bar animation to document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progress-bar {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }

      @keyframes hero-slide-in-title {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes hero-slide-in-subtitle {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes hero-slide-in-description {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes hero-parallax-shape-1 {
        0% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-10px) scale(1.05);
        }
        100% {
          transform: translateY(0px) scale(1);
        }
      }

      @keyframes hero-parallax-shape-2 {
        0% {
          transform: translateX(0px) rotate(0deg);
        }
        50% {
          transform: translateX(-15px) rotate(180deg);
        }
        100% {
          transform: translateX(0px) rotate(360deg);
        }
      }

      .hero-subtitle {
        animation: hero-slide-in-subtitle 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        opacity: 0;
      }

      .hero-title {
        animation: hero-slide-in-title 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
        opacity: 0;
      }

      .hero-description {
        animation: hero-slide-in-description 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
        opacity: 0;
      }

      .hero-info {
        animation: hero-slide-in-description 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s forwards;
        opacity: 0;
      }

      .hero-button {
        animation: hero-slide-in-description 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards;
        opacity: 0;
      }

      .hero-shape-1 {
        animation: hero-parallax-shape-1 6s ease-in-out infinite;
      }

      .hero-shape-2 {
        animation: hero-parallax-shape-2 8s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-eventflow-primary to-eventflow-base z-30" ref={progressRef} />

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        autoplay={autoplay ? { delay, disableOnInteraction: false } : false}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          type: 'bullets',
        }}
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-eventflow-black/80 to-eventflow-black/40" />
              </div>

              {/* Decorative Shapes with Parallax */}
              <div className="hero-shape-1 absolute right-20 top-20 h-32 w-32 rounded-full bg-eventflow-primary/20" />
              <div className="hero-shape-2 absolute bottom-32 left-32 h-24 w-24 bg-eventflow-base/30" />

              {/* Content */}
              <div className="container-custom relative z-10 flex h-full items-center">
                <div className="max-w-3xl">
                  <p className="hero-subtitle mb-6 inline-block rounded-full bg-eventflow-base/90 px-6 py-2 text-sm font-medium text-white">
                    {slide.subtitle}
                  </p>

                  <h1 className="hero-title mb-6 font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="hero-description mb-8 max-w-2xl text-lg text-white/90">
                    {slide.description}
                  </p>

                  {/* Event Info */}
                  <ul className="hero-info mb-10 flex flex-wrap gap-6">
                    <li className="flex items-center gap-2 text-white">
                      <svg
                        className="h-5 w-5 text-eventflow-base"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{slide.location}</span>
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <svg
                        className="h-5 w-5 text-eventflow-base"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{slide.dateTime}</span>
                    </li>
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={slide.ctaLink}
                    className="hero-button btn-primary inline-block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="hero-button-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-eventflow-primary hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-eventflow-primary">
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button className="hero-button-next absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-eventflow-primary hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-eventflow-primary">
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex gap-2" />
    </section>
  );
}
