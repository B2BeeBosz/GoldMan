<template>
  <div>
  <div class="row">
    <div class="col-12 col-lg-4">
      <card class="card-primary">
        <img :src="ShopInfo.image" />
        <base-button block class="mt-4 animation-on-hover" type="default"
                     @click="openMapModal"
        >เปิดแผนที่ร้าน</base-button>
      </card>
    </div>
    <div class="col-12 col-lg-8">
      <!-- ADDRESS -->
      <div class="form-row">
        <label>ที่อยู่ร้านค้า</label>
      </div>
      <div class="form-row">
        <h4>{{ShopInfo.addressLine}} 
          ต.{{ShopInfo.subDistrict}} 
          อ.{{ShopInfo.district}} 
          จ.{{ShopInfo.province}} 
          {{ShopInfo.postalCode}} </h4>
      </div>
      <!-- TELEPHONE NUMBER -->
      <div class="form-row mt-3">
        <label>เบอร์โทรศัพท์ติดต่อ</label>
      </div>
      <div class="form-row">
        <h4>{{ShopInfo.telephone}}</h4>
      </div>
      <!-- ABOUT SHOP -->
      <div class="form-row mt-3">
        <label>รายละเอียดเพิ่มเติมเกี่ยวกับร้าน</label>
      </div>
      <div class="form-row" v-if="ShopInfo.about">
        <p>{{ShopInfo.about}}</p>
      </div>
      <div class="form-row" v-else>
        <p class="text-muted">คำอธิบายเกี่ยวกับธุรกิจร้านของท่าน วันเปิดทำการ ช่องทางการติดต่อ เช่น Facebook, Instagram</p>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import {BaseInput, BaseButton, Modal} from 'src/components';

export default {
  components: {
    BaseButton,
    BaseInput,
    Modal
  },
  props: ['ShopInfo'],
  data() {
    return {
      
    }
  },
  methods: {
    openMapModal() {
      this.$emit('openMapModal');
    }
  }
}
</script>

<style scoped>

</style>