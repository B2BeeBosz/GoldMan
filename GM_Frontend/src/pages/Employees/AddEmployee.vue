<template>
  <div>
    <base-button block class="animation-on-hover" type="warning" @click="TurnOnModal">
      เพิ่มพนักงาน
    </base-button>
  
    <modal :show.sync="AddEmployeeModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">เพิ่มพนักงาน</h2>
        <div class="form-row">
          <!-- FORM AREA -->
          <div class="col-8">
          <form @submit="onSubmit" @reset="onReset">
            <!-- <div class="form-row">
              <label class="col-12">พนักงานใหม่</label>
              <card 
                v-for="card in NewEmployees" 
                :key="card.id"
                class="col-md-4"
              >
                <div class="row">
                  <div class="col-12 mb-2">
                    <p>{{card.employeeName}}</p>
                    <p class="card-category">{{card.position}}</p>
                  </div>
                  <div class="col-6">
                    <base-button 
                      block simple type="success" 
                      class="animation-on-hover"
                      @click="onAutoFill(card)"  
                    >
                      <i class="tim-icons icon-check-2"></i>
                    </base-button>
                  </div>
                  <div class="col-6">
                    <base-button 
                      block simple type="danger" 
                      class="animation-on-hover"
                      @click="onDecline(card)"  
                    >
                      <i class="tim-icons icon-simple-remove"></i>
                    </base-button>
                  </div>
                </div>
              </card>
            </div> -->
            <h4 class="header">ข้อมูลพนักงาน</h4>
            <div class="form-row">
              <base-input class="col-md-4" type="text" label="รหัสผู้ใช้งาน"
                          v-model="FormEmployee.userId" required />
              <base-button 
                simple type="default"
                size="sm"
                class="auto-fill-button"
                @click="onUserSearch"  
              >ค้นหา</base-button>
            </div>
            <div class="form-row">
              <base-input class="col-md-12" type="text" 
                          label="ชื่อพนักงาน" 
                          v-model="FormEmployee.employeeName" required />
              
              <base-input class="col-md-6" label="ตำแหน่ง" required>
                <select class="form-control" v-model="FormEmployee.position">
                  <option v-for="position in positionOptions"
                          :key="position.name" :value="position.name"
                  >{{position.name}}</option>
                </select>
              </base-input>
            </div>
            
            <div class="form-row"> 
              <base-input class="col-md-6" type="text" 
                          label="กำหนดรหัสพนักงาน" placeholder="รหัสพนักงาน" 
                          v-model="FormEmployee.employeeId" />
            </div>
            
            <div class="form-row mt-3">
              <div class="col-6">
                <base-button block class="animation-on-hover" 
                           type="warning" native-type="submit"
                >เพิ่มพนักงาน</base-button>
              </div>
              <div class="col-6">
                <base-button block simple class="animation-on-hover" 
                           type="warning" native-type="reset"
                >ล้างรายการ</base-button>
              </div> 
            </div>
          </form>
        </div>
            
        <!-- PICTURE AREA -->
        <div class="col-4">
          <card class="card-primary">
            <img slot="image" class="card-img-top" :src="FormUser.image">
          </card>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import {BaseButton, BaseRadio, Modal} from '@/components';
import EmployeesDataService from '../../services/EmployeesDataService';
import UsersDataService from '../../services/UsersDataService';

export default {
  components: {
    BaseButton,
    BaseRadio,
    Modal,
    EmployeesDataService,
    UsersDataService
  },
  props: ['positionOptions'],
  data() {
    return {
      AddEmployeeModal: false,
      FormEmployee: {
        employeeId: 0,
        userId: 0,
        shopId: 1,
        employeeName: '',
        position: ''
      },
      FormUser: {
        image: ''
      },
      NewEmployees: []
    }
  },
  methods: {
    TurnOnModal: function() {
      this.AddEmployeeModal = true;
      // this.retrieveNewEmployee();
    },
    // refreshNewEmployee() {
    //   this.retrieveNewEmployee();
    // },
    // Retrieve
    // retrieveNewEmployee() {
    //   EmployeesDataService.findNotApproved()
    //     .then(res => {
    //       console.log(res.data);
    //       this.NewEmployees = res.data;
    //     }).catch(e => {
    //       console.log(e);
    //     });
    // },
    // Buttons
    onUserSearch() {
      var userId = this.FormEmployee.userId;
      UsersDataService.findById(userId).then(res => {
        console.log(res.data);
        this.FormUser.image = res.data.image;
        this.FormEmployee.employeeName = res.data.firstNameThai + ' ' + res.data.lastNameThai;
      }).catch(e => {
        console.log(e);
      })
    },
    // onAutoFill(card) {
    //   // console.log(card);
    //   this.FormEmployee.employeeName = card.employeeName;
    //   this.FormEmployee.position = card.position;
    //   this.FormEmployee.employeeId = card.employeeId;
    //   this.FormEmployee.userId = card.users.userId;
    //   this.FormUser.image = card.users.image;
    // },
    // onDecline(card) {
    //   EmployeesDataService.delete(card.employeeId)
    //     .then(res => {
    //       console.log(res.data);
    //       this.refreshNewEmployee();
    //     })
    // },
    onSubmit(evt) {
      // this.FormEmployee.approved = 1;
      this.$emit('sendData', this.FormEmployee);
    },
    onReset(evt) {
      evt.preventDefault();
      this.FormEmployee.employeeName = '';
      this.FormEmployee.position = '';
      this.FormEmployee.employeeId = 0;
      this.FormEmployee.userId = 0;
      this.FormUser.image = '';
    },
    
  } 
};
</script>

<style scoped>
.auto-fill-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>
