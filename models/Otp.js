const mongoose = require('../database/db');
const { Schema } = require('mongoose');

const OtpSchema = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otp_code: { type: String, required: true },
  expires_at: { type: Date, required: true },
  is_used: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Otp', OtpSchema);
