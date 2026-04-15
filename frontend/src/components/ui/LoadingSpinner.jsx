import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = null, fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const container = (
    <motion.div
      className="flex flex-col items-center justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-devbot-purple border-t-devbot-cyan`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <p className="text-sm text-devbot-muted">{text}</p>}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-devbot-bg/50 backdrop-blur-sm flex items-center justify-center z-50">
        {container}
      </div>
    );
  }

  return container;
};

export default LoadingSpinner;
