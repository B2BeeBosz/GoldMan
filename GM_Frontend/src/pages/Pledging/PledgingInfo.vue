<template>
  <div>
    <div class="row">
      <!-- USER SECTION -->
      <div class="col-12 col-lg-4">
        <div class="form-row">
          <card class="card-primary">
            <div class="col-12"> 
              <img :src="UserInfo.image">
            </div>
            <div class="col-12 mt-3">
              <label>ชื่อผู้นำฝาก</label>
              <p>{{UserInfo.firstNameThai}} {{UserInfo.lastNameThai}}</p>
            </div>
            <div class="col-12 mt-2">
              <base-button block type="default" class="animation-on-hover"
                           @click="openMoreUserInfoModal(UserInfo)"
              >ดูข้อมูลลูกค้า</base-button>
              
              <base-button block type="success" class="animation-on-hover"
                           @click="openExtendPledgingModal(PledgingInfo)"
              >ขยายระยะเวลาขายฝาก</base-button>
              
              <base-button block type="danger" class="animation-on-hover"
                           @click="openRemovePledgingAlert(PledgingInfo)"
              >ลบรายการขายฝาก</base-button>
            </div>
          </card>
        </div>
      </div>

      <!-- PLEDGING DATA SECTION -->
      <div class="col-12 col-lg-8">
        <!-- ROW 1 -->
        <div class="form-row">
          <label>รายการขายฝากทอง</label>
          <div class="col-12">
            <card card-body-classes="table-responsive">
              <div class="table-overflow-horizontal">
                <base-table :data="PledgingStockTable" thead-classes="text-primary">
                  <template slot="columns">
                    <th class="text-center">ลำดับที่</th>
                    <th class="text-center">รหัสสต๊อก</th>
                    <th class="text-center">ชื่อสินค้า</th>
                    <th class="text-center">น้ำหนักทองชั่ง</th>
                    <th class="text-center">วันที่ครบกำหนด</th>
                  </template>

                  <template slot-scope="{row, index}">
                    <td class="text-center" style="min-width: 50px">{{index + 1}}</td>
                    <td class="text-center" style="min-width: 100px">{{row.stockId}}</td>
                    <td class="text-center" style="min-width: 200px">{{row.productName}}</td>
                    <td class="text-center" style="min-width: 90px">{{row.goldWeight}}</td>
                    <td class="text-center" style="min-width: 150px">{{PledgingInfo.dueDate}}</td>
                  </template>
                </base-table>
              </div>
            </card>
          </div>
        </div>
        
        <!-- ROW 2 -->
        <div class="form-row">
          <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
            <div class="form-row">
              <label>รหัสรายการ</label>
            </div>
            <div class="form-row">
              <h4>{{PledgingInfo.transactionId}}</h4>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
            <div class="form-row">  
              <label>วันที่นำเข้า</label>
            </div>
            <div class="form-row">
              <h4>{{PledgingInfo.date}}</h4>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
            <div class="form-row">
              <label>จำนวนเงินขาย (บาท)</label>
            </div>
            <div class="form-row" v-if="PledgingInfo.netPrice != null">
              <h4>{{PledgingInfo.netPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</h4>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
            <div class="form-row">  
              <label>ดอกเบี้ยต่อเดือน (บาท)</label>
            </div>
            <div class="form-row" v-if="PledgingInfo.interests != null">
              <h4>{{PledgingInfo.interests.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</h4>
            </div>
          </div>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
import {BaseButton, BaseInput, BaseTable, Modal} from 'src/components';
import PledgingDataService from '../../services/PledgingDataService';
import PledgingStockDataService from '../../services/PledgingStockDataService';
import ExtendPledging from './Options/ExtendPledging.vue';

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTable,
    Modal,
    ExtendPledging,
    PledgingDataService,
    PledgingStockDataService
  },
  props: ['PledgingInfo', 'UserInfo', 'PledgingStockTable'],
  data() {
    return {
      MoreUserInfoModal: false,
      DeletePledgingModal: false,
      ExtendPledgingModal: false,
      ExtendPledgingData: {},
    };
  },
  computed: {

  },
  methods: {
    // ดูข้อมูลลูกค้า
    openMoreUserInfoModal(UserInfo) {
      this.$emit('openUserInfoModal', UserInfo);
      // this.MoreUserInfoModal = true;
    },
    // ขยายระยะเวลาขายฝาก
    openExtendPledgingModal(PledgingInfo) {
      this.$emit('openExtendPledgingModal', PledgingInfo);
      // console.log(PledgingInfo);
      // this.ExtendPledgingData = PledgingInfo;
      // this.ExtendPledgingModal = true;
    },
    closeExtendModal() {

      // this.ExtendPledgingModal = false;
      // this.ExtendPledgingData = {};
    },
    // ลบข้อมูลขายฝาก
    openRemovePledgingAlert(PledgingInfo) {
      this.$emit('openRemovePledgingAlert', PledgingInfo.transactionId);
      // this.DeletePledgingModal = true;
    },

    refreshList() {
      this.$emit('refreshList');
    }
  },
}
</script>

<style scoped>
.table-overflow-horizontal {
  overflow-x: auto;
}
</style>