module.exports = app => {
  const productCategories = require('../controllers/options.controller.js');
  var router = require('express').Router();
  
  // Create
  router.post('/', productCategories.createCategories);
  // Retrieve
  router.get('/', productCategories.getAllCategories);
  // Update
  router.put('/:categoryId', productCategories.updateCategories);
  // Delete One
  router.delete('/:categoryId', productCategories.deleteOneFromCategories);
  // Delete All
  router.delete('/', productCategories.deleteAllCategories);

  app.use('/api/productCategories', router);
};