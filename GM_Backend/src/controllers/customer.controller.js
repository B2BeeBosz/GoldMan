const db = require('../models');
const Customers = db.customers;
const Users = db.user;
const Op = db.Sequelize.Op;

let CustomersAttr = ['customerId', 'customerName', 'userId'];
let UsersAttr = ['firstNameThai', 'lastNameThai', 'firstNameEng', 'lastNameEng', 'citizenId', 'phoneNum', 'image'];

// Create
exports.create = (req, res) => {
  if(!req.body.customerId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  const customers = {
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    userId: req.body.userId
  };
  // const shops_customers = {
  //   shopId: req.body.shopId,
  //   customerId: req.body.customerId
  // };

  Customers.create(customers).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};

// Retrieve
exports.getAllCustomers = (req, res) => {
  // const shopId = req.query.shopId;
  Customers.findAll({
    attributes: CustomersAttr,
    include: [{
      model: Users,
      as: 'users',
      attributes: UsersAttr
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};
exports.getCustomerById = (req, res) => {
  const id = req.query.customerId;
  Customers.findOne({
    attributes: CustomersAttr,
    include: [{
      model: Users,
      as: 'users',
      attributes: UsersAttr
    }],
    where: {
      customerId: { [Op.eq]: `${id}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};
exports.getCustomerByCitizenId = (req, res) => {
  const id = req.query.citizenId;
  Customers.findOne({
    attributes: CustomersAttr,
    include: [{
      model: Users,
      as: 'users',
      attributes: UsersAttr,
      where: {
        citizenId: { [Op.like]: `${id}` }
      }
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};

// Update
exports.update = (req, res) => {
  const id = req.params.customerId;
  Customers.update(req.body, {
    where: {
      customerId: { [Op.eq]: `${id}` }
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Customers id=${id} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update Customers id=${id}. Maybe Customers was not found or req.body is empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Customers id=${id}`
    });
  });
};

// Delete
exports.deleteOne = (req, res) => {
  const id = req.params.customerId;
  Customers.destroy({
    where: {
      customerId: { [Op.eq]: `${id}` }
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Customer id=${id} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Customer id=${id}. Maybe Customer was not found or req.body is empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Customer id=${id}`
    });
  });
};
exports.deleteAll = (req, res) => {
  Customers.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} rows were deleted in Customers`
    });
  }).catch(e => {
    res.send({
      message: e.message || 'Error deleting all items in Customers'
    });
  });
};