const mongoose = require('mongoose');

const dbUri = "mongodb+srv://software2projrtz:RTZproj@workoutdb.uoqlk.mongodb.net/?retryWrites=true&w=majority&appName=WorkoutDB";

mongoose.connect(dbUri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = mongoose;