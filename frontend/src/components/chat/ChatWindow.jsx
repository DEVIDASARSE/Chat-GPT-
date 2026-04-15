import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import MessageInput from './MessageInput';
import Avatar from '../ui/Avatar';

const ChatWindow = ({
  messages = [],
  isAiTyping = false,
  onSendMessage,
  chatTitle = 'New Conversation',
  isLoading = false
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-devbot-bg">
      {/* Header */}
      <motion.div
        className="sticky top-0 border-b border-devbot-border bg-devbot-bg/80 backdrop-blur-md px-6 py-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="font-heading font-semibold text-devbot-text text-lg">
            {chatTitle}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-devbot-cyan animate-pulse" />
          <span className="text-sm text-devbot-muted">Gemini 2.0 Flash</span>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
        {isEmpty ? (
          <motion.div
            className="h-full flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Avatar isAi size="lg" />
            </motion.div>
            
            <h2 className="text-xl font-heading font-semibold text-devbot-text mb-2">
              Hello! I'm DevBot 👋
            </h2>
            <p className="text-devbot-muted max-w-xs mb-8">
              Your AI assistant powered by Gemini. Ask me anything.
            </p>

            {/* Suggestion Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              {[
                'Explain quantum computing',
                'Write a Python function',
                'Help me debug my code',
                "What's the meaning of life?"
              ].map((suggestion, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSendMessage(suggestion)}
                  className="bg-devbot-surface border border-devbot-border rounded-lg px-4 py-3 text-sm text-devbot-text hover:border-devbot-purple hover:bg-devbot-surface/80 transition-all text-left"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={message._id || index}
                message={message}
                index={index}
              />
            ))}
            {isAiTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSend={onSendMessage}
        disabled={isLoading}
        isLoading={isAiTyping}
      />
    </div>
  );
};

export default ChatWindow;
