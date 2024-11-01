// app.js or index.js
const express = require('express');
const mongoose = require('./db/connection'); // Initialize MongoDB connection
const exercisesRoute = require('./api/exercises');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', exercisesRoute); // Use the exercises route under /api

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
