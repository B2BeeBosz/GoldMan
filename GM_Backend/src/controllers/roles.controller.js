const db = require('../models');
const Role = db.role;
const Op = db.Sequelize.Op;

let RoleAttr = ['roleId', 'nameThai', 'nameEng'];

// Retrieve All Roles
exports.getAllRoles = (req, res) => {
  Role.findAll({
    attributes: RoleAttr
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving All Roles"
    });
  });
};
exports.findRoleByNameThai = (req, res) => {
  const name = req.query.nameThai;
  Role.findAll({
    attributes: RoleAttr,
    where: {
      nameThai: { [Op.like]: `${name}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving Role name=${name}`
    });
  });
};
