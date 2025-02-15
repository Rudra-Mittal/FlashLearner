import { useState, useEffect } from 'react';
import { useFlashcardStore } from '../store/flashcardStore';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react'; // Add this import
export function FlashcardReview() {
  const { flashcards, fetchFlashcards, updateFlashcard } = useFlashcardStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [exitDirection, setExitDirection] = useState(0);

  // Motion values for swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const resetCard = () => {
    x.set(0); // Reset the x position
    rotate.set(0); // Reset the rotation
  };

  // Background color indicators for swipe
  const background = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(135deg, rgb(255, 100, 100), rgb(255, 50, 50))",
      "none",
      "linear-gradient(135deg, rgb(100, 255, 100), rgb(50, 255, 50))"
    ]
  );

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  const currentCard = flashcards[currentIndex];

  const handleAnswer = async (correct: boolean) => {
    if (!currentCard) return;
    await updateFlashcard(currentCard._id, correct);
    setShowAnswer(false);
    
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      await fetchFlashcards();
    }
  };

  const handleDragEnd = async (_: any, info: { offset: { x: any; }; }) => {
    const swipe = info.offset.x;
    if (Math.abs(swipe) > 70) {
      const isCorrect = swipe > 0;
      setExitDirection(swipe);
      await handleAnswer(isCorrect);
    } else {
      resetCard(); // Reset card position if swipe wasn't far enough
    }
  };
  const handleButtonClick = async (isCorrect: boolean) => {
    setExitDirection(isCorrect ? 200 : -200);
    await handleAnswer(isCorrect);
  };

  const getGradient = (box: number) => {
    const gradients = {
      1: 'from-rose-400 to-purple-500',
      2: 'from-blue-400 to-emerald-500',
      3: 'from-amber-400 to-pink-500',
      4: 'from-indigo-400 to-cyan-500',
      5: 'from-green-400 to-yellow-500'
    };
    // @ts-ignore
    return gradients[box] || 'from-gray-400 to-gray-500';
  };

  if (!currentCard) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-700">
          No cards to review right now!
        </h2>
        <p className="text-gray-500 mt-2">
          Check back later or create new flashcards.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      
      <motion.div 
        className="mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
      </motion.div>

      <div className="relative h-80">
        <AnimatePresence mode="wait">
          <motion.div
           key={currentIndex}
           className="absolute w-full h-full cursor-grab active:cursor-grabbing"
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           onDragEnd={handleDragEnd}
           style={{ x, rotate, background }}
           initial={{ x: 0, rotate: 0 }} // Add initial values
           animate={{ 
             scale: 1, 
             opacity: 1,
             x: 0, // Always try to center
             rotate: 0 // Always try to reset rotation
           }}
           exit={{ 
             x: exitDirection,
             opacity: 0,
             transition: { duration: 0.2 }
           }}
          >
            <motion.div 
              className={`h-full p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
                         bg-gradient-to-br ${getGradient(currentCard.box)} 
                         flex items-center justify-center relative
                         hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]
                         transition-shadow duration-300`}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={showAnswer ? 'answer' : 'question'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-medium text-white text-center"
                >
                  {showAnswer ? currentCard.answer : currentCard.question}
                </motion.p>
              </AnimatePresence>
              <motion.div 
        className="mt-6 flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
       
      </motion.div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 text-white/70">
                <span>Tap to flip</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex py-2 items-center justify-between space-x-4">
      <button
          onClick={() => handleButtonClick(false)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <XCircle size={20} />
          <span>Incorrect</span>
        </button>
        <button
          onClick={() => handleButtonClick(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
        >
          <CheckCircle size={20} />
          <span>Correct</span>
        </button>
      </div>
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          Box {currentCard.box} • Learning Progress
        </p>
      </motion.div>
    </div>
  );
}