const db = require('../models');
// const User = db.user;
const Customer = db.customers;
const Pledging = db.pledging;
const PledgingHistory = db.pledgingHistory;
const Op = db.Sequelize.Op;

let PledgingHistoryAttr = ['historyId', 'transactionId', 'date', 'billRoutine', 'netPrice', 'customerId', 'shopId', 'deleteFlag'];
let PledgingAttr = ['customerId', 'nextDueDate'];
let CustomerAttr = ['customerName', 'userId'];

// Create
exports.create = (req, res) => {
  if(!req.body.historyId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  
  const pledgingHistory = {
    historyId: req.body.historyId,
    transactionId: req.body.transactionId,
    date: req.body.date,
    billRoutine: req.body.billRoutine,
    netPrice: req.body.netPrice,
    customerId: req.body.customerId,
    shopId: req.body.shopId,
    deleteFlag: req.body.deleteFlag
  };

  PledgingHistory.create(pledgingHistory).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error creating Pledging History"
    });
  });
};

// Retrieve
exports.findAll = (req, res) => {
  PledgingHistory.findAll({
    attributes: PledgingHistoryAttr,
    include: [{
      model: Customer,
      attributes: CustomerAttr
    }, {
      model: Pledging,
      attributes: PledgingAttr
    }],
    order: [['date', 'desc']]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving all Pledging History."
    });
  });
};
exports.findByHistoryId = (req, res) => {
  const historyId = req.query.historyId;
  
  PledgingHistory.findAll({
    attributes: PledgingHistoryAttr,
    include: [{
      model: Customer,
      attributes: CustomerAttr
    }, {
      model: Pledging,
      attributes: PledgingAttr
    }],
    where: {
      historyId: { [Op.eq]: `${historyId}` }
    },
    order: [['date', 'desc']]
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving all Pledging History."
    });
  });
};

// Update
exports.update = (req, res) => {
  const historyId = req.params.historyId;
  
  PledgingHistory.update(req.body, {
    where: {
      historyId: historyId
    }
  }).then(num => {
    if (num == 1) {
      res.send({ message: `Pledging History id=${historyId} was updated` })
    } else {
      res.send({
        message: `Cannot update Pledging History id=${historyId}. Maybe Pledging History was not found or req.body was empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Pledging History id=${historyId}`
    });
  });
};

// Delete
exports.deleteOne = (req, res) => {
  const historyId = req.params.historyId;

  PledgingHistory.destroy({
    where: {
      history: historyId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Employees Pledging History id=${historyId} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Pledging History id=${historyId}. Maybe Pledging History was not found!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Pledging History id=${historyId}`
    });
  });
};
