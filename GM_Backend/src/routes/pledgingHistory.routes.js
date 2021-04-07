module.exports = app => {
  const pledgingHistory = require('../controllers/pledgingHistory.controller');
  var router = require('express').Router();

  router.post('/', pledgingHistory.create);

  router.get('/', pledgingHistory.findAll);
  router.get('/historyId', pledgingHistory.findByHistoryId);

  router.put('/:historyId', pledgingHistory.update);

  router.delete('/:historyId', pledgingHistory.deleteOne);

  app.use('/api/pledgingHistory', router);
};