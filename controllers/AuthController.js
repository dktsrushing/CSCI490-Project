// controllers/AuthController.js

const User = require('../models/User');

class AuthController {
  // Display the login page
  static showLoginPage(req, res) {
    res.render('login', { error: null });
  }

  // Display the registration page
  static showRegisterPage(req, res) {
    res.render('register', { error: null });
  }

  // Handle user registration
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
      console.error('Error in registerUser:', error);
      res.render('register', { error: 'Error registering new user' });
    }
  }

  // Handle user login
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
      console.error('Error in loginUser:', error);
      res.render('login', { error: 'Error logging in user' });
    }
  }

  // Handle user logout
  static logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error in logoutUser:', err);
        return res.status(500).send('Error logging out');
      }
      res.redirect('/login');
    });
  }

  // Middleware to ensure the user is authenticated
  static ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    }
    res.redirect('/login');
  }

  // Display the dashboard
  static async showDashboard(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.redirect('/login');
      }
      res.render('dashboard', { user });
    } catch (error) {
      console.error('Error in showDashboard:', error);
      res.redirect('/login');
    }
  }

  // Display the user's profile
  static async showProfile(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.redirect('/login');
      }
      res.render('profile', { user, error: null });
    } catch (error) {
      console.error('Error in showProfile:', error);
      res.redirect('/login');
    }
  }

  // Display the edit profile page
  static async showEditProfile(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.redirect('/login');
      }
      res.render('editProfile', { user, error: null });
    } catch (error) {
      console.error('Error in showEditProfile:', error);
      res.redirect('/login');
    }
  }

  // Handle profile updates
  static async updateProfile(req, res) {
    const { username, currentPassword, newPassword } = req.body;
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.redirect('/login');
      }
  
      let updated = false;
  
      // Update username if it's different
      if (username && username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.render('editProfile', { user, error: 'Username already exists' });
        }
        await user.updateUsername(username);
        updated = true;
      }
  
      // Update password if provided
      if (currentPassword && newPassword) {
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
          return res.render('editProfile', { user, error: 'Current password is incorrect' });
        }
        await user.updatePassword(newPassword);
        updated = true;
      }
  
      if (updated) {
        res.redirect('/profile');
      } else {
        res.render('editProfile', { user, error: 'No changes were made' });
      }
    } catch (error) {
      console.error('Error in updateProfile:', error);
      res.render('editProfile', { user, error: 'Error updating profile' });
    }
  }

  // Handle account deletion
  static async deleteAccount(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.redirect('/login');
      }
      await user.deleteAccount();
      req.session.destroy((err) => {
        if (err) {
          console.error('Error in deleteAccount:', err);
          return res.status(500).send('Error deleting account');
        }
        res.redirect('/register');
      });
    } catch (error) {
      console.error('Error in deleteAccount:', error);
      res.redirect('/profile');
    }
  }
}

module.exports = AuthController;
