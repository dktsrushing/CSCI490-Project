const Exercise = require('../models/ExerciseDB');

const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.getAll();
        res.json(exercises);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching exercises' });
    }
};

const createExercise = async (req, res) => {
    try {
        const newExercise = await Exercise.create(req.body);
        res.status(201).json(newExercise);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding exercise' });
    }
};

const deleteExercise = async (req, res) => {
    try {
        const deletedExercise = await Exercise.deleteById(req.params.id);
        if (!deletedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting exercise' });
    }
};

const updateExercise = async (req, res) => {
    try {
        const updatedExercise = await Exercise.updateById(req.params.id, req.body);
        if (!updatedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(updatedExercise);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating exercise' });
    }
};

// Get exercises by muscle group
const getExercisesByMuscleGroup = async (req, res) => {
    const muscleGroup = req.params.muscleGroup; // Get muscle group from the request params
    try {
        // Fetch exercises from the database using the muscle group
        const exercises = await Exercise.getByMuscleGroup(muscleGroup);
        
        // Log the exercises to the console (for testing purposes)
        console.log(exercises);

        // Send the exercises in the response
        res.json(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ error: 'Error fetching exercises' });
    }
};

module.exports = {
    getExercises,
    createExercise,
    deleteExercise,
    updateExercise,
    getExercisesByMuscleGroup,
};