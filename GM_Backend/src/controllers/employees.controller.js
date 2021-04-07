const db = require('../models');
const User = db.user;
const Employees = db.employees;
const Op = db.Sequelize.Op;
let Attributes = ['employeeId', 'shopId', 'employeeName', 'position'];
let SubAttributes = ['userId', 'firstNameThai', 'lastNameThai', 'image'];
// var condApproved = {approved: {[Op.eq]: 1}};
// var condNotApproved = {approved: {[Op.eq]: 0}};

// var currentShopId = req.query.shopId;
// var condCurrentShopId = currentShopId ? {shopId: {[Op.eq]: `${currentShopId}`}} : null;

// Create
exports.create = (req, res) => {
  if(!req.body.employeeId){
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const employees = {
    employeeId: req.body.employeeId,
    employeeName: req.body.employeeName,
    position: req.body.position,
    userId: req.body.userId,
    shopId: req.body.shopId
  };

  Employees.create(employees).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error creating Employees"
    });
  });
};

// Retrieve All Employees
exports.findAll = (req, res) => {
  Employees.findAll({
    attributes: Attributes,
    include: [{
      as: 'users',
      model: User,
      attributes: SubAttributes
    }]
  })
  .then(data => {
    res.send(data);
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving all Employees."
    });
  });
};
// Filter Employees by ID
exports.findByID = (req, res) => {
  var id = req.query.employeeId;
  var cond = id ? { employeeId: { [Op.like]: `${id}` } } : null;

  Employees.findAll({
    attributes: Attributes,
    include: [{
      as: 'users',
      model: User,
      attributes: SubAttributes
    }],
    where: cond
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error filtering Employee id=${id}`
    });
  });
};
// Filter Employees by Name
exports.findByName = (req, res) => {
  const firstName = req.query.firstNameThai;
  const lastName = req.query.lastNameThai;
  
  Employees.findAll({ 
    attributes: Attributes,
    include: {
      as: 'users',
      model: User,
      attributes: SubAttributes,
      where: { 
        firstNameThai: {[Op.like]: `${firstName}`}, 
        lastNameThai: {[Op.like]: `${lastName}`}
      }
    }
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving Employee name=${firstName} ${lastName}`
    });
  });
};
// Filter Employees by Position
exports.findByPosition = (req, res) => {
  const pos = req.query.position;
  var cond = pos ? {position: {[Op.like]: `${pos}`}} : null;

  Employees.findAll({
    attributes: Attributes,
    include: {
      as: 'users',
      model: User,
      attributes: SubAttributes
    },
    where: cond
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving Employee position=${pos}`
    });
  });
};
// Filter New Employees who are not approved yet
// exports.findNotApproved = (req, res) => {
//   Employees.findAll({
//     attributes: Attributes,
//     include: {
//       as: 'users',
//       model: User,
//       attributes: ['userId', 'image']
//     },
//     where: condNotApproved
//   }).then(data => {
//     res.send(data);
//   }).catch(e => {
//     res.status(500).send({
//       message: e.message || `Error retrieving New Employees`
//     });
//   });
// }
// Employee Name Options
exports.findEmployeeOptions = (req, res) => {
  Employees.findAll({
    attributes: ['employeeId', 'employeeName']
  })
  .then(data => {
    res.send(data);
  })
  .catch(e => {
    console.log(e);
  });
}

// Update
exports.update = (req, res) => {
  const id = req.params.employeeId;

  Employees.update(req.body, {where: {employeeId: id}}).then(num => {
    if (num == 1) {
      res.send({ message: `Employees id=${id} was updated` })
    } else {
      res.send({
        message: `Cannot update Employees id=${id}. Maybe Employees was not found or req.body was empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Employees id=${id}`
    });
  });
};

// Delete by ID
exports.delete = (req, res) => {
  const id = req.params.employeeId;

  Employees.destroy({where: {employeeId: id}}).then(num => {
    if (num == 1) {
      res.send({
        message: `Employees id=${id} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Employees id=${id}. Maybe Employees was not found!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Employees id=${id}`
    });
  });
};
// Delete All
exports.deleteAll = (req, res) => {
  Employees.destroy({ where: {}, truncate: false }).then(nums => {
    res.send({ message: `${nums} rows were deleted in Employees.` });
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Error deleting all items in Employees.'
    });
  });
};