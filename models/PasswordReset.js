const mongoose = require('../database/db');
const { Schema } = require('mongoose');

const PasswordResetSchema = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  token: { type: String, required: true, unique: true },
  is_completed: { type: Boolean, default: false },
  expires_at: { type: Date, required: true },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);
