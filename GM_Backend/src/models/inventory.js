const Shop = require('./shop');
const Accounting = require('./accounting');

module.exports = (sequelize, Sequelize) => {
  const Inventory = sequelize.define('inventory', {
    productId: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    styleName: {
      type: Sequelize.STRING
    },
    productName: {
      type: Sequelize.STRING
    },
    // category: {
    //   type: Sequelize.STRING
    // },
    // group: {
    //   type: Sequelize.STRING
    // },
    quantity: {
      type: Sequelize.INTEGER
    },
    quantitySold: {
      type: Sequelize.INTEGER
    },
    // goldWeight: {
    //   type: Sequelize.FLOAT
    // },
    goldWeightTotal: {
      type: Sequelize.FLOAT
    },
    description: {
      type: Sequelize.TEXT
    },
    image: {
      type: Sequelize.TEXT
    },
    // shopId: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: Shop,
    //   //   key: 'shopId'
    //   // }
    // }
  }, {
    timestamps: false
  });

  return Inventory;
};