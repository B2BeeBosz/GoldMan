<template>
  <div>
    <form @submit="onSubmit" @reset="onReset">
      <div class="row">
        <div class="col-8">
          <div class="form-row">
            <label>เลือกรายการ</label>
          </div>
          <div class="form-row">
            <base-button 
              class="col-sm-3 auto-fill-button"
              simple type="default"
              @click="addProductsToTransaction"
            >ค้นหาจากคลังสินค้า</base-button>
          </div>
          <!-- Selected Products are shown here -->
          <div class="form-row">
            <card>
              <div class="vertical-scroll">
                <div 
                  v-for="row in SelectedTable" 
                  :key="row.productId"
                >
                  <div class="form-row">
                    <label style="margin-left: 5px">
                      รหัสสินค้า {{row.productId}} - {{row.productName}}
                    </label>
                  </div>
                  <div class="form-row">
                    <base-input 
                      class="col-4"
                      type="number" min="0" 
                      label="จำนวนสินค้า (ชิ้น)"
                      v-model="SellTransactionForm.quantity"
                    />
                    <base-input 
                      class="col-4"
                      type="text"
                      label="น้ำหนักทอง (กรัม)"
                      v-model="row.productWeight.goldWeight"
                      disabled 
                    />
                    <base-input 
                      class="col-4"
                      type="text"
                      label="น้ำหนักทองรวม (กรัม)"
                      :value="setGoldWeightTotal"
                      disabled 
                    />
                  </div>
                </div>
              </div>
            </card>
          </div>
            
          <div class="form-row">
            <base-input class="col-md-12" label="ราคาสุทธิ"
                        type="text"
                        v-model="SellTransactionForm.netPrice" />
            <base-input class="col-md-12" label="ชื่อผู้ขาย">
              <select class="form-control" v-model="SellTransactionForm.employeeId">
                <option v-for="employee in employeeOptions" 
                        :key="employee.id" :value="employee.id"
                >{{employee.name}}</option>
              </select>
            </base-input>
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
            <label>ราคาสุทธิ</label>
            <h4>{{setNetPrice}}</h4>
          </card>
        </div>

      </div>
    </form>

  </div>
</template>

<script>
import {BaseButton, BaseInput} from 'src/components';
// import SelectProductsTable from './SelectProductsTable.vue';
// import InventoryDataService from '../../services/InventoryDataService';

export default {
  components: {
    BaseButton,
    BaseInput,
    // SelectProductsTable,
    // InventoryDataService
  },
  props: ['SelectedTable', 'employeeOptions', 'goldPrice'],
  data() {
    return {
      SellTransactionForm: {
        transactionId: '',
        productId: '',
        date: this.setDate(),
        transactionType: 'ขายออก',
        // goldPrice: '',
        quantity: 0,
        goldWeight: 0.00,
        goldWeightTotal: 0.00,
        netPrice: 0.00,
        employeeId: 0,
        shopId: 1
      },
      FormDefault: {
        transactionId: '',
        productId: '',
        date: this.setDate(),
        transactionType: 'ขายออก',
        goldPrice: '',
        quantity: 0,
        goldWeight: 0.00,
        goldWeightTotal: 0.00,
        netPrice: 0.00,
        employeeId: 0,
        shopId: 1
      }
    };
  },
  computed: {
    setGoldWeightTotal() {
      this.computeGoldWeightTotal();
      return this.SellTransactionForm.goldWeightTotal.toFixed(2);
    },
    setNetPrice() {
      return parseFloat(this.SellTransactionForm.netPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    setTransactionId() {
      this.setDateId();
      return this.SellTransactionForm.transactionId;
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
      
      this.SellTransactionForm.transactionId = [year, month, day, hour, minute, second].join('');
      // return [year, month, day, hour, minute, second].join('');
    },
    addProductsToTransaction() {
      this.$emit('AddProductToTransacModal');
      // this.retrieveInventory();
    },
    computeGoldWeightTotal() {
      // console.log(this.SelectedTable);
      var goldWeight = this.SelectedTable[0].productWeight.goldWeight;
      var quantity = this.SellTransactionForm.quantity;
      
      this.SellTransactionForm.goldWeightTotal = goldWeight * quantity;
    },
    onSubmit(evt) {
      // evt.preventDefault();
      this.$emit('TransactionSell', this.SellTransactionForm);
      this.SellTransactionForm = this.FormDefault;
    },
    onReset(evt) {
      evt.preventDefault();
      this.SellTransactionForm = this.FormDefault;
    }
  }
}
</script>

<style>

</style>