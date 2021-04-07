const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// 1. Database Controller //
// Create
exports.create = (req, res) => {
  if(!req.body.userId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const user = {
    userId: req.body.userId,
    username: req.body.username,
    password: req.body.password,
    firstNameThai: req.body.firstNameThai,
    lastNameThai: req.body.lastNameThai,
    firstNameEng: req.body.firstNameEng,
    lastNameEng: req.body.lastNameEng,
    gender: req.body.gender,
    citizenId: req.body.citizenId,
    addressLine: req.body.addressLine,
    subDistrict: req.body.subDistrict,
    district: req.body.district,
    province: req.body.province,
    country: req.body.country,
    postalCode: req.body.postalCode,
    phoneNum: req.body.phoneNum,
    email: req.body.email,
    image: req.body.image,
    roleId: req.body.roleId
  };

  User.create(user).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error creating User"
    });
  });
};

// Retrieve All User
exports.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving all User"
    });
  });
};
// Retrieve One User by ID
exports.findOneById = (req, res) => {
  const id = req.query.userId;
  
  User.findByPk(id).then(data => {
    res.send(data);
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving User with id=${id}`
    });
  });
};

// Update by ID
exports.update = (req, res) => {
  const id = req.params.userId;
  
  User.update(req.body, {where: {userId: id}}).then(num => {
    if (num == 1) {
      res.send({ message: `User id=${id} was updated` })
    } else {
      res.send({
        message: `Cannot update User id=${id}. Maybe User was not found or req.body was empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating User id=${id}`
    });
  });
};

// Delete by ID
exports.delete = (req, res) => {
  const id = req.params.userId;

  User.destroy({where: {userId: id}}).then(num => {
    if (num == 1) {
      res.send({
        message: `User id=${id} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete User id=${id}. Maybe User was not found!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting User id=${id}`
    });
  });
};
// Delete All
exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: false }).then(nums => {
    res.send({ message: `${nums} rows were deleted in User.` });
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Error deleting all items in User.'
    });
  });
};

// 2. Authenication //
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.adminContent = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.shopOwnerContent = (req, res) => {
  res.status(200).send("Shop Owner Content.");
};
exports.shopAdminContent = (req, res) => {
  res.status(200).send("Shop Admin Content.");
};
exports.salesEmployeeContent = (req, res) => {
  res.status(200).send("Sales Employee Content.");
};
exports.customerContent = (req, res) => {
  res.status(200).send("Customer Content.");
};
