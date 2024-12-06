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

module.exports = router;