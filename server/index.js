import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
//import rute API
import loginRoute from "./api/login.js";
import signupRoute from "./api/signup.js";
import submitquiz from "./api/submitquiz.js";

// Memuat variabel lingkungan dari .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Import routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/submit-quiz', submitquiz);

// Koneksi MongoDB menggunakan URI dari file .env dengan tambahan opsi TLS dan lainnya
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    
    
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB connection error: ', err);
    });

// Routing untuk halaman utama
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
