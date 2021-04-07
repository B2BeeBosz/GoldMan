<template>
  <div>
    <div class="form-row">
      <!-- STOCK ID -->
      <base-input
        class="col-sm-10 col-lg-3"
        type="text" placeholder="ค้นหาจากรหัสสต๊อกสินค้า"
        label="รหัสสต๊อกสินค้า" v-model="FilterInput.stockId"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterStockId"
      ><i class="tim-icons icon-zoom-split"/></base-button>

      <!-- TRANSACTION ID -->
      <base-input
        class="col-sm-10 col-lg-3"
        type="text" placeholder="ค้นหาจากรหัสรายการ"
        label="รหัสรายการ" v-model="FilterInput.transactionId"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterTransactionId"
      ><i class="tim-icons icon-zoom-split"/></base-button>

      <!-- PRODUCT NAME -->
      <base-input
        class="col-sm-10 col-lg-3"
        type="text" placeholder="ค้นหาจากชื่อสินค้า"
        label="ชื่อสินค้า" v-model="FilterInput.productName"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterProductName"
      ><i class="tim-icons icon-zoom-split"/></base-button>
    </div>

    <div class="form-row">
      <!-- CUSTOMER NAME -->
      <base-input
        class="col-sm-10 col-lg-5"
        type="text" placeholder="ค้นหาจากชื่อลูกค้า"
        label="ชื่อลูกค้า" v-model="FilterInput.customerName"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterCustomerName"
      ><i class="tim-icons icon-zoom-split"/></base-button>
    </div>
  </div>
</template>

<script>
import {BaseButton, BaseInput} from 'src/components';

export default {
  components: {
    BaseButton, 
    BaseInput
  },
  data() {
    return {
      FilterInput: {
        stockId: '',
        transactionId: '',
        customerName: '',
        productName: ''
      }
    }
  },
  methods: {
    onFilterTransactionId(evt) {
      evt.preventDefault();
      this.$emit('TransactionId', this.FilterInput.transactionId);
    },
    onFilterStockId(evt) {
      evt.preventDefault();
      this.$emit('StockId', this.FilterInput.stockId);
    },
    onFilterCustomerName(evt) {
      evt.preventDefault();
      this.$emit('CustomerName', this.FilterInput.customerName);
    },
    onFilterProductName(evt) {
      evt.preventDefault();
      this.$emit('ProductName', this.FilterInput.productName);
    }
  }
}
</script>

<style scoped>
.filter-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>