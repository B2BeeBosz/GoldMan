// const db = require('.');
// const Accounting = db.accounting;

module.exports = (sequelize, Sequelize) => {
  const GoldPrices = sequelize.define('goldprices', {
    goldPriceId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    gbSellPrice: {
      type: Sequelize.STRING(30)
    },
    gbBuyPrice: {
      type: Sequelize.STRING(30)
    },
    sellPrice: {
      type: Sequelize.STRING(30)
    },
    buyPrice: {
      type: Sequelize.STRING(30)
    }
  }, {
    timestamps: false
  });
  
  return GoldPrices;
};