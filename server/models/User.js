import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware untuk mengenkripsi password sebelum menyimpan
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            // Enkripsi password menggunakan bcrypt
            this.password = await bcrypt.hash(this.password, 10); // 10 adalah jumlah salt rounds
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

// Ubah menjadi export default
export default User;



// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// // Hash password sebelum menyimpan
// UserSchema.pre('save', async function (next) {
//     try {
//         if (!this.isModified('password')) return next();
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error); // Memastikan error diteruskan ke middleware error handler
//     }
// });

// module.exports = mongoose.model('User', UserSchema);
