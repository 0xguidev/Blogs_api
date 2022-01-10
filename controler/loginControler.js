require('dotenv').config();
const express = require('express');

const router = express.Router();

const {
  emailValidate,
  passwordValidate,
  createToken } = require('../middlewares/loginValidate');

router.post(
  '/',
  emailValidate,
  passwordValidate,
  createToken,
);

module.exports = router;