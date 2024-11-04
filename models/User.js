// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

class UserClass {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Attach methods
UserSchema.loadClass(UserClass);

module.exports = mongoose.model('User', UserSchema);
