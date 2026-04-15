import { create } from 'zustand';

export const useAuthStore = create((set) => {
  // Load from localStorage on init
  const savedToken = localStorage.getItem('devbot_token');
  const savedUser = localStorage.getItem('devbot_user');

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken,
    isAuthenticated: !!savedToken,

    login: (user, token) => {
      localStorage.setItem('devbot_token', token);
      localStorage.setItem('devbot_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem('devbot_token');
      localStorage.removeItem('devbot_user');
      set({ user: null, token: null, isAuthenticated: false });
    },

    hydrate: () => {
      const token = localStorage.getItem('devbot_token');
      const user = localStorage.getItem('devbot_user');
      if (token && user) {
        set({
          token,
          user: JSON.parse(user),
          isAuthenticated: true
        });
      }
    }
  };
});
