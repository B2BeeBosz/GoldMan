module.exports = (sequelize, Sequelize) => {
  const PledgingHistory = sequelize.define('pledgingHistory', {
    historyId: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    transactionId: {
      type: Sequelize.STRING(20)
    },
    date: {
      type: Sequelize.DATEONLY
    },
    billRoutine: {
      type: Sequelize.DATEONLY
    },
    netPrice: {
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

  return PledgingHistory;
};