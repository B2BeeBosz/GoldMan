module.exports = app => {
  const inventory = require('../controllers/inventory.controller.js');
  var router = require('express').Router();

  // Create
  router.post("/", inventory.create);

  // Retrieve Inventory Table
  router.get("/", inventory.findAll);
  router.get("/shopId", inventory.findAllByShopId);
  // Retrieve filter by productId
  router.get("/productId", inventory.findAllById);
  // Retrieve filter by category
  router.get("/category", inventory.findAllByCategory);
  // Retrieve filter by group
  router.get("/group", inventory.findAllByGroup);
  // Retrieve filter by style name
  router.get("/styleName", inventory.findAllByStyleName);

  // Update
  router.put("/:productId", inventory.update);

  // Delete by productId
  router.delete("/:productId", inventory.delete);
  // Delete all
  router.delete("/", inventory.deleteAll);

  // Router
  app.use('/api/inventory', router);
};