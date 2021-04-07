const db = require('../models');
const GoldPrices = db.goldprices;
const Op = db.Sequelize.Op;
let Attributes = ['goldPriceId', 'date', 'gbBuyPrice', 'gbSellPrice', 'buyPrice', 'sellPrice'];

const request = require("request");
const cheerio = require("cheerio");
const url = 'https://xn--42cah7d0cxcvbbb9x.com/';

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
function formatDateId(s) {
  var res = s.replace(':',' ').split(' ');
  var temp = res[1];
  switch(temp) {
    case 'มกราคม':
      res[1] = '01'; break;
    case 'กุมภาพันธ์':
      res[1] = '02'; break;
    case 'มีนาคม':
      res[1] = '03'; break;
    case 'เมษายน':
      res[1] = '04'; break;
    case 'พฤษภาคม':
      res[1] = '05'; break;
    case 'มิถุนายน':
      res[1] = '06'; break;
    case 'กรกฎาคม':
      res[1] = '07'; break;
    case 'สิงหาคม':
      res[1] = '08'; break;
    case 'กันยายน':
      res[1] = '09'; break;
    case 'ตุลาคม':
      res[1] = '10'; break;
    case 'พฤศจิกายน':
      res[1] = '11'; break;
    case 'ธันวาคม':
      res[1] = '12'; break;
  };
  res[2] = (parseInt(res[2]) - 543).toString(); 

  return [res[2], res[1], res[0], res[4], res[5]].join("");;
};

// Create Today's GoldPrices
exports.postLatestPrices = (req, res) => {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      
      var date = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(5) > td.span.bg-span.txtd.al-r').text()
      var update_time = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(5) > td.em.bg-span.txtd.al-r').text()
      var goldBar_sell = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(3)').text()
      var goldBar_buy = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(2)').text()
      var gold_sell = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td:nth-child(3)').text()
      var gold_tax = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
      var temp = (parseFloat(goldBar_buy.replace(',','')) * 0.95).toFixed(2).toString();
      var gold_buy = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      var dateID = date + ' ' + update_time; 
      
      const goldprices = {
        goldPriceId: formatDateId(dateID),
        date: formatDate(),
        gbBuyPrice: goldBar_buy,
        gbSellPrice: goldBar_sell,
        buyPrice: gold_buy,
        sellPrice: gold_sell
      };

      GoldPrices.create(goldprices).then(data => {
        res.send(data);
      })
      .catch(e => {
        res.status(500).send({
          message: e.message || "Error creating GoldPrices"
        });
      });
    }
  });
}

// Retrieve GoldPrices Table
exports.findAll = (req, res) => {
  GoldPrices.findAll({
    attributes: Attributes
  })
  .then(data => {
    res.send(data);
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving all GoldPrices."
    });
  });
};
// Retrieve Today's Latest GoldPrices
exports.findTodayLatest = (req, res) => {
  const date = req.query.date;
  var condition = date ? { date: { [Op.like]: `${date}` } } : null;

  GoldPrices.findAll({
      limit: 1,
      attributes: Attributes,
      // where: condition,
      order: [['goldPriceId', 'DESC']],
    })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Error filtering GoldPrices date = ${date}`
      });
    });
};

// Update GoldPrice By ID
exports.update = (req, res) => {
  const id = req.params.goldPriceId;

  GoldPrices.update(req.body, { where: { goldPriceId: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: `GoldPrices id=${id} was updated` })
      } else {
        res.send({
          message: `Cannot update GoldPrices id=${id}. Maybe GoldPrices was not found or req.body was empty!`
        });
      }
    })
    .catch(e => {
      res.status(500).send({
        message: `Error updating GoldPrices id=${id}`
      });
    });
};

// Delete GoldPrices by ID
exports.delete = (req, res) => {
  const id = req.params.goldPriceId;

  GoldPrices.destroy({ where: { goldPriceId: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `GoldPrices id=${id} was deleted.`
        });
      } else {
        res.send({
          message: `Cannot delete GoldPrices id=${id}. Maybe GoldPrices was not found!`
        });
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || `Error deleting GoldPrices id=${id}`
      });
    });
};
// Delete all GoldPrices
exports.deleteAll = (req, res) => {
  GoldPrices.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} rows were deleted in GoldPrices.` });
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || 'Error deleting all items in GoldPrices.'
      });
    });
};