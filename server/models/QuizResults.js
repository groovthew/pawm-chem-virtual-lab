import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    score: {
        type: Number,
        required: true,
    },
    correctCount: {
        type: Number,
        required: true,
    },
    incorrectCount: {
        type: Number,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});



// Export the model using ES module syntax
export default mongoose.model('QuizResult', quizResultSchema);