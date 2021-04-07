const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounting = require("./accounting.js")(sequelize, Sequelize);
db.accountingInventory = require("./accounting_inventory")(sequelize, Sequelize);
db.buyStock = require("./buyStock.js")(sequelize,Sequelize);
db.performanceGraphs = require("./performanceGraphs.js")(sequelize, Sequelize);

db.pledging = require("./pledging.js")(sequelize, Sequelize);
db.pledgingInventory = require("./pledgingInventory")(sequelize, Sequelize);
db.pledgingHistory = require("./pledgingHistory.js")(sequelize, Sequelize);
// db.pledPledInv = require("./pledging_pledgingInv")(sequelize, Sequelize);

db.interests = require("./interests.js")(sequelize, Sequelize);
db.goldprices = require("./goldprices.js")(sequelize, Sequelize);

db.company = require("./company.js")(sequelize, Sequelize);
db.shop = require("./shop.js")(sequelize, Sequelize);
// db.shopHasCustomers = require("./shop_has_customers.js")(sequelize, Sequelize);

db.inventory = require("./inventory.js")(sequelize, Sequelize);
db.productCategories = require('./productCategories.js')(sequelize, Sequelize);
db.productGroups = require('./productGroups.js')(sequelize, Sequelize);
db.productWeights = require('./productWeights.js')(sequelize, Sequelize);

db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.customers = require("./customers.js")(sequelize, Sequelize);
db.employees = require("./employees.js")(sequelize, Sequelize);

// *** Relations *** //
// // Accountings JOIN Inventories through AccInv
db.accounting.belongsTo(db.accountingInventory, {
  foreignKey: 'transactionId'
});
db.accountingInventory.belongsTo(db.inventory, {
  foreignKey: 'productId'
});

// BuyStock JOIN Categories, Groups, Baht, Accounting
db.buyStock.belongsTo(db.accounting, { foreignKey: 'transactionId' });
db.buyStock.belongsTo(db.productCategories, { foreignKey: 'categoryId' });
db.buyStock.belongsTo(db.productGroups, { foreignKey: 'groupId' });
db.buyStock.belongsTo(db.productWeights, { foreignKey: 'bahtId' });
db.buyStock.belongsTo(db.customers, { foreignKey: 'customerId' });
// // Inventories JOIN Categories, Groups, Baht
db.inventory.belongsTo(db.productCategories, { foreignKey: 'categoryId' });
db.inventory.belongsTo(db.productGroups, { foreignKey: 'groupId' });
db.inventory.belongsTo(db.productWeights, { foreignKey: 'bahtId' });

// // Employees JOIN Accountings
db.accounting.belongsTo(db.employees, { foreignKey: 'employeeId' });

// // Users JOIN Employees
db.employees.belongsTo(db.user, { as: 'users', foreignKey: 'userId' });
// // Users JOIN Customers
db.customers.belongsTo(db.user, { as: 'users', foreignKey: 'userId' });

// // Users JOIN Roles
db.user.belongsTo(db.role, { foreignKey: 'roleId' });
// db.role.belongsTo(db.user);
db.ROLES = ["admin", "owner", "shop admin", "sales employee", "customer"];

// // Shops JOIN Inventories
db.inventory.belongsTo(db.shop, { foreignKey: 'shopId' });
// // Shops JOIN Accountings
db.accounting.belongsTo(db.shop, { foreignKey: 'shopId'});
// // Shops JOIN Employees
db.employees.belongsTo(db.shop, { foreignKey: 'shopId' });
// Shops JOIN BuyStock
db.buyStock.belongsTo(db.shop, { foreignKey: 'shopId' });

// // Companies JOIN Shops
db.shop.belongsTo(db.company, { foreignKey: "companyId" });

// // Customers JOIN Shops
db.customers.belongsToMany(db.shop, {
  through: "shops_customers",
  foreignKey: "shopId",
  otherKey: "shopId"
});
db.shop.belongsToMany(db.customers, {
  through: "shops_customers",
  foreignKey: "customerId",
  otherKey: "shopId"
});

// Customers JOIN Pledging
db.pledging.belongsTo(db.customers, { foreignKey: 'customerId' });
// Pledging JOIN Interests
db.pledging.belongsTo(db.interests, { foreignKey: 'interestId' });
// Pledging JOIN Shops
db.pledging.belongsTo(db.shop, { foreignKey: 'shopId' });
// Pledging JOIN PledgingHistory
db.pledgingHistory.belongsTo(db.pledging, { foreignKey: 'transactionId' });

// PledgingInventory JOIN Pledging
db.pledgingInventory.belongsTo(db.pledging, { foreignKey: 'transactionId' });
// PledgingInventory JOIN Customers, ProductGroups, Shops
db.pledgingInventory.belongsTo(db.customers, { foreignKey: 'customerId' });
db.pledgingInventory.belongsTo(db.productGroups, { foreignKey: 'groupId' });
db.pledgingInventory.belongsTo(db.shop, { foreignKey: 'shopId' });

// PledgingHistory JOIN Shops
db.pledgingHistory.belongsTo(db.shop, { foreignKey: 'shopId' });
// PledgingHistory JOIN Customer
db.pledgingHistory.belongsTo(db.customers, { foreignKey: 'customerId' });

// Interests JOIN Shops
db.interests.belongsTo(db.shop, { foreignKey: 'shopId' });

module.exports = db;