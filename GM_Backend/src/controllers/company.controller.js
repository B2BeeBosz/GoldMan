const db = require('../models');
const Company = db.company;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  if(!req.body.companyId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const company = {
    companyId: req.body.companyId,
    companyName: req.body.companyName,
    shopId: req.body.shopId
  };

  Company.create(company).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error creating Companies."
    });
  });
};

// Retrieve All
exports.findAll = (req, res) => {
  Company.findAll().then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Error retrieving all Companies.'
    });
  });
};

// Update by ID
exports.update = (req, res) => {
  const id = req.params.companyId;

  Company.update(req.body, { where: { companyId: id } }).then(num => {
    if (num == 1){
      res.send({
        message: `Company id=${id} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update Company id=${id}. Maybe Company was not found or req.body was empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: `Error update Company id=${id}`
    });
  });
};

// Delete by ID
exports.delete = (req, res) => {
  const id = req.params.companyId;

  Company.delete({ where: { companyId: id } }).then(num => {
    if (num == 1){
      res.send({
        message: `Company id = ${id} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Company id = ${id}. Maybe Company was not found!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: `Error deleting Company id = ${id}`
    });
  });
};
// Delete All
exports.deleteAll = (req, res) => {
  Company.destroy({where: {}, truncate: false})
    .then(nums => {
      res.send({ message: `${nums} rows were deleted in Company.` });
    }) 
    .catch(e => {
      res.status(500).send({
        message:
          e.message || 'Error deleting all items in Company.'
      });
    });
};