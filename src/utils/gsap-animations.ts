import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Fade In + Slide Up animation
 * Perfect for section titles and content reveal
 */
export const fadeInUp = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Stagger animation for multiple elements
 * Great for card grids, lists, etc
 */
export const staggerFadeInUp = (selector: string, staggerDelay = 0.1) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Parallax effect for background images
 * Movement based on scroll position
 */
export const parallax = (selector: string, speed = 0.5) => {
  gsap.to(selector, {
    y: window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: selector,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      markers: false,
    },
  });
};

/**
 * Reveal on scroll - width expansion
 * Great for horizontal divider lines, emphasis bars
 */
export const revealWidth = (selector: string) => {
  gsap.fromTo(
    selector,
    {
      width: '0%',
      opacity: 0,
    },
    {
      width: '100%',
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Scale in effect
 * Good for cards, badges, icons
 */
export const scaleIn = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Text reveal effect - letters appear one by one
 * Premium effect for titles
 */
export const textReveal = (selector: string) => {
  const texts = gsap.utils.toArray<HTMLElement>(selector);

  texts.forEach((text) => {
    const chars = text.textContent?.split('') || [];
    text.textContent = '';

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      text.appendChild(span);
    });

    gsap.fromTo(
      text.querySelectorAll('span'),
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Rotate and fade in - for floating elements
 */
export const rotateIn = (selector: string, delay = 0) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      rotation: -30,
      y: 20,
    },
    {
      opacity: 1,
      rotation: 0,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Counter animation - count from 0 to target
 * Great for statistics
 */
export const countUp = (selector: string, duration = 2) => {
  const elements = gsap.utils.toArray<HTMLElement>(selector);

  elements.forEach((el) => {
    const target = parseFloat(el.textContent?.replace(/\D/g, '') || '0');

    gsap.fromTo(
      { value: 0 },
      { value: target, duration, ease: 'power2.out' },
      {
        onUpdate: function () {
          el.textContent = Math.floor(this.targets()[0].value).toString();
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Hover animation - scale and glow
 * For interactive elements
 */
export const setupHoverAnimation = (selector: string) => {
  const elements = gsap.utils.toArray<HTMLElement>(selector);

  elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        scale: 1.05,
        duration: 0.3,
        overwrite: 'auto',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        overwrite: 'auto',
      });
    });
  });
};

/**
 * Pin element during scroll
 * Keep element fixed while content scrolls
 */
export const pinElement = (selector: string, duration = 500) => {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top top',
      end: `+=${duration}`,
      pin: true,
      pinSpacing: true,
      markers: false,
    },
  });
};

/**
 * Refresh ScrollTriggers
 * Call after DOM changes (like image loads)
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

/**
 * Kill all animations
 * Useful for cleanup
 */
export const killAll = () => {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
