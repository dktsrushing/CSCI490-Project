// models/ExerciseDB.js
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    exercise_name: String,
    muscle_group: String,
});

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema, 'Team8_Exercises');

class Exercise {
    static async getAll() {
        return ExerciseModel.find();
    }

    static async create(data) {
        const exercise = new ExerciseModel(data);
        return exercise.save();
    }

    static async deleteById(id) {
        return ExerciseModel.findByIdAndDelete(id);
    }

    static async updateById(id, data) {
        return ExerciseModel.findByIdAndUpdate(id, data, { new: true }); // `new: true` returns the updated document
    }

    static async getByMuscleGroup(muscleGroup) {
        return ExerciseModel.find({ muscle_group: muscleGroup });
    }
}

module.exports = Exercise;