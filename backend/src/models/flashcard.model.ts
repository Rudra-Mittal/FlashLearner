import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  box: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
  nextReview: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const Flashcard = mongoose.model('Flashcard', flashcardSchema);