const e = require("express");
const db = require("../models");
const Accounting = db.accounting;
const AccInv = db.accountingInventory;
const PerformanceGraphs = db.performanceGraphs;
const Inventory = db.inventory;
const Employees = db.employees;
const User = db.user;
const Op = db.Sequelize.Op;

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};
var NOW = formatDate();

function formatDateRange(Y, M, type) {
  if (type === 'month') {
    var d = new Date(),
      date = '01',
      month = '' + (d.getMonth() + 1 + M),
      year = d.getFullYear();
  }
  if (type === 'year') {
    var d = new Date(),
      date = '01',
      month = '01',
      year = d.getFullYear() + Y;
  }
  if (month.length < 2) {
    month = '0' + month;
  }
  return [year, month, date].join('-');
};
var ThisMonth = formatDateRange(0, 0, 'month');
var NextMonth = formatDateRange(0, 1, 'month');
var ThisYear = formatDateRange(0, 0, 'year');
var NextYear = formatDateRange(1, 0, 'year');

let AccountingAttr = [
  'employeeId', 
  'date', 
  'transactionType', 
  'shopId'
];
let AccInvAttr = [
  // [
  //   db.Sequelize.literal(`(
  //     SELECT SUM(accountings_inventory.goldWeightTotal)
  //     FROM accountings_inventories AS accountings_inventory 
  //       LEFT OUTER JOIN accountings_inventories AS accountings_inventory 
  //         ON accounting.transactionId = accountings_inventory.transactionId 
  //     WHERE accounting.date = '${NOW}' AND accounting.transactionType LIKE 'ขายออก'
  //   )`),
  //   'goldWeightTotalSell'
  // ],
  // [
  //   db.Sequelize.literal(`(
  //     SELECT SUM(accountings_inventory.netPrice)
  //     FROM accountings AS accounting 
  //       LEFT OUTER JOIN accountings_inventories AS accountings_inventory 
  //         ON accounting.transactionId = accountings_inventory.transactionId 
  //     WHERE accounting.date = '${NOW}' AND accounting.transactionType LIKE 'ขายออก'
  //   )`),
  //   'valueSell'
  // ],
  [db.Sequelize.fn('sum', db.Sequelize.col('goldWeightTotal')), 'goldWeightTotalSell'],
  [db.Sequelize.fn('sum', db.Sequelize.col('netPrice')), 'valueSell']
];
// let InventoryAttr = ['productName', 'group', 'goldWeight'];
let EmployeesAttr = ['employeeName', 'position'];
let UserAttr = ['image'];

// Employee Performance Table
exports.getEmployeePerfTable = (req, res) => {
  Accounting.findAll({
    attributes: AccountingAttr,
    include: [
    {
      model: Employees,
      attributes: EmployeesAttr,
      include: [{
        model: User,
        as: 'users',
        attributes: UserAttr
      }]
    }],
    where: {
      date: { [Op.eq]: `${NOW}` }
    },
    group: ['employeeId']
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving Employee Perf Table.'
    });
  });
};
exports.getEmployeePerfTable2 = (req, res) => {
  Accounting.findAll({
    limit: 5,
    attributes: AccountingAttr,
    include: [{
      model: AccInv,
      attributes: AccInvAttr,
      group: ['goldWeightTotalSell'],
      // order: [['goldWeightTotalSell', 'DESC']],
    },
    {
      model: Employees,
      attributes: EmployeesAttr,
      include: [{
        model: User,
        as: 'users',
        attributes: UserAttr
      }]
    }],
    where: {
      date: { [Op.eq]: `${NOW}` },
      transactionType: { [Op.like]: 'ขายออก' }
    },
    // order: [['goldWeightTotalSell', 'DESC']],
    group: ['employeeId'],
    
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message || 'Some error occurred while retrieving Employee Perf Table.'
    });
  });
};

// Performance Graphs Section //
// GROUP BY performancegraph.month
let PerformanceGraphsMonth = ['date', 'month', 'netPriceSell', 'netPriceBuy', 'shopId'];
let PerformanceGraphsYear = [
  'month',
  [db.Sequelize.fn('sum', db.Sequelize.col('netPriceSell')), 'netPriceSellYearly'],
  [db.Sequelize.fn('sum', db.Sequelize.col('netPriceBuy')), 'netPriceBuyYearly'],
  'shopId'
];

// Retrieve
exports.getMonthlyGraph = (req, res) => {
  PerformanceGraphs.findAll({
    attributes: PerformanceGraphsMonth,
    where: {
      date: { 
        [Op.gte]: `${ThisMonth}`,   // 2021-02-01 
        [Op.lt]: `${NextMonth}`     // 2021-03-01
      }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};
exports.getYearlyGraph = (req, res) => {
  PerformanceGraphs.findAll({
    attributes: PerformanceGraphsYear,
    where: {
      date: { 
        [Op.gte]: `${ThisYear}`,  // 2021-01-01
        [Op.lt]: `${NextYear}`    // 2022-01-01
      }
    },
    group: ['month']
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};
exports.getTodayGraph = (req, res) => {
  PerformanceGraphs.findAll({
    attributes: PerformanceGraphsMonth,
    where: {
      date: { [Op.eq]: NOW }
    }
  }).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};

function setMonthName(date) {
  var monthArr = date.split('-');
  var month = parseInt(monthArr[1]);
  return month;
};

// Create
exports.createGraphData = (req, res) => {
  var MonthNum = setMonthName(NOW);
  const graphData = {
    date: NOW,
    month: MonthNum,
    netPriceSell: 0,
    netPriceBuy: 0,
    shopId: 1
  }
  PerformanceGraphs.create(graphData).then(data => {
    res.send(data);
  }).catch(e => {
    res.status(500).send({
      message: e.message
    });
  });
};

// Update
exports.updateGraphData = (req, res) => {
  const date = req.params.date;
  console.log(req.body);
  PerformanceGraphs.update(req.body, {
    where: {
      date: { [Op.eq]: `${date}` }
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `PerformanceGraphs date=${date} was updated.`
      });
    } else {
      res.send({
        message: `Cannot update PerformanceGraphs date=${date}. Maybe PerformanceGraphs was not found or req.body is empty!`
      });
    }
  }).catch(e => {
    res.status(500).send({
      message: e.message || `Error updating PerformanceGraphs date=${date}`
    });
  });
};