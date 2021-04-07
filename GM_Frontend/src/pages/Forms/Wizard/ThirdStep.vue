<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div class="row justify-content-center">
        <div class="col-sm-12">
          <h5 class="info-text">ที่อยู่ผู้ใช้งาน</h5>
        </div>
        <div class="col-sm-10">

          <ValidationProvider
            name="addressLine"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            v-model="addressLine"
            label="ที่อยู่"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-5">

          <ValidationProvider
            name="subDistrict"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            v-model="subDistrict"
            label="ตำบล/แขวง"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-5">
          <ValidationProvider
            name="district"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            v-model="district"
            label="อำเภอ/เขต"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-5">
          <ValidationProvider
            name="province"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            v-model="province"
            label="จังหวัด"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-5">
          <ValidationProvider
            name="country"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            v-model="country"
            label="ประเทศ"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-5">

          <ValidationProvider
            name="postalCode"
            rules="required|numeric|min:5"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            v-model="postalCode"
            label="หมายเลขไปรษณีย์"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-5">
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { Select, Option } from 'element-ui';

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      addressLine: '',
      subDistrict: '',
      district: '',
      province: '',
      country:'',
      postalCode:''
    };
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      const RegisterForm = {
        addressLine: this.addressLine,
        subDistrict: this.subDistrict,
        district: this.district,
        province: this.province,
        country: this.country,
        postalCode: this.postalCode
      };

      return this.$refs.form.validate().then(res => {
        // if (!res) {
        //   return;
        // }
        this.$emit("on-validated", RegisterForm);
        return res;
      });
    }
  }
};
</script>
<style></style>
