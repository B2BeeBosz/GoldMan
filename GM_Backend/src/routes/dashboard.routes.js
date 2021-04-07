module.exports = app => {
  const dashboard = require('../controllers/dashboard.controller.js');
  var router = require('express').Router();

  router.get("/", dashboard.getEmployeePerfTable2);

  router.post("/", dashboard.createGraphData);
  router.get('/monthly', dashboard.getMonthlyGraph);
  router.get('/yearly', dashboard.getYearlyGraph);
  router.get('/today', dashboard.getTodayGraph);

  router.put('/monthly/:date', dashboard.updateGraphData);
  
  app.use('/api/dashboard', router);
}