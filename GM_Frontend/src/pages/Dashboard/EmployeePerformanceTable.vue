<template>
  <base-table :data="sortedTable" thead-classes="text-primary">
    <template slot="columns" slot-scope="{ columns }">
      <th class="text-center">อันดับที่</th>
      <th class="text-center">รูปภาพ</th>
      <th class="text-center">ชื่อพนักงาน</th>
      <!-- <th class="text-center">รหัสพนักงาน</th> -->
      <th class="text-center">ตำแหน่งงาน</th>
      <th class="text-center">น้ำหนักขายออก (กรัม)</th>
      <th class="text-center">เงินสดขายออก (บาท)</th>
    </template>

    <template slot-scope="{ row, index }">
      <td class="text-center">{{index+1}}</td>
      <td class="text-center">
        <div class="photo"><img :src="row.employee.users.image" alt="photo" /></div>
      </td>
      <td class="text-center">{{ row.employee.employeeName }}</td>
      <!-- <td class="text-center">{{ row.employeeId }}</td> -->
      <td class="text-center">{{ row.employee.position }}</td>
      <td class="text-center">
        {{ row.accountings_inventory.goldWeightTotalSell.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}
      </td>
      <td class="text-center">
        {{ row.accountings_inventory.valueSell.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}
      </td>
    </template>
  </base-table>
</template>

<script>
import { BaseTable, BaseProgress } from '@/components';
import EmployeesDataService from '../../services/EmployeesDataService';
import DashboardDataService from '../../services/DashboardDataService';
import AccountingDataService from '../../services/AccountingDataService';

export default {
  components: {
    BaseTable,
    BaseProgress,
    EmployeesDataService,
    AccountingDataService
  },
  data() {
    return {
      table: [],
      progress: []
    };
  },
  computed: {
    sortedTable() {
      let result = this.table;
      function compare(a, b) {
        if (a.accountings_inventory.valueSell < b.accountings_inventory.valueSell)
          return 11;
        if (a.accountings_inventory.valueSell > b.accountings_inventory.valueSell)
          return -1;
        return 0;
      }
      return result.sort(compare);
    }
  },
  methods: {
    // Owner View
    retrieveEmployeesData() { 
      DashboardDataService.getEmployeePerfTable().then(res => {
        // console.log(res.data);
        this.table = res.data;
        // console.log(this.table);
      }).catch(e => {
        console.log(e);
      });
    },
    calculateProgressBar() {
      var weightTotal = 0.0;
      var percentage = 0.0;
      for (let i = 0; i < this.table.length; i++) {
        weightTotal += this.table[i].accountings_inventory.goldWeightTotalSell;
      }
      console.log(weightTotal);
      for (let i = 0; i < this.table.length; i++) {
        percentage = this.table[i].accountings_inventory.goldWeightTotalSell / weightTotal;
        this.progress.push(percentage);
      }
      console.log(this.progress);
    }
    // Employee View
  },
  mounted() {
    this.retrieveEmployeesData();
  },
};
</script>
