const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mattydb');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;

