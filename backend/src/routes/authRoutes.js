const express = require('express');
const c = require('../controllers/authController');
const router = express.Router();
router.post('/register', c.register);
router.post('/verify-otp', c.verifyOTP);
router.post('/login', c.login);
module.exports = router;
