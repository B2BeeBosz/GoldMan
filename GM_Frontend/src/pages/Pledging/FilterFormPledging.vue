<template>
  <div>
    <div class="form-row">
      <!-- TRANSACTION ID -->
      <base-input
        class="col-sm-10 col-md-10 col-lg-4 col-xl-4"
        type="text" placeholder="ค้นหาจากรหัสรายการ"
        label="รหัสรายการ" v-model="FilterInput.transactionId"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterId"
      ><i class="tim-icons icon-zoom-split"/></base-button>
      <!-- CUSTOMER NAME -->
      <base-input
        class="col-sm-10 col-md-10 col-lg-5 col-xl-5"
        type="text" placeholder="ค้นหาจากชื่อลูกค้า"
        label="ชื่อลูกค้า" v-model="FilterInput.customerName"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterCustomerName"
      ><i class="tim-icons icon-zoom-split"/></base-button>
    </div>
    
    <div class="form-row">
      <!-- วันที่นำเข้า -->
      <base-input
        class="col-sm-10 col-md-10 col-lg-3 col-xl-3"
        type="date" placeholder="yyyy-mm-dd"
        min="1984-01-01" max="2030-12-31"
        label="วันที่นำเข้า" v-model="FilterInput.date"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterDate"
      ><i class="tim-icons icon-zoom-split"/></base-button>
      <!-- วันที่ครบกำหนด -->
      <base-input
        class="col-sm-10 col-md-10 col-lg-3 col-xl-3"
        type="date" placeholder="yyyy-mm-dd"
        min="1984-01-01" max="2030-12-31"
        label="วันที่ครบกำหนด" v-model="FilterInput.dueDate"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterDueDate"
      ><i class="tim-icons icon-zoom-split"/></base-button>
      <!-- วันที่ได้รับ -->
      <!-- <base-input
        class="col-sm-10 col-md-10 col-lg-3 col-xl-3"
        type="date" placeholder="yyyy-mm-dd"
        min="1984-01-01" max="2030-12-31"
        label="วันที่ได้รับคืน" v-model="FilterInput.returnDate"
      ></base-input>
      <base-button 
        simple type="default" 
        class="filter-button" 
        @click="onFilterReturnDate"
      ><i class="tim-icons icon-zoom-split"/></base-button> -->

    </div>
  </div>
</template>

<script>
import {BaseInput, BaseButton} from 'src/components';

export default {
  components: { 
    BaseInput,
    BaseButton 
  },
  data() {
    return {
      FilterInput: {
        transactionId: '',
        date: '',
        nextDueDate: '',
        dueDate: '',
        returnDate: '',
        customerName: '',
      }
    }
  },
  methods: {
    onFilterId(evt) {
      evt.preventDefault();
      this.$emit('getId', this.FilterInput.transactionId);
    },
    onFilterCustomerName(evt) {
      evt.preventDefault();
      this.$emit('getCustomerName', this.FilterInput.customerName);
    },
    onFilterDate(evt) {
      evt.preventDefault();
      this.$emit('getDate', this.FilterInput.date);
    },
    onFilterDueDate(evt) {
      evt.preventDefault();
      this.$emit('getDueDate', this.FilterInput.dueDate);
    },
    // onFilterNextDueDate(evt) {
    //   evt.preventDefault();
    //   this.$emit('getNextDueDate', this.FilterInput.nextDueDate);
    // }
  }
};
</script>

<style scoped>
.filter-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>