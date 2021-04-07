module.exports = (sequelize, Sequelize) => {
  const Employees = sequelize.define('employees', {
    employeeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    employeeName: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    }
    // userId: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: 'user',
    //   //   key: 'userId'
    //   // }
    // },
    // shopId: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: 'shop',
    //   //   key: 'shopId'
    //   // }
    // }
  }, {
    timestamps: false,
  });

  return Employees;
};