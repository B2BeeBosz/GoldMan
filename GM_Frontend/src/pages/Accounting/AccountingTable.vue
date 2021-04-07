<template>
  <div>
    <base-table :data="parentData" thead-classes="text-primary">
      <template slot="columns">
        <th class="text-center">ลำดับที่</th> 
        <th class="text-center">รหัสรายการ</th>
        <th class="text-center">รายการ</th>
        <th class="text-center">ราคาทองแท่ง</th>
        <th class="text-center">ชื่อสินค้า</th>
        <th class="text-center">กลุ่มสินค้า</th>
        <th class="text-center">จำนวน</th>
        <th class="text-center">น้ำหนักทอง</th>
        <th class="text-center">ราคาสุทธิ</th>
        <th class="text-center">ชื่อพนักงาน</th>
        <th class="text-center">ตัวเลือก</th>
      </template>

      <template slot-scope="{ row, index }">
        <td class="text-center">{{ index+1 }}</td>
        <td class="text-center">{{ row.transactionId }}</td>
        <td class="text-center">{{ row.transactionType }}</td>
        <td class="text-center">{{ row.goldPrice }}</td>
        <td class="text-center">
          <div v-if="row.transactionType === 'ขายออก'">
            {{ row.accountings_inventory.inventory.productName }}
          </div>
          <div v-else>
            รับซื้อทองเก่า
          </div>
        </td>
        <td class="text-center">
          <div v-if="row.transactionType === 'ขายออก'">
            {{ row.accountings_inventory.inventory.productGroup.name }}
          </div>
          <div v-else></div>
        </td>
        <td class="text-center">
          <div v-if="row.transactionType === 'ขายออก'">
            {{ row.accountings_inventory.quantity }}
          </div>
          <div v-else></div>
        </td>
        <td class="text-center">
          <div v-if="row.transactionType === 'ขายออก'">
            {{ row.accountings_inventory.inventory.productWeight.goldWeight }}
          </div>
          <div v-else></div>
        </td>
        <td class="text-center">{{ row.accountings_inventory.netPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</td>
        <td class="text-center">{{ row.employee.employeeName }}</td>
      
        <!-- Action Buttons -->
        <td class="text-center">
          <!-- Edit Button -->
          <!-- <base-button 
            type="success" 
            class="btn-link"
            @click="openEditModal(row)"
          >
            <i class="tim-icons icon-pencil"></i>
          </base-button> -->
          <!-- Delete Button -->
          <base-button 
            type="danger" 
            class="btn-link"
            @click="openAlertModal(row)"
          >
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
  
        </td>
      </template>
    </base-table>
  </div>
</template>

<script>
import { BaseTable, BaseButton } from 'src/components';

export default {
  components: {
    BaseTable,
    BaseButton
  },
  props: ['parentData', 'groupOptions', 'bahtOptions', 'employeeOptions'],
  data() {
    return {

    }
  },
  computed: {
  },
  methods: {
    openEditModal(row) {
      // let updateKeys = {
      //   transactionId: row.transactionId,
      //   productId: row.productId
      // };
      // console.log(row);
      // this.editModal = true;
      // this.updateId = row.transactionId;
      this.$emit('onUpdate', row);
      // this.$emit('openEditModal', );
    },
    openAlertModal(row) {
      // let deleteKeys = {
      //   transactionId: row.transactionId,
      //   // productId: row.accountings_inventory.productId
      // };
      // console.log(deleteKeys);
      // this.deleteId = row.transactionId;
      // this.alertModal = true;
      this.$emit('onDelete', row);
    }
  }
};
</script>
