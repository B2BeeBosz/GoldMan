<template>
  <div>
    <div class="form-row">
      <!-- รหัสสินค้า -->
      <base-input class="col-sm-10 col-md-10 col-lg-4 col-xl-4" type="text" 
                  placeholder="ค้นหาจากรหัสสินค้า..." label="รหัสสินค้า" 
                  v-model="FilterInput.productId" />
      <base-button simple type="default" class="filter-button" 
                  @click="onFilterId"
      ><i class="tim-icons icon-zoom-split"/></base-button>

      <!-- ประเภทสินค้า -->
      <base-input class="col-sm-10 col-md-10 col-lg-4 col-xl-4" type="text"
                  label="ประเภทสินค้า" placeholder="ค้นหาจากประเภทสินค้า..."
                  v-model="FilterInput.category"> 
      </base-input>
      <base-button simple type="default" class="filter-button" 
                  @click="onFilterCategory"
      ><i class="tim-icons icon-zoom-split"/></base-button>

      <!-- กลุ่มสินค้า -->
      <base-input class="col-sm-10 col-md-10 col-lg-4 col-xl-4" type="text"
                  label="กลุ่มสินค้า" placeholder="ค้นหาจากกลุ่มสินค้า..."
                  v-model="FilterInput.group"> 
      </base-input>
      <base-button simple type="default" class="filter-button" 
                  @click="onFilterGroup"
      ><i class="tim-icons icon-zoom-split"/></base-button>

      <!-- ชื่อลายสินค้า -->
      <base-input class="col-sm-10 col-md-10 col-lg-5 col-xl-5" type="text" 
                  placeholder="ค้นหาจากชื่อลาย (ตัวอักษรสีม่วง)..." label="ชื่อลายสินค้า" 
                  v-model="FilterInput.styleName" />
      <base-button simple type="default" class="filter-button" 
                  @click="onFilterStyleName"
      ><i class="tim-icons icon-zoom-split"/></base-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // FilterInput: '',
      FilterInput: {
        productId: '',
        category: '',
        group: '',
        styleName: ''
      }
    }
  },
  methods: {
    onFilterId(evt) {
      evt.preventDefault();
      this.$emit('getDataId', this.FilterInput.productId);
    },
    onFilterCategory(evt) {
      evt.preventDefault();
      this.$emit('getDataCategory', this.FilterInput.category);
    },
    onFilterGroup(evt) {
      evt.preventDefault();
      this.$emit('getDataGroup', this.FilterInput.group);
    },
    onFilterStyleName(evt) {
      evt.preventDefault();
      this.$emit('getDataStyleName', this.FilterInput.styleName);
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