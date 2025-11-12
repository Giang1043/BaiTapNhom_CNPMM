const mongoose = require('mongoose');
require('dotenv').config();

// Use MONGO_URI from .env if present; default to root:014789@localhost/ForgotPassword
const defaultUri = 'mongodb://localhost:27017/ForgotPassword';
const mongoUri = process.env.MONGO_URI || defaultUri;

mongoose.set('strictQuery', false);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB:', mongoUri);
}).catch((err) => {
  console.error('MongoDB connection error:', err && err.message ? err.message : err);
});

module.exports = mongoose;
