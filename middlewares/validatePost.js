const codes = require('../helpers/codes');
const messages = require('../helpers/messages');
const { User, BlogPost, Category, PostsCategories } = require('../models');

const titleValidate = async (req, res, next) => {
  const { title } = req.body;

  if (title === undefined) {
    return res.status(codes.badRequest).json({ message: messages.titleRequired });
  }

  next();
};

const contentValidate = async (req, res, next) => {
  const { content } = req.body;

  if (content === undefined) {
    return res.status(codes.badRequest).json({ message: messages.contentRequired });
  }

  next();
};

const categoriesValidate = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds === undefined) {
    return res.status(codes.badRequest).json({ message: messages.categoryIdRequired });
  }
  // saber todos ids de categorias
  // saber todos ids do body
  // determinar se os ids do body sao ids de categorias validos
  const ids = categoryIds.map((id) => Category.findByPk(id));

  const promisses = await Promise.all(ids);

  const isExistCategoryId = promisses.some((category) => !category);

  if (isExistCategoryId) {
    return res.status(codes.badRequest).json({ message: messages.categoryIdsNotFound });
  }

  next();
};

const createPost = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;

  const { id } = await User.findOne({ where: { email } });
  const post = await BlogPost.create({ title, content, userId: id });

  categoryIds.forEach(async (category) => {
    await PostsCategories.create({ postId: post.id, categoryId: category });
  });

  return res.status(codes.created).json(post);
};

module.exports = {
  titleValidate,
  contentValidate,
  categoriesValidate,
  createPost,
};