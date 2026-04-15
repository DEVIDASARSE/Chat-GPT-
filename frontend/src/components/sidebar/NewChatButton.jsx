import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const NewChatButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-devbot-surface border border-devbot-border rounded-lg text-devbot-text font-medium hover:border-devbot-purple hover:bg-devbot-surface/80 transition-all animate-pulse-glow"
    >
      <Plus size={18} />
      New Chat
    </motion.button>
  );
};

export default NewChatButton;
