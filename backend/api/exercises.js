const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/exercises', exerciseController.getExercises);
router.post('/exercises', exerciseController.createExercise);
router.delete('/exercises/:id', exerciseController.deleteExercise);
router.put('/exercises/:id', exerciseController.updateExercise);

module.exports = router;