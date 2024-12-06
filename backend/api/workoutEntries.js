// api/workoutEntries.js
const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// POST /workout_entries - Add workout details for a specific exercise
router.post('/workout_entries', workoutController.createWorkoutEntry);

// GET /workout_entries - Retrieve all workout entries with populated exercise details
router.get('/workout_entries', workoutController.getAllWorkoutEntries);

// DELETE /workout_entries/:id - Delete a workout entry by ID
router.delete('/workout_entries/:id', workoutController.deleteWorkoutEntry);

// PUT /workout_entries/:id - Update a workout entry
router.put('/workout_entries/:id', workoutController.updateWorkoutEntry);

module.exports = router;