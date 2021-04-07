const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
  const user = require('../controllers/user.controller.js');
  var router = require('express').Router();

  // 1. Database Router
  router.post("/", user.create);

  router.get("/", user.findAll);
  router.get("/userId", user.findOneById);

  router.put("/:userId", user.update);

  router.delete("/:userId", user.delete);
  router.delete("/", user.deleteAll);

  app.use('/api/users', router);

  // 2. Authenication Router
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/role/all", controller.allAccess);
  app.get(
    '/api/role/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminContent
  );
  app.get(
    '/api/role/shopOwner',
    [authJwt.verifyToken, authJwt.isShopOwner],
    controller.shopOwnerContent
  );
  app.get(
    '/api/role/shopAdmin',
    [authJwt.verifyToken, authJwt.isShopAdmin],
    controller.shopAdminContent
  );
  app.get(
    '/api/role/salesEmployee',
    [authJwt.verifyToken, authJwt.isSalesEmployee],
    controller.salesEmployeeContent
  )
  app.get(
    '/api/role/customer',
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.customerContent
  );

};