const db = require('../models');
const BuyStock = db.buyStock;
const ProductCategories = db.productCategories;
const ProductGroups = db.productGroups;
const ProductWeights = db.productWeights;
const Customers = db.customers;
const Users = db.user;
const Op = db.Sequelize.Op;

let BuyStockAttr = ['stockId', 'transactionId', 'date', 'productName', 'quantity', 'goldWeightTotal', 'customerId', 'shopId'];
let CustomersAttr = ['customerName'];
let UserAttr = ['userId', 'firstNameThai', 'lastNameThai', 'firstNameEng', 'lastNameEng', 'image']
let ProductCategoryAttr = ['nameThai'];
let ProductGroupAttr = ['name'];
let ProductWeightAttr = ['goldWeight'];

// Create
exports.create = (req, res) => {
  if(!req.body.stockId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  const buyStock = {
    stockId: req.body.stockId,
    transactionId: req.body.transactionId,
    date: req.body.date,
    productName: req.body.productName,
    quantity: req.body.quantity,
    goldWeightTotal: req.body.goldWeightTotal,
    customerId: req.body.customerId,
    // categoryId: req.body.categoryId,
    // groupId: req.body.groupId,
    // bahtId: req.body.bahtId,
    shopId: req.body.shopId
  };

  BuyStock.create(buyStock).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while creating BuyStocks."
    });
  });
};

// Retrieve BuyStock Table
exports.findAll = (req, res) => {
  BuyStock.findAll({
    attributes: BuyStockAttr,
    include: [{
      model: Customers,
      attributes: CustomersAttr,
      include: [{
        as: 'users',
        model: Users,
        attributes: UserAttr
      }]
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving all BuyStocks.`
    });
  });
};
// Filter
exports.findByStockId = (req, res) => {
  const id = req.query.stockId;
  BuyStock.findAll({
    attributes: BuyStockAttr,
    include: [{
      model: Customers,
      attributes: CustomersAttr,
      include: [{
        as: 'users',
        model: Users,
        attributes: UserAttr
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
exports.findByProductName = (req, res) => {
  const name = req.query.productName;
  BuyStock.findAll({
    attributes: BuyStockAttr,
    include: [{
    //   model: ProductCategories,
    //   attributes: ProductCategoryAttr
    // }, {
    //   model: ProductGroups,
    //   attributes: ProductGroupAttr
    // }, {
    //   model: ProductWeights,
    //   attributes: ProductWeightAttr
    // }, {
      model: Customers,
      attributes: CustomersAttr
    }],
    where: {
      productName: { [Op.like]: `${name}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving productName=${name}`
    });
  });
};
exports.findByCategory = (req, res) => {
  const category = req.query.category;
  BuyStock.findAll({
    attributes: BuyStockAttr,
    include: [{
      model: ProductCategories,
      attributes: ProductCategoryAttr,
      where: {
        nameThai: { [Op.like]: `${category}` }
      }
    }, {
      model: ProductGroups,
      attributes: ProductGroupAttr
    }, {
      model: ProductWeights,
      attributes: ProductWeightAttr
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving category=${category}`
    });
  });
};
exports.findByGroup = (req, res) => {
  const group = req.query.group;
  BuyStock.findAll({
    attributes: BuyStockAttr,
    include: [{
      model: ProductCategories,
      attributes: ProductCategoryAttr
    }, {
      model: ProductGroups,
      attributes: ProductGroupAttr,
      where: {
        name: { [Op.like]: `${group}` }
      }
    }, {
      model: ProductWeights,
      attributes: ProductWeightAttr
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving category=${category}`
    });
  });
};
exports.findByCustomerName = (req, res) => {
  const name = req.query.customerName;
  BuyStock.findAll({
    attributes: BuyStockAttr,
    include: [{
    //   model: ProductCategories,
    //   attributes: ProductCategoryAttr
    // }, {
    //   model: ProductGroups,
    //   attributes: ProductGroupAttr
    // }, {
    //   model: ProductWeights,
    //   attributes: ProductWeightAttr
    // }, {
      model: Customers,
      attributes: CustomersAttr,
      where: {
        customerName: { [Op.like]: `${name}` }
      }
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving customerName=${name}`
    });
  });
};

// Update
exports.update = (req, res) => {
  const stockId = req.params.stockId;
  BuyStock.update(req.body, {
    where: {
      stockId: { [Op.like]: `${stockId}` }
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `BuyStock stockId=${stockId} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update BuyStock stockId=${stockId}.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: `Error updating BuyStock stockId=${stockId}`
    });
  });
};

// Delete
exports.deleteOne = (req, res) => {
  const stockId = req.params.stockId;
  BuyStock.destroy({
    where: {
      stockId: { [Op.like]: `${stockId}` }
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `BuyStock stockId=${stockId} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete BuyStock stockId=${stockId}.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: `Error deleting BuyStock stockId=${stockId}`
    });
  });
};
exports.deleteAll = (req, res) => {
  BuyStock.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} rows were deleted in BuyStock`
    });
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Error deleting all items in BuyStock.'
    });
  });
};