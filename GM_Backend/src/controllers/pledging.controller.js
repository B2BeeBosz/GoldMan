const db = require('../models');
const Pledging = db.pledging;
const PledgingInventory = db.pledgingInventory;
const ProductGroups = db.productGroups;
const Shop = db.shop;
const Customers = db.customers;
const Op = db.Sequelize.Op;

let PledgingAttr = ['transactionId', 'interests', 'interestsRate', 'netPrice', 'date', 'nextDueDate', 'dueDate', 'returnDate', 'deleteFlag', 'shopId'];
let CustomerAttr = ['customerId', 'customerName', 'userId'];
let PledgingInventoryAttr = ['stockId', 'transactionId', 'productName', 'goldWeight', 'groupId', 'shopId'];
let ProductGroupsAttr = ['name'];

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};
var NOW = formatDate();

// Create
exports.create = (req, res) => {
  if(!req.body.transactionId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const pledging = {
    transactionId: req.body.transactionId,
    interests: req.body.interests,
    interestsRate: req.body.interestsRate,
    netPrice: req.body.netPrice,
    date: NOW,
    nextDueDate: req.body.nextDueDate,
    dueDate: req.body.dueDate,
    interestId: req.body.interestId,
    customerId: req.body.customerId,
    shopId: req.body.shopId,
    deleteFlag: 0
  };

  Pledging.create(pledging).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while creating Pledgings."
    });
  });
};

// Retrieve Pledging Table
exports.findAll = (req, res) => {
  Pledging.findAll({
    attributes: PledgingAttr,
    include: [{
      model: Customers,
      attributes: CustomerAttr
    }],
    where: {
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all Pledgings.'
    });
  });
};
// Filter
exports.findByTransactionId = (req, res) => {
  const id = req.query.transactionId;

  Pledging.findAll({
    attributes: PledgingAttr,
    include: [{
      model: Customers,
      attributes: CustomerAttr
    }],
    where: {
      transactionId: { [Op.like]: `${id}` },
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving transactionId=${id}`
    });
  });
};
exports.findByCustomerName = (req, res) => {
  const name = req.query.customerName;
  Pledging.findAll({
    attributes: PledgingAttr,
    include: [{
      model: Customers,
      attributes: CustomerAttr,
      where: { 
        customerName: { [Op.like]: `%${name}%` } 
      }
    }],
    where: {
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving customerId=${name}`
    });
  })
};
exports.findByDate = (req, res) => {
  const date = req.query.date;
  Pledging.findAll({
    attributes: PledgingAttr,
    include: [{
      model: Customers,
      attributes: CustomerAttr
    }],
    where: {
      date: { [Op.eq]: `${date}` },
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving date=${date}`
    });
  });
};
exports.findByNextDueDate = (req, res) => {
  const date = req.query.nextDueDate;
  Pledging.findAll({
    attributes: PledgingAttr,
    include: [{
      model: Customers,
      attributes: CustomerAttr
    }],
    where: {
      nextDueDate: { [Op.eq]: `${date}` },
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving nextDueDate=${date}`
    });
  });
};
exports.findByDueDate = (req, res) => {
  const date = req.query.dueDate;
  Pledging.findAll({
    attributes: PledgingAttr,
    include: [{
      model: Customers,
      attributes: CustomerAttr
    }],
    where: {
      dueDate: { [Op.eq]: `${date}` },
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving dueDate=${date}`
    });
  });
};

// Update
exports.update = (req, res) => {
  const id = req.params.transactionId;
  Pledging.update(req.body, {
    where: {
      transactionId: id
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Pledging id=${id} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update Pledging id=${id}. Maybe Pledging was not found or req.body is empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Pledging id=${id}`
    });
  });
};
exports.deleteByFlag = (req, res) => {
  const id = req.params.transactionId;
  Pledging.update(req.body.deleteFlag, {
    where: {
      transactionId: id
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Pledging id=${id} deleteFlag was raised.`
      });
    } else {
      res.send({
        message: `Cannot update Pledging id=${id}. Maybe Pledging was not found or req.body is empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Pledging id=${id}`
    });
  });
};
// Delete
exports.deleteOne = (req, res) => {
  const id = req.params.transactionId;
  if (req.params.deleteFlag == 0) {
    res.status(500).send({
      message: `Pledging id=${id} cannot be deleted. DeleteFlag was not raised.`
    });
    return;
  }
  
  Pledging.destroy({
    where: {transactionId: id}
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Pledging id=${id} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Pledging id=${id}. Maybe Pledging was not found.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Pledging id=${id}`
    });
  });
};
exports.deleteAll = (req, res) => {
  Pledging.destroy({
    where: {
      deleteFlag: { [Op.eq]: 1 }
    }, 
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} rows were deleted in Pledging`
    });
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Error deleting all items in Pledging'
    });
  });
};