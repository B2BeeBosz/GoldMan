module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      // is: /^[a-zA-Z0-9_-]+$/
    },
    password: {
      type: Sequelize.STRING,
      // is: /^[a-zA-Z0-9_-]{8,20}$/
    },
    firstNameThai: {
      type: Sequelize.STRING(50),
      // is: /^[ก-ฮ]+$/
    },
    lastNameThai: {
      type: Sequelize.STRING(50),
      // is: /^[ก-ฮ]+$/
    },
    firstNameEng: {
      type: Sequelize.STRING(50),
      // is: /^[a-zA-z]+$/
    },
    lastNameEng: {
      type: Sequelize.STRING(50),
      // is: /^[a-zA-z]+$/
    },
    gender: {
      type: Sequelize.STRING(10)
    },
    citizenId: {
      type: Sequelize.STRING(13),
      // is: /^[0-9]+$/i
    },
    addressLine: {
      type: Sequelize.STRING
    },
    subDistrict: {
      type: Sequelize.STRING
    },
    district: {
      type: Sequelize.STRING
    },
    province: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    postalCode: {
      type: Sequelize.STRING(5),
      // is: /^[0-9]+$/
    },
    phoneNum: {
      type: Sequelize.STRING(10),
      // is: /^[0-9]+$/
    },
    email: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    roleId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false,
  });

  return User;
};