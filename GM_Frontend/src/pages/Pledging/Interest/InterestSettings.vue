<template>
  <div>
    <base-button block type="warning"
                 class="animation-on-hover"
                 @click="openInterestSettingsModal"
    >กำหนดอัตราดอกเบี้ย</base-button>
    
    <modal :show.sync="InterestSettingsModal" modal-classes="modal-md">
      <h2 slot="header" class="modal-title">กำหนดอัตราดอกเบี้ย</h2>
      <div>
        <form @submit="onSubmit">
          <div class="row">
            <div class="col-12">
              <div class="form-row">
                <base-input class="col-12" label="อัตราดอกเบี้ยรายเดือน (%)" 
                            type="number" max="2" min="0"
                            v-model="InterestForm.percentMonth"
                />
                <base-input class="col-12" label="อัตราดอกเบี้ยรายวัน (%)" 
                            type="number" max="2" min="0"
                            v-model="InterestForm.percentDay"
                />
              </div>
              <div class="form-row mt-3">
                <base-button block type="warning" native-type="submit"
                             class="col-12">
                  ยืนยันข้อมูล
                </base-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import {BaseButton, BaseInput, Modal} from 'src/components';
import InterestsDataService from '../../../services/InterestsDataService';

export default {
  components: {
    Modal,
    BaseButton,
    BaseInput,
    InterestsDataService
  },
  data() {
    return {
      InterestSettingsModal: false,
      InterestForm: {
        interestId: 0,
        percentMonth: 0,
        percentDay: 0,
        shopId: 0,
      }
    }
  },
  methods: {
    openInterestSettingsModal() {
      this.InterestSettingsModal = true;
    },
    retrieveInterestRates() {
      InterestsDataService.getInterestsByShopId(1).then(res => {
        // console.log(res.data);
        this.InterestForm.interestId = res.data[0].interestId;
        this.InterestForm.percentMonth = res.data[0].percentMonth;
        this.InterestForm.percentDay = res.data[0].percentDay;
        this.InterestForm.shopId = res.data[0].shopId;
      }).catch(e => {
        console.log(e);
      })
    },
    onSubmit(evt) {
      InterestsDataService.update(this.InterestForm.shopId, this.InterestForm).then(res => {
        this.retrieveInterestRates();
      }).catch(e => {
        console.log(e);
      })
    }
  },
  mounted() {
    this.retrieveInterestRates();
  }
}
</script>

<style scoped>

</style>