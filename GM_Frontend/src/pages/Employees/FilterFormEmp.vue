<template>
  <div class="text-left">
    <collapse :active-index="0">
      <collapse-item title="ตัวเลือกการกรอง" name="1">
        <div class="form-row">
          <base-input class="col-sm-4" type="text" 
                      placeholder="รหัสพนักงาน" label="รหัสพนักงาน"
                      v-model="FilterForm.employeeId" />
          <base-button simple type="default" class="filter-button" 
                      @click="onFilterId"
          ><i class="tim-icons icon-zoom-split"/></base-button>
          
          <base-input class="col-sm-4" type="text" 
                      label="ตำแหน่ง">
            <select class="form-control" v-model="FilterForm.position">
              <option v-for="position in PositionOptions" 
                      :key="position.name" :value="position.name"
              >{{position.name}}</option>
            </select>  
          </base-input>
          <base-button simple type="default" class="filter-button" 
                      @click="onFilterPosition"
          ><i class="tim-icons icon-zoom-split"/></base-button>
          
          <base-input class="col-sm-7" type="text" 
                      placeholder="ชื่อพนักงาน" label="ชื่อพนักงาน"
                      v-model="FilterForm.employeeName" />
          <base-button simple type="default" class="filter-button" 
                      @click="onFilterEmployeeName"
          ><i class="tim-icons icon-zoom-split"/></base-button>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import {Collapse, CollapseItem} from '@/components';

export default {
  components: {
    Collapse,
    CollapseItem
  },
  props: ['PositionOptions'],
  data() {
    return {
      FilterForm: {
        employeeId: 0,
        position: '',
        employeeName: ''
      },
    }
  },
  methods: {
    onFilterId(evt) {
      evt.preventDefault();
      this.$emit('getEmployeeId', this.FilterForm.employeeId);
    },
    onFilterPosition(evt) {
      evt.preventDefault();
      this.$emit('getEmployeePosition', this.FilterForm.position);
    },
    onFilterEmployeeName(evt) {
      evt.preventDefault();
      this.$emit('getEmployeeName', this.FilterForm.employeeName);
    }
  }
}
</script>

<style scoped>
.filter-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>