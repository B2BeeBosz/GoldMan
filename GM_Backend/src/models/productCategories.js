module.exports = (sequelize, Sequelize) => {
  const ProductCategories = sequelize.define("productCategories", {
    categoryId: {
      type: Sequelize.STRING(5),
      primaryKey: true,
      allowNull: false
    },
    nameThai: {
      type: Sequelize.STRING
    },
    nameEng: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });

  return ProductCategories;
};