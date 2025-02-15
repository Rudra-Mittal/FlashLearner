"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flashcard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const flashcardSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Flashcard = mongoose_1.default.model('Flashcard', flashcardSchema);
