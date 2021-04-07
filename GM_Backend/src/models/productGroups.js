module.exports = (sequelize, Sequelize) => {
  const ProductGroups = sequelize.define("productGroups", {
    groupId: {
      type: Sequelize.STRING(5),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });

  return ProductGroups;
};