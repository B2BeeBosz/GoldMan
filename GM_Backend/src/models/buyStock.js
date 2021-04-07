module.exports = (sequelize, Sequelize) => {
  const BuyStock = sequelize.define('buyStock', {
    stockId: {
      type: Sequelize.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    transactionId: {
      type: Sequelize.STRING(20)
    },
    date: {
      type: Sequelize.DATEONLY
    },
    productName: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    goldWeightTotal: {
      type: Sequelize.FLOAT
    },
    // categoryId: {
    //   type: Sequelize.STRING(5)
    // },
    // groupId: {
    //   type: Sequelize.STRING(5)
    // },
    // bahtId: {
    //   type: Sequelize.INTEGER
    // },
    customerId: {
      type: Sequelize.INTEGER
    },
    shopId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  });

  return BuyStock;
}