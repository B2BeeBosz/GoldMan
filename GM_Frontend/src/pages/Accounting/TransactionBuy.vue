<template>
  <div>
    <form @submit="onSubmit" @reset="onReset">
      <div class="row">
        <div class="col-8">
          <div class="form-row">
            <label>รายการทองเก่า</label>
          </div>
          <div class="form-row">
            <base-button 
              class="col-sm-12 col-lg-3 auto-fill-button"
              simple
              type="primary"
              @click="addBuyStock"
            >เพิ่มรายการ</base-button>
          </div>
          <div class="form-row">
            <card>
              <div class="vertical-scroll">
                <buy-product-table
                  :stockTable="BuyStockTable"
                  @removeItemData="removeBuyStock"
                />
              </div>
            </card>
          </div>
          <div class="form-row">
            <base-input class="col-sm-12 col-lg-6" label="จำนวนเงินสุทธิ"
                        type="text"
                        v-model="BuyTransactionForm.netPrice" />
            <base-input class="col-sm-12 col-lg-6" label="ชื่อผู้รับซื้อ (พนักงาน)">
              <select class="form-control" v-model="BuyTransactionForm.employeeId">
                <option v-for="employee in employeeOptions" 
                        :key="employee.id" :value="employee.id"
                >{{employee.name}}</option>
              </select>
            </base-input>
          </div>
          
          <div class="form-row mt-3">
            <label>รายละเอียดข้อมูลผู้นำขาย</label>
          </div>
          <div class="form-row">
            <base-input class="col-sm-12 col-lg-5" label="เลขบัตรประจำตัวประชาชน"
                        v-model="BuyTransactionForm.customer.citizenId"/>
            <base-button class="col-sm-12 col-lg-1 auto-fill-button" simple
                         @click="autoFillCustomerData(BuyTransactionForm.customer.citizenId)"
            >
              <i class="tim-icons icon-zoom-split"></i>
            </base-button>
          </div>
          <div class="form-row">
            <base-input class="col-sm-12 col-lg-6" label="ชื่อผู้นำขาย (ลูกค้า)"
                        v-model="BuyTransactionForm.customer.customerName"/>
            <base-input class="col-sm-12 col-lg-6" label="เบอร์โทรศัพท์"
                        v-model="BuyTransactionForm.customer.phoneNum"/>
          </div>

          <!-- Confirmation Section -->
          <div class="form-row">
            <div class="col-sm-6 mt-3 mb-3">
              <base-button block type="warning" native-type="submit" 
                           class="animation-on-hover"
              >บันทึกรายการ</base-button>
            </div>
            <div class="col-sm-6 mt-3 mb-3">    
              <base-button simple block type="danger" native-type="reset" 
                           class="animation-on-hover"
              >ล้างรายการ</base-button>
            </div>
          </div>
        </div>
          
        <!-- คำนวณราคาสุทธิ -->
        <div class="col-4">
          <card>
            <label>รหัสรายการ</label>
            <h4>{{setTransactionId}}</h4>
            <label>ราคาทองแท่ง (บาทละ)</label>
            <h4>{{goldPrice.goldBarPrice}}</h4>
            <label>ราคาทองรูปพรรณรับซื้อ (บาทละ)</label>
            <h4>{{goldPrice.goldOrnamentPrice}}</h4>
            <label>จำนวนเงินสุทธิ</label>
            <h4>{{setNetPrice}}</h4>
          </card>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import {BaseButton, BaseInput} from 'src/components';
import BuyProductTable from './BuyProductTable.vue';
import CustomersDataService from '../../services/CustomersDataService.js';

export default {
  components: {
    BaseButton,
    BaseInput,
    BuyProductTable,
    CustomersDataService
  },
  props: ['employeeOptions', 'goldPrice'],
  data() {
    return {
      BuyTransactionForm: {
        transactionId: this.setDateId(),
        date: this.setDate(),
        transactionType: 'รับซื้อ',
        goldPrice: this.goldPrice.goldBarPrice,
        customer: {
          citizenId: '',
          customerName: '',
          phoneNum: ''
        },
        goldWeightTotal: 0.00,
        netPrice: 0.00,
        customerId: 0,
        employeeId: 0,
        shopId: 1
      },
      BuyTransactionFormDefault: {
        transactionId: this.setDateId(),
        date: this.setDate(),
        transactionType: 'รับซื้อ',
        goldPrice: '',
        customer: {
          citizenId: '',
          customerName: '',
          phoneNum: ''
        },
        goldWeightTotal: 0.00,
        netPrice: 0.00,
        customerId: 0,
        employeeId: 0,
        shopId: 1
      },
      BuyStockTable: [],
      BuyStockForm: {
        // id: 0,
        stockId: '',
        transactionId: '',
        date: '',
        productName: '',
        quantity: 0,
        goldWeightTotal: 0,
        customerId: 0,
        shopId: 1
      },
      BuyStockFormDefault: {
        stockId: '',
        transactionId: '',
        date: '',
        productName: '',
        quantity: 0,
        goldWeightTotal: 0,
        customerId: 0,
        shopId: 1
      },
      start: 0,
      stop: 0
    }
  },
  computed: {
    setNetPrice() {
      return parseFloat(this.BuyTransactionForm.netPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    setTransactionId() {
      return this.BuyTransactionForm.transactionId;
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

      return [year, month, day].join('-');
    },
    setDateId(){
      var d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear(),
          hour = '' + d.getHours(),
          minute = '' + d.getMinutes(),
          second = '' + d.getSeconds();

      if (month.length < 2) { month = '0' + month; }
      if (day.length < 2) { day = '0' + day; }
      if (hour.length < 2) { hour = '0' + hour; }
      if (minute.length < 2) { minute = '0' + minute; }  
      if (second.length < 2) { second = '0' + second; }
  
      return [year, month, day, hour, minute, second].join('');
    },
    addBuyStock() {
      if (this.BuyStockTable.length < 2) {
        // this.BuyStockForm.id = this.BuyStockTable.length + 1;
        this.BuyStockForm.transactionId = this.BuyTransactionForm.transactionId;
        this.BuyStockTable.push(this.BuyStockForm);
        this.BuyStockForm = this.BuyStockFormDefault;
      }
      // console.log(this.BuyStockTable);
    },
    removeBuyStock(row) {
      this.BuyStockTable.splice(row, 1);
      // this.start = this.BuyStockTable.length;
      // this.stop = this.BuyStockTable.length;
      // if(this.start < 0) {
      //   this.start = 0;
      // }
      // if(this.stop > 0) {
      //   for(let i = this.start; i < this.stop + 1; i++) {
      //     this.BuyStockForm[i].id = this.start;
      //   }
      // }
      // this.BuyStockForm = this.BuyStockFormDefault;
    },
    autoFillCustomerData(id) {
      CustomersDataService.getCustomerByCitizenId(id).then(res => {
        this.BuyTransactionForm.customerId = res.data.customerId;
        this.BuyTransactionForm.customer.customerName = res.data.users.firstNameThai + ' ' + res.data.users.lastNameThai;
        this.BuyTransactionForm.customer.citizenId = res.data.users.citizenId;
        this.BuyTransactionForm.customer.phoneNum = res.data.users.phoneNum;
      }).catch(e => {
        console.log(e);
      });
    },
    onSubmit(evt) {
      // evt.preventDefault();
      for(let i = 0; i < this.BuyStockTable.length; i++) {
        this.BuyStockTable[i].date = this.BuyTransactionForm.date;
        this.BuyStockTable[i].customerId = this.BuyTransactionForm.customerId;
      }
      this.$emit('TransactionBuy', this.BuyTransactionForm);
      this.$emit('BuyStockTable', this.BuyStockTable);
      
      // Reset Settings
      this.BuyTransactionForm = this.BuyTransactionFormDefault;
      this.BuyStockTable = [];
    },
    onReset(evt) {
      evt.preventDefault();
      this.BuyTransactionForm = this.BuyTransactionFormDefault;
      this.$emit('onResetedBuy', this.BuyTransactionForm);
      this.BuyStockTable = [];
    }
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