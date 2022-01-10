const { User } = require('../models');
const codes = require('../helpers/codes');
const messages = require('../helpers/messages');
const tokenGenerate = require('../helpers/tokenGenerate');

const emailValidate = async (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(codes.badRequest).json({ message: messages.emailRequired });
  }
  if (email === '') {
    return res.status(codes.badRequest).json({ message: messages.emailEmpty });
  }

  const result = await User.findOne({ where: { email } });
  if (!result) {
     return res.status(codes.badRequest).json({ message: messages.invalidField });
  }
  next();
};

const passwordValidate = async (req, res, next) => {
  const { email, password } = req.body;

  if (password === undefined) {
    return res.status(codes.badRequest).json({ message: messages.passwordRequired });
  }

  if (password === '') {
    return res.status(codes.badRequest).json({ message: messages.passwordEmpty });
  }

  const result = await User.findOne({ where: { email } });
  if (!result || result.password !== password) {
     return res.status(codes.badRequest).json({ message: messages.invalidField });
  }

  next();
};

const createToken = (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerate({ email, password });
  
  return res.status(codes.ok).json({ token });
};

module.exports = {
  emailValidate,
  passwordValidate,
  createToken,
};
