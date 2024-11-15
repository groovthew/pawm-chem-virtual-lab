import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
const router = express.Router();



// Route untuk login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required.'
        });
    }

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // Bandingkan password dengan hash di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // Generate token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'your_jwt_secret', // Ganti dengan secret key Anda yang lebih aman
            { expiresIn: '1h' } // Token berlaku selama 1 jam
        );

        res.status(200).json({
            success: true,
            message: 'Login successful.',
            data: {
                token // Kirimkan token JWT ke pengguna
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occurred during login.',
            error: error.message
        });
    }
});
export default router;