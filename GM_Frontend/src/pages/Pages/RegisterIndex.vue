<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
        <form >
            <div class="mb-5">
            <img src="img/icons/GoldmanLogoLong.png"/>
            </div>

            
            <card class="card-login card-white">
            <!-- สำหรับลูกค้า -->
            <h3 class="card-title">สมัครใช้บัญชีสำหรับลูกค้า</h3>
            <p class="text-center">สำหรับลูกค้า</p>
            <div class="d-flex justify-content-center">
            <router-link to="/register">
            <base-button type="primary" size="lg" @click="AddRoleClick(5)">
                สมัครสมาชิก
            </base-button>
            </router-link>
            </div>
            
            <!-- สำหรับร้านค้า -->
            <hr>
            <h3 class="card-title">สมัครใช้บัญชีสำหรับจัดการร้านค้า</h3>
            <!-- owner -->
            <p class="text-center">สำหรับเจ้าของร้าน</p>
            <div class="d-flex justify-content-center">
        
            <base-button type="primary" size="lg" @click="AddRoleClick(2)">
                สมัครสมาชิก
            </base-button></div>
            <!-- employee -->
            <p class="text-center">สำหรับพนักงาน</p> 
            <div class="d-flex justify-content-center">
            <base-button type="primary" size="lg" @click="AddRoleClick(4)">
                สมัครสมาชิก
            </base-button></div>           
            </card>
        </form>
    </div>
  </div>
</template>

<script> 
import BaseButton from '../../components/BaseButton.vue';
import RolesDataService from '../../services/RolesDataService.js';
// import FirstStep from '../'

export default {
    components: {
        BaseButton,
        RolesDataService
    },
    data() {
        return {
            roleId:0,
        }
    },
    methods: {
        retrieveRoles() {
            RolesDataService.getAllRoles()
                .then(res => {
                    this.roleId= res.data;
                    console.log(this.roleId);
                }).catch(e => {
                    console.log(e);
                })
        },
        AddRoleClick(value){
            this.roleId = value;
            console.log(value)
            this.retrieveRoles();

        }
        
    }
}
</script>
<style scoped>
.col-lg-4 {
  max-width: 50%;
}
.card.card-white .card-title{
  color:black;
}

.text-center{
    text-align: center;
    color: gray !important;
}
</style>
