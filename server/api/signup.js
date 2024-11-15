import express from 'express';
import User from '../models/User.js'; 
const router = express.Router();

// Route untuk sign up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required.'
        });
    }

    try {
        // Periksa apakah email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use.'
            });
        }

        // Membuat user baru
        const newUser = new User({ name, email, password });

        // Simpan user ke database
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                email: newUser.email,
                name: newUser.name // Pastikan nama juga disertakan
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occurred during signup.',
            error: error.message
        });
    }
});

export default router;