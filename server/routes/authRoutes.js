// const express = require('express');
// const { signup, login } = require('../controllers/authController');

// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Model Pengguna
const User = require('../models/User');

// Secret key untuk JWT
const JWT_SECRET = 'your_secret_key';

// Rute Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Periksa apakah email terdaftar
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Periksa password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Kirim token dan nama pengguna sebagai respons
        res.json({
            success: true,
            token,
            userName: user.name // Pastikan nama pengguna ada di database
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
