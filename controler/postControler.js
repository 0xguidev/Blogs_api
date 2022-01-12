const express = require('express');

const router = express.Router();

router.post(
  '/',
  async (req, _res, _next) => {
    const { title, content, categoryId } = req.body;
    console.log(title, content, categoryId);
  },
);

module.exports = router;