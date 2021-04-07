module.exports = app => {
  const employees = require('../controllers/employees.controller.js');
  var router = require('express').Router();

  router.post("/", employees.create);

  router.get("/", employees.findAll);
  router.get("/employeeId", employees.findByID);
  router.get("/employeeName", employees.findByName);
  router.get("/position", employees.findByPosition);
  router.get("/employeeOptions", employees.findEmployeeOptions);

  router.put("/:employeeId", employees.update);

  router.delete("/:employeeId", employees.delete);
  router.delete("/", employees.deleteAll);

  app.use('/api/employees', router);
}