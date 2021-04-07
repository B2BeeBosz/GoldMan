module.exports = app => {
  const buyStock = require('../controllers/buyStock.controller.js');
  var router = require('express').Router();

  // Create
  router.post('/', buyStock.create);

  // Retrieve
  router.get('/', buyStock.findAll);
  router.get('/stockId', buyStock.findByStockId);
  router.get('/productName', buyStock.findByProductName);
//   router.get('/category', buyStock.findByCategory);
//   router.get('/group', buyStock.findByGroup);
  router.get('/customerName', buyStock.findByCustomerName);

  // Update
  router.put('/:productId', buyStock.update);

  // Delete
  router.delete('/:productId', buyStock.deleteOne);
  router.delete('/', buyStock.deleteAll);

  app.use('/api/buyStock', router);
};