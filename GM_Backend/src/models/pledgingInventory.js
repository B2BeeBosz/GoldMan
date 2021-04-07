module.exports = (sequelize, Sequelize) => {
  const PledgingInventory = sequelize.define('pledgingInventory', {
    stockId: {
      type: Sequelize.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    transactionId: {
      type: Sequelize.STRING(20)
    },
    productName: {
      type: Sequelize.STRING
    },
    goldWeight: {
      type: Sequelize.FLOAT
    },
    customerId: {
      type: Sequelize.INTEGER
    },
    shopId: {
      type: Sequelize.INTEGER
    },
    deleteFlag: {
      type: Sequelize.BOOLEAN
    }
  }, {
    timestamps: false
  });

  return PledgingInventory;
};