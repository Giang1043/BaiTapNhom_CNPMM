const bcrypt = require('bcryptjs');
const { sendOTPEmail } = require('../utils/email');
const { generateOTP, generateToken } = require('../utils/helpers');

const User = require('../models/User');
const Otp = require('../models/Otp');
const PasswordReset = require('../models/PasswordReset');

async function registerUser(email, password, fullName, phone, callback) {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, password: hashedPassword, full_name: fullName, phone });
    await user.save();
    callback({ success: true, message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      callback({ success: false, error: 'Email already registered' });
    } else {
      callback({ success: false, error: err.message });
    }
  }
}

async function loginUser(email, password, callback) {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) return callback({ success: false, error: 'User not found' });
    if (bcrypt.compareSync(password, user.password)) {
      callback({ success: true, user: { id: user._id, email: user.email, full_name: user.full_name } });
    } else {
      callback({ success: false, error: 'Invalid password' });
    }
  } catch (err) {
    callback({ success: false, error: err.message });
  }
}

async function requestPasswordReset(email, callback) {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) return callback({ success: false, error: 'Email not found in system' });

    const otp = generateOTP(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const otpDoc = new Otp({ email, otp_code: otp, expires_at: expiresAt });
    await otpDoc.save();

    const result = await sendOTPEmail(email, otp);
    if (result.success) {
      callback({ success: true, message: 'OTP sent to your email' });
    } else {
      callback({ success: false, error: 'Failed to send OTP' });
    }
  } catch (err) {
    callback({ success: false, error: err.message });
  }
}

async function verifyOTP(email, otp, callback) {
  try {
    const now = new Date();
    const otpDoc = await Otp.findOne({ email, otp_code: otp, is_used: false, expires_at: { $gt: now } });
    if (!otpDoc) return callback({ success: false, error: 'Invalid or expired OTP' });

    otpDoc.is_used = true;
    await otpDoc.save();

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const pr = new PasswordReset({ email, token, expires_at: expiresAt });
    await pr.save();

    callback({ success: true, token, message: 'OTP verified successfully' });
  } catch (err) {
    callback({ success: false, error: err.message });
  }
}

async function resetPassword(email, token, newPassword, callback) {
  try {
    const now = new Date();
    const pr = await PasswordReset.findOne({ email, token, is_completed: false, expires_at: { $gt: now } });
    if (!pr) return callback({ success: false, error: 'Invalid or expired reset token' });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    pr.is_completed = true;
    await pr.save();

    callback({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    callback({ success: false, error: err.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  verifyOTP,
  resetPassword
};
