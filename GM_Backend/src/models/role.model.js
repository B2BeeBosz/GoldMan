module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    nameThai: {
      type: Sequelize.STRING
    },
    nameEng: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });

  return Role;
};