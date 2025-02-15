"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardRouter = void 0;
const express_1 = __importDefault(require("express"));
const flashcard_controller_1 = require("../controllers/flashcard.controller");
const auth_1 = require("../middleware/auth");
exports.flashcardRouter = express_1.default.Router();
exports.flashcardRouter.use(auth_1.authenticate);
exports.flashcardRouter.post('/', flashcard_controller_1.createFlashcard);
exports.flashcardRouter.get('/', flashcard_controller_1.getFlashcards);
exports.flashcardRouter.put('/:id', flashcard_controller_1.updateFlashcard);
exports.flashcardRouter.delete('/:id', flashcard_controller_1.deleteFlashcard);
