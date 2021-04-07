<template>
  <div>
    <div class="row">
      <!-- FORM AREA -->
      <div class="col-8">
        <form @submit="onSubmit" @reset="onReset">
          <h4 class="header">ข้อมูลพนักงาน</h4>
          <div class="form-row">
            <base-input class="col-12 col-sm-12 col-lg-4" type="text" label="รหัสผู้ใช้งาน"
                        :value="KeepEmpData.users.userId" :disabled="true" />
            <base-input class="col-12 col-sm-12 col-lg-8" type="text" 
                        label="ชื่อพนักงาน" 
                        :value="KeepEmpData.employeeName" :disabled="true" />
          </div>
          <div class="form-row">
            <base-input class="col-12 col-sm-12 col-lg-6" label="ตำแหน่ง" required>
              <select class="form-control" v-model="KeepEmpData.position">
                <option v-for="position in positionOptions"
                        :key="position.name" :value="position.name"
                >{{position.name}}</option>
              </select>
            </base-input>
          </div>
            
          <div class="form-row"> 
            <base-input class="col-12 col-sm-12 col-lg-6" type="text" 
                        label="กำหนดรหัสพนักงาน" placeholder="รหัสพนักงาน" 
                        v-model="KeepEmpData.employeeId" />
          </div>
          
          <div class="form-row mt-3">
            <div class="col-6">
              <base-button block class="animation-on-hover" 
                           type="warning" native-type="submit"
              >บันทึกข้อมูล</base-button>
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
          <img slot="image" class="card-img-top" :src="KeepEmpData.users.image">
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import {BaseButton, BaseInput, Modal} from 'src/components';
import EmployeesDataService from '../../services/EmployeesDataService';
import RolesDataService from '../../services/RolesDataService';
import UsersDataService from '../../services/UsersDataService';

export default {
  components: {
    BaseButton,
    BaseInput,
    Modal,
    EmployeesDataService,
    RolesDataService,
    UsersDataService
  },
  props: ['EditEmployeeData', 'positionOptions'],
  data() {
    return {
      // KeepEmpData: {
      //   employeeId: this.EditEmployeeData.employeeId,
      //   employeeName: this.EditEmployeeData.employeeName,
      //   position: this.EditEmployeeData.position,
      //   shopId: this.EditEmployeeData.shopId,
      //   users: {
      //     userId: this.EditEmployeeData.users.userId,
      //     firstNameThai: this.EditEmployeeData.users.firstNameThai,
      //     lastNameThai: this.EditEmployeeData.users.lastNameThai,
      //     image: this.EditEmployeeData.users.image
      //   }
      // }
      KeepEmpData: this.EditEmployeeData
    };
  },
  computed: {
    
  },
  methods: {
    onSubmit(evt) {
      const EditedData = {
        employeeId: this.KeepEmpData.employeeId,
        position: this.KeepEmpData.position
      };
      
      EmployeesDataService.update(this.EditEmployeeData.employeeId, EditedData).then(res => {
        RolesDataService.findRoleByNameThai(this.EditedData.position).then(res => {
          const Role = {
            roleId: res.data[0].roleId
          };
          UsersDataService.update(this.EditEmployeeData.users.userId, {
            roleId: Role.roleId
          }).then(res => {
            this.$emit('closeEditEmployeeModal');
          }).catch(e => {
            console.log(e);
          });
        }).catch(e => {
          console.log(e);
        });
      }).catch(e => {
        console.log(e);
      });
    },
    onReset(evt) {
      evt.preventDefault();
    }
  }
}
</script>

<style>

</style>