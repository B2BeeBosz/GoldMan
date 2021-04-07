<template>
  <div class="row">
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <div class="row">
          <div class="col-10">
            <filter-form-emp 
              :PositionOptions="PositionOptions"
              @getEmployeeId="findEmployeeById"
              @getEmployeePosition="findEmployeeByPosition"
              @getEmployeeName="findEmployeeByName"   
            />
          </div>
          <div class="col-2">
            <add-employee 
              :positionOptions="PositionOptions" 
              @sendData="onAddEmployee"
            />
          </div>
        </div>
      </card>
    </div>
    <div class="col-12 col-sm-6 col-lg-3 col-xl-3" v-for="employee in filteredItems" :key="employee.id"
         @click="openEditEmployeeModal(employee)">
      <card class="card-primary mb-3">
        <img slot="image" class="card-img-top" :src="employee.users.image">
        <h4 class="card-title">{{employee.users.firstNameThai}} {{employee.users.lastNameThai}}</h4>
        <p class="card-text">{{employee.employeeId}} - {{employee.position}}</p>
      </card>
    </div>
    
    <div>
      <modal :show.sync="EditEmployeeModal" modal-classes="modal-dialog-centered modal-xl">
        <h2 slot="header" class="modal-title">แก้ไขข้อมูลพนักงาน</h2>
        <edit-employee 
          :EditEmployeeData="EditEmployeeData"
          :positionOptions="PositionOptions"
        />
      </modal>
    </div>

    

  </div>
</template>

<script>
import {Modal} from 'src/components';
import AddEmployee from './AddEmployee.vue';
import FilterFormEmp from './FilterFormEmp.vue';
import EditEmployee from './EditEmployee.vue';

import EmployeesDataService from '../../services/EmployeesDataService';

export default {
    components:{
      Modal,
      AddEmployee,
      FilterFormEmp,
      EditEmployee,

      EmployeesDataService
    },
    data() {
      return {
        Employees: [],
        PositionOptions: [
          { name: 'เจ้าของร้าน' },
          { name: 'พนักงานจัดการระบบร้าน' },
          { name: 'พนักงานขาย' }
        ],
        filterValue: '',

        // Edit Employee
        EditEmployeeData: {
          employeeId: 0,
          employeeName: '',
          position: '',
          shopId: 0,
          users: {
            firstNameThai: '',
            image: '',
            lastNameThai: '',
            userId: 0
          }
        },
        EditEmployeeModal: false
      }
    },
    computed: {
      filteredItems(){
        return this.Employees.filter(item => {
          const employeeId = item.employeeId.toString();
          const position = item.position.toString();
          const employeeName = item.position.toString();
          
          const search = this.filterValue === '' ? '' : this.filterValue.toString();

          return employeeId.includes(search) ||
                 position.includes(search) ||
                 employeeName.includes(search);
        });  
      }
    },
    mounted() {
      this.retrieveEmployees();
    },
    methods: {
      refreshList() {
        this.retrieveEmployees();
      },

      // Retrieve
      retrieveEmployees() {
        EmployeesDataService.getAll().then(res => {
          this.Employees = res.data;
          console.log(res.data);
        }).catch(e => {
          console.log(e);
        });
      },
      // Filter
      findEmployeeById(getData) {
        this.filterValue = getData.toString();
        // EmployeesDataService.findById(getData)
        //   .then(res => {
        //     console.log(res.data);
        //     this.Employees = res.data;
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
      },
      findEmployeeByPosition(getData) {
        this.filterValue = getData.toString();
        // EmployeesDataService.findByPosition(getData)
        //   .then(res => {
        //     this.Employees = res.data;
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
      },
      findEmployeeByName(getData) {
        this.filterValue = getData.toString();
        // EmployeesDataService.findByName(getData)
        //   .then(res => {
        //     this.Employees = res.data;
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
      },

      // Add Employee
      onAddEmployee(sendData) {
        EmployeesDataService.create(sendData).then(res => {
          console.log(res.data);
          this.Employees.employeeId = res.data.employeeId;
        }).catch(e => {
          console.log(e);
        });
      },
      
      // Edit Employee
      openEditEmployeeModal(employee) {
        console.log(employee);
        this.EditEmployeeData = employee;
        this.EditEmployeeModal = true;
      },
    }
};
</script>
