module.exports = app => {
  const accounting = require('../controllers/accounting.controller.js');
  var router = require('express').Router();

  // Create
  router.post("/", accounting.create);

  // Retrieve Accounting Table
  router.get("/", accounting.findAll);
  router.get("/sell", accounting.findAllSell);
  router.get("/buy", accounting.findAllBuy);
  router.get("/transactionId", accounting.findByTransactionId);
  router.get("/productId", accounting.findByProductId);
  router.get("/productName", accounting.findByProductName);
  router.get("/group", accounting.findByGroup);
  router.get("/employeeId", accounting.findByEmployeeId);
  router.get("/date", accounting.findByDate);

  // Update
  router.put("/:transactionId&:productId", accounting.update);

  // Delete
  router.delete("/:transactionId&:productId", accounting.delete);
  // Delete Entire Transaction
  router.delete("/:transactionId", accounting.deleteTransaction);
  // Delete All
  // router.delete("/", accounting.deleteAll);

  app.use('/api/accounting', router);
};