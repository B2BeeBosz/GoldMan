<template>
  <div class="row">
    <div class="col-12" v-if="FirstPage === true">
      <browse 
        @ShopData="receivedShopData"
        :Shops="Shops"
      />
    </div>
    <div class="col-12" v-if="SecondPage === true">
      <shop-products
        @BackToFirstPage="backToFirstPage"
        :ShopData="OpenedShopData"
        :ProductsTable="ProductsTable"
      />
    </div>
  </div>
</template>

<script>
import Browse from './Browse.vue';
import ShopProducts from './ShopProducts.vue';
import InventoryDataService from '../../../services/InventoryDataService.js';
import ShopsDataService from '../../../services/ShopsDataService.js';

export default {
  components: {
    Browse,
    ShopProducts,
    InventoryDataService,
    ShopsDataService
  },
  data() {
    return {
      OpenedShopData: {},
      Shops: [],
      ProductsTable: [],
      FirstPage: true,
      SecondPage: false
    }
  },
  methods: {
    receivedShopData(data) {
      console.log(data);
      this.SecondPage = true;
      this.OpenedShopData = data;
      this.retrieveShopProducts(data.shopId);
      this.FirstPage = false;
    },
    backToFirstPage() {
      this.FirstPage = true;
      this.OpenedShopData = {};
      this.SecondPage = false;
    },

    // Retrieve
    // All Shops
    retrieveAllShops() {
      ShopsDataService.getAllShops().then(res => {
        // console.log(res.data);
        this.Shops = res.data;
      }).catch(e => {
        console.log(e);
      });
    },
    // Products from 1 shop
    retrieveShopProducts(shopId) {
      InventoryDataService.getAllByShopId(shopId).then(res => {
        // console.log(res.data);
        this.ProductsTable = res.data;
      }).catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.retrieveAllShops();
  }
}
</script>

<style>

</style>