// backend/index.js
const express = require('express');
const mongoose = require('./db/connection'); // Database connection
const exercisesRoute = require('./api/exercises');
const workoutEntriesRoute = require('./api/workoutEntries');
const workoutRoutes = require('./api/workouts');

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api', exercisesRoute);
app.use('/api', workoutEntriesRoute);
app.use('/api', workoutRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server }; // Export both the app and server instance
