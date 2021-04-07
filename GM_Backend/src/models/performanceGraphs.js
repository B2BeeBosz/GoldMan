module.exports = (sequelize, Sequelize) => {
  const PerformanceGraphs = sequelize.define('performanceGraphs', {
    date: {
      type: Sequelize.DATEONLY,
      primaryKey: true,
      allowNull: false
      // defaultValue: Sequelize.NOW
    },
    month: {
      type: Sequelize.INTEGER
    },
    netPriceSell: {
      type: Sequelize.FLOAT
    },
    netPriceBuy: {
      type: Sequelize.FLOAT
    },
    shopId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  });

  return PerformanceGraphs;
};