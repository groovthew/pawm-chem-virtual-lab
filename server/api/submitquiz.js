import express from 'express';
import quizResultSchema from '../models/QuizResults.js'; // Pastikan menambahkan .js jika Anda menggunakan ESM


const router = express.Router();

// Endpoint untuk menyimpan hasil kuis
router.post('/submit-quiz', async (req, res) => {
    const { email, score, correctAnswers, incorrectAnswers } = req.body;

    // Validasi data dari frontend
    if (!email || !score || correctAnswers == null || incorrectAnswers == null) {
        return res.status(400).send("Invalid input");
    }

    const quizResult = new quizResultSchema({
        email,
        score,
        correctCount: correctAnswers,
        incorrectCount: incorrectAnswers,
        submittedAt: new Date(),
    });

    try {
        // Simpan ke MongoDB
        await quizResult.save();
        res.status(201).send('Quiz result submitted successfully');
    } catch (error) {
        console.error("Error saving quiz result:", error);
        res.status(500).send('Error saving quiz result');
    }
});

export default router;
