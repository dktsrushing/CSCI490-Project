// controllers/AuthController.js

const User = require('../models/User');

class AuthController {
  static showLoginPage(req, res) {
    res.render('login', { error: null });
  }

  static showRegisterPage(req, res) {
    res.render('register', { error: null });
  }

  static async registerUser(req, res) {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('register', { error: 'Username already exists' });
      }
      const hashedPassword = await User.hashPassword(password);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.render('register', { error: 'Error registering new user' });
    }
  }

  static async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.render('login', { error: 'User not found' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.render('login', { error: 'Incorrect password' });
      }

      req.session.userId = user._id;
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.render('login', { error: 'Error logging in user' });
    }
  }
  static logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error logging out');
      }
      res.redirect('/login');
    });
  }

  static ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    }
    res.redirect('/login');
  }

  static async showDashboard(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        throw new Error('User not found');
      }
      res.render('dashboard', { user });
    } catch (error) {
      console.error('Error in showDashboard:', error);
      res.redirect('/login');
    }
  }
}

module.exports = AuthController;
