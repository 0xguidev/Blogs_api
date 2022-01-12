const express = require('express');
const {
  nameValidate,
  createCategory,
  getAllCategories,
} = require('../middlewares/validateCategories');
const Auth = require('../middlewares/validateJWT');
// const messages = require('../helpers/messages');

const router = express.Router();

router.get('/',
  Auth,
  getAllCategories);

router.post('/',
  Auth,
  nameValidate,
  createCategory);

module.exports = router;