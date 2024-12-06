const Workout = require('../models/Workout');
const Exercise = require('../models/ExerciseDB');

let currentWorkout = null; // Temporary storage for the active workout

// Start a new workout
const startWorkout = (req, res) => {
    const { date } = req.body;
    currentWorkout = new Workout(date);
    res.status(201).json({ message: 'Workout started', workout: currentWorkout.toObject() });
};

// Add an exercise to the current workout
const addExerciseToWorkout = async (req, res) => {
    try {
        if (!currentWorkout) {
            return res.status(400).json({ message: 'No active workout' });
        }

        const { exerciseId } = req.body;

        // Validate exercise exists
        const exercise = await Exercise.getById(exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Add exercise to the workout
        currentWorkout.addExercise({
            exerciseId,
            name: exercise.exercise_name,
            muscleGroup: exercise.muscle_group,
        });

        res.status(200).json({ message: 'Exercise added', workout: currentWorkout.toObject() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding exercise' });
    }
};

// Update exercise details in the current workout
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

module.exports = {
    startWorkout,
    addExerciseToWorkout,
    updateExerciseInWorkout,
    getCurrentWorkout,
};