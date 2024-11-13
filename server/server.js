const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Jika ingin mengizinkan permintaan dari domain lain

// Import routes
const authRoutes = require('./routes/authRoutes');

// Gunakan route
app.use('/api', authRoutes);

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/mattydb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
