module.exports = app => {
  const productGroups = require('../controllers/options.controller.js');
  var router = require('express').Router();
  
  // Create
  router.post('/', productGroups.createGroups);
  // Retrieve
  router.get('/', productGroups.getAllGroups);
  // Update
  router.put('/:groupId', productGroups.updateGroups);
  // Delete One
  router.delete('/:groupId', productGroups.deleteOneFromGroups);
  // Delete All
  router.delete('/', productGroups.deleteAllGroups);

  app.use('/api/productGroups', router);
};