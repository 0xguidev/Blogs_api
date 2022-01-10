require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const codes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  conflict: 409,
};

const messages = {
  displayName: '"displayName" length must be at least 8 characters long',
  emailNotValid: '"email" must be a valid email',
  emailRequired: '"email" is required',
  passwordLength: '"password" length must be 6 characters long',
  passwordRequired: '"password" is required',
  userExist: 'User already registered',
};

const nameMinLen = 8;
const passMinLen = 6;

const displayNameValidate = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName) return res.status(codes.badRequest).json({ message: messages.displayName });

  if (displayName.length < nameMinLen) {
    return res.status(codes.badRequest).json({ message: messages.displayName });
  }

  next();
};

const emailValidate = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(codes.badRequest).json({ message: messages.emailRequired });

    const isExist = await User.findOne({ where: { email } });
    if (isExist) return res.status(codes.conflict).json({ message: messages.userExist });

    const isEmailValid = (value) => new RegExp(/[\w]+@[\w]+\.[\w]{3,}/g).test(value);
    if (!isEmailValid(email)) { 
      return res.status(codes.badRequest).json({ message: messages.emailNotValid });
    }

    next();
  } catch (err) {
    console.log(err.message);
  }
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(codes.badRequest).json({ message: messages.passwordRequired });
  if (password.length < passMinLen) {
    return res.status(codes.badRequest).json({ message: messages.passwordLength });
  }

  next();
};

const tokenGenerate = (user) => {
  const tokenPass = process.env.JWT_SECRET_KEY;
  return jwt.sign({ data: user }, tokenPass);
};

module.exports = {
  displayNameValidate,
  emailValidate,
  passwordValidate,
  tokenGenerate,
};