const WorkoutExercise = require('../models/WorkoutExerciseDB');
const Workout = require('../models/Workout');
const WorkoutDB = require('../models/WorkoutDB');

let currentWorkout = null; // Temporary storage for the active workout

// Start a new workout
const startWorkout = (req, res) => {
    const { date } = req.body;
    currentWorkout = new Workout(date); // Create a new Workout object
    res.status(201).json({ message: 'Workout started', workout: currentWorkout.toObject() });
};

// Add an exercise to the current workout
const addExerciseToWorkout = async (req, res) => {
    try {
        if (!currentWorkout) {
            return res.status(400).json({ message: 'No active workout' });
        }

        const { exerciseId, name, muscleGroup } = req.body;

        // Add exercise to the workout
        currentWorkout.addExercise({
            exerciseId,
            name,
            muscleGroup,
        });

        res.status(200).json({ message: 'Exercise added', workout: currentWorkout.toObject() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding exercise to workout' });
    }
};

// Update exercise details (e.g., sets/reps/weight) in the current workout
const updateExerciseInWorkout = (req, res) => {
    try {
        if (!currentWorkout) {
            return res.status(400).json({ message: 'No active workout' });
        }

        const { exerciseId, sets, reps, weight } = req.body;

        // Update the exercise in the workout
        currentWorkout.updateExercise(exerciseId, { sets, reps, weight });

        res.status(200).json({ message: 'Exercise updated', workout: currentWorkout.toObject() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Error updating exercise' });
    }
};

// Get the current workout
const getCurrentWorkout = (req, res) => {
    if (!currentWorkout) {
        return res.status(404).json({ message: 'No active workout' });
    }
    res.status(200).json(currentWorkout.toObject());
};

// Existing workout entries logic
const createWorkoutEntry = async (req, res) => {
    try {
        const workoutExercise = await WorkoutExercise.create({
            exercise: req.body.exerciseId,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
        });
        res.status(201).json(workoutExercise);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding workout details' });
    }
};

const getAllWorkoutEntries = async (req, res) => {
    try {
        const workoutEntries = await WorkoutExercise.getAllWithExercises();
        res.json(workoutEntries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching workout entries' });
    }
};

const deleteWorkoutEntry = async (req, res) => {
    try {
        const deletedEntry = await WorkoutExercise.deleteById(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Workout entry not found' });
        }
        res.status(200).json({ message: 'Workout entry deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting workout entry' });
    }
};

const updateWorkoutEntry = async (req, res) => {
    try {
        const updatedEntry = await WorkoutExercise.updateById(req.params.id, {
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            exercise: req.body.exerciseId,
        });

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Workout entry not found' });
        }

        res.status(200).json(updatedEntry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating workout entry' });
    }
};

const saveCurrentWorkout = async (req, res) => {
    try {
        if (!currentWorkout) {
            return res.status(400).json({ message: 'No active workout to save' });
        }

        // Save the current workout to the database
        const savedWorkout = await WorkoutDB.create(currentWorkout.toObject());

        // Clear the current workout after saving
        currentWorkout = null;

        res.status(201).json({ message: 'Workout saved successfully', workout: savedWorkout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving workout' });
    }
};

const getStoredWorkouts = async (req, res) => {
    try {
        const workouts = await WorkoutDB.getAll();
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching workouts' });
    }
};

// Add a function to fetch a single workout by ID
const getWorkoutById = async (req, res) => {
    try {
        const workout = await WorkoutDB.getById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching workout' });
    }
};

module.exports = {
    startWorkout,
    addExerciseToWorkout,
    updateExerciseInWorkout,
    getCurrentWorkout,
    createWorkoutEntry,
    getAllWorkoutEntries,
    deleteWorkoutEntry,
    updateWorkoutEntry,
    saveCurrentWorkout,
    getStoredWorkouts,
    getWorkoutById,
};