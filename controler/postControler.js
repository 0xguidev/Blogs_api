const express = require('express');
const Auth = require('../middlewares/validateJWT');
const {
  titleValidate,
  contentValidate,
  categoriesValidate,
  createPost,
} = require('../middlewares/validatePost');

// Category
const router = express.Router();

router.post(
  '/',
  Auth,
  titleValidate,
  contentValidate,
  categoriesValidate,
  createPost,
);

module.exports = router;