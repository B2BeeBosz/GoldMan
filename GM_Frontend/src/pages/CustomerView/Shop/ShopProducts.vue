<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <!-- Breadcrumb -->
        <div class="col-sm-12 col-lg-10">
          <breadcrumb :transparent="true">
            <breadcrumb-item>
              <a class="inactive-breadcrumb" @click="backToFirstPage">หน้าแรก</a>
            </breadcrumb-item>
            <breadcrumb-item active class="active-breadcrumb">
              {{ShopData.shopName}}
            </breadcrumb-item>
          </breadcrumb>
        </div>
        <!-- Shop Info -->
        <div class="col-sm-12 col-lg-2">
          <base-button
            block type="info" class="animation-on-hover"
            @click="openShopInfoModal"
          ><i class="tim-icons icon-alert-circle-exc"/> ดูข้อมูลร้านค้า
          </base-button>
        </div>
      </div>

      <!-- Search Input -->
      <div class="row">
        <div class="col-sm-12 mb-4">
          <base-input 
            class="searching-store"
            addon-left-icon="tim-icons icon-zoom-split" 
            placeholder="ค้นหาสินค้าตามชื่อลาย, ชื่อสินค้า, ประเภทสินค้า, เปอร์เซ็นต์ทอง"
            v-model="FilterValue"
          ></base-input>
        </div>
      </div>

      <!-- Cards -->
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-2"
          v-for="(product, index) in filteredTable" :key="product.productId"
        >
          <card class="card-primary">
            <div class="cursor-pointer" 
                 @click="openProductInfo(filteredTable[index])"
            >
              <div class="overlay">
                <img :src="product.image" />
              </div>
              <h4 class="card-title mt-3">{{product.styleName}}</h4>
              <p class="card-text text-muted">
                {{product.productCategory.nameThai}} {{product.productGroup.name}}
              </p>
            </div>
          </card>
        </div>
      </div>

      <!-- Pagination -->
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

      <!-- Shop Info Modal -->
      <modal :show.sync="ShopInfoModal" modal-classes="modal-dialog-centered modal-xl">
        <h2 slot="header" class="modal-title">{{ShopData.shopName}}</h2>
        <shop-info 
          :ShopInfo="SelectedShopInfo"
          @openMapModal="openMapModal"
        />
      </modal>

      <!-- Product Info Modal -->
      <modal :show.sync="ProductInfoModal" modal-classes="modal-dialog-centered modal-xl">
        <h2 slot="header" class="modal-title">ข้อมูลสินค้า</h2>
        <product-info :ProductInfo="SelectedProductInfo" />
      </modal>

      <!-- GOOGLE MAPS -->
      <modal :show.sync="MapModal" modal-classes="modal-dialog-centered modal-xl">
        <h4 slot="header" class="modal-title">แผนที่ร้านค้า</h4>
        <google-maps 
          :ShopInfo="SelectedShopInfo"
        />
      </modal>

    </div>
  </div>
</template>

<script>
import {BaseInput, BaseButton, BasePagination, Breadcrumb, BreadcrumbItem, Modal} from 'src/components';
import ShopInfo from './Info/ShopInfo.vue';
import ProductInfo from './Info/ProductInfo.vue';
import GoogleMaps from '../../Maps/GoogleMaps.vue';

export default {
  components: {
    BaseInput,
    BaseButton,
    BasePagination,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ProductInfo,
    ShopInfo,
    GoogleMaps
  },
  props: ['ShopData', 'ProductsTable'],
  data() {
    return {
      ProductInfoModal: false,
      ShopInfoModal: false,
      MapModal: false,
      SelectedShopInfo: {},
      SelectedProductInfo: {},
      FilterValue: '',
      pagination: {
        perPage: 12,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      },
    }
  },
  computed: {
    filteredTable() {
      let result = this.ProductsTable.filter(item => {
        const styleName = item.styleName.toString();
        const productName = item.productName.toString();
        const category = item.productCategory.nameThai.toString();
        const group = item.productGroup.name.toString();

        const search = this.FilterValue === '' ? '' : this.FilterValue.toString();

        return styleName.includes(search) ||
               productName.includes(search) ||
               category.includes(search) ||
               group.includes(search);
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
      return this.ProductsTable.length > 0
        ? this.ProductsTable.length
        : this.ProductsTable.length;
    }
  },
  methods: {
    backToFirstPage() {
      this.$emit('BackToFirstPage');
    },
    openProductInfo(productData) {
      this.ProductInfoModal = true;
      this.SelectedProductInfo = productData;
    },
    openShopInfoModal() {
      console.log(this.ShopData);
      this.ShopInfoModal = true;
      this.SelectedShopInfo = this.ShopData;
    },
    openMapModal() {
      this.MapModal = true;
    }
  }
}
</script>

<style scoped>
.active-breadcrumb {
  color: #707070;
}
.inactive-breadcrumb {
  color: darkviolet;
  cursor: pointer;
}
.inactive-breadcrumb:hover {
  color: violet;
  transition: 500ms;
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