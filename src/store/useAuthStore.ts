import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  _id: string;
  walletAddress: string;
  profileImage: string;
  username: string;
  // add other user properties as needed
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
