const { User } = require('../models');
const codes = require('../helpers/codes');
const messages = require('../helpers/messages');
const tokenGenerate = require('../helpers/tokenGenerate');

const nameMinLen = 8;
const passMinLen = 6;

const displayNameValidate = (req, res, next) => {
  try {
    const { displayName } = req.body;
  
    if (!displayName) return res.status(codes.badRequest).json({ message: messages.displayName });
  
    if (displayName.length < nameMinLen) {
      return res.status(codes.badRequest).json({ message: messages.displayName });
    }
  } catch (err) {
    console.log(err.message);
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
  try {
    const { password } = req.body;
  
    if (!password) return res.status(codes.badRequest).json({ message: messages.passwordRequired });
    if (password.length < passMinLen) {
      return res.status(codes.badRequest).json({ message: messages.passwordLength });
    }
  } catch (err) {
    console.log(err.message);
  }

  next();
};

const createUser = async (req, _res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });
  } catch (err) {
    console.log(err.message);
  }

  next();
};

const createToken = (req, res) => {
  try {
  const { displayName, email, password, image } = req.body;
  const token = tokenGenerate({ displayName, email, password, image });
  
  return res.status(codes.created).json({ token });
  } catch (e) {
    console.log(e.message);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await User.findAll();

    return res.status(codes.ok).json(users);
  } catch (e) {
    console.log(e.message);
  }
  next();
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(codes.notFound).json({ message: messages.userNotExist });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  displayNameValidate,
  emailValidate,
  passwordValidate,
  createUser,
  createToken,
  getUsers,
  getUserById,
};