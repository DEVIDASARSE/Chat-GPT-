import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

const MessageInput = ({ onSend, disabled = false, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
      setRows(Math.ceil(newHeight / 24));
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      onSend(message);
      setMessage('');
      setRows(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="sticky bottom-0 bg-devbot-bg border-t border-devbot-border px-4 py-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <div className="glass rounded-2xl px-4 py-3 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message DevBot..."
                disabled={disabled || isLoading}
                className="flex-1 bg-transparent text-devbot-text placeholder-devbot-muted outline-none resize-none font-body text-sm"
                rows={rows}
              />
              <button
                type="button"
                className="flex-shrink-0 p-2 text-devbot-muted hover:text-devbot-cyan transition-colors disabled:opacity-50"
                disabled={disabled || isLoading}
                title="Attach file"
              >
                <Paperclip size={18} />
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={disabled || isLoading || !message.trim()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-3 rounded-full transition-all duration-200
              flex items-center justify-center
              ${message.trim() && !disabled && !isLoading
                ? 'bg-gradient-to-r from-devbot-purple to-devbot-cyan text-white glow-shadow hover:scale-110'
                : 'bg-devbot-surface text-devbot-muted opacity-50 cursor-not-allowed'
              }
            `}
            title="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default MessageInput;
