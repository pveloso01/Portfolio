import type { Variants } from "framer-motion";

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide up animation
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Card hover animation
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Glow effect animation
export const glowHover = {
  rest: { boxShadow: "0 0 0px rgba(0, 0, 0, 0)" },
  hover: {
    boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Typing animation for text
export const typingContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const typingText = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

// Float animation
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

// Pulse animation
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

// Rotate animation
export const rotate = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
};

// Viewport animation options
export const viewportOnce = {
  once: true,
  amount: 0.3,
};

export const viewportRepeat = {
  once: false,
  amount: 0.3,
};
