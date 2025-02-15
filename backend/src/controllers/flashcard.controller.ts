import { Request, Response } from 'express';
import { Flashcard } from '../models/flashcard.model';

// Calculate next review date based on box number
const calculateNextReview = (box: number): Date => {
  const now = new Date();
  switch (box) {
    case 1: return new Date(now.setDate(now.getDate() + 1));  // 1 day
    case 2: return new Date(now.setDate(now.getDate() + 3));  // 3 days
    case 3: return new Date(now.setDate(now.getDate() + 7));  // 1 week
    case 4: return new Date(now.setDate(now.getDate() + 14)); // 2 weeks
    case 5: return new Date(now.setDate(now.getDate() + 30)); // 1 month
    default: return now;
  }
};

export const createFlashcard = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const userId = (req as any).userId;

    const flashcard = await Flashcard.create({
      user: userId,
      question,
      answer,
      nextReview: calculateNextReview(1),
    });

    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating flashcard' });
  }
};

export const getFlashcards = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const now = new Date();

    const flashcards = await Flashcard.find({
      user: userId,
      nextReview: { $lte: now },
    });

    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flashcards' });
  }
};

export const updateFlashcard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { correct } = req.body;
    const userId = (req as any).userId;

    const flashcard = await Flashcard.findOne({ _id: id, user: userId });
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    if (correct) {
      flashcard.box = Math.min(flashcard.box + 1, 5);
    } else {
      flashcard.box = 1;
    }

    flashcard.nextReview = calculateNextReview(flashcard.box);
    await flashcard.save();

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating flashcard' });
  }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const flashcard = await Flashcard.findOneAndDelete({ _id: id, user: userId });
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flashcard' });
  }
};