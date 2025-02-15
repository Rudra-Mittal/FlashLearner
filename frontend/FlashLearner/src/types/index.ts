export interface User {
  email: string;
  token: string;
}

export interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  box: number;
  nextReview: string;
}

export interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface FlashcardState {
  flashcards: Flashcard[];
  loading: boolean;
  fetchFlashcards: () => Promise<void>;
  createFlashcard: (question: string, answer: string) => Promise<void>;
  updateFlashcard: (id: string, correct: boolean) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
}