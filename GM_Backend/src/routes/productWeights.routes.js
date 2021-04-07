module.exports = app => {
  const productWeights = require('../controllers/options.controller.js');
  var router = require('express').Router();
  
  // Create
  router.post('/', productWeights.createWeights);
  // Retrieve
  router.get('/', productWeights.getAllWeights);
  // Update
  router.put('/:categoryId', productWeights.updateWeights);
  // Delete One
  router.delete('/:categoryId', productWeights.deleteOneFromWeights);
  // Delete All
  router.delete('/', productWeights.deleteAllWeights);

  app.use('/api/productWeights', router);
};