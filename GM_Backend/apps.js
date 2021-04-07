const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");
// const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
// const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

var corsOptions = {
  // origin: "http://localhost:5000",
  origin: "objective-lichterman-e39089.netlify.app"
};

app.use(cors(corsOptions));

// simple route
app.get('/', (req, res) => {
  // res.send('GET Api');
  res.json({ message: "Welcome to Goldman Backend." });
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Session
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2'],
//   maxAge: 3600 * 1000,  // 1hr
// }));
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// connect database
const db = require("./src/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  // initial();
});
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.")
//   
// });

function initial() {
  Role.create({
    roleId: 1,
    nameThai: "ผู้ดูแลระบบ",
    nameEng: 'Admin'
  });
  Role.create({
    roleId: 2,
    nameThai: "เจ้าของร้าน",
    nameEng: 'Shop Owner'
  });
  Role.create({
    roleId: 3,
    nameThai: "พนักงานจัดการระบบร้าน",
    nameEng: "Shop Admin"
  });
  Role.create({
    roleId: 4,
    nameThai: "พนักงานขาย",
    nameEng: "Sales Employee"
  });
  Role.create({
    roleId: 5,
    nameThai: "ลูกค้า",
    nameEng: "Customer"
  });
}

// router
require("./src/routes/dashboard.routes")(app);
require("./src/routes/inventory.routes")(app);
require("./src/routes/productCategories.routes")(app);
require("./src/routes/productGroups.routes")(app);
require("./src/routes/productWeights.routes")(app);
require("./src/routes/accounting.routes")(app);
require("./src/routes/buyStock.routes")(app);
require("./src/routes/pledging.routes")(app);
require("./src/routes/pledgingHistory.routes")(app);
require("./src/routes/pledgingInventory.routes")(app);
require("./src/routes/interests.routes")(app);
require("./src/routes/company.routes")(app);
require("./src/routes/employees.routes")(app);
require("./src/routes/goldprices.routes")(app);
require("./src/routes/shop.routes")(app);
require("./src/routes/customer.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/roles.routes")(app);
require('./src/routes/auth.routes')(app);