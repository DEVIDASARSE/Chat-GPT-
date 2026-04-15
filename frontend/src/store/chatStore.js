import { create } from 'zustand';

export const useChatStore = create((set) => ({
  chats: [],
  activeChat: null,
  messages: [],
  isLoading: false,
  isAiTyping: false,

  setChats: (chats) => set({ chats }),

  setActiveChat: (chat) => set({ activeChat: chat, messages: [] }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  setMessages: (messages) => set({ messages }),

  setAiTyping: (isTyping) => set({ isAiTyping: isTyping }),

  setLoading: (isLoading) => set({ isLoading }),

  clearMessages: () => set({ messages: [], activeChat: null }),

  reset: () => set({
    chats: [],
    activeChat: null,
    messages: [],
    isLoading: false,
    isAiTyping: false
  })
}));
