// routes/authRoutes.js

const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

// Authentication routes
router.get('/login', AuthController.showLoginPage);
router.post('/login', AuthController.loginUser);

router.get('/register', AuthController.showRegisterPage);
router.post('/register', AuthController.registerUser);

router.get('/logout', AuthController.logoutUser);

// Dashboard route
router.get('/dashboard', AuthController.ensureAuthenticated, AuthController.showDashboard);

// Profile routes
router.get('/profile', AuthController.ensureAuthenticated, AuthController.showProfile);
router.get('/profile/edit', AuthController.ensureAuthenticated, AuthController.showEditProfile);
router.post('/profile/edit', AuthController.ensureAuthenticated, AuthController.updateProfile);
router.post('/profile/delete', AuthController.ensureAuthenticated, AuthController.deleteAccount);

// Default route
router.get('/', (req, res) => res.redirect('/login'));

module.exports = router;
