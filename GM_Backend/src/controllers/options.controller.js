const db = require('../models');
const ProductGroups = db.productGroups;
const ProductCategories = db.productCategories;
const ProductWeights = db.productWeights;

let GroupsAttr = ['groupId', 'name'];
let CategoriesAttr = ['categoryId', 'nameThai'];
let WeightsAttr = ['bahtId', 'name', 'goldWeight'];

const Op = db.Sequelize.Op;

// Retrieve
exports.getAllGroups = (req, res) => {
  ProductGroups.findAll({
    attributes: GroupsAttr
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all ProductGroups'
    });
  });
};
exports.getAllCategories = (req, res) => {
  ProductCategories.findAll({
    attributes: CategoriesAttr
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all ProductCategories'
    });
  });
};
exports.getAllWeights = (req, res) => {
  ProductWeights.findAll({
    attributes: WeightsAttr
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all ProductWeights'
    });
  });
};

// Create
exports.createGroups = (req, res) => {
  if(!req.body.groupId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const groupOptions = {
    groupId: req.body.groupId,
    name: req.body.name
  };

  ProductGroups.create(groupOptions).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while creating ProductGroups."
    });
  });
};
exports.createCategories = (req, res) => {
  if(!req.body.categoryId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const categoryOptions = {
    categoryId: req.body.categoryId,
    nameThai: req.body.nameThai,
    nameEng: req.body.nameEng
  };

  ProductCategories.create(categoryOptions).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while creating ProductCategories."
    });
  });
};
exports.createWeights = (req, res) => {
  if(!req.body.categoryId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const bahtOptions = {
    bahtId: req.body.bahtId,
    name: req.body.name,
    goldWeight: req.body.goldWeight
  };

  ProductWeights.create(bahtOptions).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while creating ProductWeights."
    });
  });
};

// Update
exports.updateGroups = (req, res) => {
  const groupId = req.params.groupId;
  
  ProductGroups.update(req.body, {
    where: { groupId: groupId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `ProductGroups id=${groupId} was updated.`
        });
      } else {
        res.send({
          message: `Cannot update ProductGroups id = ${groupId}. Maybe ProductGroups was not found or req.body is empty!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error updating ProductGroups id = ${groupId}`
      });
    });
};
exports.updateCategories = (req, res) => {
  const categoryId = req.params.categoryId;
  
  ProductCategories.update(req.body, {
    where: { categoryId: categoryId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `ProductCategories id=${categoryId} was updated.`
        });
      } else {
        res.send({
          message: `Cannot update ProductCategories id = ${categoryId}. Maybe ProductCategories was not found or req.body is empty!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error updating ProductCategories id = ${categoryId}`
      });
    });
};
exports.updateWeights = (req, res) => {
  const bahtId = req.params.bahtId;
  
  ProductWeights.update(req.body, {
    where: { bahtId: bahtId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `ProductWeights id=${bahtId} was updated.`
        });
      } else {
        res.send({
          message: `Cannot update ProductWeights id = ${bahtId}. Maybe ProductWeights was not found or req.body is empty!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error updating ProductWeights id = ${bahtId}`
      });
    });
};

// Delete One Item
exports.deleteOneFromGroups = (req, res) => {
  const groupId = req.params.groupId;

  ProductGroups.destroy({
    where: { groupId: groupId }
  })
    .then(num => {
      if(num == 1){
        res.send({
          message: `ProductGroups id = ${groupId} was deleted.`
        });
      } else {
        res.send({
          message: `Cannot delete ProductGroups id = ${groupId}. Maybe ProductGroups was not found!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error deleting ProductGroups id = ${groupId}`
      });
    });
};
exports.deleteOneFromCategories = (req, res) => {
  const categoryId = req.params.categoryId;

  ProductCategories.destroy({
    where: { categoryId: categoryId }
  })
    .then(num => {
      if(num == 1){
        res.send({
          message: `ProductCategories id = ${categoryId} was deleted.`
        });
      } else {
        res.send({
          message: `Cannot delete ProductCategories id = ${categoryId}. Maybe ProductCategories was not found!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error deleting ProductCategories id = ${categoryId}`
      });
    });
};
exports.deleteOneFromWeights = (req, res) => {
  const bahtId = req.params.bahtId;

  ProductWeights.destroy({
    where: { bahtId: bahtId }
  })
    .then(num => {
      if(num == 1){
        res.send({
          message: `ProductWeights id = ${bahtId} was deleted.`
        });
      } else {
        res.send({
          message: `Cannot delete ProductWeights id = ${bahtId}. Maybe ProductWeights was not found!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error deleting ProductWeights id = ${bahtId}`
      });
    });
};

// Delete All
exports.deleteAllGroups = (req, res) => {
  ProductGroups.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} rows were deleted in ProductGroups.` });
  }).catch(e => {
    res.status(500).send({
      message:
        e.message || 'Error deleting all items in ProductGroups.'
    });
  });
};
exports.deleteAllCategories = (req, res) => {
  ProductCategories.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} rows were deleted in ProductCategories.` });
  }).catch(e => {
    res.status(500).send({
      message:
        e.message || 'Error deleting all items in ProductCategories.'
    });
  });
};
exports.deleteAllWeights = (req, res) => {
  ProductWeights.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} rows were deleted in ProductWeights.` });
  }).catch(e => {
    res.status(500).send({
      message:
        e.message || 'Error deleting all items in ProductWeights.'
    });
  });
};
