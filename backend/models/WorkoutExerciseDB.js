// models/WorkoutExerciseDB.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutExerciseSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' }, // Reference to an Exercise document
    sets: Number,
    reps: Number,
    weight: Number
});

module.exports = mongoose.model('WorkoutExercise', WorkoutExerciseSchema, 'workout_entries');