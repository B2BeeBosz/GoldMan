<template>
  <div class="row">
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <div class="row">
          <!-- FILTER FORM -->
          <div class="col-10">
            <collapse :active-index="0">
              <collapse-item title="ตัวเลือกคำค้นหา" name='1'>
                <filter-form-pledging
                  @getId="onFilterId"
                  @getDate="onFilterDate"
                  @getDueDate="onFilterDueDate"
                  @getCustomerName="onFilterCustomerName"
                />
              </collapse-item>
            </collapse>
          </div>
          
          <!-- ADD PLEDGING MODAL -->
          <div class="col-2">
            <add-pledging-accounting
              :BuyPrice="buyPrice"
              @PledgingForm="addPledgingTransaction"
              @PledgingStock="addPledgingStock"
            />
            <interest-settings />
            <pledging-history />
            <div>
              <base-button block type="default" 
                           class="animation-on-hover"
                           @click="resetFilter"
              >ล้างคำค้นหา</base-button>
            </div>
          </div>
        </div>
      </card>
    </div>
    
    <!-- PLEDGING TABLE -->
    <div class="col-12">
      <card card-body-classes="table-responsive">
        <h4 class="card-category">รายการขายฝากทอง</h4>
        <pledging-table 
          :parentData="filteredTable"
          @returnPledging="openReturnPledgingModal"
          @showPledgingInfo="openPledgingInfoModal"
          @extendPledging="openNextDueDatePledgingModal"
        />
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
          ></base-pagination>
        </div>
      </card>
    </div>

    <modal :show.sync="ReturnPledgingModal" modal-classes="modal-dialog-centered modal-lg">
      <h2 slot="header" class="modal-title">ไถ่ถอนทองคืน</h2>
      <div v-if="ReturnPledgingData != {}">
        <return-pledging 
          :ReturnPledgingData="ReturnPledgingData"
          
        />
      </div>
    </modal>

    <modal :show.sync="NextDueDatePledgingModal" modal-classes="modal-dialog-centered modal-lg">
      <h2 slot="header" class="modal-title">ต่อดอกเบี้ย</h2>
      <div v-if="NextDueDatePledgingData != {}">
        <next-due-date-pledging
          :NextDueDatePledgingData="NextDueDatePledgingData"
          @closeNextDueDateModal="closeNextDueDateModal"
          @refreshList="refreshList"
        />
      </div>
    </modal>

    <modal :show.sync="PledgingInfoModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">ข้อมูลรายการขายฝาก</h2>
      <div v-if="PledgingInfo != {} && UserInfo != {}">
        <pledging-info 
          :PledgingInfo="PledgingInfo"
          :UserInfo="UserInfo"
          :PledgingStockTable="PledgingStockTable"
          @refreshList="refreshList"
          @openUserInfoModal="openUserInfoModal"
          @openExtendPledgingModal="openExtendPledgingModal"
          @openRemovePledgingAlert="openRemovePledgingAlert"
        />
      </div>
    </modal>

    <modal :show.sync="MoreUserInfoModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">ข้อมูลลูกค้า</h2>
      <div class="row" v-if="MoreUserInfoData != {}">
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
    
    <modal :show.sync="ExtendPledgingModal" modal-classes="modal-md">
      <h2 slot="header" class="modal-title">ขยายระยะเวลาขายฝาก</h2>
      <div v-if="ExtendPledgingData != {}"> 
        <extend-pledging 
          :ExtendPledgingData="ExtendPledgingData"
          @refreshList="refreshList"
          @closeExtendModal="closeExtendModal"
        />
      </div>
    </modal>

    <modal :show.sync="DeletePledgingModal" modal-classes="modal-md">
      <h2 slot="header" class="modal-title">ลบรายการขายฝาก</h2>
      <div class="form-row">
        <p class="text-center col-12">
          ท่านต้องการลบรายการเลขที่ {{PledgingInfo.transactionId}} ออกหรือไม่
        </p>
      </div>
      <div class="form-row mt-3">
        <div class="col-6">
          <base-button block type="danger" class="animation-on-hover" 
                       @click="removePledging">
            ลบสินค้า
          </base-button>
        </div>
        <div class="col-6">
          <base-button block simple @click="DeletePledgingModal = false">ยกเลิก</base-button>
        </div>
      </div>
    </modal>

      
  </div>
</template>

<script>
import AddPledgingAccounting from './AddPledgingAccounting.vue';
import FilterFormPledging from './FilterFormPledging.vue';
import PledgingTable from './PledgingTable.vue';
import InterestSettings from './Interest/InterestSettings.vue';
import PledgingInfo from './PledgingInfo.vue';
import NextDueDatePledging from './Options/NextDueDatePledging.vue';
import ReturnPledging from './Options/ReturnPledging.vue';
import ExtendPledging from './Options/ExtendPledging.vue';
import PledgingHistory from './PledgingHistory.vue';

import GoldPricesDataService from '../../services/GoldPricesDataService.js';
import PledgingDataService from '../../services/PledgingDataService.js';
import PledgingStockDataService from '../../services/PledgingStockDataService';
import UsersDataService from '../../services/UsersDataService';
import {BaseTable, BaseInput, BaseButton, BasePagination, Collapse, CollapseItem, Modal} from 'src/components';

export default {
  components: {
    BaseTable, 
    BaseInput, 
    BaseButton, 
    BasePagination,
    Collapse,
    CollapseItem,
    Modal,
    
    AddPledgingAccounting,
    FilterFormPledging,
    PledgingTable,
    InterestSettings,
    PledgingInfo,
    NextDueDatePledging,
    ReturnPledging,
    ExtendPledging,
    PledgingHistory,

    GoldPricesDataService,
    PledgingDataService,
    PledgingStockDataService,
    UsersDataService,
  },
  data() {
    return {
      pledgingTable: [],
      PledgingForm: {},
      FormDefault: {},
      
      // Update Pledging ต่อดอก ไถ่คืน
      ReturnPledgingData: {},
      NextDueDatePledgingData: {},
      ReturnPledgingModal: false,
      NextDueDatePledgingModal: false,
      // Extend Pledging
      ExtendPledgingData: {},
      ExtendPledgingModal: false,
      
      // Pledging Info
      PledgingInfoModal: false,
      MoreUserInfoModal: false,
      PledgingInfo: {},
      UserInfo: {},
      MoreUserInfoData: {},
      PledgingStockTable: [],

      // Delete Pledging
      DeletePledgingModal: false,
      deleteId: '',

      // Misc
      filterValue: '',
      timestamp: '',
      buyPrice: '',
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      },
    }
  },
  computed: {
    filteredTable() {
      let result = this.pledgingTable.filter(item => {
        const date = item.date.toString();
        const dueDate = item.dueDate.toString();
        const id = item.transactionId.toString();
        const customerName = item.customer.customerName.toString();
        
        const search = this.filterValue === '' ? '' : this.filterValue.toString();

        return date.includes(search) || 
               customerName.includes(search) ||
               id.includes(search) || 
               dueDate.includes(search);
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
      return this.pledgingTable.length > 0
        ? this.pledgingTable.length
        : this.pledgingTable.length;
    }
  },
  mounted() {
    this.setDate();
    this.refreshList();
  },
  methods: {
    // Initial GET Section
    setDate(){
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      this.timestamp = [year, month, day].join('-');

      this.retrieveGoldPrices();
    },
    retrieveGoldPrices() {
      GoldPricesDataService.findTodayLatest(this.timestamp)
        .then(res => {
          // console.log(res.data);
          this.buyPrice = res.data[0].gbBuyPrice;
          // this.sellPrice = res.data[0].gbSellPrice;
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrievePledging() {
      PledgingDataService.getAllTransactions().then(res => {
        // console.log(res.data);
        this.pledgingTable = res.data;
        // console.log(this.pledgingTable);
      }).catch(e => {
        console.log(e);
      });
    },
    refreshList() {
      this.retrievePledging();
    },

    // Add Section //
    addPledgingTransaction(data) {
      PledgingDataService.create(data).then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
    },
    addPledgingStock(data) {
      for (let i = 0; i < data.length; i++) {
        PledgingStockDataService.create(data[i]).then(res => {

        }).catch(e => {
          console.log(e);
        });
      }
    },

    // Update Section //
    updateByTransactionId(id, data) {
      PledgingDataService.update(id, data).then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
    },
    openReturnPledgingAlertModal(data) {
      this.alertReturnPledgingModal = true;
      this.updateTransactionId = data.transactionId;
      this.UpdateData = data;
    },
    updateByDeleteFlag(transactionId) {
      var data = this.UpdateData;
      
      PledgingDataService.deleteByFlag(transactionId, data).then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
      // Reset Settings
      this.updateTransactionId = null;
      this.UpdateData = {};
      this.alertModal = false;
    },
    
    // Delete Section //
    openRemovePledgingAlert(transactionId) {
      this.deleteId = transactionId;
      this.DeletePledgingModal = true;
    },
    removePledging() {
      const transactionId = this.PledgingInfo.transactionId;
      const DeleteByFlag = {
        deleteFlag: 1
      };

      PledgingDataService.deleteByFlag(transactionId, DeleteByFlag).then(res => {
        PledgingStockDataService.update(transactionId, DeleteByFlag).then(res => {
          this.DeletePledgingModal = false;
          this.$emit("ClosePledgingInfoModal");
        }).catch(e => {
          console.log(e);
        });
      }).catch(e => {
        console.log(e);
      });
    },


    // Return Pledging Section //
    openReturnPledgingModal(ExportData) {
      console.log(ExportData);
      this.ReturnPledgingData = ExportData;
      this.ReturnPledgingModal = true;
    },
    closeReturnModal() {
      this.ReturnPledgingModal = false;
      this.ReturnPledgingData = {};
    },
    
    // NextDueDate Pledging Section //
    openNextDueDatePledgingModal(ExportData) {
      console.log(ExportData);
      this.NextDueDatePledgingData = ExportData;
      this.NextDueDatePledgingModal = true;
    },
    closeNextDueDateModal() {
      this.NextDueDatePledgingModal = false;
      this.NextDueDatePledgingData = {};
    },
    // Extend Pledging Section //
    openExtendPledgingModal(PledgingInfo) {
      this.ExtendPledgingData = PledgingInfo;
      this.ExtendPledgingModal = true;
    },
    closeExtendModal() {
      this.ExtendPledgingModal = false;
      this.ExtendPledgingData = {};
    },

    // Search Section //
    onFilterId(id) {
      this.filterValue = id.toString();
    },
    onFilterDate(date) {
      this.filterValue = date.toString();
    },
    onFilterDueDate(date) {
      this.filterValue = date.toString();
    },
    onFilterNextDueDate(date) {
      this.filterValue = date.toString();
    },
    onFilterCustomerName(name) {
      this.filterValue = name.toString();
    },
    resetFilter() {
      this.filterValue = '';
      this.refreshList();
    },

    // Show Infomation Section //
    openPledgingInfoModal(row) {
      // console.log(row);
      const userId = row.customer.userId;
      const transactionId = row.transactionId;

      UsersDataService.findById(userId).then(res => {
        // console.log(res.data);
        this.UserInfo = res.data;

        PledgingStockDataService.findByTransactionId(transactionId).then(res => {
          // console.log(res.data);
          this.PledgingStockTable = res.data;
        }).catch(e => {
          console.log(e);
        });
      }).catch(e => {
        console.log(e);
      });
      this.PledgingInfo = row;
      this.PledgingInfoModal = true;
    },
    closePledgingInfoModal() {
      this.PledgingInfoModal = false;
      this.PledgingInfo = {};
      this.UserInfo = {};
    },
    openUserInfoModal(UserInfo) {
      this.MoreUserInfoData = UserInfo;
      this.MoreUserInfoModal = true;
    },
    closeUserInfoModal() {

    }

    
  }
}
</script>

<style scoped>

</style>