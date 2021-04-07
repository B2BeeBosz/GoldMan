<template>
  <div>
    <base-table :data="buyStockTable" thead-classes="text-primary">
      <template slot="columns">
        <th class="text-center">รหัสสินค้า</th>
        <th class="text-center">รหัสรายการ</th>
        <th class="text-center">วันที่นำเข้า</th>
        <th class="text-center">ชื่อสินค้า</th>
        <th class="text-center">จำนวน</th>
        <th class="text-center">น้ำหนักทองรวม (กรัม)</th>
        <th class="text-center">ผู้นำขายทองเก่า</th>
        <th class="text-center">ตัวเลือก</th>
      </template>

      <template slot-scope="{ row }">
        <td class="text-center" style="min-width: 50px">{{row.stockId}}</td>
        <td class="text-center" style="min-width: 70px">{{row.transactionId}}</td>
        <td class="text-center" style="min-width: 70px">{{row.date}}</td>
        <td class="text-center" style="min-width: 250px">{{row.productName}}</td>
        <td class="text-center" style="min-width: 30px">{{row.quantity}}</td>
        <td class="text-center" style="min-width: 30px">{{row.goldWeightTotal}}</td>
        <td class="text-center" style="min-width: 100px">{{row.customer.customerName}}</td>
        <td class="text-center" style="min-width: 70px">
          <el-tooltip content="ดูข้อมูลสินค้า" :open-delay="300" placement="top">
            <base-button 
              type="info"
              class="btn-link"
              @click="openBuyProductModal(row)"
            >
              <i class="tim-icons icon-alert-circle-exc"></i>
            </base-button>
          </el-tooltip>
          <el-tooltip content="นำออกทอง" :open-delay="300" placement="top">
            <base-button 
              type="danger"
              class="btn-link"
              @click="openDeleteBuyStockModal(row)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </td>
      </template>
    </base-table>

    <!-- BUY PRODUCT INFO -->
    <div>
      <modal :show.sync="BuyProductInfoModal" modal-classes="modal-dialog-centered modal-md">
        <h2 slot="header" class="modal-title">ข้อมูลสินค้า</h2>
        <div v-if="InfoForm && CustomerProfile">
          <buy-stock-info 
            :InfoForm="InfoForm"
            :CustomerProfile="CustomerProfile"
            @openUserInfoModal="openUserInfoModal"
          />
        </div>
      </modal>
    </div>

    <!-- CUSTOMER INFO -->
    <modal :show.sync="CustomerInfoModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">ข้อมูลลูกค้า</h2>
      <div class="row" v-if="UserInfo">
        <!-- IMAGE SECTION -->
        <div class="col-12 col-lg-4">
          <div class="form-row">
            <card class="card-primary">
              <img :src="UserInfo.image" />  
            </card>
          </div>
        </div>
        <!-- INFO SECTION -->
        <div class="col-12 col-lg-8">
          <div class="form-row">
            <h4>{{UserInfo.firstNameThai}} {{UserInfo.lastNameThai}} ({{UserInfo.firstNameEng}} {{UserInfo.lastNameEng}})</h4>
          </div>
          <div class="form-row mt-2">
            <div class="col-12 col-lg-4">
              <label>เลขที่บัตรประจำตัวประชาชน</label>
            </div>
            <div class="col-12 col-lg-8">
              <label>Email Address</label>
            </div>
          </div>
          <div class="form-row">
            <div class="col-12 col-lg-4">
              <p>{{UserInfo.citizenId}}</p>
            </div>
            <div class="col-12 col-lg-8">
              <p>{{UserInfo.email}}</p>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col-12">
              <label>ที่อยู่ที่สามารถติดต่อได้</label>
            </div>
            <div class="col-12">
              <p>{{UserInfo.addressLine}}, {{UserInfo.subDistrict}}, {{UserInfo.district}}, {{UserInfo.province}} {{UserInfo.postalCode}}</p>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col-12">
              <label>เบอร์โทรศัพท์ติดต่อ</label>
            </div>
            <div class="col-12">
              <p>{{UserInfo.phoneNum}}</p>
            </div>
          </div>

        </div>
      </div>
    </modal>

    <!-- DELETE MODAL -->
    <modal :show.sync="DeleteBuyStockModal" modal-classes="modal-md" >
      <h2 slot="header" class="modal-title">ลบสินค้า</h2>
      <div v-if="deleteId">
        <form @submit="onSubmit" @reset="onReset">
          <div class="form-row">
            <div class="col-12 text-center">
              ท่านต้องการลบสต๊อกสินค้าเลขที่ {{deleteId}} หรือไม่
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="col-12 col-lg-6">
              <base-button block type="danger"
                           class="animation-on-hover"
                           native-type="submit"
              >ลบสินค้า</base-button>
            </div>
            <div class="col-12 col-lg-6">
              <base-button block simple type="default"
                           class="animation-on-hover"
                           native-type="reset"
              >ยกเลิก</base-button>
            </div>
          </div>
        </form>
      </div>
      
      
    </modal>
  </div>
</template>

<script>
import {BaseButton, BaseTable, Modal} from 'src/components';
import BuyStockInfo from './BuyStockInfo.vue';
import BuyStockDataService from '../../../services/BuyStockDataService.js';
import CustomersDataService from '../../../services/CustomersDataService.js';
import UsersDataService from '../../../services/UsersDataService.js';

export default {
  components: {
    BaseButton,
    BaseTable,
    Modal,
    BuyStockInfo,
    BuyStockDataService,
    CustomersDataService,
    UsersDataService
  },
  props: ['buyStockTable'],
  data() {
    return {
      BuyProductInfoModal: false,
      CustomerInfoModal: false,
      DeleteBuyStockModal: false,
      InfoForm: {},
      CustomerProfile: {},
      UserInfo: {},
      userId: 0,
      deleteId: ''
    }
  },
  computed: {
    
  },
  methods: {
    openBuyProductModal(row) {
      this.BuyProductInfoModal = true;
      // this.retrieveBuyProductInfo(row);
      this.retrieveCustomerInfo(row);
      this.retrieveBuyProductInfo(row);
    },
    openUserInfoModal(CustomerProfile) {
      this.userId = CustomerProfile.userId;

      UsersDataService.findById(this.userId).then(res => {
        this.UserInfo = res.data;
        this.CustomerInfoModal = true;
      }).catch(e => {
        console.log(e);
      });
    },

    // Retrieve Section
    retrieveBuyProductInfo(row) {
      BuyStockDataService.findByStockId(row.stockId).then(res => {
        // console.log(res.data);
        this.InfoForm = res.data[0];
      }).catch(e => {
        console.log(e);
      });
    },
    retrieveCustomerInfo(row) {
      CustomersDataService.getCustomerById(row.customerId).then(res => {
        // console.log(res.data);
        this.CustomerProfile = res.data;
      }).catch(e => {
        console.log(e);
      })
    },

    // Delete Section
    openDeleteBuyStockModal(row) {
      this.deleteId = row.stockId;
      // console.log(row.stockId);
      this.DeleteBuyStockModal = true;
    },
    onSubmit(evt) {
      BuyStockDataService.deleteOne(this.deleteId).then(res => {
        this.deleteId = '';
        this.DeleteBuyStockModal = false;
      }).catch(e => {
        console.log(e);
      });
    },
    onReset(evt) {
      evt.preventDefault();
      this.deleteId = '';
      this.DeleteBuyStockModal = false;
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>