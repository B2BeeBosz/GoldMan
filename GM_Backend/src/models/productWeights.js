module.exports = (sequelize, Sequelize) => {
  const ProductWeights = sequelize.define("productWeights", {
    bahtId: {
      type: Sequelize.STRING(5),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    goldWeight: {
      type: Sequelize.FLOAT
    }
  }, {
    timestamps: false
  });

  return ProductWeights;
};