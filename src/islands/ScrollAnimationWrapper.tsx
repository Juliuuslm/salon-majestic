import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animationType?:
    | 'fadeInUp'
    | 'stagger'
    | 'parallax'
    | 'revealWidth'
    | 'scaleIn'
    | 'rotateIn'
    | 'hover'
    | 'none';
  selector?: string;
  delay?: number;
  staggerDelay?: number;
  speed?: number;
  className?: string;
}

/**
 * Scroll Animation Wrapper Component
 * Applies GSAP animations to child elements on scroll
 *
 * Usage:
 * <ScrollAnimationWrapper animationType="stagger" selector=".card">
 *   <div className="card">...</div>
 *   <div className="card">...</div>
 * </ScrollAnimationWrapper>
 */
export default function ScrollAnimationWrapper({
  children,
  animationType = 'fadeInUp',
  selector = '[data-animate]',
  delay = 0,
  staggerDelay = 0.1,
  speed = 0.5,
  className = '',
}: ScrollAnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || animationType === 'none') return;

    // Dynamic import to ensure it only loads on client
    const setupAnimations = async () => {
      try {
        const {
          fadeInUp,
          staggerFadeInUp,
          parallax,
          revealWidth,
          scaleIn,
          rotateIn,
          setupHoverAnimation,
          refreshScrollTriggers,
        } = await import('@utils/gsap-animations');

        const elements = containerRef.current?.querySelectorAll(selector);

        if (!elements || elements.length === 0) {
          console.warn(`ScrollAnimationWrapper: No elements found for selector "${selector}"`);
          return;
        }

        switch (animationType) {
          case 'stagger':
            staggerFadeInUp(selector, staggerDelay);
            break;
          case 'parallax':
            parallax(selector, speed);
            break;
          case 'revealWidth':
            revealWidth(selector);
            break;
          case 'scaleIn':
            scaleIn(selector, delay);
            break;
          case 'rotateIn':
            rotateIn(selector, delay);
            break;
          case 'hover':
            setupHoverAnimation(selector);
            break;
          case 'fadeInUp':
          default:
            fadeInUp(selector, delay);
            break;
        }

        // Refresh ScrollTriggers after animations are set up
        refreshScrollTriggers();
      } catch (error) {
        console.error('Error loading GSAP animations:', error);
      }
    };

    // Wait for DOM to be fully ready
    const timer = setTimeout(() => {
      setupAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, [animationType, selector, delay, staggerDelay, speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
