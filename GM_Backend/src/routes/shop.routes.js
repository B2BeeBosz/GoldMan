module.exports = app => {
  const shop = require('../controllers/shop.controller.js');
  var router = require('express').Router();

  router.post("/", shop.create);

  router.get("/", shop.findAll);
  router.get("/:shopName", shop.findByName);

  router.put("/:shopId", shop.update);

  router.delete("/:shopId", shop.delete);
  router.delete("/", shop.deleteAll);

  app.use('/api/shops', router);
};