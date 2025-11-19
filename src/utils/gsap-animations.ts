import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger only on client side
if (typeof window !== 'undefined' && !gsap.plugins.scrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Parallax effect - Elements move at different speeds based on scroll
 */
export const parallaxEffect = (selector: string, distance: number = 50) => {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      scrub: 1,
      markers: false,
    },
    y: distance,
    ease: 'none',
  });
};

/**
 * Stagger animation - Elements appear in sequence
 */
export const staggerReveal = (
  selector: string,
  options?: {
    duration?: number;
    delay?: number;
    stagger?: number;
    distance?: number;
  }
) => {
  const {
    duration = 0.8,
    delay = 0.2,
    stagger = 0.1,
    distance = 30,
  } = options || {};

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    clearProps: 'transform',
  });

  // Initial state
  gsap.set(selector, {
    opacity: 0,
    y: distance,
  });
};

/**
 * Text split animation - Each character reveals individually
 */
export const textRevealAnimation = (
  selector: string,
  options?: {
    duration?: number;
    stagger?: number;
  }
) => {
  const { duration = 0.05, stagger = 0.02 } = options || {};

  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const text = el.textContent || '';
    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      el.appendChild(span);
      return span;
    });

    gsap.to(chars, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
      opacity: 1,
      duration,
      stagger,
      ease: 'power2.out',
    });
  });
};

/**
 * Scale up animation on scroll
 */
export const scaleUpReveal = (
  selector: string,
  options?: {
    duration?: number;
    scale?: number;
  }
) => {
  const { duration = 0.8, scale = 1.05 } = options || {};

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    scale,
    opacity: 1,
    duration,
    ease: 'back.out',
  });

  gsap.set(selector, {
    opacity: 0,
    scale: 0.9,
  });
};

/**
 * Slide in animation from direction
 */
export const slideInAnimation = (
  selector: string,
  options?: {
    direction?: 'left' | 'right' | 'up' | 'down';
    duration?: number;
    distance?: number;
  }
) => {
  const { direction = 'left', duration = 0.8, distance = 100 } = options || {};

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

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    x: 0,
    y: 0,
    opacity: 1,
    duration,
    ease: 'power3.out',
  });

  gsap.set(selector, {
    opacity: 0,
    x: xValues[direction],
    y: yValues[direction],
  });
};

/**
 * Blur fade in animation
 */
export const blurFadeIn = (
  selector: string,
  options?: {
    duration?: number;
    blur?: number;
  }
) => {
  const { duration = 0.8, blur = 10 } = options || {};

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    backdropFilter: 'blur(0px)',
    duration,
    ease: 'power2.out',
  });

  gsap.set(selector, {
    opacity: 0,
    backdropFilter: `blur(${blur}px)`,
  });
};

/**
 * Rotate animation
 */
export const rotateReveal = (
  selector: string,
  options?: {
    duration?: number;
    rotation?: number;
  }
) => {
  const { duration = 1, rotation = 360 } = options || {};

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    rotation,
    opacity: 1,
    duration,
    ease: 'back.out',
  });

  gsap.set(selector, {
    opacity: 0,
    rotation: rotation * -0.5,
  });
};

/**
 * Glow/pulse animation - Infinite loop
 */
export const glowPulseAnimation = (
  selector: string,
  options?: {
    duration?: number;
  }
) => {
  const { duration = 2 } = options || {};

  gsap.to(selector, {
    boxShadow: `0 0 30px rgba(212, 175, 55, 0.8)`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Reveal on scroll with clip path
 */
export const clipPathReveal = (
  selector: string,
  options?: {
    duration?: number;
    direction?: 'horizontal' | 'vertical';
  }
) => {
  const { duration = 0.8, direction = 'horizontal' } = options || {};

  const clipStart =
    direction === 'horizontal'
      ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';

  const clipEnd =
    direction === 'horizontal'
      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    clipPath: clipEnd,
    duration,
    ease: 'power3.out',
  });

  gsap.set(selector, {
    clipPath: clipStart,
  });
};

/**
 * Bounce in animation
 */
export const bounceIn = (
  selector: string,
  options?: {
    duration?: number;
    bounce?: number;
  }
) => {
  const { duration = 0.8, bounce = 1.2 } = options || {};

  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    scale: 1,
    opacity: 1,
    duration,
    ease: `back.out(${bounce})`,
  });

  gsap.set(selector, {
    opacity: 0,
    scale: 0,
  });
};

/**
 * Cleanup function - Kill all animations for a selector
 */
export const killAnimations = (selector: string) => {
  gsap.killTweensOf(selector);
};

/**
 * Refresh ScrollTrigger - Call after content changes
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
