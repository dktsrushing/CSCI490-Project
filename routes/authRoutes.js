// routes/authRoutes.js

const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.get('/login', AuthController.showLoginPage);
router.post('/login', AuthController.loginUser);

router.get('/register', AuthController.showRegisterPage);
router.post('/register', AuthController.registerUser);

router.get('/logout', AuthController.logoutUser);

router.get('/dashboard', AuthController.ensureAuthenticated, AuthController.showDashboard);

router.get('/', (req, res) => res.redirect('/login'));

module.exports = router;
