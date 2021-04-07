<template>
  <div>
    <div class="row">
      <!-- STOCK INFO SECTION -->
      <div class="col-12 col-lg-12">
        <div class="form-row">
          <div class="col-12">
            <h4>{{InfoForm.productName}}</h4>
          </div>
        </div>
        <card class="card-primary">
        <div class="form-row mt-3">
          <div class="col-12 col-sm-6 col-lg-6">
            <div class="form-row">
              <label class="col-12">รหัสสต๊อกสินค้า</label>
            </div>
            <div class="form-row">
              <p class="col-12">{{InfoForm.stockId}}</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6">
            <div class="form-row">
              <label class="col-12">รหัสรายการสินค้า</label>
            </div>
            <div class="form-row">
              <p class="col-12">{{InfoForm.transactionId}}</p>
            </div>
          </div>
        </div>

        <div class="form-row mt-3">
          <div class="col-12 col-sm-6 col-lg-6">
            <div class="form-row">
              <label class="col-12">วันที่นำเข้า</label>
            </div>
            <div class="form-row">
              <p class="col-12">{{InfoForm.date}}</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6">
            <div class="form-row">
              <label class="col-12">น้ำหนักทอง (กรัม)</label>
            </div>
            <div class="form-row">
              <p class="col-12">{{InfoForm.goldWeightTotal}}</p>
            </div>
          </div>
        </div>
         
        <!-- CUSTOMER INFO SECTION -->
        <div class="form-row mt-3">
          <label class="col-12">ชื่อผู้นำขายทองเก่า</label>
          <p class="col-12">{{CustomerProfile.customerName}}</p>
        </div>
        <div class="form-row mt-2">
          <base-button block type="default" 
                       class="animation-on-hover"
                       @click="openUserInfoModal(CustomerProfile)"
          >ดูข้อมูลลูกค้า</base-button>
        </div>
        </card>
      </div>
      
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
  props: ['InfoForm', 'CustomerProfile'],
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    openUserInfoModal(CustomerProfile) {
      this.$emit('openUserInfoModal', this.CustomerProfile);
    }
  }
}
</script>

<style>

</style>