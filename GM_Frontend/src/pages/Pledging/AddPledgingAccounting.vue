<template>
  <div>    
    <base-button block type="warning" 
                 class="animation-on-hover"
                 @click="addTransactionClick">
      เพิ่มรายการขายฝาก  
    </base-button>
    
    <modal :show.sync="AddPledgingTransactionModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">เพิ่มรายการขายฝาก</h2>
      <div>
        <form @submit="onSubmit" @reset="onReset">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div class="form-row">
                <label>สต๊อกขายฝาก</label>
              </div>
              <div class="form-row">
                <base-button 
                  class="col-sm-12 col-md-12 col-lg-4 col-xl-3 
                         auto-fill-button mb-2"
                  simple type="default"
                  @click="addPledgingStock"
                >เพิ่มสต๊อก</base-button>
              </div>
              
              <!-- PLEDGING STOCK TABLE -->
              <div class="form-row">
                <card card-body-classes="table-full-width">
                  <div class="vertical-scroll horizontal-scroll">
                    <pledging-inventory 
                      :stockTable="StockTable"
                      :groupOptions="GroupOptions"
                      @removeItemData="removePledgingStock"
                    />
                  </div>
                </card>
              </div>

              <!-- FORM -->
              <div class="form-row">
                <base-input 
                  class="col-sm-12 col-md-12 col-lg-4 col-xl-4" label="วันที่นำเข้า" type="date"
                  max="2030-12-31" min="1984-01-01"
                  v-model="PledgingForm.date" required/>
                <base-input 
                  class="col-sm-12 col-md-12 col-lg-4 col-xl-4" label="ระยะเวลา (เดือน)" type="number" min="1" max="12"
                  v-model="PledgingForm.duration" />
                <base-input
                  class="col-sm-12 col-md-12 col-lg-4 col-xl-4" label="จำนวนเงินสุทธิ" type="text"
                  v-model="PledgingForm.netPrice" required
                />
              </div>

              <!-- CUSTOMER INFO -->
              <div class="form-row mt-3">
                <label>รายละเอียดข้อมูลผู้ขายฝาก</label>
              </div>
              <div class="form-row">
                <base-input
                  class="col-sm-12 col-md-12 col-lg-5 col-xl-5" label="เลขบัตรประจำตัวประชาชน" type="text"
                  v-model="PledgingForm.citizenId" />
                <base-button simple
                  class="col-sm-12 col-md-12 col-lg-1 col-xl-1 auto-fill-button"
                  @click="retrieveCustomerData(PledgingForm.citizenId)">
                  <i class="tim-icons icon-zoom-split"/>
                </base-button>
                <base-input
                  class="col-sm-12 col-md-12 col-lg-8 col-xl-8" label="ชื่อลูกค้า" type="text"
                  v-model="PledgingForm.customerName"/>
                <!-- <ValidationProvider> -->
                <base-input
                  class="col-sm-12 col-md-12 col-lg-4 col-xl-4" label="เบอร์โทรศัพท์" type="text"
                  v-model="PledgingForm.phoneNum" />
                <!-- </ValidationProvider> -->
              </div>

              <div class="form-row">
                <div class="col-6 mt-3 mb-3">
                  <base-button block class="animation-on-hover"
                               type="warning" native-type="submit"
                  >ยืนยันรายการ</base-button>
                </div>
                <div class="col-6 mt-3 mb-3">
                  <base-button simple block class="animation-on-hover"
                               type="warning" native-type="reset"
                  >ล้างรายการ</base-button>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
              <card>
                <label>รหัสรายการ</label>
                <h4>{{setTransactionId}}</h4>
                <label>ราคาทองคำแท่งรับซื้อ (บาทละ)</label>
                <h4>{{BuyPrice}}</h4>
                <label>อัตราดอกเบี้ย/เดือน (%)</label>
                <h4>{{retrievedInterestRate}}</h4>
                <label>ดอกเบี้ย/เดือน (บาท)</label>
                <h4>{{setInterests}}</h4>
                <label>วันที่ชำระดอกเบี้ย</label>
                <h4>{{setNextDueDate}}</h4>
                <label>วันที่ครบกำหนด</label>
                <h4>{{setDueDate}}</h4>
              </card>
              
            </div>
          </div>
        </form>
      </div>
    </modal>

  </div>
</template>

<script>
import {BaseInput, BaseButton, Modal} from 'src/components';
import PledgingDataService from '../../services/PledgingDataService.js';
import InterestsDataService from '../../services/InterestsDataService.js';
import CustomersDataService from '../../services/CustomersDataService.js';
import OptionsDataService from '../../services/OptionsDataService.js';
import PledgingInventory from './PledgingStock/PledgingInventory.vue';
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    BaseInput,
    BaseButton,
    Modal,
    PledgingDataService,
    InterestsDataService,
    CustomersDataService,
    OptionsDataService,
    PledgingInventory,
    ValidationProvider
  },
  props: ['BuyPrice'],
  data() {
    return {
      AddPledgingTransactionModal: false,
      AddPledgingStockModal: false,
      date: '',
      StockTable: [],
      StockForm: {
        stockId: '',
        transactionId: '',
        productName: '',
        goldWeight: 0,
        quantity: 0,
        customerId: 0,
        shopId: 0,
        deleteFlag: 0
      },
      StockFormDefault: {
        stockId: '',
        transactionId: '',
        productName: '',
        goldWeight: 0,
        quantity: 0,
        customerId: 0,
        shopId: 0,
        deleteFlag: 0
      },
      GroupOptions: [],
      PledgingForm: {
        transactionId: '',
        customerName: '',
        citizenId: '',
        phoneNum: '',
        interestRate: 0,
        interests: 0,
        netPrice: 0,
        duration: 1,
        date: '',
        nextDueDate: '',
        dueDate: '',
        returnDate: null,
        interestId: 1,
        customerId: 0,
        shopId: 1,
        deleteFlag: 0
      },
      FormDefault: {
        transactionId: '',
        customerName: '',
        citizenId: '',
        phoneNum: '',
        interestRate: 0,
        interests: 0,
        netPrice: 0,
        duration: 1,
        date: '',
        nextDueDate: '',
        dueDate: '',
        returnDate: null,
        // interestId: 1,
        customerId: 0,
        shopId: 1,
        deleteFlag: 0
      }
    }
  },
  computed: {
    setTransactionId() {
      this.setDateId();
      return this.PledgingForm.transactionId;
    },
    retrievedInterestRate() {
      this.retrieveInterestRate();
      var interestRate = this.PledgingForm.interestRate.toString() + '%';
      return interestRate;
    },
    setNextDueDate() {
      this.calculateNextDueDate();
      if (this.PledgingForm.nextDueDate === '-NaN-NaN') {
        return '';  
      } else {
        return this.PledgingForm.nextDueDate;
      }
    },
    setDueDate() {
      this.calculateDueDate();
      if (this.PledgingForm.dueDate === '-NaN-NaN') {
        return '';  
      } else {
        return this.PledgingForm.dueDate;
      }
    },
    setInterests() {
      this.calculateInterests();
      var interests = this.PledgingForm.interests.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      return interests;
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

      this.date = [year, month, day].join('-');
    },
    setDateId() {
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = '' + d.getHours(),
      minute = '' + d.getMinutes(),
      second = '' + d.getSeconds();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;
      if (hour.length < 2)
        hour = '0' + hour;
      if (minute.length < 2)
        minute = '0' + minute;
      if (second.length < 2)
        second = '0' + second;

      this.PledgingForm.transactionId = [year, month, day, hour, minute, second].join('');
    },
    addTransactionClick() {
      this.AddPledgingTransactionModal = true;
      this.PledgingForm.transactionId = this.setDateId();
    },
    setStockNumber(length) {
      var stockNumber = '0000' + length.toString();
      
      if(stockNumber.length === 6) {
        stockNumber = '000' + length.toString();
      } 
      else if(stockNumber.length === 7) {
        stockNumber = '00' + length.toString();
      }
      else if(stockNumber.length === 8) {
        stockNumber = '0' + length.toString();
      }
      else if(stockNumber.length === 9) {
        stockNumber = '' + length.toString();
      }
      return stockNumber
    },
    addPledgingStock() {
      // var stockNumber = this.setStockNumber(this.StockTable.length + 1);
      // this.StockForm.stockId = 'Z' + stockNumber;
      if (this.StockTable.length < 2) {
        this.StockForm.transactionId = this.PledgingForm.transactionId;
        this.StockTable.push(this.StockForm);
        this.StockForm = this.StockFormDefault;
      }
      // console.log(this.StockTable);
    },
    removePledgingStock(data) {
      // console.log(data);
      this.StockTable.splice(data, 1);
      this.StockForm = this.StockFormDefault;
      // console.log(this.StockTable);
    },

    retrieveGroupOptions() {
      OptionsDataService.getAllGroups().then(res => {
        this.GroupOptions = res.data;
        // console.log(this.GroupOptions);
      }).catch(e => {
        console.log(e);
      });
    },
    retrieveInterestRate() {
      InterestsDataService.getInterestsByShopId(1).then(res => {
        this.PledgingForm.interestRate = res.data[0].percentMonth;
      }).catch(e => {
        console.log(e);
      });
    },
    retrieveCustomerData(id) {
      // console.log(id);
      CustomersDataService.getCustomerByCitizenId(id).then(res => {
        // console.log(res.data);
        this.PledgingForm.customerId = res.data.customerId;
        this.PledgingForm.customerName = res.data.users.firstNameThai + ' ' + res.data.users.lastNameThai;
        this.PledgingForm.citizenId = res.data.users.citizenId;
        this.PledgingForm.phoneNum = res.data.users.phoneNum;
      }).catch(e => {
        console.log(e);
      });
    },
    calculateInterests() {
      this.PledgingForm.interests = this.PledgingForm.interestRate * this.PledgingForm.netPrice * 0.01;
    },
    addZerosAfterCompute(date) {
      if (date[1] > 12) {
        date[0] = (parseInt(date[0]) + 1).toString();
        date[1] = (parseInt(date[1]) - 12).toString();
      }
      // console.log(date[2]);
      // Add zeros
      if (date[1].length < 2) {
        date[1] = '0' + date[1];
      }
      if (parseInt(date[2]) < 10) {
        date[2] = '0' + date[2];
      }

      // Fixes the first day of the month
      if (date[2] === '00') {
        if (parseInt(date[0]) % 4 == 0) {
          switch (date[1]) {
            case '01':
              date[0] = (parseInt(date[0]) - 1).toString();
              date[1] = (parseInt(date[1]) + 11).toString();
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '02':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '03':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 29).toString();
              break;
            case '04':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '06':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '08':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '09':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '11':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            default:
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 30).toString();
              break;
          }
        } else {
          switch (date[1]) {
            case '01':
              date[0] = (parseInt(date[0]) - 1).toString();
              date[1] = (parseInt(date[1]) + 11).toString();
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '02':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '03':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 28).toString();
              break;
            case '04':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '06':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '08':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '09':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            case '11':
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 31).toString();
              break;
            default:
              date[1] = (parseInt(date[1]) - 1).toString(); 
              date[2] = (parseInt(date[2]) + 30).toString();
              break;
          }
        }
        if (date[1].length < 2) {
          date[1] = '0' + date[1];
        }
      }
      // console.log(date);
      return date
    },
    calculateNextDueDate() {
      var date = this.PledgingForm.date.split('-');
      var nextDueDate = date;

      // Compute
      nextDueDate[1] = (parseInt(nextDueDate[1]) + 1).toString();
      nextDueDate[2] = (parseInt(nextDueDate[2]) - 1).toString();
      // After Compute
      nextDueDate = this.addZerosAfterCompute(nextDueDate);

      this.PledgingForm.nextDueDate = nextDueDate.join('-');
    },
    calculateDueDate() {
      var date = this.PledgingForm.date.split('-');
      var dueDate = date;
      
      // Compute
      dueDate[1] = (parseInt(dueDate[1]) + parseInt(this.PledgingForm.duration)).toString();
      dueDate[2] = (parseInt(dueDate[2]) - 1).toString();
      // After Compute
      dueDate = this.addZerosAfterCompute(dueDate);
      
      this.PledgingForm.dueDate = dueDate.join('-');
    },
    onSubmit(evt) {
      evt.preventDefault();
      for (let i = 0; i < this.StockTable.length; i++) {
        this.StockTable[i].customerId = this.PledgingForm.customerId;
        this.StockTable[i].shopId = this.PledgingForm.shopId;
      }
      this.$emit('PledgingForm', this.PledgingForm);
      this.$emit('PledgingStock', this.StockTable);
      this.AddPledgingTransactionModal = false;
      // Reset Settings
      this.PledgingForm = this.PledgingFormDefault;
      this.StockTable = [];
    },
    onReset(evt) {
      evt.preventDefault();
      this.PledgingForm = this.FormDefault;
    }
  },
  mounted() {
    this.retrieveGroupOptions();
  }
}
</script>

<style scoped>
.auto-fill-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
.vertical-scroll {
  max-height: 220px;
  overflow-y: auto;
}
.horizontal-scroll {
  overflow-x: auto;
}
</style>