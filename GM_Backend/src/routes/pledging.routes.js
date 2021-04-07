module.exports = app => {
  const pledging = require('../controllers/pledging.controller.js');
  var router = require('express').Router();

  // Create
  router.post("/", pledging.create);

  // Retrieve Pledging Table
  router.get("/", pledging.findAll);
  // Filter
  router.get("/transactionId", pledging.findByTransactionId);
  router.get("/customerName", pledging.findByCustomerName);
  router.get("/date", pledging.findByDate);
  router.get("/nextDueDate", pledging.findByNextDueDate);
  router.get("/dueDate", pledging.findByDueDate);

  // Update
  router.put("/:transactionId", pledging.update);

  // Delete
  router.put("/:transactionId", pledging.deleteByFlag);
  router.delete("/:transactionId", pledging.deleteOne);
  router.delete("/", pledging.deleteAll);

  app.use("/api/pledging", router);
};