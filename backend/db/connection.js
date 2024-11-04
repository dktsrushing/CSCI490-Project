// db/connection.js
const mongoose = require('mongoose');

const uri = "mongodb+srv://software2projrtz:test123123@workoutdb.uoqlk.mongodb.net/?retryWrites=true&w=majority&appName=WorkoutDB";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose;