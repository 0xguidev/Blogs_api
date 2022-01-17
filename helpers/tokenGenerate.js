require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenGenerate = (user) => {
  const tokenPass = process.env.JWT_SECRET;
  return jwt.sign({ data: user }, tokenPass);
};

module.exports = tokenGenerate;