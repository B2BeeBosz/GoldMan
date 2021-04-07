module.exports = (sequelize, Sequelize) => {
  const Interests = sequelize.define('interests', {
    interestId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    amountDay: {
      type: Sequelize.FLOAT
    },
    percentMonth: {
      type: Sequelize.FLOAT
    },
    shopId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  });

  return Interests;
}