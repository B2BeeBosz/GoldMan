<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
    <div>
      <h5 class="info-text">
        ข้อมูลติดต่อ
      </h5>
      <div class="row justify-content-center mt-5">
        <div class="col-sm-9">
          <ValidationProvider
            name="username"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            label="ชื่อผู้ใช้งาน (Username)"
            required
            v-model="username"
            placeholder="ชื่อผู้ใช้งาน"
            addon-left-icon="tim-icons icon-single-02"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required|min:8|password:@confirm"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            label="รหัสผ่าน (Password)"
            required
            v-model="password"
            type="password"
            placeholder="รหัสผ่าน"
            addon-left-icon="tim-icons icon-lock-circle"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
          <!-- <small slot="helperText" id="emailHelp" class="form-text text-muted">รหัสผ่านต้องมีความยาวอย่างน้อย 8 อักขระ</small> -->
         </ValidationProvider>
         <ValidationProvider
            name="confirm"
            rules="required"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            label="ยืนยันรหัสผ่าน"
            required
            v-model="confirmation"
            type="password"
            placeholder="รหัสผ่าน"
            addon-left-icon="tim-icons icon-lock-circle"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>
        </div>
        <div class="col-sm-9">
         <ValidationProvider
           name="email"
           rules="required|email"
           v-slot="{ passed, failed, errors }"
         >
         <base-input
           label="อีเมล (Email)"
           required
           v-model="email"
           placeholder="example@mail.com"
           addon-left-icon="tim-icons icon-email-85"
           :error="errors[0]"
           :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
         </base-input>
        </ValidationProvider>
        

         <ValidationProvider
           name="phone"
           rules="required|numeric"
           v-slot="{ passed, failed, errors }"
         >
         <base-input
           required
           label="เบอร์โทรศัพท์ (Phone Number)"
           v-model="phoneNum"
           placeholder="เบอร์โทรศัพท์ (ไม่ต้องใส่ - )"
           addon-left-icon="tim-icons icon-mobile"
           :error="errors[0]"
           :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
         </base-input>
        </ValidationProvider>
        </div>
      </div>
    </div>
  </form>
</ValidationObserver>
</template>
<script>

import { extend } from "vee-validate";
import { required, numeric, email, min, max } from "vee-validate/dist/rules";
import RolesDataService from '../../../services/RolesDataService';
import BaseInput from '../../../components/Inputs/BaseInput.vue';

extend("email", email);
extend("required", required);
extend("numeric", numeric);
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'การยืนยันรหัสผ่านไม่ตรงกัน'
});


export default {
  components: {
    RolesDataService,
    BaseInput
  },
  data() {
    return {
      username: '',
      password: '',
      email: '',
      phoneNum: '',
      confirmation,
      rolesOptions: []
    };
  },
  methods: {
    validate() {
      const RegisterForm = {
        username: this.username,
        password: this.password,
        email: this.email,
        phoneNum: this.phoneNum
      }
      // console.log(RegisterForm);
      return this.$refs.form.validate().then(res => {
        this.$emit("on-validated", RegisterForm);
        return res;
      });
    },
    retrieveRolesOptions() {
      RolesDataService.getAllRoles().then(res => {
        this.rolesOptions = res.data;
      }).catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.retrieveRolesOptions();
  }
};
</script>
<style></style>
