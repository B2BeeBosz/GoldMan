<template>
  <div v-if="ExtendPledgingData != {}">
    <form @submit="onSubmit">
      <div class="form-row">
        <base-input class="col-12" type="date" label="วันที่ครบกำหนดเดิม (mm/dd/yyyy)"
                    :disabled="true" :value="ExtendPledgingData.dueDate"
        ></base-input>
        <base-input class="col-12" type="number" min="1" max="12"
                    label="จำนวนเดือน (เดือน)"
                    v-model="ExtendForm.duration"
        ></base-input>
      </div>
      <div class="form-row mt-2">
        <label class="col-12">วันที่ชำระดอกเบี้ยใหม่ (yyyy-mm-dd)</label>
        <h4 class="col-12">{{setNewDueDate}}</h4>
      </div>

      <div class="form-row mt-3">
        <base-button block type="warning" native-type="submit"
                     class="animation-on-hover"
        >บันทึก</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import {BaseInput, BaseButton} from 'src/components';
import PledgingDataService from '../../../services/PledgingDataService';

export default {
  components: {
    BaseInput,
    BaseButton,
    PledgingDataService
  },
  props: ['ExtendPledgingData'],
  data() {
    return {
      ExtendForm: {
        duration: 1,
        dueDate: '',
        oldDueDate: ''
      }
    };
  },
  computed: {
    setNewDueDate() {
      this.ImportExtendPledgingData();
      this.calculateNewDueDate();
      if (this.ExtendForm.dueDate === '-NaN-NaN') {
        return '';
      } else {
        return this.ExtendForm.dueDate;
      }
    }
  },
  methods: {
    ImportExtendPledgingData() {
      this.ExtendForm.oldDueDate = this.ExtendPledgingData.dueDate;
    },
    calculateNewDueDate() {
      var OldDueDate = this.ExtendForm.oldDueDate;
      var NewDueDate = OldDueDate.split('-');

      var temp = parseInt(NewDueDate[1]) + parseInt(this.ExtendForm.duration);
      // console.log(temp);
      NewDueDate[1] = temp.toString();
      // console.log(NewDueDate[1]);
      // console.log(NewDueDate[1]);
      if(parseInt(NewDueDate[1]) > 12) {
        NewDueDate[0] = (parseInt(NewDueDate[0]) + 1).toString();
        NewDueDate[1] = (parseInt(NewDueDate[1]) - 12).toString();
      }
      if(NewDueDate[1].length < 2) {
        NewDueDate[1] = '0' + NewDueDate[1];
      }
      // console.log(NewDueDate[1]);

      this.ExtendForm.dueDate = NewDueDate.join('-');
    },
    onSubmit(evt) {
      const transactionId = this.ExtendPledgingData.transactionId;
      const NewDueDate = {
        dueDate: this.ExtendForm.dueDate
      };
      PledgingDataService.update(transactionId, NewDueDate).then(res => {
        this.$emit("refreshList");
        this.$emit("closeExtendModal");
      }).catch(e => {
        console.log(e);
      });
      
      this.ExtendForm = {
        duration: 1,
        dueDate: ''
      }
    }
  }
}
</script>

<style scoped>

</style>