import { create } from 'zustand';
import axios from 'axios';
import { FlashcardState } from '../types';
import { useAuthStore } from './authStore';

const API_URL = 'http://localhost:3000/api';

export const useFlashcardStore = create<FlashcardState>((set) => ({
  flashcards: [],
  loading: false,

  fetchFlashcards: async () => {
    set({ loading: true });
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('Not authenticated');

      const response = await axios.get(`${API_URL}/flashcards`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      set({ flashcards: response.data });
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    } finally {
      set({ loading: false });
    }
  },

  createFlashcard: async (question: string, answer: string) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('Not authenticated');

    await axios.post(
      `${API_URL}/flashcards`,
      { question, answer },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    useFlashcardStore.getState().fetchFlashcards();
  },

  updateFlashcard: async (id: string, correct: boolean) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('Not authenticated');

    await axios.put(
      `${API_URL}/flashcards/${id}`,
      { correct },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    useFlashcardStore.getState().fetchFlashcards();
  },

  deleteFlashcard: async (id: string) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('Not authenticated');

    await axios.delete(`${API_URL}/flashcards/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    useFlashcardStore.getState().fetchFlashcards();
  },
}));