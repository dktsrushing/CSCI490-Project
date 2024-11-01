// models/Exercise.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    exercise_name: String,
    muscle_group: String,
});

module.exports = mongoose.model('Exercise', ExerciseSchema, 'Team8_Exercises'); // Explicitly specify the collection name