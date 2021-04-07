<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-12">
        <!-- PLEDGING INFO -->
        <div class="form-row">
          <h4 class="col-12">ข้อมูลรายการขายฝาก</h4>
        </div>
        <div class="form-row">
          <base-input class="col-12 col-sm-12 col-lg-5" label="รหัสรายการ" 
                      type="text" :disabled="true"
                      :value="ReturnPledgingData.transactionId" 
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-7" label="ชื่อลูกค้า"
                      type="text" :disabled="true"
                      :value="ReturnPledgingData.customer.customerName"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="วันที่นำเข้า" :disabled="true"
                      :value="ReturnPledgingData.date" type="date"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="วันที่ครบกำหนด" :disabled="true"
                      :value="ReturnPledgingData.dueDate" type="date"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="วันที่จ่าย"
                      v-model="returnDate" type="date" 
                      :min="ReturnPledgingData.date" :max="ReturnPledgingData.dueDate"
          ></base-input>
        </div>
        

        <div class="form-row mt-3">
          <h4 class="col-12">คำนวณดอกเบี้ย</h4>
        </div>
        <div class="form-row">
          <base-input class="col-12 col-sm-12 col-lg-3" label="จำนวนเดือน" :disabled="true"
                      :value="setDuration" type="number"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-3" label="จำนวนวัน" :disabled="true"
                      :value="setDurationDate" type="number"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="อัตราดอกเบี้ย (%)" :disabled="true"
                      :value="setInterests" type="number"
          ></base-input>
        </div>

        <!-- CALCULATION SECTION -->
        <div class="form-row">
          <base-input class="col-12 col-sm-12 col-lg-4" label="จำนวนเงิน (บาท)" :disabled="true"
                      :value="ReturnPledgingData.netPrice" type="number"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-4" label="ดอกเบี้ยต่อเดือน (บาท)" :disabled="true"
                      :value="ReturnPledgingData.interests" type="number"
          ></base-input>
        </div>
        <div class="form-row mt-3">
          <base-input class="col-12 col-sm-12 col-lg-5" label="ดอกเบี้ยเดือนนี้ที่ต้องชำระ (บาท)" :disabled="true"
                      :value="setMonthlyInterests" type="text"
          ></base-input>
          <base-input class="col-12 col-sm-12 col-lg-7" label="จำนวนเงินรวมทั้งหมด (บาท)" :disabled="true"
                      :value="setTotalPrice" type="text"
          ></base-input>
        </div>

        <!-- CONFIRMATION -->
        <div class="form-row mt-3">
          <div class="col-12 col-lg-6">
            <base-button block type="warning"
                         class="animation-on-hover"
            >บันทึกรายการ</base-button>
          </div>
          <div class="col-12 col-lg-6">
            <base-button block simple type="warning"
                         class="animation-on-hover"
            >ล้างรายการ</base-button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {BaseButton, BaseInput} from 'src/components';
import InterestsDataService from '../../../services/InterestsDataService';

export default {
  components: {
    BaseButton,
    BaseInput,
    InterestsDataService
  },
  props: ['ReturnPledgingData'],
  data() {
    return {
      returnDate: '',
      overDueDate: '',
      durations: 0,
      days: 0,
      months: 0,
      MonthlyInterests: 0,
      totalPrice: 0,
      interestsRate: 0,
      weeks: 0,
    }
  },
  computed: {
    setInterests() {
      this.retrieveInterestsRate();
      return this.interestsRate;
    },
    setOverDueDate() {
      this.calculateOverDueDate();
      return this.overDueDate;
    },
    setDuration() {
      this.calculateMonths();
      return this.months;
    },
    setDurationDate() {
      this.calculateDate();
      return this.days;
    },
    setInterestsTotal() {
      return this.ReturnPledgingData.interests;
    },
    setMonthlyInterests() {
      this.calculateMonthlyInterests();
      return this.MonthlyInterests.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    setTotalPrice() {
      this.calculateTotalPrice();
      return this.totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
      InterestsDataService.getInterestsByShopId(this.ReturnPledgingData.shopId).then(res => {
        this.interestsRate = res.data[0].percentMonth;
      }).catch(e => {
        console.log(e);
      });
      this.setDateId();
    },
    calculateOverDueDate() {
      var dueDate = this.ReturnPledgingData.dueDate.split('-');
      var overdue = new Date(parseInt(dueDate[0]), parseInt(dueDate[1]), parseInt(dueDate[2]) + 7);
      this.overDueDate = overdue;
    },
    calculateMonths() {
      var StartDate = this.ReturnPledgingData.date.split('-');
      var EndDate = this.returnDate.split('-');

      var StartDateCal = new Date(StartDate[0], StartDate[1], StartDate[2]);
      var EndDateCal = new Date(EndDate[0], EndDate[1], EndDate[2]);

      this.durations = Math.floor((EndDateCal - StartDateCal) / (1000*60*60*24));
      this.months = Math.floor(this.durations / 30);
    },
    calculateDate() {
      let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var StartDate = this.ReturnPledgingData.date.split('-');
      
      var start = parseInt(StartDate[1]) - 1;
      var stop = start + this.months;
      var stopTemp = stop;
      if (stop > 11) {
        stopTemp = 12;
        stop = stop - stopTemp + 1;
      }

      this.days = this.durations;
      console.log(this.days);
      for (let i = start; i < stopTemp; i++) {
        this.days = this.days - daysInMonths[i];
      }
      if (stopTemp == 12) {
        start = 0;
        for (let i = start; i < stop; i++) {
          this.days = this.days - daysInMonths[i];
        }
      }
      
      if (this.days <= 0) {
        this.days = 0;
        this.weeks = 0;
      }

      var ReturnDateArr = this.returnDate.split('-');
      if (StartDate[1] == '02') {
        ReturnDateArr[1] = (parseInt(ReturnDateArr[1]) - parseInt)
      }

      if (this.days > 0 && this.days < 6) {
        this.weeks = 0;
      } else if (this.days >= 6 && this.days < 8) {
        this.weeks = 1;
      } else if (this.days >= 8 && this.days < 16) {
        this.weeks = 2;
      } else if (this.days >= 16 && this.days < 24) {
        this.weeks = 3;
      } else if (this.days >= 24 && this.days <= 31) {
        this.weeks = 4;
      }
    },
    calculateMonthlyInterests() {
      var interests = this.ReturnPledgingData.interests;
      var weeks = this.weeks;
      var remaining = (interests / 4.0) * weeks;
      
      if(remaining != 0) {
        if (remaining < 20) {
          remaining = 20;
        }
      }
      this.MonthlyInterests = remaining;
    },
    calculateTotalPrice() {
      this.totalPrice = this.ReturnPledgingData.netPrice + this.MonthlyInterests;
    }
  }
}
</script>

<style scoped>

</style>