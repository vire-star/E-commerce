// store/userStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserStore = create(
  devtools(
    (set) => ({
      user: null,
      
      setUser: (userData) => set({ user: userData }),
      
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'UserStore', // DevTools me naam
    }
  )
);
