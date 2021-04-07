module.exports = app => {
  const goldprices = require('../controllers/goldprices.controller.js');
  var router = require('express').Router();

  router.post('/', goldprices.postLatestPrices);

  router.get('/', goldprices.findAll);
  router.get('/date', goldprices.findTodayLatest);
  
  router.put('/:goldPriceId', goldprices.update);

  router.delete('/:goldPriceId', goldprices.delete);
  router.delete('/', goldprices.deleteAll);

  app.use('/api/goldprices', router);
};