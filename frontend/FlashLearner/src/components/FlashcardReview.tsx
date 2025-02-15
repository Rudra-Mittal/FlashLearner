import { useState, useEffect } from 'react';
import { useFlashcardStore } from '../store/flashcardStore';
import { motion, AnimatePresence } from 'framer-motion';

export function FlashcardReview() {
  const { flashcards, fetchFlashcards, updateFlashcard } = useFlashcardStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  const currentCard = flashcards[currentIndex];

  const handleAnswer = async (correct: boolean) => {
    if (!currentCard) return;
    
    await updateFlashcard(currentCard._id, correct);
    setShowAnswer(false);
    setIsFlipped(false);
    
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      await fetchFlashcards();
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">
          No cards to review right now!
        </h2>
        <p className="text-gray-500 mt-2">
          Check back later or create new flashcards.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="mb-4 text-center">
        <span className="text-sm text-gray-500">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      <motion.div
        className="relative h-64 cursor-pointer"
        onClick={() => {
          setShowAnswer(!showAnswer);
          setIsFlipped(!isFlipped);
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={showAnswer ? 'answer' : 'question'}
            initial={{ rotateY: isFlipped ? -180 : 0, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 180 : -180, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 backface-hidden"
          >
            <div className="h-full p-6 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-xl text-center">
                {showAnswer ? currentCard.answer : currentCard.question}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handleAnswer(false)}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Incorrect
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Correct
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Currently in Box {currentCard.box}
        </p>
      </div>
    </div>
  );
}