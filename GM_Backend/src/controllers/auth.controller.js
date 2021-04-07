const db = require('../models');
const config = require('../config/auth.config.js');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
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
  })
    .then(user => {
      console.log(user);
      if (req.body.roleId) {
        Role.findAll({
          attributes: ['roleId', 'nameThai', 'nameEng'],
          where: {
            roleId: { [Op.eq]: req.body.roleId }
          }
        }).then(roles => {
          console.log(roles);
          res.send({
            message: "User was registered successfully!"
          });
        });
      } 
    }).catch(e => {
      res.status(500).send({ message: e.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found"
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      Role.findAll({
        attributes: ['roleId', 'nameThai', 'nameEng'],
        where: {
          roleId: { [Op.eq]: user.roleId }
        }
      }).then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nameEng.toUpperCase());
        }
        // console.log(authorities);
        res.status(200).send({
          id: user.userId,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(e => {
      res.status(500).send({ message: e.message });
    });
};