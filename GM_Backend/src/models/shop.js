module.exports = (sequelize, Sequelize) => {
  const Shop = sequelize.define('shop', {
    shopId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    shopName: {
      type: Sequelize.STRING
    },
    addressLine: {
      type: Sequelize.TEXT
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
      type: Sequelize.STRING(5)
    },
    telephone: {
      type: Sequelize.STRING(10)
    },
    about: {
      type: Sequelize.TEXT
    },
    image: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.DOUBLE
    },
    longtitude: {
      type: Sequelize.DOUBLE
    }
  }, {
    timestamps: false
  });
  
  return Shop;
}