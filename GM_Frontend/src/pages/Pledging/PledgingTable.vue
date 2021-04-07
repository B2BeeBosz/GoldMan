<template>
  <div class="table-overflow-horizontal">
    <!-- Pledging Table -->
    <base-table :data="parentData" thead-classes="text-primary">
      <template slot="columns">
        <th class="text-center">ลำดับที่</th>
        <th class="text-center">รหัสรายการ</th>
        <th class="text-center">วันที่นำเข้า</th>
        <th class="text-center">ชื่อลูกค้า</th>
        <th class="text-center">จำนวนเงิน (บาท)</th>
        <th class="text-center">ดอกเบี้ย/เดือน (บาท)</th>
        <!-- <th class="text-center">ดอกเบี้ยชำระสะสม (บาท)</th> -->
        <th class="text-center">กำหนดชำระครั้งถัดไป</th>
        <th class="text-center">วันที่ครบกำหนด</th>
        <th class="text-center">ตัวเลือก</th>
      </template>

      <template slot-scope="{row, index}"> 
        <td class="text-center" style="min-width: 80px">{{index + 1}}</td>
        <td class="text-center" style="min-width: 150px">{{row.transactionId}}</td>
        <td class="text-center" style="min-width: 150px">{{row.date}}</td>
        <td class="text-center" style="min-width: 200px">{{row.customer.customerName}}</td>
        <td class="text-center" style="min-width: 150px">{{row.netPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</td>
        <td class="text-center" style="min-width: 150px">{{row.interests.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</td>
        <!-- <td class="text-center" style="min-width: 150px"></td> -->
        <td class="text-center" style="min-width: 150px">{{row.nextDueDate}}</td>
        <td class="text-center" style="min-width: 150px">{{row.dueDate}}</td>
        
        <td class="text-center" style="min-width: 140px">
          <el-tooltip content="ไถ่ถอนทองคืน" :open-delay="300" placement="top">
            <base-button type="success" class="btn-link action-btn"
                         @click="returnPledging(row)">
              <i class="tim-icons icon-check-2"></i>
            </base-button>
          </el-tooltip>
          <el-tooltip content="ต่อดอกเบี้ย" :open-delay="300" placement="top">
            <base-button type="success" class="btn-link action-btn"
                         @click="extendInterestDueDate(row)">
              <i class="tim-icons icon-simple-add"></i>
            </base-button>
          </el-tooltip>
          <el-tooltip content="ดูข้อมูล" :open-delay="300" placement="top">
            <base-button type="info" class="btn-link action-btn"
                         @click="showPledgingInfo(row)">
              <i class="tim-icons icon-alert-circle-exc"></i>
            </base-button>
          </el-tooltip>
          <!-- <el-tooltip content="นำออกรายการ" :open-delay="300" placement="top">
            <base-button type="danger" class="btn-link action-btn"
                         @click="removePledging(row)">
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>   -->
        </td>

      </template>
    </base-table>
  </div>    
</template>

<script>
import {BaseTable, BaseButton} from 'src/components';
import PledgingDataService from '../../services/PledgingDataService.js';

export default {
  components: {
    BaseTable,
    BaseButton,
    PledgingDataService
  },
  props: ['parentData'],
  data() {
    return {
      // ExportData: {
      //   transactionId: '',
      //   date: '',
      //   dueDate: '',
      //   nextDueDate: '',
      //   interests: 0,
      //   netPrice: 0,
      //   customer: {
      //     customerId: 0,
      //     customerName: ''
      //   },
      //   deleteFlag: 0
      // }
    }
  },
  computed: {

  },
  methods: {
    // ไถ่ทองคืน
    returnPledging(row) {
      const ExportData = {
        transactionId: row.transactionId,
        date: row.date,
        dueDate: row.dueDate,
        nextDueDate: row.nextDueDate,
        interests: row.interests,
        netPrice: row.netPrice,
        shopId: row.shopId,
        customer: {
          customerId: row.customer.customerId,
          customerName: row.customer.customerName
        },
        deleteFlag: 0
      }
      this.$emit('returnPledging', ExportData);
    },
    // ต่อดอกเบี้ย
    extendInterestDueDate(row) {
      const ExportData = {
        transactionId: row.transactionId,
        date: row.date,
        dueDate: row.dueDate,
        nextDueDate: row.nextDueDate,
        interests: row.interests,
        netPrice: row.netPrice,
        shopId: row.shopId,
        customer: {
          customerId: row.customer.customerId,
          customerName: row.customer.customerName
        },
        deleteFlag: 0
      }
      this.$emit('extendPledging', ExportData);
    },
    // แสดงข้อมูลขายฝาก
    showPledgingInfo(row) {
      // console.log(row);
      // this.retrieveCustomerUser(row);
      this.$emit("showPledgingInfo", row);
    }
  }
};
</script>

<style scoped>
.action-btn {
  margin: 0px 1px;
  padding: 10px 10px;
}
.table-overflow-horizontal {
  overflow-x: auto;
}
</style>