import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Simulación temporal de autenticación
const mockLogin = async (email: string, password: string): Promise<User> => {
  // En producción, esto sería una llamada real a la API
  if (email === 'admin@example.com' && password === 'password') {
    return {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      branchId: '1'
    };
  }
  throw new Error('Invalid credentials');
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const user = await mockLogin(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));