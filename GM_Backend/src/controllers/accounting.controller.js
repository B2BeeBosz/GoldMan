const db = require('../models');
const Employees = db.employees;
const Accounting = db.accounting;
const Inventory = db.inventory;
const AccInv = db.accountingInventory;
const ProductGroups = db.productGroups;
const ProductWeights = db.productWeights;
const Op = db.Sequelize.Op;

let SubAccInvAttr = ['productId', 'quantity', 'goldWeightTotal', 'netPrice'];
let AttributesAcc = ['transactionId', 'date', 'transactionType', 'goldPrice', 'employeeId', 'shopId'];
let SubAttributesInv = ['productName'];
let SubAttributesEmp = ['employeeName'];
let GroupAttr = ['name'];
let GoldWeightAttr = ['goldWeight'];


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
var condToday = { date: { [Op.eq]: `${NOW}` } };

// Create
exports.create = (req, res) => {
  if(!req.body.transactionId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const accounting = {
    transactionId: req.body.transactionId,
    date: req.body.date,
    transactionType: req.body.transactionType,
    goldPrice: req.body.goldPrice,
    employeeId: req.body.employeeId,
    shopId: req.body.shopId
  };
  const accinv = {
    transactionId: req.body.transactionId,
    productId: req.body.productId,
    netPrice: req.body.netPrice,
    quantity: req.body.quantity,
    goldWeightTotal: req.body.goldWeightTotal
  };
  // const inventory = {
  //   quantitySold: req.body.quantity
  // };

  Accounting.create(accounting).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: 
        e.message || "Some error occurred while creating Accountings."
    });
  });

  AccInv.create(accinv).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: 
        e.message || "Some error occurred while creating AccInv."
    });
  });

  // const productId = req.params.productId;
  // Inventory.update(req.body.quantity, {
  //   attributes: ['quantitySold'],
  //   where: {
  //     productId: productId
  //   }
  // }).then(num => {
  //   if (num == 1) {
  //     res.send({
  //       message: `Inventory quantitySold at productId=${productId} was updated.`
  //     });
  //   } else {
  //     res.send({
  //       message: `Cannot update Inventory quantitySold productId=${productId}. Maybe Inventory was not found or req.body is empty!`
  //     });
  //   }
  // }).catch(e => {
  //   res.status(500).send({
  //     message: `Error updating Inventory quantitySold productId=${productId}`
  //   });
  // });
};

// Retrieve Accounting Table
exports.findAll = (req, res) => {  
  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }]
    },{
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: condToday
  })
    .then(data => {
      res.send(data);
    }).catch(e => {
      res.status(500).send({
        message: e.message || 'Some error occurred while retrieving all Accountings.'
      });
    });
};
exports.findAllSell = (req, res) => {
  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }]
    },{
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: {
      // condToday,
      date: { [Op.eq]: `${NOW}` },
      transactionType: { [Op.like]: 'ขายออก' }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all Sell Accountings.'
    });
  });
};
exports.findAllBuy = (req, res) => {
  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }]
    },{
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: {
      // condToday,
      date: { [Op.eq]: `${NOW}` },
      transactionType: { [Op.like]: 'รับซื้อ' }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving all Buy Accountings.'
    });
  });
};

// Filter
exports.findByTransactionId = (req, res) => {
  const id = req.query.transactionId;
  var cond = id ? { transactionId: { [Op.like]: `${id}` } } : null;

  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }]
    },{
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: { 
      transactionId: { [Op.like]: `${id}` },
      date: { [Op.eq]: `${NOW}` }
    }
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving productId=${id}`
    });
  });
}
exports.findByProductId = (req, res) => {
  const id = req.query.productId;
  var cond = id ? { productId: { [Op.like]: `${id}` } } : null;

  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }],
      where: cond
    },
    {
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: condToday
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving productId=${id}`
    });
  });
}
exports.findByProductName = (req, res) => {
  const name = req.query.productName;
  var cond = name ? { productName: { [Op.like]: `%${name}%` } } : null;

  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }],
        where: cond
      }]
    },
    {
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: condToday
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving productName=${name}`
    });
  });
}
exports.findByGroup = (req, res) => {
  const group = req.query.group;
  var cond = group ? { group: { [Op.like]: `%${group}%` } } : null;

  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }],
        where: cond
      }]
    },
    {
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: condToday
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving group=${group}`
    });
  });
}
exports.findByEmployeeId = (req, res) => {
  const id = req.query.employeeId;
  // var cond = id ? { employeeId: { [Op.eq]: `${id}` } } : null;

  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }]
    },
    {
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: {
      employeeId: { [Op.eq]: `${id}` }, 
      date: { [Op.eq]: `${NOW}` }
    }
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving employeeName=${id}`
    });
  });
}
exports.findByDate = (req, res) => {
  const date = req.query.date;
  Accounting.findAll({
    attributes: AttributesAcc,
    include: [{
      model: AccInv,
      attributes: SubAccInvAttr,
      include: [{
        model: Inventory,
        attributes: SubAttributesInv,
        include: [{
          model: ProductGroups,
          attributes: GroupAttr
        }, {
          model: ProductWeights,
          attributes: GoldWeightAttr
        }]
      }]
    },{
      model: Employees,
      attributes: SubAttributesEmp
    }],
    where: {
      date: { [Op.eq]: `${date}` }
    }
  })
  .then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving Accounting date=${date}`
    });
  });
}

// Update
exports.update = (req, res) => {
  const transactionId = req.params.transactionId;
  const productId = req.params.productId;

  AccInv.update(req.body, {
    where: {
      transactionId: transactionId,
      productId: productId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `AccInv transactionId=${transactionId}, productId=${productId} was updated.`
        });
      } else {
        res.send({
          message: `Cannot update AccInv transactionId=${transactionId}, productId=${productId}. Maybe AccInv was not found or req.body is empty!`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: `Error updating AccInv transactionId=${transactionId}, productId=${productId}`
      });
    });
};

// Delete
exports.delete = (req, res) => {
  const transactionId = req.params.transactionId;
  const productId = req.params.productId;

  AccInv.destroy({
    where: {
      transactionId: transactionId,
      productId: productId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `AccInv transactionId=${transactionId}, productId=${productId} was deleted.`
        });
      } else {
        res.send({
          message: `Cannot delete AccInv transactionId=${transactionId}, productId=${productId}. Maybe Accounting was not found.`
        });
      }
    }).catch(e => {
      res.status(500).send({
        message: e.message || `Error deleting AccInv transactionId=${transactionId}, productId=${productId}`
      });
    });
};
// Delete Entire Transaction
exports.deleteTransaction = (req, res) => {
  const transactionId = req.params.transactionId;
  
  Accounting.destroy({
    where: {
      transactionId: transactionId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Accounting transactionId=${transactionId} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Accounting transactionId=${transactionId}. Maybe Accounting was not found.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Accounting transactionId=${transactionId}`
    });
  });
  
  AccInv.destroy({
    where: {
      transactionId: transactionId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `AccInv transactionId=${transactionId} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete AccInv transactionId=${transactionId}. Maybe AccInv was not found.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting AccInv transactionId=${transactionId}`
    });
  });
}
// Delete All
// exports.deleteAll = (req, res) => {
//   Accounting.destroy({where: {}, truncate: false})
//     .then(nums => {
//       res.send({
//         message: `${nums} rows were deleted in Accounting` 
//       });
//     })
//     .catch(e => {
//       res.send({
//         message:  e.message || 'Error deleting all items in Accounting.'
//       });
//     });
// };