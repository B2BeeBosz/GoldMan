<template>
  <div>
    <!-- Edit Accounting -->
    <h2 slot="header" class="modal-title mb-3">แก้ไขรายการ{{FormAccounting.transactionType}}</h2>
      <div v-if="FormAccounting.transactionType === 'ขายออก'">
        <form @submit="onSubmitEdit" @reset="onResetEdit">
          <div class="row">
            <div class="col-8">
            <div class="form-row">
              <base-input class="col-sm-6" type="text" 
                          label="รหัสสินค้า"
                          v-model="FormAccounting.productId" disabled/>
                
              <base-input class="col-md-8" type="text" 
                          label="ชื่อสินค้า" 
                          v-model="FormAccounting.inventory.productName"/>
          
              <base-input class="col-md-4" label="กลุ่มสินค้า">
                <select class="form-control" 
                        v-model="FormAccounting.inventory.group">
                  <option v-for="group in groupOptions" 
                          :key="group.id" :value="group.name"
                  >{{group.name}}</option>
                </select>
              </base-input>
              
              <base-input class="col-md-4" label="น้ำหนักทอง (บาท)">
                <select class="form-control" 
                        v-model="FormAccounting.inventory.goldWeight">
                  <option v-for="baht in bahtOptions" 
                          :key="baht.id" :value="baht.value"
                  >{{baht.name}}</option>
                </select>
              </base-input>
  
              <base-input class="col-md-4" type="text" 
                          label="น้ำหนักทอง / ชิ้น (กรัม)"
                          v-model="FormAccounting.inventory.goldWeight"
              ></base-input>

              <base-input class="col-md-4" type="number" min="0" 
                          label="จำนวนสินค้า" v-model="FormAccounting.quantity" />
            </div>
            <div class="form-row">
              <base-input class="col-md-6" type="text" 
                          label="ค่ากำเหน็จ / ชิ้น" 
                          v-model="FormAccounting.wagePrice"
              ></base-input>
              <base-input class="col-md-6" type="text" 
                          label="ค่ากำเหน็จรวม"
                          :value="setWagePriceTotal"
                          disabled
              ></base-input>
            </div>
            <div class="form-row">
              <base-input class="col-md-12" label="ชื่อผู้ขาย">
                <select class="form-control" v-model="FormAccounting.employee.employeeId">
                  <option v-for="employee in employeeOptions" 
                          :key="employee.id" :value="employee.Id"
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
              <label>ราคาทองแท่ง</label>
              <h4>{{goldPrice}}</h4>
              <label>ราคาตั้งต้น</label>
              <h4>{{setComputedGoldPrice}}</h4>
              <label>ราคาสุทธิ</label>
              <h4>{{setNetPrice}}</h4>
            </card>
          </div>
          </div>
        </form>
      </div>
      <div v-else>
      </div>
  </div>
</template>

<script>
import {BaseButton} from '@/components';
import InventoryDataService from '../../services/InventoryDataService';
import GoldPricesDataService from '../../services/GoldPricesDataService';

export default {
  components: {
    BaseButton,
    InventoryDataService,
    GoldPricesDataService
  },
  props: ['FormDefault', 'groupOptions', 'bahtOptions', 'employeeOptions'],
  data() {
    return {
      date: '',
      goldPrice: '',
      FormAccounting: this.FormDefault
    }
  },
  computed: {
    setComputedGoldPrice() {  
      return this.FormAccounting.goldPrice;
    },
    setNetPrice() {
      this.calculateNetPrice();
      return this.FormAccounting.netPrice;
    }
  },
  // created() {
  //   this.EditTransaction(this.FormAccounting.transactionType);
  // },
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

      return [year, month, day].join('-');
    },
    EditTransaction(type) {
      // this.FormAccounting = this.FormDefault;
      this.date = this.setDate();
      console.log(this.FormAccounting.transactionId);

      if (type == 'ขายออก') {
        this.retrieveGoldPrice(0);
      }
      else if (type == 'รับซื้อ') {
        this.retrieveGoldPrice(1);
      }
    },
    retrieveGoldPrice(type) {
      // console.log(type);
      GoldPricesDataService.findTodayLatest(this.date)
        .then(res => {
          if (type === 0){
            this.goldPrice = res.data[0].gbSellPrice;
          }
          else if (type === 1){
            this.goldPrice = res.data[0].gbBuyPrice;
          }
        })
        .catch(e => {
          console.log(e);
        });
      // console.log(this.goldPrice);
    },
    calculateWagePriceTotal(){
      var wagePrice = parseFloat(this.FormAccounting.wagePrice.replace(',',''));
      var quantity = this.FormAccounting.quantity;
      var total = wagePrice * quantity;
      this.wagePriceTotal = total;
      return this.wagePriceTotal;
    },
    calculateNetPrice() {
      var wagePriceTotal = this.calculateWagePriceTotal();
      var goldWeight = parseFloat(this.FormAccounting.inventory.goldWeight);
      var goldPrice = parseFloat(this.goldPrice.replace(',','')) * (goldWeight / 15.16);
      this.FormAccounting.goldPrice = goldPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      
      var quantity = this.FormAccounting.quantity;
      var netPrice = ((goldPrice * quantity) + wagePriceTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      this.FormAccounting.netPrice = netPrice;
    },
    checkWagePrice() {
      this.FormAccounting.wagePrice = parseFloat(this.FormAccounting.wagePrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    onSubmitEdit(evt){
      this.checkWagePrice();
      // console.log(this.FormAccounting);
      this.$emit('onSubmitEdit', this.FormAccounting);
      // this.editModal = false;

    },
    onResetEdit(evt){
      evt.preventDefault();
      this.FormAccounting = this.FormDefault;
      console.log(this.FormAccounting);
    }
  }  
}
</script>

<style scoped>

</style>