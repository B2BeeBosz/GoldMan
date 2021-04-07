module.exports = app => {
  const company = require('../controllers/company.controller.js');
  var router = require('express').Router();

  router.post("/", company.create);

  router.get("/", company.findAll);

  router.put("/:companyId", company.update);

  router.delete("/:companyId", company.delete);
  router.delete("/", company.deleteAll);

  app.use('/api/company', router);
}