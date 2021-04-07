module.exports = app => {
  const interests = require('../controllers/interests.controller.js');
  var router = require('express').Router();

  // Create
  router.post("/", interests.create);

  // Retrieve
  router.get('/', interests.getAllInterests);
  router.get('/shopId', interests.getInterestsByShopId);

  // Update
  router.put('/:interestId', interests.update);

  // Delete
  router.delete('/:interestId', interests.deleteOne);
  router.delete('/', interests.deleteAll);

  app.use('/api/interests', router);
};