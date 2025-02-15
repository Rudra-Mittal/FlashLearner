"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlashcard = exports.updateFlashcard = exports.getFlashcards = exports.createFlashcard = void 0;
const flashcard_model_1 = require("../models/flashcard.model");
// Calculate next review date based on box number
const calculateNextReview = (box) => {
    const now = new Date();
    switch (box) {
        case 1: return new Date(now.setDate(now.getDate() + 1)); // 1 day
        case 2: return new Date(now.setDate(now.getDate() + 3)); // 3 days
        case 3: return new Date(now.setDate(now.getDate() + 7)); // 1 week
        case 4: return new Date(now.setDate(now.getDate() + 14)); // 2 weeks
        case 5: return new Date(now.setDate(now.getDate() + 30)); // 1 month
        default: return now;
    }
};
const createFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = req.body;
        const userId = req.userId;
        const flashcard = yield flashcard_model_1.Flashcard.create({
            user: userId,
            question,
            answer,
            nextReview: calculateNextReview(1),
        });
        res.status(201).json(flashcard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating flashcard' });
    }
});
exports.createFlashcard = createFlashcard;
const getFlashcards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const now = new Date();
        const flashcards = yield flashcard_model_1.Flashcard.find({
            user: userId,
            nextReview: { $gte: now },
        });
        res.json(flashcards);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching flashcards' });
    }
});
exports.getFlashcards = getFlashcards;
const updateFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { correct } = req.body;
        const userId = req.userId;
        const flashcard = yield flashcard_model_1.Flashcard.findOne({ _id: id, user: userId });
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        if (correct) {
            flashcard.box = Math.min(flashcard.box + 1, 5);
        }
        else {
            flashcard.box = 1;
        }
        flashcard.nextReview = calculateNextReview(flashcard.box);
        yield flashcard.save();
        res.json(flashcard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating flashcard' });
    }
});
exports.updateFlashcard = updateFlashcard;
const deleteFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const flashcard = yield flashcard_model_1.Flashcard.findOneAndDelete({ _id: id, user: userId });
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.json({ message: 'Flashcard deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting flashcard' });
    }
});
exports.deleteFlashcard = deleteFlashcard;
