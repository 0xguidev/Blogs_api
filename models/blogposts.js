const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryId: { type: DataTypes.INTEGER, foreingKey: true },
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Category,
      { foreignKey: 'category_id', as: 'category' });
  };

  return BlogPosts;
};

module.exports = BlogPost;