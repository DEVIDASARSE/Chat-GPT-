import { useEffect } from 'react';
import {
  initSocket,
  disconnectSocket,
  getSocket,
  onAiResponse,
  offAiResponse,
  emitMessage as emitSocketMessage
} from '../services/socket';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';

export const useSocket = () => {
  const token = useAuthStore((state) => state.token);
  const addMessage = useChatStore((state) => state.addMessage);
  const setAiTyping = useChatStore((state) => state.setAiTyping);

  useEffect(() => {
    if (!token) return;

    const socket = initSocket(token);

    const handleAiResponse = (data) => {
      setAiTyping(false);
      if (data.message || data.content) {
        addMessage({
          _id: Date.now().toString(),
          senderId: 'ai',
          content: data.message || data.content,
          createdAt: new Date().toISOString(),
          isAi: true
        });
      }
    };

    onAiResponse(handleAiResponse);

    return () => {
      offAiResponse(handleAiResponse);
    };
  }, [token, addMessage, setAiTyping]);

  const emitMessage = (message, chatId) => {
    const socket = getSocket();
    if (socket?.connected) {
      useChatStore.getState().setAiTyping(true);
      emitSocketMessage(message, chatId);
    }
  };

  return { emitMessage };
};
