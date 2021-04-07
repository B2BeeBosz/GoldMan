<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div class="mb-5">
            <img src="img/icons/GoldmanLogoLong.png"/>
          </div>
          <!-- <h1 class="title goldman-logo text-center">GoldMan</h1> -->
          <card class="card-login card-white">
            <!-- <template slot="header"> -->
              <!-- <img src="img/card-primary.png" alt="" /> -->
              <h3 class="card-title">เข้าสู่ระบบ</h3>
            <!-- </template> -->

            <div>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed, errors }"
              >
              <base-input
                required
                v-model="email"
                type="email"
                placeholder="อีเมลล์"
                addon-left-icon="tim-icons icon-email-85"
                :error="errors[0]"
                :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
              </base-input>
             </ValidationProvider>

             <ValidationProvider
               name="password"
               rules="required|min:5"
               v-slot="{ passed, failed, errors }"
             >
             <base-input
               required
               v-model="password"
               placeholder="รหัสผ่าน"
               addon-left-icon="tim-icons icon-lock-circle"
               type="password"
               :error="errors[0]"
               :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
             </base-input>
            </ValidationProvider>
            </div>

            <div slot="footer">
              <!-- <router-link to="/shop/dashboard"> -->
                <base-button block type="primary" native-type="submit" 
                             class="mb-3" size="lg"
                             :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>เข้าสู่ระบบ</span>
                </base-button>
              <!-- </router-link> -->
              <router-link class="link footer-link" to="/registerIndex">
                สมัครสมาชิก
              </router-link>
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("email", email);
extend("min", min);
extend("required", required);

import User from '../../model/user';
import UsersDataService from '../../services/UsersDataService';

export default {
  components: {
    UsersDataService
  },
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      roleId: 0,
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.email && this.password) {
          this.user.email = this.email;
          this.user.password = this.password;
          this.$store.dispatch('auth/login', this.user)
            .then(() => {
              // UsersDataService.findById(23).then(res => {
              //   this.roleId = res.data.roleId;
              if (this.roleId === 5) {
                this.$router.push('/customer/shop');
              } else {
                this.$router.push('/shop/dashboard');
              }
              // }).catch(e => {
              //   console.log(e);
              // });
            },
            error => {
              this.loading = false;
              this.message = 
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            });
        }
      });
    },
    submit() {
      // alert("Form has been submitted!");
      this.handleLogin();
    }
  }
};
</script>
<style scoped>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}

.white-content .full-page {
  background: #00223B;
}
.col-lg-4 {
  max-width: 50%;
}
.card.card-white .card-title{
  color:black;
}


</style>
