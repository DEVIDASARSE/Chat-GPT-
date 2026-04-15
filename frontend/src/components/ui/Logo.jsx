import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', withText = true, animated = true }) => {
  const sizes = {
    sm: { logo: 24, text: 16 },
    md: { logo: 32, text: 20 },
    lg: { logo: 48, text: 24 }
  };

  const logoVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };

  const content = (
    <div className="flex items-center gap-3">
      <motion.div
        className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-devbot-purple to-devbot-cyan flex items-center justify-center"
        variants={logoVariants}
        initial="rest"
        whileHover={animated ? "hover" : "rest"}
      >
        <span className="font-heading font-bold text-white text-lg">D</span>
        <svg
          className="absolute inset-1 opacity-30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      </motion.div>
      {withText && (
        <div>
          <h1 className="font-heading font-bold text-lg gradient-text leading-tight">
            DevBot
          </h1>
          <p className="text-xs text-devbot-muted">AI Assistant</p>
        </div>
      )}
    </div>
  );

  return animated ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  ) : (
    content
  );
};

export default Logo;
