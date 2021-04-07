<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <simple-wizard>
          <template slot="header">
            <h3 class="white-color">สมัครสมาชิก</h3>
            <!-- <h3 class="card-category description-text">
              สร้างข้อมูลเพิ่มเติมเกี่ยวกับบัญชี
            </h3> -->
          </template>

          <wizard-tab :before-change="() => validateStep('step1')">
            <template slot="label">
              <i class="tim-icons icon-single-02"></i>
              <p class="white-color">ข้อมูลลงทะเบียน</p>
            </template>
            <first-step
              ref="step1"
              @on-validated="onStepValidated"
            ></first-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="tim-icons icon-settings-gear-63"></i>
              <p class="white-color">ข้อมูลส่วนตัว</p>
            </template>
            <second-step
              ref="step2"
              @on-validated="onStepValidated"
            ></second-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step3')">
            <template slot="label">
              <i class="tim-icons icon-delivery-fast"></i>
              <p class="white-color">ข้อมูลติดต่อ</p>
            </template>
            <third-step 
              ref="step3"
              @on-validated="onStepValidated"
            ></third-step>
          </wizard-tab>
        </simple-wizard>
      </div>
    </div>
  </div>
  
</template>
<script>

import { BaseCheckbox } from 'src/components';
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import FirstStep from '../Forms/Wizard/FirstStep.vue';
import SecondStep from '../Forms/Wizard/SecondStep.vue';
import ThirdStep from '../Forms/Wizard/ThirdStep.vue';
import swal from 'sweetalert2';
import { SimpleWizard, WizardTab } from 'src/components';
import User from '../../model/user';

extend("email", email);
extend("required", required);

export default {
  name: 'Register',
  components: {
    BaseCheckbox,
    SimpleWizard,
    FirstStep,
    SecondStep,
    ThirdStep,
    SimpleWizard,
    WizardTab
  },
  data() {
    return {
      email: '',
      fullname: '',
      password: '',
      wizardModel: new User('','','','','','','','','','','','','','','','','',''),
      // user: new User('','','','','','','','','','','','','','','','','',''),
      message: '',
      submitted: false,
      successful: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    next(){
      var x = document.getElementById("tab");
    },
    submit() {
      alert("Form has been submitted!");
    },
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(model) {
      // console.log(model);
      this.wizardModel = { ...this.wizardModel, ...model };
      console.log(this.wizardModel);
    },
    wizardComplete() {
      swal('Good job!', 'You clicked the finish button!', 'success');
      console.log(this.wizardModel);
      // this.handleRegister();
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.wizardModel).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message = 
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  }
};
</script>

<style scoped>
.tab {
  display: none;
}
p {
  width: max-content;
}
.white-color {
  color: #FFFFFF !important;
}
.description-text {
  font-size: 1.3rem !important;
}
</style>
