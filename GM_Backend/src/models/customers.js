module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
    customerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    customerName: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });

  return Customers;
}