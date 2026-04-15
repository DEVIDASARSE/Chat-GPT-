import React, { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import Avatar from '../ui/Avatar';
import NewChatButton from './NewChatButton';
import ChatList from './ChatList';

const Sidebar = ({
  chats = [],
  activeChat = null,
  user = null,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onLogout,
  isLoading = false,
  isMobileOpen = false,
  onMobileToggle
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(!isMobileOpen);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -256, opacity: 0 }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0, pointerEvents: 'none' }
  };

  const content = (
    <>
      {/* Logo */}
      <div className="px-4 py-4 border-b border-devbot-border">
        <Logo withText animated={false} />
      </div>

      {/* New Chat Button */}
      <div className="px-4 py-4">
        <NewChatButton onClick={onNewChat} />
      </div>

      {/* Divider */}
      <div className="border-b border-devbot-border" />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto py-4">
        <p className="px-4 mb-2 text-xs font-semibold text-devbot-muted uppercase tracking-wide">
          Recent Chats
        </p>
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelectChat={onSelectChat}
          onDeleteChat={onDeleteChat}
          isLoading={isLoading}
        />
      </div>

      {/* User Section */}
      <div className="border-t border-devbot-border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar
            name={user?.name || 'User'}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-devbot-text truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-devbot-muted truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-devbot-surface hover:bg-devbot-surface/80 border border-devbot-border rounded-lg text-devbot-text font-medium transition-all duration-200 text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onMobileToggle}
        className="fixed bottom-6 left-6 z-40 md:hidden p-2.5 bg-devbot-purple rounded-lg text-white glow-shadow"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-devbot-bg/80 backdrop-blur-sm z-30 md:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed md:static inset-y-0 left-0 w-64 bg-devbot-surface2 border-r border-devbot-border flex flex-col z-40 md:z-0"
        variants={sidebarVariants}
        initial="open"
        animate={sidebarOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {content}
      </motion.div>
    </>
  );
};

export default Sidebar;
