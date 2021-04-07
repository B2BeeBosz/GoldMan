module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    companyId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    companyName: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });
  
  return Company;
};