const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); 

const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json()); 

app.use('/api', authRoutes);

mongoose.connect('mongodb://localhost:27017/mattydb')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

    app.get('/', (req, res) => {
        res.send('Welcome to the API!'); 
    });
    
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
