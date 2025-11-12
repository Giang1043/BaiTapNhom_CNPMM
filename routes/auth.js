const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Register route
router.post('/register', (req, res) => {
  const { email, password, fullName, phone } = req.body;

  if (!email || !password || !fullName || !phone) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  auth.registerUser(email, password, fullName, phone, (result) => {
    res.json(result);
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  auth.loginUser(email, password, (result) => {
    if (result.success) {
      res.json(result);
    } else {
      res.status(401).json(result);
    }
  });
});

// Request password reset (send OTP)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  auth.requestPasswordReset(email, (result) => {
    res.json(result);
  });
});

// Verify OTP route
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Email and OTP are required' });
  }

  auth.verifyOTP(email, otp, (result) => {
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  });
});

// Reset password route
router.post('/reset-password', (req, res) => {
  const { email, token, newPassword, confirmPassword } = req.body;

  if (!email || !token || !newPassword || !confirmPassword) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, error: 'Passwords do not match' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
  }

  auth.resetPassword(email, token, newPassword, (result) => {
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  });
});

module.exports = router;
