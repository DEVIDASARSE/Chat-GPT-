import { useEffect, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { chatAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useChat = () => {
  const {
    chats,
    activeChat,
    messages,
    isLoading,
    isAiTyping,
    setChats,
    setActiveChat,
    setMessages,
    addMessage,
    setLoading,
    setAiTyping,
    clearMessages
  } = useChatStore();

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getChats();
      setChats(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  }, [setChats, setLoading]);

  const createNewChat = useCallback(async (firstMessage) => {
    try {
      setLoading(true);
      const response = await chatAPI.createChat({ title: firstMessage.slice(0, 40) });
      const newChat = response.data.data || response.data;
      
      setChats([newChat, ...chats]);
      setActiveChat(newChat);
      
      return newChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat');
      return null;
    } finally {
      setLoading(false);
    }
  }, [chats, setChats, setActiveChat, setLoading]);

  const sendMessage = useCallback(async (content, chatId) => {
    if (!content.trim()) return;

    try {
      // Add user message to UI immediately
      addMessage({
        _id: Date.now().toString(),
        senderId: 'user',
        content: content.trim(),
        createdAt: new Date().toISOString(),
        isAi: false
      });

      // Emit to socket for real-time response
      // This is handled by useSocket hook
      setAiTyping(true);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  }, [addMessage, setAiTyping]);

  const deleteChat = useCallback(async (chatId) => {
    try {
      await chatAPI.deleteChat(chatId);
      setChats(chats.filter(c => c._id !== chatId));
      if (activeChat?._id === chatId) {
        clearMessages();
        setActiveChat(null);
      }
      toast.success('Chat deleted');
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat');
    }
  }, [chats, activeChat, setChats, clearMessages, setActiveChat]);

  const loadChatMessages = useCallback(async (chatId) => {
    try {
      setLoading(true);
      const response = await chatAPI.getMessages(chatId);
      setMessages(response.data.data || response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [setMessages, setLoading]);

  return {
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
  };
};
