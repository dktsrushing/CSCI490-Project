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

module.exports = {
    getExercises,
    createExercise,
    deleteExercise,
    updateExercise,
};