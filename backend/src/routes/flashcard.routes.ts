import express from 'express';
import { 
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} from '../controllers/flashcard.controller';
import { authenticate } from '../middleware/auth';

export const flashcardRouter = express.Router();

flashcardRouter.use(authenticate);

flashcardRouter.post('/', createFlashcard);
flashcardRouter.get('/', getFlashcards);
flashcardRouter.put('/:id', updateFlashcard);
flashcardRouter.delete('/:id', deleteFlashcard);