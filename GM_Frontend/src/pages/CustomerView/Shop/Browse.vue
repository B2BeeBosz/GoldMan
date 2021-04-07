<template>
  <div class="row">
    <div class="col-12">
      <!-- Breadcrumb -->
      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <breadcrumb :transparent="true">
            <breadcrumb-item active class="active-breadcrumb">
              หน้าแรก
            </breadcrumb-item>
          </breadcrumb>
        </div>
      </div>

      <!-- Search Input -->
      <div class="row">
        <div class="col-sm-12 mb-4">
          <!-- <card class="card-primary"> -->
            <base-input 
              class="searching-store"
              addon-left-icon="tim-icons icon-zoom-split" 
              placeholder="ค้นหาร้านทองตามชื่อร้าน, ตำบล, อำเภอ, จังหวัด"
              v-model="FilterValue"
            ></base-input>
          <!-- </card> -->
        </div>
      </div>
      
      <!-- Cards -->
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3"
          v-for="(shop, index) in filteredTable" :key="shop.shopId"
        >
          <card class="card-primary">
            <!-- <router-link :to="Pages.to" > -->
            <div class="cursor-pointer" 
                 @click="openShopInfo(filteredTable[index])"
            >
              <div class="overlay">
                <img :src="shop.image" />
              </div>
              <h4 class="card-title mt-3">{{shop.shopName}}</h4>
              <p class="card-text text-muted">
                {{shop.subDistrict}}, {{shop.district}}, {{shop.province}}
              </p>
            </div>
            <!-- </router-link> -->
          </card>
        </div>
      </div>

      <!-- Pagination -->
      <card class="card-primary">
      <div class="row">
        <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
          <div>
            <p class="card-category">
              แสดงลำดับที่ {{ from + 1 }} ถึง {{ to }} จากทั้งหมด {{ total }} รายการ
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          />
        </div>
      </div>
      </card>
    </div>
  </div>
</template>

<script>
import {BaseInput, BaseButton, BasePagination, Breadcrumb, BreadcrumbItem} from 'src/components';
import ShopsDataService from '../../../services/ShopsDataService.js';

export default {
  components: {
    BaseInput,
    BaseButton,
    BasePagination,
    Breadcrumb,
    BreadcrumbItem,
    ShopsDataService
  },
  props: ['Shops'],
  data() {
    return {
      // Shops: [{
      //   shopId: 1,
      //   shopName: 'ห้างทองย่งไท้ฮวด',
      //   subDistrict: 'ช้างม่อย',
      //   district: 'เมืองเชียงใหม่',
      //   province: 'เชียงใหม่',
      //   image: '/img/shops/ห้างทองย่งไท้ฮวด.jpg'
      // }],
      Pages: {
        to: '/customer/shop/products',
        name: 'หน้าแสดงสินค้า',
        visible: true
      },
      pagination: {
        perPage: 8,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      },
      FilterValue: ''
    }
  },
  computed: {
    filteredTable() {
      let result = this.Shops.filter(item => {
        const shopName = item.shopName.toString();
        const subDistrict = item.subDistrict.toString();
        const district = item.district.toString();
        const province = item.province.toString();
        const search = this.FilterValue === '' ? '' : this.FilterValue.toString();

        return shopName.includes(search) ||
               subDistrict.includes(search) ||
               district.includes(search) ||
               province.includes(search);
      });
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.Shops.length > 0
        ? this.Shops.length
        : this.Shops.length;
    }
  },
  methods: {
    openShopInfo(shopData) {
      // console.log(shopData);
      this.$emit('ShopData', shopData);
      // this.OpenedShopData = shopData;
    }
  }
}
</script>

<style scoped>
.active-breadcrumb {
  color: #707070;
}
.inactive-breadcrumb {
  color: lightblue;
}
.cursor-pointer{
  position: relative;
  cursor: pointer;
}
.cursor-pointer:hover > .overlay {
  filter: brightness(70%);
  transition: 500ms;
}
.searching-store {
  padding: 0px 2%;
}
</style>