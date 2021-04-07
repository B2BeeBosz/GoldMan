module.exports = app => {
  const roles = require('../controllers/roles.controller');
  var router = require('express').Router();

  router.get('/', roles.getAllRoles);
  router.get('/nameThai', roles.findRoleByNameThai);

  app.use('/api/rolesTable', router);
};