// models/WorkoutExerciseDB.js
const mongoose = require('mongoose');

const WorkoutExerciseSchema = new mongoose.Schema({
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    sets: Number,
    reps: Number,
    weight: Number,
});

const WorkoutExerciseModel = mongoose.model('WorkoutExercise', WorkoutExerciseSchema, 'workout_entries');

class WorkoutExercise {
    static async getAllWithExercises() {
        return WorkoutExerciseModel.find().populate('exercise');
    }

    static async create(data) {
        const workoutExercise = new WorkoutExerciseModel(data);
        return workoutExercise.save();
    }


    static async deleteById(id) {
        return WorkoutExerciseModel.findByIdAndDelete(id);
    }


    static async updateById(id, data) {
        return WorkoutExerciseModel.findByIdAndUpdate(id, data, { new: true }); // `new: true` returns the updated document
    }
}

module.exports = WorkoutExercise;