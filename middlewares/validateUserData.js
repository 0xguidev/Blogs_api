const { User } = require('../models');
const codes = require('../helpers/codes');
const messages = require('../helpers/messages');
const tokenGenerate = require('../helpers/tokenGenerate');

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

const createUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });

  next();
};

const createToken = (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = tokenGenerate({ displayName, email, password, image });
  
  return res.status(codes.created).json({ token });
};

module.exports = {
  displayNameValidate,
  emailValidate,
  passwordValidate,
  createUser,
  createToken,
};