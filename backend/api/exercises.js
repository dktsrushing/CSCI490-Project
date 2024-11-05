// api/exercises.js
const express = require('express');
const router = express.Router();
const Exercise = require('../models/ExerciseDB'); // Updated to point to ExerciseDB.js

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

// POST /exercises - Insert a new exercise
router.post('/exercises', async (req, res) => {
    try {
        const newExercise = new Exercise({
            exercise_name: req.body.exercise_name,
            muscle_group: req.body.muscle_group
        });
        await newExercise.save(); // Save the new exercise to the database
        res.status(201).json(newExercise); // Send back the saved exercise as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding exercise' });
    }
});


// DELETE /exercises/:id - Delete an exercise by ID
router.delete('/exercises/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get exercise ID from URL params
        const deletedExercise = await Exercise.findByIdAndDelete(id);
        
        if (!deletedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting exercise' });
    }
});

module.exports = router;