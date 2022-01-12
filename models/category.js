const Category = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { timestamps: false });

  Categories.associate = (models) => {
    Categories.hasMany(models.BlogPost,
      { foreignKey: 'category_id', as: 'post' });
  };

  return Categories;
};

module.exports = Category;