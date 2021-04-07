<template>
  <div>
    <base-table :data="parentData" thead-classes="text-primary">
      <template slot="columns">
        <th class="text-center">ลำดับที่</th> 
        <th class="text-center">รหัสรายการ</th>
        <!-- <th class="text-center">รายการ</th> -->
        <th class="text-center">ราคาทองแท่ง</th>
        <th class="text-center">ชื่อรายการ</th>
        <!-- <th class="text-center">กลุ่มสินค้า</th> -->
        <!-- <th class="text-center">จำนวน</th> -->
        <th class="text-center">น้ำหนักทอง</th>
        <th class="text-center">ราคาสุทธิ</th>
        <th class="text-center">ชื่อพนักงาน</th>
        <th class="text-center">ตัวเลือก</th>
      </template>

      <template slot-scope="{ row, index }">
        <td class="text-center">{{ index+1 }}</td>
        <td class="text-center">{{ row.transactionId }}</td>
        <!-- <td class="text-center">{{ row.transactionType }}</td> -->
        <td class="text-center">{{ row.goldPrice }}</td>
        <td class="text-center">{{ row.accountings_inventory.inventory.productName }}</td>
        <!-- <td class="text-center">{{ row.accountings_inventory.inventory.group }}</td> -->
        <!-- <td class="text-center">{{ row.accountings_inventory.quantity }}</td> -->
        <td class="text-center">{{ row.accountings_inventory.inventory.goldWeight }}</td>
        <td class="text-center">{{ row.accountings_inventory.netPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</td>
        <td class="text-center">{{ row.employee.employeeName }}</td>
      
        <!-- Action Buttons -->
        <td class="text-center">
          <!-- Edit Button -->
          <base-button 
            type="success" 
            class="btn-link"
            @click="openEditModal(row)"
          >
            <i class="tim-icons icon-pencil"></i>
          </base-button>
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
export default {

}
</script>

<style>

</style>