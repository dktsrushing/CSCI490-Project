class Workout {
    constructor(date, exercises = []) {
        this.date = date; // Date of the workout
        this.exercises = exercises; // Array of exercises (each an object with details like sets/reps/weight)
    }

    // Add an exercise to the workout
    addExercise(exercise) {
        this.exercises.push({
            exerciseId: exercise.exerciseId, // Reference to the Exercise
            name: exercise.name,            // Exercise name (e.g., "Bench Press")
            muscleGroup: exercise.muscleGroup, // Muscle group (e.g., "Chest")
            sets: exercise.sets || 0,       // Default sets
            reps: exercise.reps || 0,       // Default reps
            weight: exercise.weight || 0,   // Default weight
        });
    }

    // Update sets/reps/weights for an existing exercise
    updateExercise(exerciseId, updates) {
        const exercise = this.exercises.find(ex => ex.exerciseId === exerciseId);
        if (!exercise) {
            throw new Error('Exercise not found in this workout');
        }
        Object.assign(exercise, updates); // Merge updates into the exercise
    }

    // Calculate total weight lifted for the workout
    totalWeight() {
        return this.exercises.reduce((total, exercise) => {
            return total + (exercise.sets * exercise.reps * exercise.weight);
        }, 0);
    }

    // Export workout as an object
    toObject() {
        return {
            date: this.date,
            exercises: this.exercises,
        };
    }
}

module.exports = Workout;