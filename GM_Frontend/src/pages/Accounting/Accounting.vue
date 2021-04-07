<template>
  <!-- <div class="content"> -->
  <div class="row">
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <div class="row">
          <div class="col-md-10">
            <div class="text-left">
              <collapse :active-index="0">
                <collapse-item title="ตัวเลือกคำค้นหา" name="1">
                  <filter-form-acc 
                    :employeeOptions="employeeOptions"
                    :groupOptions="groupOptions"
                    @getFilterTransaction="onFilterTransaction"
                    @getFilterProductName="onFilterProductName"
                    @getFilterGroup="onFilterGroup"
                    @getFilterEmployeeId="onFilterEmployeeId"
                    @getDate="onFilterDate"
                  ></filter-form-acc>
                </collapse-item>
              </collapse>
            </div>
          </div>
          <div class="col-md-2 d-flex d-sm-block">
            <add-accounting 
              :employeeOptions="employeeOptions"
              :groupOptions="groupOptions"
              :bahtOptions="bahtOptions"
              @FormAccounting="addTransaction"
              @FormAccountingBuy="addTransactionBuy"
              @BuyStockTable="addBuyStock"
              @ResetFilter="resetFilter"
            />
          </div>
        </div>
      </card>
    </div>
    
    <div class="col-12">
      <card card-body-classes="table-responsive">
        <h4 class="card-category">
          รายการซื้อขายวันที่ {{timestamp}} ราคาทองแท่ง {{buyPrice}} บาท - {{sellPrice}} บาท
        </h4>
        <accounting-table 
          :parentData="filteredTable"
          @onUpdate="openEditModal"
          @onDelete="openAlertModal"
        ></accounting-table>
        <div slot="footer"
             class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
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

    <!-- <div class="col-12" v-if="role == 'employee'">
      <card card-body-classes="table-responsive">
        <h4 class="card-category">รายการซื้อขายวันที่ {{timestamp}} ราคาทองแท่ง {{buyPrice}}-{{sellPrice}}</h4>
        <accounting-table 
          :parentData="transactions"
          @onUpdate="openEditModal"
          @onDelete="openAlertModal"
        ></accounting-table>
        <div slot="footer"
             class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
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
    </div>  -->
      
    <!-- Edit Accounting -->
    <modal :show.sync="editModal" modal-classes="modal-dialog-centered modal-xl">
      <edit-accounting
        :FormDefault="FormDefault"
        :groupOptions="groupOptions"
        :bahtOptions="bahtOptions"
        :employeeOptions="employeeOptions"
        @onSubmitEdit="onSubmittedEdit"
      ></edit-accounting>
    </modal>

    <!-- Delete Accounting -->
    <modal :show.sync="alertModal" modal-classes="modal-md">
        <h2 slot="header" class="modal-title">ลบรายการ</h2>
        <div class="form-row">
          <p class="text-center">ท่านต้องการลบรายการหรือไม่</p>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <!-- removeTransactionById(deleteTransactionId) -->
            <!-- updateDeletedGraph(deleteData) -->
            <base-button block type="danger" class="animation-on-hover" 
                        @click="removeTransactionById(deleteTransactionId)">
              ลบรายการ
            </base-button>
          </div>
          <div class="col-6">
            <base-button block simple @click="alertModal = false">ยกเลิก</base-button>
          </div>
        </div>
    </modal>

  </div>
  <!-- </div> -->
</template>

<script>
import AccountingTable from './AccountingTable.vue'
// import AccountingTableBuy from './AccountingTableBuy.vue';
import AddAccounting from './AddAccounting.vue'
import FilterFormAcc from './FilterFormAcc.vue'
import EditAccounting from './EditAccounting.vue'
import {Collapse, CollapseItem, Modal, BasePagination} from '@/components'
import AccountingDataService from '../../services/AccountingDataService'
import GoldPricesDataService from '../../services/GoldPricesDataService';
import DashboardDataService from '../../services/DashboardDataService';
import BuyStockDataService from '../../services/BuyStockDataService'
import EmployeesDataService from '../../services/EmployeesDataService'

export default {
  components: {
    AccountingTable,
    // AccountingTableBuy,
    AddAccounting,
    FilterFormAcc,
    EditAccounting,
    AccountingDataService,
    GoldPricesDataService,
    DashboardDataService,
    Collapse,
    CollapseItem,
    Modal,
    BasePagination
  },
  data() {
    return {
      transactions: [],
      // transactionsbuy: [],
      FormAccounting: {},
      FormDefault: {},
      deleteTransactionId: '',
      deleteData: {},
      groupOptions: [
        { id: 'G96', name: 'ทองรูปพรรณ 96.5%' },
        { id: 'G99', name: 'ทองรูปพรรณ 99.99%' },
        { id: 'GB96', name: 'ทองคำแท่ง 96.5%' },
        { id: 'GB99', name: 'ทองคำแท่ง 99.99%' }
      ],
      bahtOptions: [
        { id: '1', name: '1 สลึง', value: '3.79' },
        { id: '2', name: '2 สลึง', value: '7.58' },
        { id: '3', name: '3 สลึง', value: '11.37' },
        { id: '4', name: '1 บาท', value: '15.16' },
        { id: '5', name: '2 บาท', value: '30.32' },
        { id: '6', name: '3 บาท', value: '45.48' },
        { id: '7', name: '4 บาท', value: '60.64' },
        { id: '8', name: '5 บาท', value: '75.80' },
      ],
      employeeOptions: [
        { id: 1001, name: 'ศุภเดช บริสุทธนารักษ์' },
        { id: 1201, name: 'ชัญญารัตน์ ทองแหยม' },
        { id: 1301, name: 'กฤษฎิ์ อุปนันท์' }
      ],
      editModal: false,
      alertModal: false,
      role: 'owner',
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      },
      timestamp: '',
      buyPrice: '',
      sellPrice: '',
      filterValue: ''
    }
  },
  mounted() {
    this.refreshList();
    this.setDate();
  },
  computed: {
    filteredTable() {
      let result = this.transactions.filter(item => {
        const date = item.date.toString();
        // const productName = item.accountings_inventory.inventory.productName.toString();
        const id = item.transactionId.toString();
        // const group = item.accountings_inventory.inventory.group.toString();
        const employeeName = item.employee.employeeName.toString();
        
        const search = this.filterValue === '' ? '' : this.filterValue.toString();

        return date.includes(search) || 
              //  productName.includes(search) ||
               id.includes(search) || 
              //  group.includes(search) ||
               employeeName.includes(search);
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
      return this.transactions.length > 0
        ? this.transactions.length
        : this.transactions.length;
    }
  },
  methods: {
    setDate(){
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      this.timestamp = [year, month, day].join('/');

      this.retrieveGoldPrices();
    },
    
    // Retrieve
    refreshList() {
      this.retrieveAccounting();
      // this.retrieveAccountingBuy();
    },
    retrieveAccounting() {
      AccountingDataService.getAll()
        .then(res => {
          this.transactions = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveGoldPrices() {
      GoldPricesDataService.findTodayLatest(this.timestamp)
        .then(res => {
          // console.log(res.data);
          this.buyPrice = res.data[0].gbBuyPrice;
          this.sellPrice = res.data[0].gbSellPrice;
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Filtering
    onFilterTransaction(transactionId) {
      this.filterValue = transactionId;
    },
    onFilterProductName(name) {
      this.filterValue = name;
    },
    onFilterGroup(group) {
      this.filterValue = group;
    },
    onFilterEmployeeId(id) {
      EmployeesDataService.findById(id).then(res => {
        console.log(res.data);
        this.filterValue = res.data[0].employeeName;
      }).catch(e => {
        console.log(e);
      });
    },
    onFilterDate(date) {
      AccountingDataService.findByDate(date).then(res => {
        this.transactions = res.data;
        var dateTemp = date.split('-');
        this.timestamp = dateTemp.join('/');
      })
    },
    resetFilter() {
      this.filterValue = '';
      this.setDate();
      this.retrieveAccounting();
    },

    // Create
    addTransaction(data) {
      // console.log(data);
      AccountingDataService.create(data)
        .then(res => {
          this.refreshList();
          // this.updateGraph(data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    addTransactionBuy(data) {
      var ExportData = {
        transactionId: data.transactionId,
        date: data.date,
        employeeId: data.employeeId,
        goldPrice: data.goldPrice,
        goldWeight: 0,
        goldWeightTotal: 0,
        netPrice: data.netPrice,
        productId: '',
        quantity: 0,
        shopId: 1,
        transactionType: data.transactionType
      }
      AccountingDataService.create(ExportData).then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
    },
    addBuyStock(data) {
      // console.log(data);
      for(let i = 0; i < data.length; i++) {
        BuyStockDataService.create(data[i]).then(res => {
          // console.log(res.data);
        }).catch(e => {
          console.log(e);
        });
      }
    },
    // updateGraph(addData) {
    //   // console.log(addData);
    //   var netPrice = {
    //     netPriceSell: 0,
    //     netPriceBuy: 0
    //   }
    //   DashboardDataService.getTodayGraph().then(res => {
    //     // console.log(res.data);
    //     netPrice.netPriceSell = res.data[0].netPriceSell;
    //     netPrice.netPriceBuy = res.data[0].netPriceBuy;
    //     // console.log(netPrice);
    //   }).catch(e => {
    //     console.log(e);
    //   });
      
    //   if (addData.transactionType === 'ขายออก') {
    //     netPrice.netPriceSell += parseFloat(addData.netPrice);
    //     DashboardDataService.updateCurrentGraph(addData.date, netPrice)
    //       .then(res => {
    //         // console.log(netPrice);
    //       }).catch(e => {
    //         console.log(e);
    //       });
    //   } else {
    //     netPrice.netPriceBuy += parseFloat(addData.netPrice);
    //     DashboardDataService.updateCurrentGraph(addData.date, netPrice)
    //       .then(res => {}).catch(e => {
    //         console.log(e);
    //       });
    //   }
      
    // },

    // Update
    openEditModal(data) {
      // console.log(data);
      // this.FormAccounting = data;
      this.FormDefault = data;
      this.editModal = true;
    },
    onSubmittedEdit(updatedData) {
      var id = updatedData.transactionId;
      var data = updatedData;
      this.updateTransactionById(id, data);
      this.editModal = false;
    },
    updateTransactionById(id, data) {
      AccountingDataService.update(id, data)
        .then(res => {
          console.log(res.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      // Reset Settings
      this.FormAccounting = {};
      this.FormDefault = {};
    },

    // Delete
    openAlertModal(data) {
      // console.log(data);
      this.alertModal = true;
      this.deleteTransactionId = data.transactionId;
      this.deleteData = data;
    },
    removeTransactionById(deleteId) {
      AccountingDataService.deleteTransaction(deleteId)
        .then(res => {
          // this.updateDeletedGraph(this.deleteData);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      // Reset Settings
      this.deleteTransactionId = '';
      this.alertModal = false;
    },
    // updateDeletedGraph(deletedData) {
    //   // console.log(deletedData);
    //   var netPrice = {
    //     netPriceSell: 0,
    //     netPriceBuy: 0
    //   }
    //   DashboardDataService.getTodayGraph().then(res => {
    //     netPrice.netPriceSell = res.data[0].netPriceSell;
    //     netPrice.netPriceBuy = res.data[0].netPriceBuy;
    //   }).catch(e => {
    //     console.log(e);
    //   });
      
    //   if (deletedData.transactionType === 'ขายออก') {
    //     netPrice.netPriceSell -= parseFloat(deletedData.accountings_inventory.netPrice);
    //     DashboardDataService.updateCurrentGraph(deletedData.date, netPrice)
    //       .then(res => {
    //         // console.log(netPrice);
    //         this.deleteData = {};
    //       }).catch(e => {
    //         console.log(e);
    //       });
    //   } else {
    //     netPrice.netPriceBuy -= parseFloat(deletedData.accountings_inventory.netPrice);
    //     DashboardDataService.updateCurrentGraph(deletedData.date, netPrice)
    //       .then(res => {}).catch(e => {
    //         console.log(e);
    //       });
    //   }
    // }
  }
};
</script>
