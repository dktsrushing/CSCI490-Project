// tests/exercise.test.js
const request = require('supertest');
const { app, server } = require('../index'); // Import the server instance for cleanup
const mongoose = require('mongoose');

afterAll(async () => {
    // Close the server and MongoDB connection after all tests
    server.close();
    await mongoose.connection.close();
});

describe('POST /api/exercises', () => {
    it('should create a new exercise', async () => {
        const response = await request(app)
            .post('/api/exercises')
            .send({
                exercise_name: 'Test-Test-Test',
                muscle_group: 'Chest'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.exercise_name).toBe('Test-Test-Test');
        expect(response.body.muscle_group).toBe('Chest');
    });
});