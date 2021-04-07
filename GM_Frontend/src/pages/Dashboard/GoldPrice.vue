<template>
  <div class="row">
    <div class="col-12" v-for="card in statsCards" :key="card.title">
      <stats-card
        :title="card.title"
        :sub-title="card.subTitle"
        :type="card.type"
        :icon="card.icon"
        style="margin-bottom: 0px"
      >
      </stats-card>
    </div>
  </div>    
</template>

<script>
import StatsCard from 'src/components/Cards/StatsCard';
import GoldPricesDataService from '../../services/GoldPricesDataService';

export default {
  components: {
    StatsCard,
    GoldPricesDataService
  },
  data() {
    return {
      date: '',
      statsCards: [{
        title: null,
        subTitle: 'ราคาทองคำแท่งขายออก',
        type: 'danger',
        icon: 'tim-icons icon-chat-33'
      },
      {
        title: null,
        subTitle: 'ราคาทองคำแท่งรับซื้อ',
        type: 'success',
        icon: 'tim-icons icon-shape-star'
      },
      {
        title: null,
        subTitle: 'ราคาทองรูปพรรณรับซื้อ',
        type: 'info',
        icon: 'tim-icons icon-single-02'
      }]
    }
  },
  created() {
  },
  mounted() {
    this.refreshList();
    setInterval(this.updateGoldPrices(), 3600000);
  },
  methods: {
    setDate() {
      var d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      return [year, month, day].join('-');
    },
    // addNewGoldPrices() {
    //   GoldPricesDataService.postLatestPrices(data).then(res => {
        
    //   })
    // },
    refreshList() {
      this.getGoldPrices();
    },
    getGoldPrices() {
      this.date = this.setDate();

      GoldPricesDataService.findTodayLatest(this.date)
        .then(res => {
          this.statsCards[0].title = res.data[0].gbSellPrice;
          this.statsCards[1].title = res.data[0].gbBuyPrice;
          this.statsCards[2].title = res.data[0].buyPrice;
          // this.updateGoldPrices();
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateGoldPrices() {
      GoldPricesDataService.postLatestPrices().then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
    }
  }
}
</script>
