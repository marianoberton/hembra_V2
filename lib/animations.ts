// Animation utilities for Hembra V2.0 - Premium experience
// Performance-optimized animations using transform and opacity only

import { Variants } from 'framer-motion';

// GSAP será importado dinámicamente para evitar SSR issues
let gsap: typeof import('gsap').gsap;
let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;

// Importación dinámica de GSAP
export const initGSAP = async () => {
  if (typeof window !== 'undefined' && !gsap) {
    const GSAPModule = await import('gsap');
    const ScrollTriggerModule = await import('gsap/ScrollTrigger');
    
    gsap = GSAPModule.gsap;
    ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);
  }
  return { gsap, ScrollTrigger };
};

// ========================================
// CORE ANIMATION PRINCIPLES
// ========================================
// 1. Only animate transform and opacity for 60fps
// 2. Use ease-out for natural feeling
// 3. Keep durations under 400ms for responsiveness
// 4. Stagger for elegant cascading effects

// ========================================
// TRANSITION PRESETS
// ========================================

export const transitions = {
  // Smooth pero rápido para interacciones
  quick: { duration: 0.2 },
  
  // Smooth estándar para la mayoría de elementos
  smooth: { duration: 0.4 },
  
  // Slow para transiciones de página
  slow: { duration: 0.6 },
  
  // Bouncy para success states
  bouncy: { 
    duration: 0.6
  },
  
  // Elastic para premium interactions
  elastic: {
    duration: 0.8
  }
};

// ========================================
// PAGE TRANSITION VARIANTS
// ========================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.55, 0, 1, 0.45]
    }
  }
};

// ========================================
// PRODUCT CARD VARIANTS (PREMIUM)
// ========================================

export const productCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.smooth
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: transitions.quick
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const productImageVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.smooth
  }
};

export const productOverlayVariants: Variants = {
  initial: {
    opacity: 0,
    backgroundColor: "rgba(0,0,0,0)"
  },
  hover: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    transition: transitions.quick
  }
};

export const addToCartButtonVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.8
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...transitions.quick, delay: 0.1 }
  }
};

// ========================================
// STAGGER ANIMATIONS (FOR GRIDS)
// ========================================

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

export const gridItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...transitions.smooth,
      delay: index * 0.05
    }
  })
};

// ========================================
// SCROLL REVEAL VARIANTS
// ========================================

export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.smooth
  }
};

export const staggeredScrollVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ========================================
// HEADER/NAVIGATION VARIANTS
// ========================================

export const navItemVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: -20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth
  },
  hover: {
    y: -2,
    transition: transitions.quick
  }
};

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: transitions.quick
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      ...transitions.smooth,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// ========================================
// CART FEEDBACK VARIANTS
// ========================================

export const iconVariants: Variants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: 180,
    transition: transitions.smooth
  }
};

// ========================================
// BUTTON VARIANTS
// ========================================

export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: transitions.quick
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// ========================================
// LOADING VARIANTS
// ========================================

export const loadingSpinnerVariants: Variants = {
  initial: {
    rotate: 0
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const skeletonVariants: Variants = {
  initial: {
    opacity: 0.6
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// ========================================
// HELPER FUNCTIONS
// ========================================

export const createStaggerContainer = (staggerTime: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerTime
    }
  }
});

export const createDelayedVariant = (delay: number = 0) => ({
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.smooth,
      delay
    }
  }
});

// ========================================
// VIEWPORT ANIMATION SETTINGS
// ========================================

export const viewportSettings = {
  once: true,
  margin: "0px 0px -100px 0px",
  amount: 0.2
};

// ========================================
// RESPONSIVE ANIMATION UTILS
// ========================================

export const getReducedMotionVariant = (normalVariant: Variants, reducedVariant?: Variants) => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return reducedVariant || {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.1 } }
    };
  }
  return normalVariant;
};

// ========================================
// ANIMATION PRESETS FOR COMMON USE CASES
// ========================================

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 30 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth
  }
};

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.smooth
  }
};

export const slideInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -50 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: transitions.smooth
  }
};

export const slideInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 50 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: transitions.smooth
  }
};

// ========================================
// GSAP ANIMATION UTILITIES
// ========================================

export const gsapUtils = {
  // Scroll-triggered stagger animation
  scrollStagger: async (selector: string, options = {}) => {
    const { gsap } = await initGSAP();
    
    return gsap.fromTo(selector, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: selector,
          start: "top 80%",
          toggleActions: "play none none reverse",
          ...options
        }
      }
    );
  },

  // Parallax effect
  parallax: async (selector: string, speed = 0.5) => {
    const { gsap } = await initGSAP();
    
    return gsap.to(selector, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: selector,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  },

  // Premium loading sequence
  loadingSequence: async (elements: string[]) => {
    const { gsap } = await initGSAP();
    
    const tl = gsap.timeline();
    
    elements.forEach((element, index) => {
      tl.fromTo(element,
        { 
          opacity: 0, 
          y: 20,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        },
        index * 0.1
      );
    });
    
    return tl;
  },

  // Smooth scroll setup
  initSmoothScroll: async () => {
    const { default: Lenis } = await import('@studio-freight/lenis');
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return lenis;
  }
};

// ========================================
// PERFORMANCE OPTIMIZED ANIMATIONS
// ========================================

export const performanceVariants = {
  // Only animate transform and opacity for 60fps
  fastHover: {
    initial: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.05,
      opacity: 0.9,
      transition: { duration: 0.15 }
    }
  },
  
  // GPU accelerated transforms
  gpuAccelerated: {
    initial: { 
      transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
      opacity: 1
    },
    hover: { 
      transform: "translate3d(0, -8px, 0) scale3d(1.02, 1.02, 1)",
      opacity: 0.95,
      transition: transitions.quick
    }
  }
};

const animationsConfig = {
  transitions,
  viewportSettings,
  pageVariants,
  scrollRevealVariants,
  staggeredScrollVariants,
  productCardVariants,
  productImageVariants,
  productOverlayVariants,
  addToCartButtonVariants,
  navItemVariants,
  mobileMenuVariants,
  containerVariants,
  gridItemVariants,
  buttonVariants,
  iconVariants,
  slideInLeft,
  slideInRight,
  fadeInUp,
  scaleIn,
  gsapUtils,
  performanceVariants,
  initGSAP
};

export default animationsConfig;