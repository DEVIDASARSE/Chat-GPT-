import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Sidebar from '../components/sidebar/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { useChat } from '../hooks/useChat';
import { useSocket } from '../hooks/useSocket';
import { initSocket, disconnectSocket } from '../services/socket';

const ChatPage = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { user, isAuthenticated, token } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const {
    chats,
    activeChat,
    messages,
    isLoading,
    isAiTyping,
    fetchChats,
    createNewChat,
    sendMessage,
    deleteChat,
    loadChatMessages,
    setActiveChat,
    clearMessages
  } = useChat();

  const { emitMessage } = useSocket();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Initialize socket connection
    if (token) {
      initSocket(token);
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, navigate, token]);

  // Load chats on mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Load specific chat if chatId is provided
  useEffect(() => {
    if (chatId && chats.length > 0) {
      const chat = chats.find(c => c._id === chatId);
      if (chat) {
        setActiveChat(chat);
        loadChatMessages(chatId);
      }
    }
  }, [chatId, chats]);

  const handleNewChat = async () => {
    try {
      const defaultMessage = 'New Chat';
      const newChat = await createNewChat(defaultMessage);
      if (newChat) {
        setMobileOpen(false);
        navigate(`/chat/${newChat._id}`);
      }
    } catch (error) {
      toast.error('Failed to create new chat');
    }
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    loadChatMessages(chat._id);
    navigate(`/chat/${chat._id}`);
    setMobileOpen(false);
  };

  const handleDeleteChat = async (chatId) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      await deleteChat(chatId);
      if (activeChat?._id === chatId) {
        navigate('/chat');
        clearMessages();
      }
    }
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message
    await sendMessage(content, activeChat?._id);

    // Emit to socket for AI response
    if (activeChat?._id) {
      emitMessage(content, activeChat._id);
    } else {
      // Create new chat if needed
      const newChat = await createNewChat(content);
      if (newChat) {
        navigate(`/chat/${newChat._id}`);
        emitMessage(content, newChat._id);
      }
    }
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/login');
    disconnectSocket();
  };

  return (
    <motion.div
      className="flex h-screen bg-devbot-bg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        user={user}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onLogout={handleLogout}
        isLoading={isLoading}
        isMobileOpen={!mobileOpen}
        onMobileToggle={() => setMobileOpen(!mobileOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow
          messages={messages}
          isAiTyping={isAiTyping}
          onSendMessage={handleSendMessage}
          chatTitle={activeChat?.title || 'New Conversation'}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default ChatPage;
