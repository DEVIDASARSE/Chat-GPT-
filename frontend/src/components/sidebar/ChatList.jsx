import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatRelativeTime, truncateText } from '../../utils/helpers';

const ChatList = ({
  chats = [],
  activeChat = null,
  onSelectChat,
  onDeleteChat,
  isLoading = false
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  if (isLoading) {
    return (
      <div className="space-y-2 px-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-12 rounded-lg" />
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="px-2 py-6 text-center">
        <p className="text-sm text-devbot-muted">No chats yet</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-1 px-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {chats.map((chat) => (
        <motion.button
          key={chat._id}
          variants={item}
          onClick={() => onSelectChat(chat)}
          onMouseEnter={() => setHoveredId(chat._id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`
            w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200
            flex items-center justify-between group
            ${activeChat?._id === chat._id
              ? 'bg-devbot-surface border-l-2 border-devbot-purple'
              : 'hover:bg-devbot-surface/50 border-l-2 border-transparent'
            }
          `}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-devbot-text truncate">
              {truncateText(chat.title || 'Untitled', 35)}
            </p>
            {chat.createdAt && (
              <p className="text-xs text-devbot-muted mt-0.5">
                {formatRelativeTime(chat.createdAt)}
              </p>
            )}
          </div>

          {(hoveredId === chat._id || activeChat?._id === chat._id) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat._id);
              }}
              className="p-1.5 rounded hover:bg-devbot-surface ml-2 flex-shrink-0 text-devbot-muted hover:text-devbot-cyan transition-colors"
              title="Delete chat"
            >
              <Trash2 size={16} />
            </motion.button>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ChatList;
