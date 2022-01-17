const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
   });
  BlogPosts.associate = ({ User }) => {
    BlogPosts.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPosts;
};

module.exports = BlogPost;