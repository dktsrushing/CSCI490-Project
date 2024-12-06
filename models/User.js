// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

class UserClass {
  // Static method to hash passwords
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // Instance method to compare passwords
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Instance method to update the username
  async updateUsername(newUsername) {
    this.username = newUsername;
    return await this.save();
  }

  // Instance method to update the password
  async updatePassword(newPassword) {
    this.password = await this.constructor.hashPassword(newPassword);
    return await this.save();
  }

  // Instance method to delete the account
  async deleteAccount() {
    return await this.deleteOne();
  }
}

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Load the class methods into the schema
UserSchema.loadClass(UserClass);

// Export the model
module.exports = mongoose.model('User', UserSchema);
