const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function makeOTP() { return String(Math.floor(100000 + Math.random() * 900000)); }

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if ((!email && !phone) || !password || !name) return res.status(400).json({ message: 'Missing fields' });
  const exists = await User.findOne({ $or: [{ email }, { phone }] });
  if (exists) return res.status(409).json({ message: 'User exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const otpCode = makeOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const user = await User.create({ name, email, phone, passwordHash, otpCode, otpExpiresAt });
  res.status(201).json({ message: 'Registered. Verify OTP.', otpForDemo: otpCode, userId: user._id });
};

exports.verifyOTP = async (req, res) => {
  const { userId, otpCode } = req.body;
  const user = await User.findById(userId);
  if (!user || user.otpCode !== otpCode || user.otpExpiresAt < new Date()) return res.status(400).json({ message: 'Invalid OTP' });
  user.isVerified = true; user.otpCode = undefined; user.otpExpiresAt = undefined; await user.save();
  res.json({ message: 'OTP verified' });
};

exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.isVerified) return res.status(403).json({ message: 'Verify OTP first' });
  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
};
