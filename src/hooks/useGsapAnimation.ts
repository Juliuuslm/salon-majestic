import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type AnimationType =
  | 'stagger'
  | 'parallax'
  | 'scaleUp'
  | 'slideIn'
  | 'blurFade'
  | 'rotate'
  | 'clipPath'
  | 'bounceIn';

interface UseGsapAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  distance?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  trigger?: 'scroll' | 'mount';
}

/**
 * Hook to apply GSAP animations to React components
 */
export const useGsapAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: UseGsapAnimationOptions = {}
) => {
  const {
    type = 'stagger',
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    distance = 30,
    direction = 'left',
    trigger = 'scroll',
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Register ScrollTrigger plugin on client
    if (!gsap.plugins.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const el = ref.current;

    if (trigger === 'scroll') {
      switch (type) {
        case 'stagger': {
          const children = el.querySelectorAll('[data-animate]');
          gsap.to(children, {
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: 'power3.out',
          });
          gsap.set(children, { opacity: 0, y: distance });
          break;
        }

        case 'parallax': {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              scrub: 1,
            },
            y: distance,
            ease: 'none',
          });
          break;
        }

        case 'scaleUp': {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            scale: 1,
            opacity: 1,
            duration,
            ease: 'back.out',
          });
          gsap.set(el, { opacity: 0, scale: 0.9 });
          break;
        }

        case 'slideIn': {
          const xValues = {
            left: -distance,
            right: distance,
            up: 0,
            down: 0,
          };
          const yValues = {
            left: 0,
            right: 0,
            up: distance,
            down: -distance,
          };

          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            y: 0,
            opacity: 1,
            duration,
            ease: 'power3.out',
          });
          gsap.set(el, {
            opacity: 0,
            x: xValues[direction],
            y: yValues[direction],
          });
          break;
        }

        case 'bounceIn': {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            scale: 1,
            opacity: 1,
            duration,
            ease: 'back.out(1.2)',
          });
          gsap.set(el, { opacity: 0, scale: 0 });
          break;
        }

        default:
          break;
      }
    } else if (trigger === 'mount') {
      // Animation on component mount
      gsap.from(el, {
        opacity: 0,
        y: distance,
        duration,
        delay,
        ease: 'power2.out',
      });
    }

    return () => {
      // Cleanup
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === ref.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [type, duration, delay, stagger, distance, direction, trigger]);
};

export default useGsapAnimation;
