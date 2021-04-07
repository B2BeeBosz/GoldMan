const db = require('../models');
const Shop = db.shop;
const Op = db.Sequelize.Op;

let ShopAttr = ['shopId', 'shopName', 'addressLine', 'subDistrict', 'district', 'province', 'country', 'postalCode', 'telephone', 'about', 'image', 'latitude', 'longtitude'];
// let PositionAttr = ['shopId', 'shopName', 'latitude', 'longtitude'];

// Create
exports.create = (req, res) => {
  if(!req.body.shopId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  
  const shop = {
    shopId: req.body.shopId,
    shopName: req.body.shopName,
    addressLine: req.body.addressLine,
    subDistrict: req.body.subDistrict,
    district: req.body.district,
    province: req.body.province,
    country: req.body.country,
    postalCode: req.body.postalCode,
    telephone: req.body.telephone,
    about: req.body.about
  };

  Shop.create(shop).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error creating Shops."
    });
  });
};

// Retrieve All Shops
exports.findAll = (req, res) => {
  Shop.findAll({
    attributes: ShopAttr
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving all Shops."
    });
  });
};
// Filter Shop By Name
exports.findByName = (req, res) => {
  const name = req.query.shopName;
  var cond = name ? {shopName: {[Op.like]: `%${name}%`}} : null;
  
  Shop.findAll({
    attributes: ShopAttr,
    where: cond
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving Shop name = ${name}`
    });
  });
};

// Update Shop
exports.update = (req, res) => {
  const id = req.params.shopId;
  
  Shop.update(req.body, {where: {shopId: id}}).then(num => {
    if (num == 1) {
      res.send({ message: `Shop id=${id} was updated` });
    } else {
      res.send({ message: `Cant update Shop id=${id}. Shop wasnt found or req.body was empty!`});
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Shop id=${id}`
    });
  });
};

// Delete Shop by ID
exports.delete = (req, res) => {
  const id = req.params.shopId;

  Shop.destroy({where: {shopId: id}}).then(num => {
    if (num == 1) {
      res.send({ message: `Shop id=${id} was deleted` });
    } else {
      res.send({ message: `Cant update Shop id=${id}. Shop wasnt found`});
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Shop id=${id}`
    });
  });
};
// Delete All
exports.deleteAll = (req, res) => {
  Shop.destroy({ where: {}, truncate: false }).then(nums => {
    res.send({ message: `${nums} rows were deleted in Shops.` });
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Error deleting all items in Shops.'
    });
  })
}