// api/exercises.js
const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// GET /exercises - Fetch all exercises
router.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching exercises' });
    }
});

module.exports = router;