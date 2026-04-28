const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otpCode: String,
  otpExpiresAt: Date,
});

module.exports = mongoose.model('User', userSchema);
