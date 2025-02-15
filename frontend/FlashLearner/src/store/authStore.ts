import { create } from 'zustand';
import axios from 'axios';
import { AuthState, User } from '../types';

const API_URL = 'http://localhost:3000/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    const user: User = { email, token: response.data.token };
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  
  register: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/users/register`, { email, password });
    const user: User = { email, token: response.data.token };
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));