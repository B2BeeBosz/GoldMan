<template>
  <div>
    <div class="form-row">
      <base-input class="col-sm-12 col-lg-3" type="text"
                  label="รหัสสต๊อก" placeholder="ค้นหาตามรหัสสต๊อก"
                  v-model="FilterInput.stockId"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterStockId"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-12 col-lg-3" type="text"
                  label="รหัสรายการ" placeholder="ค้นหาตามรหัสรายการ"
                  v-model="FilterInput.transactionId"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterTransactionId"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-12 col-lg-3" type="date"
                  min="1984-01-01" max="2030-12-31"
                  label="วันที่นำเข้า"
                  v-model="FilterInput.date"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterDate"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-12 col-lg-4" type="text"
                  label="ชื่อสินค้า" placeholder="ค้นหาตามชื่อสินค้า"
                  v-model="FilterInput.productName"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterProductName"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-12 col-lg-4" type="text"
                  label="ชื่อผู้นำขายทองเก่า" placeholder="ค้นหาตามชื่อผู้นำขายทองเก่า"
                  v-model="FilterInput.customerName"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterCustomerName"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>
    </div>
  </div>
</template>

<script>
import { BaseButton, BaseInput } from 'src/components';

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
        date: '',
        productName: '',
        customerName: ''
      }
    }
  },
  methods: {
    onFilterStockId(evt) {
      evt.preventDefault()
      this.$emit('StockId', this.FilterInput.stockId);
    },
    onFilterTransactionId(evt) {
      evt.preventDefault()
      this.$emit('TransactionId', this.FilterInput.transactionId);
    },
    onFilterDate(evt) {
      evt.preventDefault()
      this.$emit('Date', this.FilterInput.date);
    },
    onFilterProductName(evt) {
      evt.preventDefault()
      this.$emit('ProductName', this.FilterInput.productName);
    },
    onFilterCustomerName(evt) {
      evt.preventDefault()
      this.$emit('CustomerName', this.FilterInput.customerName);
    },
  }
}
</script>

<style>
.auto-fill-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>