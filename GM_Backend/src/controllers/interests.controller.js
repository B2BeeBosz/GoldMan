const db = require('../models');
const Shop = db.shop;
const Interests = db.interests;
const Op = db.Sequelize.Op;

let InterestsAttr = ['interestId', 'amountDay', 'percentMonth', 'shopId'];

// Create
exports.create = (req, res) => {
  if(!req.body.interestId) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  const interests = {
    interestId: req.body.interestId,
    // percentDay: req.body.percentDay,
    amountDay: req.body.amountDay,
    percentMonth: req.body.percentMonth,
    shopId: req.body.shopId
  };

  Interests.create(interests).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: 
        e.message || "Some error occurred while creating Interests."
    });
  });
};

// Retrieve
exports.getAllInterests = (req, res) => {
  Interests.findAll({
    attributes: InterestsAttr
  }).then(data => {
    res.send(data)
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error retrieving all Interests`
    });
  });
};
exports.getInterestsByShopId = (req, res) => {
  const shopId = req.query.shopId;
  
  Interests.findAll({
    attributes: InterestsAttr,
    // order: [['interestId', 'DESC']],
    // limit: 1,
    where: {
      shopId: { [Op.eq]: `${shopId}` }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.interestId;
  // const shopId = req.params.shopId;
  
  Interests.update(req.body, {
    where: {
      interestId: id
      // shopId: shopId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Interests id=${id} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update Interests id=${id}. Maybe Interest was not found.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating Interests id=${id}.`
    });
  });
};

exports.deleteOne = (req, res) => {
  const id = req.params.interestId;
  Interests.destroy({
    where: {
      interestId: { [Op.eq]: `${id}` }
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `Interests id=${id} was deleted.`
      });
    } else {
      res.send({
        message: `Cannot delete Interests id=${id}. Maybe Interest was not found.`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error deleting Interests id=${id}.`
    });
  });
};
exports.deleteAll = (req, res) => {
  Interests.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} rows were deleted in Interests`
    });
  }).catch(e => {
    res.send({
      message: e.message || 'Error deleting all items in Interests'
    });
  });
};