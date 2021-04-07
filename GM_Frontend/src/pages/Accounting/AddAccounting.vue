<template>
  <div>
    <div class="float-right">
      <base-button block type="warning" class="animation-on-hover"
                   @click="AddTransactionClick(0)">
        เพิ่มรายการขายออก  
      </base-button>
      <base-button block type="warning" class="animation-on-hover"
                   @click="AddTransactionClick(1)">
        เพิ่มรายการรับซื้อ
      </base-button>
      <base-button block type="default" class="animation-on-hover"
                   @click="ResetFilter">
        ล้างคำค้นหา
      </base-button>
    </div>
    
    <!-- Add Accounting Modal -->
    <modal :show.sync="AddSellTransactionModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">เพิ่มรายการ{{FormAccounting.transactionType}}</h2>
        <transaction-sell 
          :SelectedTable="SelectedTable"
          :employeeOptions="employeeOptions"
          :goldPrice="goldPrice"
          @TransactionSell="receivedTransactionSell"
          @AddProductToTransacModal="addProductsToTransaction"
        />
    </modal>
    <modal :show.sync="AddBuyTransactionModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">เพิ่มรายการ{{FormAccountingBuy.transactionType}}</h2>
        <transaction-buy
          :employeeOptions="employeeOptions"
          :goldPrice="goldPrice"
          @TransactionBuy="receivedTransactionBuy"
          @BuyStockTable="receivedBuyStock"
          
        />
    </modal>

    <!-- Select Products to Transaction Modal -->
    <modal :show.sync="AddProductsToTransactionModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">เลือกรายการสินค้า</h2>
      <select-products-table
        :InventoryTable="InventoryTable"
        @selectedProducts="onSubmitSelected"
      />
    </modal>
  </div>
</template>

<script>
import {BaseButton, BaseInput, BaseRadio, BaseTable, Modal} from '@/components';
import {Collapse, CollapseItem} from 'src/components';
import GoldPricesDataService from '../../services/GoldPricesDataService';
import InventoryDataService from '../../services/InventoryDataService';
import TransactionSell from './TransactionSell.vue';
import TransactionBuy from './TransactionBuy.vue';
import SelectProductsTable from './SelectProductsTable.vue';
// import BuyProductTable from './BuyProductTable.vue';

export default {
  components: {
    BaseButton,
    BaseInput,
    Modal,
    Collapse,
    CollapseItem,
    BaseRadio,
    BaseTable,
    GoldPricesDataService,
    InventoryDataService,
    TransactionBuy,
    TransactionSell,
    SelectProductsTable,
    // BuyProductTable
  },
  props: ['groupOptions', 'bahtOptions', 'employeeOptions'],
  data() {
    return {
      date: '',
      goldPrice: {
        goldBarPrice: '',
        goldOrnamentPrice: ''
      },
      FormAccounting: {
          transactionId: '',
          productId: '',
          date: '',
          transactionType: '',
          goldPrice: '',
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
          date: '',
          transactionType: '',
          goldPrice: '',
          quantity: 0,
          goldWeight: 0.00,
          goldWeightTotal: 0.00,
          netPrice: 0.00,
          employeeId: 0,
          shopId: 1
      },
      FormAccountingBuy: {
        transactionId: '',
        date: '',
        transactionType: '',
        goldPrice: '',
        customer: {
          citizenId: '',
          customerName: '',
          phoneNum: ''
        },
        netPrice: 0.00,
        customerId: 0,
        employeeId: 0,
        shopId: 1
      },
      FormAccountingBuyDefault: {
        transactionId: '',
        date: '',
        transactionType: '',
        goldPrice: '',
        customer: {
          citizenId: '',
          customerName: '',
          phoneNum: ''
        },
        netPrice: 0.00,
        customerId: 0,
        employeeId: 0,
        shopId: 1
      },
      BuyStockTable: [],
      InventoryTable: [],
      SelectedTable: [],
      AddProductsToTransactionModal: false,
      AddSellTransactionModal: false,
      AddBuyTransactionModal: false
    }
  },
  computed: {
    setGoldWeightTotal() {
      this.computeGoldWeightTotal();
      return this.FormAccounting.goldWeightTotal.toFixed(2);
    },
    setGoldWeight() {
      return this.SelectedTable.goldWeight.toFixed(2);
    },
    setNetPrice() {
      return parseFloat(this.FormAccounting.netPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    setTransactionId() {
      return this.FormAccounting.transactionId;
    }
  },
  methods: {
    addProductsToTransaction() {
      this.AddProductsToTransactionModal = true;
      this.retrieveInventory();
    },
    retrieveInventory() {
      InventoryDataService.getAll().then(res => {
        // console.log(res.data);
        this.InventoryTable = res.data;
      }).catch(e => {
        console.log(e);
      })
    },
    onSubmitSelected(data) {
      this.SelectedTable = data;
      this.AddProductsToTransactionModal = false;
      this.FormAccounting.productId = this.SelectedTable[0].productId;
      this.FormAccounting.goldWeight = this.SelectedTable[0].productWeight.goldWeight;
      console.log(this.SelectedTable);
    },
    deleteSelected(index) {
      this.SelectedTable.splice(index, 1);
    },
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
    AddTransactionClick(value){
      this.date = this.setDate();
      this.FormAccounting.transactionId = this.setDateId();
      // console.log(this.FormAccounting.transactionId);
      if (value == 0) {
        this.AddSellTransactionModal = true;
        this.FormAccounting.transactionType = 'ขายออก';
        this.retrieveGoldPrice(0);
      }
      else if (value == 1) {
        this.AddBuyTransactionModal = true;
        this.FormAccountingBuy.transactionType = 'รับซื้อ';
        this.retrieveGoldPrice(1);
      }
    },
    retrieveGoldPrice(type) {
      // console.log(type);
      GoldPricesDataService.findTodayLatest(this.date)
        .then(res => {
          if (type === 0){
            this.goldPrice.goldBarPrice = res.data[0].gbSellPrice;
            this.FormAccounting.goldPrice = this.goldPrice.goldBarPrice;
          }
          else if (type === 1){
            this.goldPrice.goldBarPrice = res.data[0].gbBuyPrice;
            this.goldPrice.goldOrnamentPrice = res.data[0].buyPrice;
            this.FormAccountingBuy.goldPrice = this.goldPrice.goldBarPrice;
          }
        })
        .catch(e => {
          console.log(e);
        });
      // console.log(this.goldPrice);
    },
    receivedTransactionSell(SellForm) {
      // console.log(SellForm);
      this.FormAccounting.transactionId = SellForm.transactionId;
      // this.FormAccounting.productId = SellForm.productId;
      this.FormAccounting.date = SellForm.date;
      this.FormAccounting.transactionType = SellForm.transactionType;
      // this.FormAccounting.goldPrice = SellForm.goldPrice;
      this.FormAccounting.quantity = SellForm.quantity;
      this.FormAccounting.goldWeightTotal = SellForm.goldWeightTotal;
      this.FormAccounting.netPrice = SellForm.netPrice;
      this.FormAccounting.employeeId = SellForm.employeeId;
      this.FormAccounting.shopId = SellForm.shopId;
      // console.log(this.FormAccounting);
      this.onSubmit();
    },
    receivedTransactionBuy(BuyForm) {
      this.FormAccountingBuy.transactionId = BuyForm.transactionId;
      this.FormAccountingBuy.date = BuyForm.date;
      this.FormAccountingBuy.transactionType = BuyForm.transactionType;
      this.FormAccountingBuy.customer.customerName = BuyForm.customer.customerName;
      this.FormAccountingBuy.customer.citizenId = BuyForm.customer.citizenId;
      this.FormAccountingBuy.customer.phoneNum = BuyForm.customer.phoneNum;
      // this.FormAccountingBuy.goldWeightTotal = BuyForm.goldWeightTotal;
      this.FormAccountingBuy.netPrice = BuyForm.netPrice;
      this.FormAccountingBuy.customerId = BuyForm.customerId;
      this.FormAccountingBuy.employeeId = BuyForm.employeeId;
      this.FormAccountingBuy.shopId = BuyForm.shopId;
      // console.log(this.FormAccountingBuy);
    },
    receivedBuyStock(BuyStock) {
      this.BuyStockTable = BuyStock;
      this.onSubmitBuy();
      // console.log(this.BuyStockTable);
    },
    exportFormBuy() {
      this.FormExportBuy.transactionId = this.FormAccounting.transactionId;
      this.FormExportBuy.date = this.FormAccounting.date;
      this.FormExportBuy.goldPrice = this.FormAccounting.goldPrice;
      this.FormExportBuy.goldWeightTotal = this.FormAccounting.goldWeightTotal;
      this.FormExportBuy.netPrice = this.FormAccounting.netPrice;
      this.FormExportBuy.customerId = this.FormAccounting.customerId;
      this.FormExportBuy.employeeId = this.FormAccounting.employeeId;
      this.FormExportBuy.shopId = this.FormAccounting.shopId;
    },
    
    // Pass data to Parent
    onSubmit(){
      this.$emit('FormAccounting', this.FormAccounting);
      this.AddSellTransactionModal = false;
      // Reset Settings
      this.FormAccounting = this.FormDefault;
    },
    onSubmitBuy() {
      this.$emit('FormAccountingBuy', this.FormAccountingBuy);
      this.$emit('BuyStockTable', this.BuyStockTable);
      this.AddBuyTransactionModal = false;
      // Reset Settings
      this.FormAccountingBuy = this.FormAccountingBuyDefault;
    },
    onReset(evt){
      evt.preventDefault();
      this.FormAccounting = this.FormDefault;
    },
    onResetBuy(evt){
      evt.preventDefault();
      this.FormAccounting = this.FormAccountingBuyDefault;
    },
    ResetFilter() {
      this.$emit('ResetFilter');
    }
  }
};
</script>

<style scoped>
.auto-fill-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
.vertical-scroll {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>