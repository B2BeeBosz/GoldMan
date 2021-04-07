module.exports = (sequelize, Sequelize) => {
  const Accounting = sequelize.define("accounting", {
    // Primary Key
    transactionId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
      allowNull: false
    },
    // Normal Attributes
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    transactionType: {
      type: Sequelize.STRING
    },
    goldPrice: {
      type: Sequelize.STRING
    },
    // Foreign Keys
    employeeId: {
      type: Sequelize.INTEGER,
    },
    shopId: {
      type: Sequelize.INTEGER,
    }
  }, {
    timestamps: false
  });

  return Accounting;
};