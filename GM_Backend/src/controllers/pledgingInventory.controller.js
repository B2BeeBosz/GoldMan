const db = require('../models');
const PledgingInventory = db.pledgingInventory;
const ProductGroups = db.productGroups;
const Pledging = db.pledging;
const Shop = db.shop;
const Customers = db.customers;
const Op = db.Sequelize.Op;

let PledgingInventoryAttr = ['stockId', 'transactionId', 'productName', 'goldWeight', 'quantity', 'shopId', 'deleteFlag'];
// let ProductGroupsAttr = ['name'];
let PledgingAttr = ['transactionId', 'dueDate'];
let CustomerAttr = ['customerName'];

// Create
exports.create = (req, res) => {
  if(!req.body.transactionId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  
  const pledginginventory = {
    stockId: req.body.stockId,
    transactionId: req.body.transactionId,
    productName: req.body.productName,
    goldWeight: req.body.goldWeight,
    quantity: req.body.quantity,
    // groupId: req.body.groupId,
    customerId: req.body.customerId,
    shopId: req.body.shopId,
    deleteFlag: req.body.deleteFlag
  }
  
  PledgingInventory.create(pledginginventory).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while creating PledgingInventories.'
    });
  });
};

// Retrieve PledgingInventory Table
exports.getPledgingInventory = (req, res) => {
  PledgingInventory.findAll({
    attributes: PledgingInventoryAttr,
    include: [{
      model: Pledging,
      attributes: PledgingAttr,
      include: [{
        model: Customers,
        attributes: CustomerAttr
      }]
    }],
    where: {
      deleteFlag: { [Op.eq]: 0 }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all PledgingInventories.'
    })
  })
};
// Filter
exports.findByStockId = (req, res) => {
  const id = req.query.stockId;
  PledgingInventory.findAll({
    attributes: PledgingInventoryAttr,
    include: [{
      model: Pledging,
      attributes: PledgingAttr,
      include: [{
        model: Customers,
        attributes: CustomerAttr
      }]
    }],
    where: {
      stockId: { [Op.like]: `${id}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving stockId=${id}`
    });
  });
};
exports.findByTransactionId = (req, res) => {
  const id = req.query.transactionId;
  
  PledgingInventory.findAll({
    attributes: PledgingInventoryAttr,
    include: [{
      model: Pledging,
      attributes: PledgingAttr,
      include: [{
        model: Customers,
        attributes: CustomerAttr
      }]
    }],
    where: {
      transactionId: { [Op.like]: `${id}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving transactionId=${id}`
    });
  });
};
exports.findByProductName = (req, res) => {
  const name = req.query.productName;

  PledgingInventory.findAll({
    attributes: PledgingInventoryAttr,
    include: [{
      model: Pledging,
      attributes: PledgingAttr,
      include: [{
        model: Customers,
        attributes: CustomerAttr
      }]
    }],
    where: {
      productName: { [Op.like]: `%${name}%` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving productName=${name}`
    });
  });
};

// Update
exports.update = (req, res) => {
  const stockId = req.params.stockId;

  PledgingInventory.update(req.body, {
    where: {
      stockId: stockId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `PledgingInv stockId=${stockId} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update PledgingInv stockId=${stockId}. Maybe PledgingInv was not found or req.body is empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating stockId=${stockId}`
    });
  });
};

// Delete
exports.deleteOne = (req, res) => {
  const stockId = req.params.stockId;

  PledgingInventory.destroy({
    where: {
      stockId: stockId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `PledgingInv stockId=${stockId} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete PledgingInv stockId=${stockId}. Maybe PledgingInv was not found!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting stockId=${stockId}`
    });
  });
};
exports.deleteAll = (req, res) => {
  PledgingInventory.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} rows were deleted in PledgingInv.`
    })
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting all items in PledgingInv`
    });
  });
};