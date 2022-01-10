require('dotenv').config();
const jwt = require('jsonwebtoken');
const codes = require('../helpers/codes');
const messages = require('../helpers/messages');

const tokenPass = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, tokenPass);
    const userData = decoded.data;

    return userData;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization === undefined || authorization === '') {
      return res.status(codes.Unauthorized).send({ message: messages.tokenNotFound });
    }

    const user = verifyToken(authorization);
    if (!user) {
      return res.status(codes.Unauthorized).send({ message: messages.TokenExpiredOrInvalid });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).end();
  }
};