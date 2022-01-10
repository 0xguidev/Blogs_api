require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenGenerate = (user) => {
  const tokenPass = process.env.JWT_SECRET_KEY;
  return jwt.sign({ data: user }, tokenPass);
};

module.exports = tokenGenerate;