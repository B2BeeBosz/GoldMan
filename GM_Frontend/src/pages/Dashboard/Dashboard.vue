<template>
  <div>
  <div class="row">
    <!-- Big Chart Sell -->
    <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6 text-left">
              <h5 class="card-category">Sell Performance</h5>
              <h2 class="card-title">สรุปยอดการขาย</h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle float-right"
                data-toggle="buttons"
              >
                <label
                  v-for="(option, index) in bigLineChartCategories"
                  :key="option.name"
                  class="btn btn-sm btn-primary btn-simple"
                  :class="{ active: bigLineChart.activeIndex === index }"
                  :id="index"
                >
                  <input
                    type="radio"
                    @click="initBigChart(index)"
                    name="options"
                    autocomplete="off"
                    :checked="bigLineChart.activeIndex === index"
                  />
                  <span class="d-none d-sm-block">{{ option.name }}</span>
                  <span class="d-block d-sm-none">
                    <i :class="option.icon"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <!-- Big Chart Buy -->
    <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6 text-left">
              <h5 class="card-category">Buy Performance</h5>
              <h2 class="card-title">สรุปยอดการซื้อ</h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle float-right"
                data-toggle="buttons"
              >
                <label
                  v-for="(option, index) in bigLineChartCategories"
                  :key="option.name"
                  class="btn btn-sm btn-primary btn-simple"
                  :class="{ active: bigLineChart2.activeIndex === index }"
                  :id="index"
                >
                  <input
                    type="radio"
                    @click="initBigChart2(index)"
                    name="options"
                    autocomplete="off"
                    :checked="bigLineChart2.activeIndex === index"
                  />
                  <span class="d-none d-sm-block">{{ option.name }}</span>
                  <span class="d-block d-sm-none">
                    <i :class="option.icon"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart2"
            :chart-data="bigLineChart2.chartData"
            :gradient-colors="bigLineChart2.gradientColors"
            :gradient-stops="bigLineChart2.gradientStops"
            :extra-options="bigLineChart2.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
  </div>

  <div class="row"> 
    <!-- Stats Cards -->
    <div class="col-12">
      <div class="row">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12" v-for="card in statsCards" :key="card.title">
          <stats-card
            :title="card.title"
            :sub-title="card.subTitle"
            :type="card.type"
            :icon="card.icon"
          >
            <div slot="footer" v-html="card.footer"></div>
          </stats-card>
        </div>
      </div>
    </div>
    
    <!-- Employee Performance -->
    <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12">
      <card class="card">
        <h4 slot="header" class="card-category">Employees Performance</h4>
        <h2 slot="header" class="card-title">ยอดการขายของพนักงาน</h2>
        <div class="table-responsive">
          <employee-perf-table/>
        </div>
      </card>
    </div>

    <!-- Gold Price Area -->
    <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <div class="row">
                <div class="col-sm-12 text-left">
                  <h5 class="card-category">Today's Gold Price</h5>
                  <h2 class="card-title">ราคาทองคำแท่งวันนี้</h2>
                </div>
              </div>
            </template>
            <gold-price/>
          </card>
        </div>
      </div>
    </div>

    <!-- Product Performance -->
    <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <card class="card">
        <h4 slot="header" class="card-category">Products Performance</h4>
        <h2 slot="header" class="card-title">สินค้าขายดี</h2>
        <div class="table-responsive">
          <employee-perf-table/>
        </div>
      </card>
    </div> -->
    <!-- Small charts -->
    <!-- <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Total Shipments</h5>
          <h3 class="card-title">
            <i class="tim-icons icon-bell-55 text-primary "></i> 763,215
          </h3>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            :chart-data="purpleLineChart.chartData"
            :gradient-colors="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div> -->
    <!-- <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Daily Sales</h5>
          <h3 class="card-title">
            <i class="tim-icons icon-delivery-fast text-info "></i> 3,500€
          </h3>
        </template>
        <div class="chart-area">
          <bar-chart
            style="height: 100%"
            :chart-data="blueBarChart.chartData"
            :gradient-stops="blueBarChart.gradientStops"
            :extra-options="blueBarChart.extraOptions"
          >
          </bar-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">Completed tasks</h5>
          <h3 class="card-title">
            <i class="tim-icons icon-send text-success "></i> 12,100K
          </h3>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            :chart-data="greenLineChart.chartData"
            :gradient-stops="greenLineChart.gradientStops"
            :extra-options="greenLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div> -->
    <!-- <div class="col-lg-5">
      <card type="tasks" :header-classes="{ 'text-right': isRTL }">
        <template slot="header">
          <h6 class="title d-inline">Tasks (5)</h6>
          <p class="card-category d-inline">Today</p>
          <base-dropdown
            menu-on-right=""
            tag="div"
            title-classes="btn btn-link btn-icon"
            :class="{ 'float-left': isRTL }"
          >
            <i slot="title" class="tim-icons icon-settings-gear-63"></i>
            <a class="dropdown-item" href="#pablo"> Action </a>
            <a class="dropdown-item" href="#pablo"> Another action </a>
            <a class="dropdown-item" href="#pablo"> Something else </a>
          </base-dropdown>
        </template>
        <div class="table-full-width table-responsive">
          <task-list></task-list>
        </div>
      </card>
    </div> -->
    
    

    <!-- <div class="col-lg-12"><country-map-card></country-map-card></div> -->
  </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from './TaskList';
import UserTable from './UserTable';
import CountryMapCard from './CountryMapCard';
import StatsCard from 'src/components/Cards/StatsCard';
import config from '@/config';
import GoldPrice from './GoldPrice.vue';
import EmployeePerfTable from './EmployeePerformanceTable.vue';
import AccountingDataService from '../../services/AccountingDataService';
import DashboardDataService from '../../services/DashboardDataService';

let bigChartData = [ 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let bigChartData2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let bigChartLabels = [
  ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
]
let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.danger,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.danger,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.danger,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}
let bigChartDatasetOptions2 = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

export default {
  components: {
    LineChart,
    BarChart,
    StatsCard,
    TaskList,
    CountryMapCard,
    UserTable,
    GoldPrice,
    EmployeePerfTable,
    AccountingDataService,
    DashboardDataService
  },
  data() {
    return {
      statsCards: [
        {
          title: '0.00',
          subTitle: 'น้ำหนักทองขายออก (กรัม)',
          type: 'warning',
          icon: 'tim-icons icon-chat-33'
          // footer: '<i class="tim-icons icon-refresh-01"></i> Update Now'
        },
        {
          title: '0.00',
          subTitle: 'น้ำหนักทองรับซื้อ (กรัม)',
          type: 'primary',
          icon: 'tim-icons icon-shape-star'
          // footer: '<i class="tim-icons icon-sound-wave"></i></i> Last Research'
        },
        {
          title: '0.00',
          subTitle: 'เงินสดขายออก (บาท)',
          type: 'info',
          icon: 'tim-icons icon-money-coins'
          // footer: '<i class="tim-icons icon-trophy"></i> Customer feedback'
        },
        {
          title: '0.00',
          subTitle: 'เงินสดรับซื้อ (บาท)',
          type: 'danger',
          icon: 'tim-icons icon-money-coins'
          // footer: '<i class="tim-icons icon-watch-time"></i> In the last hours'
        }
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: 
              bigChartData[0]
          }],
          labels: bigChartLabels[0]
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.dangerGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      bigLineChart2: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions2,
            data: 
              bigChartData2[0]
          }],
          labels: bigChartLabels[0]
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Data',
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
          datasets: [
            {
              label: 'My First dataset',
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          'rgba(66,134,121,0.15)',
          'rgba(66,134,121,0.0)',
          'rgba(66,134,121,0)'
        ],
        gradientStops: [1, 0.4, 0]
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
          datasets: [
            {
              label: 'Countries',
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      },
      midnight: 0,
      timestamp: '',
      netPriceBuy: 0,
      netPriceSell: 0
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return [
        { name: 'รายวัน' },
        { name: 'รายเดือน' }
      ];
    }
  },
  methods: {
    setDate(){
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      this.timestamp = [year, month, day].join('-');
    },
    setDailyUpdateTime() {
      var d = new Date(),
          year = d.getFullYear(),
          month = d.getMonth(),
          date = d.getDate();

      this.midnight = new Date(year, month, date, 0, 0, 0, 0) - d;
      if (this.midnight < 0) {
        this.midnight += 86400000;
      }
      return this.midnight;
    },

    // 1. Today Performance Sections //
    // 1.1 Calculate Today's Sell Weights
    calculateTodaySellWeights() {
      // Retrieve All Today Transactions
      let transactions = []
      var total = 0.0;
      AccountingDataService.getAllSell().then(res => {
        transactions = res.data;
        // console.log(transactions);
        for (let i = 0; i < transactions.length; i++) {
          total += parseFloat(transactions[i].accountings_inventory.goldWeightTotal);
        }
        // console.log(total.toFixed(2));
        this.statsCards[0].title = total.toFixed(2);
      }).catch(e => {
        console.log(e);
      });
    },
    // 1.2 Calculate Today's Buy Weights
    calculateTodayBuyWeights() {
      let transactions = []
      var total = 0.0;
      AccountingDataService.getAllBuy().then(res => {
        transactions = res.data;
        // console.log(transactions);
        for (let i = 0; i < transactions.length; i++) {
          total += parseFloat(transactions[i].accountings_inventory.goldWeightTotal);
        }
        this.statsCards[1].title = total.toFixed(2);

      }).catch(e => {
        console.log(e);
      });
    },
    // 1.3 Calculate Today's Sell Money
    calculateTodaySellMoney() {
      let transactions = []
      var total = 0.0;
      AccountingDataService.getAllSell().then(res => {
        transactions = res.data;
        for (let i = 0; i < transactions.length; i++) {
          total += parseFloat(transactions[i].accountings_inventory.netPrice);
        }
        this.statsCards[2].title = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        this.netPriceSell = total;
        this.updateCurrentGraph(this.timestamp, { netPriceSell: total });
      }).catch(e => {
        console.log(e);
      });
    },
    // 1.4 Calculate Today's Buy Money
    calculateTodayBuyMoney() {
      let transactions = []
      var total = 0.0;
      AccountingDataService.getAllBuy().then(res => {
        transactions = res.data;
        for (let i = 0; i < transactions.length; i++) {
          total += parseFloat(transactions[i].accountings_inventory.netPrice);
        }
        this.statsCards[3].title = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        this.netPriceBuy = total;
        this.updateCurrentGraph(this.timestamp, { netPriceBuy: total });
      }).catch(e => {
        console.log(e);
      });
    },
    // 2. Graph Sections //
    // 2.1 Retrieve Monthly Transactions
    retrieveMonthlySell() {
      DashboardDataService.getMonthlyGraph().then(res => {
        var date = [];
        var index = [];
        for (let i=0; i < res.data.length; i++) {
          date[i] = res.data[i].date.split('-');
          index[i] = parseInt(date[i][2]) - 1;
        }
        // console.log(index);

        for (let i=0; i < index.length; i++) {
          bigChartData[0][index[i]] = res.data[i].netPriceSell;
        }
        this.refreshGraph1();
        // console.log(bigChartData[0]);
      }).catch(e => {
        console.log(e);
      }); 
    },
    retrieveMonthlyBuy() {
      DashboardDataService.getMonthlyGraph().then(res => {
        var date = [];
        var index = [];
        for (let i=0; i < res.data.length; i++) {
          date[i] = res.data[i].date.split('-');
          index[i] = parseInt(date[i][2]) - 1;
        }
        for (let i=0; i < index.length; i++) {
          bigChartData2[0][index[i]] = res.data[i].netPriceBuy;
        }
        this.refreshGraph2();
      }).catch(e => {
        console.log(e);
      }); 
    },
    // 2.2 Retrieve Yearly Transactions
    retrieveYearlySell() {
      DashboardDataService.getYearlyGraph().then(res => {
        // console.log(res.data);
        var month = [];
        var index = [];
        for (let i=0; i < res.data.length; i++) {
          month[i] = res.data[i].month;
          index[i] = month[i] - 1;
        }
        for (let i=0; i < index.length; i++) {
          bigChartData[1][index[i]] = res.data[i].netPriceSellYearly;
        }
        this.refreshGraph1();
      }).catch(e => {
        console.log(e);
      }); 
    },
    retrieveYearlyBuy() {
      DashboardDataService.getYearlyGraph().then(res => {
        var month = [];
        var index = [];
        for (let i=0; i < res.data.length; i++) {
          month[i] = res.data[i].month;
          index[i] = month[i] - 1;
        }
        for (let i=0; i < index.length; i++) {
          bigChartData2[1][index[i]] = res.data[i].netPriceBuyYearly;
        }
        this.refreshGraph2();
      }).catch(e => {
        console.log(e);
      });
    },
    
    // 2.3 Create
    createNewGraph(data) {
      DashboardDataService.createNewGraph(data).then(res => {

      }).catch(e => {
        console.log(e);
      });
    },
    // 2.4 Update
    updateCurrentGraph(date, data) {
      console.log(date);
      console.log(data);
      DashboardDataService.updateCurrentGraph(date, data).then(res => {
        this.refreshAllGraphs();
      }).catch(e => {
        console.log(e);
      });
    },

    // 2.5 Update and Draw Performance Graphs
    refreshCurrentGraphs() {
      var changeValue = {
        netPriceSell: this.netPriceSell,
        netPriceBuy: this.netPriceBuy
      };
      console.log(changeValue);
      this.updateCurrentGraph(this.timestamp, changeValue);
    },
    refreshAllGraphs() {
      this.retrieveMonthlySell();
      this.retrieveMonthlyBuy();
      this.retrieveYearlySell();
      this.retrieveYearlyBuy();
    },
    refreshGraph1() {
      this.initBigChart(0);
    },
    refreshGraph2() {
      this.initBigChart2(0);
    },
    initBigChart(index) {
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data:  
            bigChartData[index]
        }],
        labels: bigChartLabels[index]
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    // 2.6 Draw Buy Performance Graph
    initBigChart2(index) {  
      let chartData2 = {
        datasets: [{
          ...bigChartDatasetOptions2,
          data:  
            bigChartData2[index]
        }],
        labels: bigChartLabels[index]
      };
      this.$refs.bigChart2.updateGradients(chartData2);
      this.bigLineChart2.chartData = chartData2;
      this.bigLineChart2.activeIndex = index;
    }
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = 'ar';
      this.$rtl.enableRTL();
    }
    // 1. Retrieve Transaction Infomation
    setInterval(this.calculateTodaySellWeights(), 60000);
    setInterval(this.calculateTodayBuyWeights(), 60000);
    setInterval(this.calculateTodaySellMoney(), 60000);
    setInterval(this.calculateTodayBuyMoney(), 60000);
    
    // 2. Draw Performance Graph
    // 2.1 - Create zeros every midnight
    this.setDate();
    this.setDailyUpdateTime();
    setTimeout(this.createNewGraph(), this.midnight);
    // 2.2 - Refresh every Retrieved Graphs every 1 minute and Update Graphs every 1 minute
    // setTimeout(setInterval(this.refreshAllGraphs(), 60000), 1000);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  }
};
</script>

<style></style>
