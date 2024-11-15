import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Memuat variabel lingkungan dari .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Import routes
import authRoutes from './routes/authRoutes.js';  // Add the .js extension here

app.use('/api', authRoutes);

// Koneksi MongoDB menggunakan URI dari file .env
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Endpoint untuk login (contoh, bisa disesuaikan dengan kebutuhan)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
        success: true,
        token: 'your-auth-token',
        name: user.name // Pastikan properti ini dikembalikan
    });
});

// Routing untuk halaman utama
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Mengimpor dan mendefinisikan model QuizResult
import QuizResult from './models/QuizResults.js'; // Menggunakan import ES6

// Endpoint untuk menyimpan hasil kuis
app.post('/submit-quiz', async (req, res) => {
    const { email, score, correctAnswers, incorrectAnswers } = req.body;

    // Validasi data dari frontend
    if (!email || !score || correctAnswers == null || incorrectAnswers == null) {
        return res.status(400).send("Invalid input");
    }

    const quizResult = new QuizResult({
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

// Endpoint untuk mengambil skor terakhir berdasarkan email
app.get('/previous-score', async (req, res) => {
    console.log("Endpoint '/previous-score' accessed"); // Log akses endpoint

    const { email } = req.query;
    console.log("Received email:", email); // Log email yang diterima

    if (!email) {
        console.log("Email is missing in the query!");
        return res.status(400).json({ success: false, message: 'Email is required!' });
    }

    try {
        const previousResult = await QuizResult.findOne({ email }).sort({ submittedAt: -1 });
        console.log("Previous Result:", previousResult); // Log hasil query

        if (!previousResult) {
            console.log("No previous quiz result found for this email.");
            return res.status(404).json({ success: false, message: 'No previous quiz result found for this email.' });
        }

        res.status(200).json({ success: true, previousScore: previousResult.score });
    } catch (error) {
        console.error("Error fetching previous score:", error);
        res.status(500).json({ success: false, message: 'Error fetching previous score' });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
