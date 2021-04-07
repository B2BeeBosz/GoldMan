module.exports = (sequelize, Sequelize) => {
  const AccInv = sequelize.define("accountings_inventories", {
    transactionId: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    productId: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    goldWeightTotal: {
      type: Sequelize.FLOAT
    },
    netPrice: {
      type: Sequelize.FLOAT
    }
  }, {
    timestamps: false
  });

  return AccInv;
};