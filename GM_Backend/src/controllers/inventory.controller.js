const db = require('../models');
const Inventory = db.inventory;
const Shop = db.shop;
const ProductGroups = db.productGroups;
const ProductCategories = db.productCategories;
const ProductWeights = db.productWeights;

let InventoryAttr = ['productId', 'styleName', 'productName', 'quantity', 'quantitySold', 'goldWeightTotal', 'description', 'image', 'shopId'];
let ProductGroupsAttr = ['name'];
let ProductCategoriesAttr = ['nameThai'];
let ProductWeightsAttr = ['name', 'goldWeight'];

const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
  if(!req.body.productId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Assign attribute
  const inventory = {
    productId: req.body.productId,
    styleName: req.body.styleName,
    productName: req.body.productName,
    // category: req.body.category,
    // group: req.body.group,
    quantity: req.body.quantity,
    quantitySold: req.body.quantitySold,
    // goldWeight: req.body.goldWeight,
    goldWeightTotal: req.body.goldWeightTotal,
    description: req.body.description,
    image: req.body.image,
    groupId: req.body.groupId,
    categoryId: req.body.categoryId,
    bahtId: req.body.bahtId,
    shopId: req.body.shopId
  }

  // Create Inventory
  Inventory.create(inventory).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while creating Inventories."
    });
  });
};

// Retrieve Inventory Table
exports.findAll = (req, res) => {
  Inventory.findAll({
    attributes: InventoryAttr,
    include: [{
      model: ProductGroups,
      attributes: ProductGroupsAttr
    }, {
      model: ProductCategories,
      attributes: ProductCategoriesAttr
    }, {
      model: ProductWeights,
      attributes: ProductWeightsAttr
    }]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all Inventory.'
    });
  });
};
exports.findAllByShopId = (req, res) => {
  const id = req.query.shopId;

  Inventory.findAll({
    attributes: InventoryAttr,
    include: [{
      model: ProductGroups,
      attributes: ProductGroupsAttr
    }, {
      model: ProductCategories,
      attributes: ProductCategoriesAttr
    }, {
      model: ProductWeights,
      attributes: ProductWeightsAttr
    }],
    where: {
      shopId: { [Op.eq]: `${id}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all Inventory.'
    });
  });
};
// Retrieve Filter by ProductId
exports.findAllById = (req, res) => {
  const productId = req.query.productId;
  // var condition = productId ? { productId: { [Op.like]: `${productId}` } } : null;

  Inventory.findAll({ 
    attributes: InventoryAttr,
    include: [{
      model: ProductGroups,
      attributes: ProductGroupsAttr
    }, {
      model: ProductCategories,
      attributes: ProductCategoriesAttr
    }, {
      model: ProductWeights,
      attributes: ProductWeightsAttr
    }],
    where: {
      productId: { [Op.like]: `${productId}` }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: 
          e.message || `Error filtering Inventory id = ${productId}`
      });
    });
};
// Retrieve Filter by Category
exports.findAllByCategory = (req, res) => {
  const category = req.query.category;
  // var condition = category ? { category: { [Op.like]: `%${category}%` } } : null;

  Inventory.findAll({
    attributes: InventoryAttr,
    include: [{
      model: ProductGroups,
      attributes: ProductGroupsAttr
    }, {
      model: ProductCategories,
      attributes: ProductCategoriesAttr,
      where: {
        nameThai: { [Op.like]: `%${category}%` }
      }
    }, {
      model: ProductWeights,
      attributes: ProductWeightsAttr
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message:
          e.message || `Error filtering Inventory category = ${category}`
      });
    });
};
// Retrieve Filter by Group
exports.findAllByGroup = (req, res) => {
  const group = req.query.group;
  // var condition = group ? { group: { [Op.like]: `%${group}%` } } : null;

  Inventory.findAll({
    attributes: InventoryAttr,
    include: [{
      model: ProductGroups,
      attributes: ProductGroupsAttr,
      where: {
        name: { [Op.like]: `%${group}%` }
      }
    }, {
      model: ProductCategories,
      attributes: ProductCategoriesAttr
    }, {
      model: ProductWeights,
      attributes: ProductWeightsAttr
    }]
  }).then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message:
          e.message || `Error filtering Inventory group = ${group}`
      });
    });
};
// Retrieve Filter by Style name
exports.findAllByStyleName = (req, res) => {
  const name = req.query.styleName;
  // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Inventory.findAll({
    attributes: InventoryAttr,
    include: [{
      model: ProductGroups,
      attributes: ProductGroupsAttr
    }, {
      model: ProductCategories,
      attributes: ProductCategoriesAttr
    }, {
      model: ProductWeights,
      attributes: ProductWeightsAttr
    }],
    where: {
      name: { [Op.like]: `%${name}%` }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message:
          e.message || `Error filtering Inventory styleName = ${name}`
      });
    });
};

// Update Inventory by ProductId
exports.update = (req, res) => {
  const productId = req.params.productId;

  Inventory.update(req.body, { where: { productId: productId } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Inventory id=${productId} was updated.`
        });
      } else {
        res.send({
          message: `Cannot update Inventory id = ${productId}. Maybe Inventory was not found or req.body is empty!`
        });
      }
    })
    .catch(e => {
      res.status(500).send({
        message: `Error updating Inventory id = ${productId}`
      });
    });
};

// Delete Inventory by ProductId
exports.delete = (req, res) => {
  const productId = req.params.productId;

  Inventory.destroy({ where: { productId: productId } })
    .then(num => {
      if(num == 1){
        res.send({
          message: `Inventory id = ${productId} was deleted.`
        });
      } else {
        res.send({
          message: `Cannot delete Inventory id = ${productId}. Maybe Inventory was not found!`
        });
      }
    })
    .catch(e => {
      res.status(500).send({
        message: `Error deleting Inventory id = ${productId}`
      });
    });
};
// Delete all items in Inventory
exports.deleteAll = (req, res) => {
  Inventory.destroy({where: {}, truncate: false})
    .then(nums => {
      res.send({ message: `${nums} rows were deleted in Inventory.` });
    }) 
    .catch(e => {
      res.status(500).send({
        message:
          e.message || 'Error deleting all items in Inventory.'
      })
    })
};