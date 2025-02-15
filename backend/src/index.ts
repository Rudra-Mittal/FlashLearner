import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/user.routes';
import { flashcardRouter } from './routes/flashcard.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/flashcards', flashcardRouter);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });