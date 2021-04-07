<template>
  <div>
  <!-- Owner's View -->
  <div v-if="Role == 'owner'">
    <div class="form-row">
      <base-input class="col-sm-10 col-lg-3" type="text" 
                  placeholder="20210101235959" label="รหัสรายการ"
                  v-model="FilterInput.transactionId"            
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterTransaction"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-10 col-lg-3" type="date" 
                  label="วันที่ซื้อขาย" min="1984-01-01" max="2030-12-31"
                  v-model="FilterInput.date">
      </base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterDate"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-10 col-lg-3" type="text" 
                  placeholder="ชื่อผู้ขาย" label="ชื่อผู้ขาย">
        <select class="form-control" v-model="FilterInput.employeeId">
          <option v-for="employee in employeeOptions"
                  :key="employee.id" :value="employee.id"
          >{{employee.name}}</option>
        </select>
      </base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterEmployeeId"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-10 col-lg-5" type="text" 
                  placeholder="สร้อยคอทองคำ 1 สลึง" label="ชื่อสินค้า"
                  v-model="FilterInput.productName"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterProductName"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>
     
    </div>
  </div>

  <!-- Employee's View -->
  <div v-if="Role == 'employee'">
    <div class="form-row">
      <base-input class="col-sm-10 col-md-10 col-lg-3 col-xl-3" type="text" 
                  placeholder="20210101235959" label="รหัสรายการ"
                  v-model="FilterInput.transactionId"            
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterTransaction"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-10 col-lg-3" type="date" 
                  label="วันที่ซื้อขาย" min="1984-01-01" max="2030-12-31"
                  v-model="FilterInput.date"/>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterDate"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-10 col-md-10 col-lg-4 col-xl-4" type="text" 
                  placeholder="ชื่อผู้ขาย" label="ชื่อผู้ขาย">
        <select class="form-control" v-model="FilterInput.employeeId">
          <option v-for="employee in employeeOptions"
                  :key="employee.id" :value="employee.id"
          >{{employee.name}}</option>
        </select>
      </base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterEmployeeId"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>

      <base-input class="col-sm-10 col-md-10 col-lg-6 col-xl-6" type="text" 
                  placeholder="สร้อยคอทองคำ 1 สลึง" label="ชื่อสินค้า"
                  v-model="FilterInput.productName"
      ></base-input>
      <base-button 
        simple type="default"
        class="auto-fill-button"
        @click="onFilterProductName"
      >
        <i class="tim-icons icon-zoom-split" />
      </base-button>
     
    </div>
  </div>

  </div>
</template>

<script>
import {BaseButton, BaseInput} from '@/components'

export default {
  components: {
    BaseButton,
    BaseInput
  },
  props: ['employeeOptions', 'groupOptions'],
  data() {
    return {
      Role: 'owner',
      FilterInput: {
        transactionId: '',
        productName: '',
        group: '',
        employeeId: '',
        date: ''
      },
    }
  },
  methods: {
    onFilterTransaction(evt) {
      evt.preventDefault();
      this.$emit('getFilterTransaction', this.FilterInput.transactionId);
    },
    onFilterProductName(evt) {
      evt.preventDefault();
      this.$emit('getFilterProductName', this.FilterInput.productName);
    },
    onFilterGroup(evt) {
      evt.preventDefault();
      this.$emit('getFilterGroup', this.FilterInput.group);
    },
    onFilterEmployeeId(evt) {
      evt.preventDefault();
      this.$emit('getFilterEmployeeId', this.FilterInput.employeeId);
    },
    onFilterDate(evt) {
      evt.preventDefault();
      this.$emit('getDate', this.FilterInput.date);
    }
  }    
}
</script>

<style scoped>
.auto-fill-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>