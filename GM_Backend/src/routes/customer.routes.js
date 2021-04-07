module.exports = app => {
  const customer = require('../controllers/customer.controller.js');
  var router = require('express').Router();

  // Create
  router.post('/', customer.create);

  // Retrieve
  router.get('/', customer.getAllCustomers);
  router.get('/customerId', customer.getCustomerById);
  router.get('/citizenId', customer.getCustomerByCitizenId);
  
  // Update
  router.put('/:customerId', customer.update);

  // Delete
  router.delete('/:customerId', customer.deleteOne);
  router.delete('/', customer.deleteAll);

  app.use('/api/customer', router);
};