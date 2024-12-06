const express = require('express');
const router = express.Router();
const {
    startWorkout,
    addExerciseToWorkout,
    updateExerciseInWorkout,
    getCurrentWorkout,
    saveCurrentWorkout,
    getStoredWorkouts,
    getWorkoutById,
} = require('../controllers/workoutController');
const Exercise = require('../models/ExerciseDB');

// Start a new workout
router.post('/workouts/start', startWorkout);

// Add an exercise to the current workout
router.post('/workouts/addExercise', addExerciseToWorkout);

// Update exercise details in the current workout
router.put('/workouts/updateExercise', updateExerciseInWorkout);

// Get the current workout
router.get('/workouts/current', getCurrentWorkout);

// Save the current workout to the database
router.post('/workouts/save', saveCurrentWorkout);

// Get all stored workouts
router.get('/workouts', getStoredWorkouts);

// Get a specific workout by ID
router.get('/workouts/:id', getWorkoutById);

// === NEW ROUTES === //

// Get a list of muscle groups (hard-coded for now)
router.get('/muscle-groups', (req, res) => {
    const muscleGroups = ['Back', 'Chest', 'Triceps', 'Biceps', 'Calves', "Hamstrings", "Quads"]; // Hard-coded list of muscle groups
    res.json(muscleGroups); // Return the hard-coded muscle groups
});

// Get exercises for a specific muscle group
router.get('/exercises/:muscleGroup', async (req, res) => {
    try {
        const exercises = await Exercise.find({ muscle_group: req.params.muscleGroup });
        res.json(exercises); // Return exercises for the selected muscle group
    } catch (err) {
        console.error('Error fetching exercises:', err);
        res.status(500).json({ message: 'Error fetching exercises' });
    }
});

module.exports = router;