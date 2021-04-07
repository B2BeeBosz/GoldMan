<template>
  <div class="row">
    <!-- Image Section -->
    <div class="col-4">
      <card class="card-primary">
        <img slot="image" class="card-img-top" :src="ProductInfo.image">
      </card>
    </div>
      
    <!-- Infomation Section -->
    <div class="col-8">
      <div class="row">
        <h3 class="col-12">{{ProductInfo.styleName}}</h3>
        <!-- <h4>{{ProductInfo.productName}}</h4> -->
        <label class="col-4 mt-3">ประเภทสินค้า</label>
        <label class="col-4 mt-3">กลุ่มสินค้า</label>
      </div>
      <div class="row">
        <p class="col-4">{{ProductInfo.productCategory.nameThai}}</p>
        <p class="col-4">{{ProductInfo.productGroup.name}}</p>
      </div>
      <div class="row">
        <label class="col-12 mt-3">รายละเอียดสินค้า</label>
        <p class="col-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem accusantium perferendis asperiores ducimus dolorum quae eum beatae assumenda illo quis consequatur commodi tempore, veritatis, repellat impedit aperiam adipisci, est debitis!</p>
        <p class="col-12">{{ProductInfo.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ProductInfo'],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>