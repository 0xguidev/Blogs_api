const express = require('express');
const Auth = require('../middlewares/validateJWT');
const {
  titleValidate,
  contentValidate,
  categoriesValidate,
  createPost,
  findAllPosts,
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

router.get(
  '/',
  Auth,
  findAllPosts,
);

module.exports = router;