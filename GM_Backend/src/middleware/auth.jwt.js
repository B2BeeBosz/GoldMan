const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
let RoleAttr = ['roleId', 'nameThai', 'nameEng'];

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });

};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findAll({
      attributes: RoleAttr,
      where: {
        roleId: { [Op.eq]: `${user.roleId}` }
      }
    }).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nameEng === "Admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isShopOwner = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findAll({
      attributes: RoleAttr,
      where: {
        roleId: { [Op.eq]: `${user.roleId}` }
      }
    }).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nameEng === "Shop Owner") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Shop Owner Role!"
      });
      return;
    });
  });
};

isShopAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findAll({
      attributes: RoleAttr,
      where: {
        roleId: { [Op.eq]: `${user.roleId}` }
      }
    }).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nameEng === "Shop Admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Shop Admin Role!"
      });
      return;
    });
  });
};

isSalesEmployee = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findAll({
      attributes: RoleAttr,
      where: {
        roleId: { [Op.eq]: `${user.roleId}` }
      }
    }).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nameEng === "Sales Employee") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Sales Employee Role!"
      });
      return;
    });
  });
};

isCustomer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findAll({
      attributes: RoleAttr,
      where: {
        roleId: { [Op.eq]: `${user.roleId}` }
      }
    }).then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nameEng === "Customer") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Customer Role!"
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isShopOwner: isShopOwner,
  isShopAdmin: isShopAdmin,
  isSalesEmployee: isSalesEmployee,
  isCustomer: isCustomer
};
module.exports = authJwt;