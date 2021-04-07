<template>
  <ValitionObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <h5 class="info-text">ข้อมูลส่วนบุคคล</h5>
        <div class="row justify-content-center">
          <image-upload @change="onFileChange"></image-upload>
        </div>
          <label class="row justify-content-center">อัพโหลดรูปประจำตัว</label>
        <div class="row justify-content-center mt-5">
          <div class="col-sm-5">
            <ValidationProvider
              name="firstNameThai"
              rules="required"
              v-slot="{ passed,failed,errors}"
            >
            <base-input
              required
              label="ชื่อ (ภาษาไทย)"
              v-model="firstNameThai"
              placeholder="ชื่อ"
              addon-left-icon="tim-icons icon-caps-small"
              :error="errors[0]"
              :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
            </base-input>
            </ValidationProvider>
            <ValidationProvider
              name="firstNameEng"
              rules="required"
              v-slot="{ passed,failed,errors}"
            >
            <base-input
              required
              label="Firstname (English)"
              v-model="firstNameEng"
              placeholder="Firstname"
              addon-left-icon="tim-icons icon-caps-small"
              :error="errors[0]"
              :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
            </base-input>
            </ValidationProvider>
          </div>
          <div class="col-sm-5">
            <ValidationProvider
              name="lastNameThai"
              rules="required"
              v-slot="{ passed,failed,errors}"
            >
            <base-input
              required
              label="นามสกุล (ภาษาไทย)"
              v-model="lastNameThai"
              placeholder="นามสกุล"
              addon-left-icon="tim-icons icon-caps-small"
              :error="errors[0]"
              :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
            </base-input>
            </ValidationProvider>
            
            <ValidationProvider
              name="lastNameEng"
              rules="required"
              v-slot="{ passed,failed,errors}"
            >
            <base-input
              required
              label="Surname (English)"
              v-model="lastNameEng"
              placeholder="Lastname"
              addon-left-icon="tim-icons icon-caps-small"
              :error="errors[0]"
              :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
            </base-input>
            </ValidationProvider>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-sm-5">
            <base-input label="เพศ">
              <select class="form-control" v-model="gender">
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </base-input>  
          </div>    
          <div class="col-sm-5">
            <ValidationProvider
              name="citizenId"
              rules="required|numeric|min:13"
              v-slot="{ passed,failed,errors}"
            >
            <base-input
              required
              label="หมายเลขบัตรประชาชน"
              v-model="citizenId"
              placeholder="หมายเลขบัตรประชาชน"
              addon-left-icon="tim-icons icon-badge"
              :error="errors[0]"
              :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
            </base-input>
            </ValidationProvider>
          </div>
        </div>
      </div>
    </form>
  </ValitionObserver>
</template>
<script>
import { ImageUpload } from 'src/components';
import { extend } from "vee-validate";
import { required, numeric, email, min } from "vee-validate/dist/rules";
import BaseInput from '../../../components/Inputs/BaseInput.vue';
import BaseRadio from '../../../components/Inputs/BaseRadio.vue';

extend("required", required);
extend("numeric", numeric);

export default {
  components: {
    ImageUpload,
    BaseInput,
    BaseRadio
  },
  data() {
    return {
      firstNameThai:'',
      lastNameThai:'',
      firstNameEng:'',
      lastNameEng:'',
      gender: '',
      // radio: {
      //   radio1:"radio1",
      //   radio2:"radio3"
      // },
      // birthDay:'',
      citizenId: '',
      image: ''
    };
  },
  methods: {
    onFileChange(file) {
      this.image = '/img/users/' + file.name;
    },
    validate() {
      const RegisterForm = {
        firstNameThai: this.firstNameThai,
        lastNameThai: this.lastNameThai,
        firstNameEng: this.firstNameEng,
        lastNameEng: this.lastNameEng,
        gender: this.gender,
        citizenId: this.citizenId,
        image: this.image
      }
      this.$emit('on-validated', RegisterForm);
      return Promise.resolve(true);
      // return this.$refs.form.validate().then(res => {
      //   this.$emit("on-validated", RegisterForm);
      //   return res;
      // });
    }
  }
};
</script>
<style></style>
