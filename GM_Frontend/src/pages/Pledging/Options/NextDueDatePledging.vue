<template>
  <div>
    <div class="row">
      <form @submit="onSubmit" @reset="onReset">
      <div class="col-12 col-sm-12 col-lg-12">
        <!-- PLEDGING INFO -->
        <div class="form-row">
          <h4 class="col-12">ข้อมูลรายการขายฝาก</h4>
        </div>
        <div class="form-row">
          <base-input class="col-12 col-sm-12 col-lg-5" label="รหัสรายการ" 
                      type="text" :disabled="true"
                      :value="NextDueDatePledgingData.transactionId" 
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-7" label="ชื่อลูกค้า"
                      type="text" :disabled="true"
                      :value="NextDueDatePledgingData.customer.customerName"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="วันที่นำเข้า" :disabled="true"
                      :value="NextDueDatePledgingData.date" type="date"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="กำหนดชำระดอกเบี้ย" :disabled="true"
                      :value="NextDueDatePledgingData.nextDueDate" type="date"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="วันที่จ่าย"
                      v-model="payDate" type="date" 
                      :min="NextDueDatePledgingData.date" :max="NextDueDatePledgingData.dueDate"
          ></base-input>
        </div>
        

        <div class="form-row mt-3">
          <h4 class="col-12">คำนวณดอกเบี้ย</h4>
        </div>
        <div class="form-row">
          <base-input class="col-12 col-sm-12 col-lg-4" label="อัตราดอกเบี้ย (%)" :disabled="true"
                      :value="setInterests" type="number"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="จำนวนเงิน (บาท)" :disabled="true"
                      :value="NextDueDatePledgingData.netPrice" 
                      type="number"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="ดอกเบี้ยต่อเดือน (บาท)" :disabled="true"
                      :value="NextDueDatePledgingData.interests" type="number"
          ></base-input>
        </div>

        <!-- CALCULATION SECTION -->
        <div class="form-row mt-3">
          <base-input class="col-12 col-sm-12 col-lg-5" label="ดอกเบี้ยเดือนนี้ที่ต้องชำระ (บาท)" :disabled="true"
                      :value="setMonthlyInterests" type="text"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="กำหนดชำระดอกเบี้ยครั้งถัดไป" :disabled="true"
                      :value="setNewNextDueDate" type="date"
          ></base-input>
        </div>

        <!-- CONFIRMATION -->
        <div class="form-row mt-3">
          <div class="col-12 col-lg-6">
            <base-button block type="warning" native-type="submit"
                         class="animation-on-hover"
            >บันทึกรายการ</base-button>
          </div>
          <div class="col-12 col-lg-6">
            <base-button block simple type="warning" native-type="reset"
                         class="animation-on-hover"
            >ล้างรายการ</base-button>
          </div>
        </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import {BaseButton, BaseInput} from 'src/components';
import InterestsDataService from '../../../services/InterestsDataService.js';
import PledgingDataService from '../../../services/PledgingDataService.js';
import PledgingHistoryDataService from '../../../services/PledgingHistoryDataService.js';
import ShopsDataService from '../../../services/ShopsDataService.js';

export default {
 components: {
    BaseButton,
    BaseInput,
    InterestsDataService,
    PledgingDataService,
    PledgingHistoryDataService,
    ShopsDataService
  },
  props: ['NextDueDatePledgingData'],
  data() {
    return {
      payDate: '',
      oldDate: '',
      durations: 0,
      days: 0,
      months: 0,
      MonthlyInterests: 0,
      interestsRate: 0,
      nextDueDate: '',
      historyId: ''
    }
  },
  computed: {
    setInterests() {
      this.retrieveInterestsRate();
      return this.interestsRate;
    },
    setInterestsTotal() {
      return this.NextDueDatePledgingData.interests.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    setMonthlyInterests() {
      this.calculateMonthlyInterests();
      return this.MonthlyInterests.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    setNewNextDueDate() {
      this.calculateNewNextDueDate();
      return this.nextDueDate;
    }
  },
  methods: {
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

      this.historyId = [year, month, day, hour, minute, second].join('');
    },
    retrieveInterestsRate() {
      InterestsDataService.getInterestsByShopId(this.NextDueDatePledgingData.shopId).then(res => {
        this.interestsRate = res.data[0].percentMonth;
      }).catch(e => {
        console.log(e);
      });
      this.setDateId();
    },
    calculateMonthlyInterests() {
      this.MonthlyInterests = this.NextDueDatePledgingData.interests;
    },
    calculateNewNextDueDate() {
      var oldDueDate = this.NextDueDatePledgingData.nextDueDate;
      var newDueDate = oldDueDate.split('-');
      var month = 0;
      var year = 0;
     
      if (newDueDate[1] === '12') {
        month = parseInt(newDueDate[1]) - 11;
        year = parseInt(newDueDate[0]) + 1;
        newDueDate[1] = month.toString();
        newDueDate[0] = year.toString()
      } else {
        month = parseInt(newDueDate[1]) + 1;
        newDueDate[1] = month.toString();
      }

      // Check Zeros
      if (newDueDate[1].length < 2) {
        newDueDate[1] = '0' + newDueDate[1];
      }

      this.nextDueDate = newDueDate.join('-');
    },

    onSubmit(evt) {
      evt.preventDefault();
      const ExportData = {
        transactionId: this.NextDueDatePledgingData.transactionId,
        nextDueDate: this.nextDueDate,
      };
      const HistoryData = {
        historyId: this.historyId,
        transactionId: this.NextDueDatePledgingData.transactionId,
        customerId: this.NextDueDatePledgingData.customer.customerId,
        date: this.payDate,
        billRoutine: this.NextDueDatePledgingData.nextDueDate,
        netPrice: this.MonthlyInterests,
        shopId: this.NextDueDatePledgingData.shopId,
        deleteFlag: this.NextDueDatePledgingData.deleteFlag
      }
      PledgingDataService.update(ExportData.transactionId, { nextDueDate: ExportData.nextDueDate })
        .then(res => {
          PledgingHistoryDataService.create(HistoryData).then(res => {
            this.$emit('closeNextDueDateModal');
            this.$emit('refreshList');
          }).catch(e => {
            console.log(e);
          });
        }).catch(e => {
          console.log(e);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      paydate = '';
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>