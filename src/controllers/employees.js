const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const pwd = securePassword();

const jwtSecret = process.env.JWT_SECRET;
