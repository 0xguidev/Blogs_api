const PostsCategorie = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {},
    { timestamps: false });

  PostsCategories.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    Category.belongsToMany(BlogPost, {
      as: 'postId',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategories;
};

module.exports = PostsCategorie;