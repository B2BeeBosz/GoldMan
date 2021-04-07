<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="table-shopping">
        <base-table :data="stockTable" thead-classes="text-primary" 
                    class="table-overflow-horizontal">
          <template slot="columns">
            <th class="text-center">รหัสสต๊อก</th>
            <th class="text-center">รหัสรายการขายฝาก</th>
            <th class="text-center">ชื่อสินค้า</th>
            <th class="text-center">น้ำหนักทองชั่ง</th>
            <th class="text-center">จำนวนสินค้า</th>
            <th class="text-center">ชื่อลูกค้า</th>
            <th class="text-center">วันที่ครบกำหนด</th>
            <th class="text-center">สถานะ</th>
            <th class="text-center">ตัวเลือก</th>
          </template>

          <template slot-scope="{row}">
            <td class="text-center" style="min-width: 100px">{{row.stockId}}</td>
            <td class="text-center" style="min-width: 100px">{{row.transactionId}}</td>
            <td class="text-center" style="min-width: 200px">{{row.productName}}</td>
            <td class="text-center" style="min-width: 80px">{{row.goldWeight}}</td>
            <td class="text-center" style="min-width: 60px">{{row.quantity}}</td>
            <td class="text-center" style="min-width: 150px">{{row.pledging.customer.customerName}}</td>
            <td class="text-center" style="min-width: 80px">{{row.pledging.dueDate}}</td>
            <td class="text-center" style="min-width: 80px">
              <div v-if="isOverDue(row) === false">
                ยังไม่เลยกำหนด
              </div>
              <div v-else>
                เลยกำหนด
              </div>
            </td>
            <td class="text-center" style="min-width: 70px">
              <!-- <el-tooltip content="ดูข้อมูลรายการขายฝาก" :open-delay="300" placement="top">
                <base-button type="info" class="btn-link"
                             @click="openPledgingInfoModal(row)">
                  <i class="tim-icons icon-alert-circle-exc"></i>
                </base-button>
              </el-tooltip> -->
              <el-tooltip content="นำเข้าสต๊อกทองเก่า" :open-delay="300" placement="top">
                <base-button type="warning" class="btn-link"
                             @click="openSendToBuyStockModal(row)">
                  <i class="tim-icons icon-app"></i>
                </base-button>
              </el-tooltip>
            </td>
          </template>
        </base-table>
      </div>      
    </div>
    
    <modal :show.sync="PledgingInfoModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">ข้อมูลขายฝากทอง</h2>
    </modal>

    <modal :show.sync="SendToBuyStockModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">นำเข้าสต๊อกทองเก่า</h2>
      <form @submit="onSubmitExport" @reset="onResetExport">
        <div class="row">
          <div class="col-8">
            <div class="form-row">
              <base-input class="col-sm-12 col-lg-6" type="text" 
                label="รหัสสต๊อกทองเก่า" placeholder="BS00001"
                v-model="SendToBuyStockForm.stockId"
                required
              />
              <!-- <base-input class="col-sm-12 col-lg-6" type="text" 
                label="รหัสรายการขายฝาก"
                :value="SendToBuyStockForm.transactionId"
                disabled
              /> -->
            </div>
            <div class="form-row">
              <base-input class="col-sm-12 col-lg-12" type="text" 
                label="ชื่อสินค้า" placeholder="สร้อยคอ 96.5% 1 บาท"
                v-model="SendToBuyStockForm.productName"
                required
              />
              <base-input class="col-sm-12 col-lg-4" type="text" 
                label="น้ำหนักทอง (กรัม)"
                v-model="SendToBuyStockForm.goldWeightTotal"
                required
              />
              <base-input class="col-sm-12 col-lg-4" type="number" min="0" 
                label="จำนวน (ชิ้น)"
                v-model="SendToBuyStockForm.quantity"
                required
              />
            </div>
            <div class="form-row">
              <label class="mt-3">รายละเอียดข้อมูลผู้ขายฝาก</label>
            </div>
            <div class="form-row">
              <base-input class="col-sm-12 col-lg-6" type="text" 
                label="เลขประจำตัวประชาชน"
                v-model="SendToBuyStockForm.customer.users.citizenId"
                required
              />
              <base-button simple class="filter-button"
                @click="retrieveCustomerData(SendToBuyStockForm.customer.users.citizenId)"
              >
                <i class="tim-icons icon-zoom-split"/>
              </base-button>
            </div>
            <div class="form-row">  
              <base-input class="col-sm-12 col-lg-6" type="text" 
                label="ชื่อผู้ขายฝาก (ลูกค้า)"
                v-model="SendToBuyStockForm.customer.customerName"
                required
              />
              <base-input class="col-sm-12 col-lg-4" type="text" 
                label="เบอร์โทรศัพท์"
                v-model="SendToBuyStockForm.customer.users.phoneNum"
                required
              />
            </div>
            
            <div class="form-row mt-3">
              <!-- <div class="col-sm-12 col-lg-6" v-if="isOverDue(RowData) === false">
                <base-button block type="warning" disabled
                             class="animation-on-hover"
                >ยืนยันรายการ</base-button>
              </div> -->
              <div class="col-sm-12 col-lg-6">
                <base-button block type="warning" native-type="submit"
                             class="animation-on-hover"
                >ยืนยันรายการ</base-button>
              </div>
              <div class="col-sm-12 col-lg-6">
                <base-button simple block type="warning" native-type="reset"
                             
                >ล้างรายการ</base-button>
              </div>
              
            </div>
          </div>
          
          <div class="col-4">
            <card class="card-primary">
              <!-- <img :src="SendToBuyStockForm.customer.users.image" /> -->
              <label>รหัสรายการขายฝาก</label>
              <h4>{{setTransactionId}}</h4>
              <label>สถานะรายการขายฝาก</label>
              <h4>ยังไม่เลยกำหนด</h4>
              <label>วันที่นำเข้าสต๊อกทองเก่า</label>
              <h4>{{setInputDate}}</h4>
            </card>
          </div>

        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import {BaseButton, BaseTable, BaseInput, BasePagination, Modal} from 'src/components';
import CustomerDataService from '../../../services/CustomersDataService.js';
import BuyStockDataService from '../../../services/BuyStockDataService.js';
import PledgingStockDataService from '../../../services/PledgingStockDataService.js';

export default {
  components: {
    BaseButton,
    BaseInput,
    BasePagination,
    BaseTable,
    Modal,
    BuyStockDataService,
    CustomerDataService
  },
  props: ['stockTable'],
  data() {
    return {
      timestamp: '',
      PledgingInfoModal: false,
      SendToBuyStockModal: false,
      RowData: {
        pledging: {
          dueDate: '',
          transactionId: ''
        }
      },
      SendToBuyStockForm: {
        stockId: '',
        transactionId: '',
        date: '',
        productName: '',
        quantity: 0,
        goldWeightTotal: 0,
        shopId: 1,
        customer: {
          customerId: 0,
          customerName: '',
          users: {
            citizenId: '',
            phoneNum: '',
            image: ''
          }
        }
      },
      SendToBuyStockFormDefault: {
        stockId: '',
        transactionId: '',
        date: '',
        productName: '',
        quantity: 0,
        goldWeightTotal: 0,
        shopId: 1,
        customer: {
          customerId: 0,
          customerName: '',
          users: {
            citizenId: '',
            phoneNum: '',
            image: ''
          }
        }
      }
    }
  },
  computed: {
    setTransactionId() {
      return this.SendToBuyStockForm.transactionId;
    },
    setInputDate() {
      return this.SendToBuyStockForm.date;
    }
  },
  methods: {
    setDate() {
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      this.timestamp = [year, month, day].join('-');
    },
    isOverDue(row) {
      var date = this.timestamp.split('-');
      var date2 = row.pledging.dueDate.split('-');

      // console.log(date2)
      var today = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
      var dueDate = new Date(parseInt(date2[0]), parseInt(date2[1]), parseInt(date2[2]));

      // console.log(today > dueDate);
      if (today > dueDate) {
        return true;
      } else {
        return false;
      }
    },

    // Pledging Infomation
    openPledgingInfoModal(row) {
      this.PledgingInfoModal = true;
    },
    
    // Sending Pledging Product to Buy Stock
    openSendToBuyStockModal(row) {
      // console.log(row);
      this.RowData = row;
      this.SendToBuyStockModal = true;
      this.SendToBuyStockForm.transactionId = row.transactionId;
      this.SendToBuyStockForm.date = this.timestamp;
      this.SendToBuyStockForm.productName = row.productName;
      this.SendToBuyStockForm.goldWeightTotal = row.goldWeight;
      this.SendToBuyStockForm.quantity = row.quantity;
      // this.SendToBuyStockForm.customer.customerName = row.pledging.customer.customerName;
    },
    retrieveCustomerData(citizenId) {
      CustomerDataService.getCustomerByCitizenId(citizenId).then(res => {
        // console.log(res.data);
        this.SendToBuyStockForm.customer.customerId = res.data.customerId;
        this.SendToBuyStockForm.customer.customerName = res.data.customerName;
        this.SendToBuyStockForm.customer.users.citizenId = res.data.users.citizenId;
        this.SendToBuyStockForm.customer.users.phoneNum = res.data.users.phoneNum;
      }).catch(e => {
        console.log(e);
      });
    },
    createBuyStock(data) {
      var BuyStock = {
        stockId: data.stockId,
        transactionId: data.transactionId,
        date: data.date,
        productName: data.productName,
        quantity: data.quantity,
        goldWeightTotal: data.goldWeightTotal,
        customerId: data.customer.customerId,
        shopId: data.shopId
      }
      BuyStockDataService.create(BuyStock).then(res => {

      }).catch(e => {
        console.log(e);
      });
    },

    updateDeleteFlag(stockId, deleteFlagNum) {
      PledgingStockDataService.update(stockId, {
        deleteFlag: deleteFlagNum
      }).then(res => {

      }).catch(e => {
        console.log(e);
      });
    },

    onSubmitExport(evt) {
      // evt.preventDefault();
      // console.log(this.SendToBuyStockForm);
      this.createBuyStock(this.SendToBuyStockForm);
      this.updateDeleteFlag(this.RowData.stockId, 1);
      this.resetForm();
    },
    onResetExport(evt) {
      evt.preventDefault();
      this.SendToBuyStockForm.transactionId = row.transactionId;
      this.SendToBuyStockForm.date = this.timestamp;
      this.SendToBuyStockForm.productName = row.productName;
      this.SendToBuyStockForm.goldWeightTotal = row.goldWeight;
      this.SendToBuyStockForm.quantity = row.quantity;
      //
      this.SendToBuyStockForm.customer.customerId = 0;
      this.SendToBuyStockForm.customer.customerName = '';
      this.SendToBuyStockForm.customer.users.citizenId = '';
      this.SendToBuyStockForm.customer.users.phoneNum = '';
    },
    resetForm() {
      this.SendToBuyStockForm = this.SendToBuyStockFormDefault;
      this.RowData = {
        pledging: {
          dueDate: '',
          transactionId: ''
        }
      }
    },
  },
  mounted() {
    this.setDate();
  }
}
</script>

<style>
.table-overflow-horizontal {
  overflow-x: auto;
}
.filter-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>