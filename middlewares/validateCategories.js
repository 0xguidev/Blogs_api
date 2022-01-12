const { Category } = require('../models');
const codes = require('../helpers/codes');
const messages = require('../helpers/messages');

const nameValidate = async (req, res, next) => {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(codes.badRequest).json({ message: messages.nameRequire });
  }

  next();
};

const createCategory = async (req, res, _next) => {
  const { name } = req.body;
  const createdCategory = await Category.create({ name });
  
  return res.status(codes.created).json(createdCategory);
};

const getAllCategories = async (_req, res, _next) => {
  const allCategories = await Category.findAll();
  return res.status(codes.ok).json(allCategories);
};

module.exports = {
  nameValidate,
  createCategory,
  getAllCategories,
};