// api/workoutEntries.js
const express = require('express');
const router = express.Router();
const WorkoutExercise = require('../models/WorkoutExerciseDB');
const Exercise = require('../models/ExerciseDB');

// POST /workouts - Add workout details for a specific exercise
router.post('/workout_entries', async (req, res) => {
    try {
        const workoutExercise = new WorkoutExercise({
            exercise: req.body.exerciseId, // ID of the referenced exercise
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight
        });
        await workoutExercise.save();
        res.status(201).json(workoutExercise);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding workout details' });
    }
});

// GET /workout_entries - Retrieve all workout entries with populated exercise details
router.get('/workout_entries', async (req, res) => {
    try {
        const workoutEntries = await WorkoutExercise.find().populate('exercise'); // Populate exercise details
        res.json(workoutEntries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching workout entries' });
    }
});

module.exports = router;