const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require("cors");
const path = require("path")
const userRoutes = require('./routes/userRoutes');
const quizeRoutes = require('./routes/quizeRoutes');
const errorHandler = require('./utils/errorHandler')



const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));


   

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => {console.log('Connected to MongoDB')})
.catch(err => {console.log('Failed to connect to MongoDB', err)});

app.use('/user', userRoutes);
app.use('/quiz', quizeRoutes);

app.use(errorHandler);




app.get('/health', (req, res) => {
    // res.send
    res.json({
        message: 'Quizzie  API is working fine',
        status: 'Working fine',
        date: new Date().toLocaleDateString()
    });
});

// REDIRECT PAGE TO 404
app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Error loading page',
        status: 'Error',
    });
});
//localhost:3000/healt


app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});