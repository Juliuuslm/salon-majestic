import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type AnimationType =
  | 'stagger'
  | 'parallax'
  | 'scaleUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'blurFade'
  | 'rotate'
  | 'bounceIn'
  | 'none';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  distance?: number;
  className?: string;
}

/**
 * Wrapper component to apply GSAP scroll animations to children
 */
const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'stagger',
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  distance = 30,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || animation === 'none') return;

    // Register ScrollTrigger plugin on client
    if (!gsap.plugins.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const el = ref.current;
    const animateChildren = el.querySelectorAll('[data-animate]');

    switch (animation) {
      case 'stagger':
        gsap.to(animateChildren, {
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
        gsap.set(animateChildren, { opacity: 0, y: distance });
        break;

      case 'parallax':
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            scrub: 1,
          },
          y: distance,
          ease: 'none',
        });
        break;

      case 'scaleUp':
        gsap.to(animateChildren, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scale: 1,
          opacity: 1,
          duration,
          stagger,
          ease: 'back.out',
        });
        gsap.set(animateChildren, { opacity: 0, scale: 0.9 });
        break;

      case 'slideInLeft':
        gsap.to(animateChildren, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
        });
        gsap.set(animateChildren, { opacity: 0, x: -distance });
        break;

      case 'slideInRight':
        gsap.to(animateChildren, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
        });
        gsap.set(animateChildren, { opacity: 0, x: distance });
        break;

      case 'slideInUp':
        gsap.to(animateChildren, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
        });
        gsap.set(animateChildren, { opacity: 0, y: distance });
        break;

      case 'slideInDown':
        gsap.to(animateChildren, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
        });
        gsap.set(animateChildren, { opacity: 0, y: -distance });
        break;

      case 'bounceIn':
        gsap.to(animateChildren, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scale: 1,
          opacity: 1,
          duration,
          stagger,
          ease: 'back.out(1.2)',
        });
        gsap.set(animateChildren, { opacity: 0, scale: 0 });
        break;

      default:
        break;
    }

    return () => {
      gsap.killTweensOf(animateChildren);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [animation, duration, stagger, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
