function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

function generateToken() {
  return require('crypto').randomBytes(32).toString('hex');
}

module.exports = { generateOTP, generateToken };
