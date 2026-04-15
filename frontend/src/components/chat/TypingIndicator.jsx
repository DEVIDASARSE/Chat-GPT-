import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';

const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 },
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  };

  return (
    <motion.div
      className="flex items-end gap-2 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar isAi size="md" />
      <div className="flex items-center gap-1 bg-devbot-surface border border-devbot-border rounded-2xl px-4 py-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-devbot-cyan"
            variants={dotVariants}
            transition={{
              ...dotVariants.transition,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
