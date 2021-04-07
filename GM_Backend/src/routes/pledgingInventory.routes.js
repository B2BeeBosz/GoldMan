module.exports = app => {
    const pledgingInventory = require('../controllers/pledgingInventory.controller.js');
    var router = require('express').Router();
  
    // Create
    router.post("/", pledgingInventory.create);
    
    // Retrieve Pledging Table
    router.get("/", pledgingInventory.getPledgingInventory);
    // Filter
    router.get("/stockId", pledgingInventory.findByStockId);
    router.get("/transactionId", pledgingInventory.findByTransactionId);
    router.get("/productName", pledgingInventory.findByProductName);
    // router.get("/customerName", pledgingInventory.findByCustomerName);
    // router.get("/group", pledgingInventory.findByProductGroup)
  
    // Update
    router.put("/:stockId", pledgingInventory.update);
  
    // Delete
    router.delete("/:transactionId", pledgingInventory.deleteOne);
    router.delete("/", pledgingInventory.deleteAll);
  
    app.use("/api/pledgingInventory", router);
  };