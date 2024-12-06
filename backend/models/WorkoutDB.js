const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    date: { type: Date, required: true }, // Date of the workout
    exercises: [
        {
            exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
            name: String,
            muscleGroup: String,
            sets: Number,
            reps: Number,
            weight: Number,
        },
    ],
});

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

class WorkoutDB {
    static async create(data) {
        const workout = new WorkoutModel(data);
        return workout.save();
    }

    static async getAll() {
        return WorkoutModel.find();
    }

    static async getById(id) {
        return WorkoutModel.findById(id).populate('exercises.exerciseId');
    }

    static async deleteById(id) {
        return WorkoutModel.findByIdAndDelete(id);
    }
}

module.exports = WorkoutDB;