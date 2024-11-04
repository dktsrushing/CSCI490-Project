const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://software2projrtz:RTZproj%40@workoutdb.uoqlk.mongodb.net/?retryWrites=true&w=majority&appName=WorkoutDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});