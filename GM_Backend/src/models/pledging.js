module.exports = (sequelize, Sequelize) => {
  const Pledging = sequelize.define('pledging', {
    transactionId: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    interests: {
      type: Sequelize.FLOAT
    },
    interestsRate: {
      type: Sequelize.FLOAT
    },
    netPrice: {
      type: Sequelize.FLOAT
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    nextDueDate: {
      type: Sequelize.DATEONLY
    },
    dueDate: {
      type: Sequelize.DATEONLY
    },
    returnDate: {
      type: Sequelize.DATEONLY
    },
    interestId: {
      type: Sequelize.INTEGER
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

  return Pledging;
};