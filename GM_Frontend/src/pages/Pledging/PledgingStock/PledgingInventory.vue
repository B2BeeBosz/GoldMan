<template>
  <div>
    <base-table :data="stockTable">
      <template slot="columns">
        <th class="text-center">ลำดับ</th>
        <th class="text-center">รหัสสต๊อก</th>
        <th class="text-center">ชื่อสินค้า</th>
        <!-- <th class="text-center">กลุ่มสินค้า</th> -->
        <th class="text-center">น้ำหนักทองชั่ง</th>
        <th class="text-center">จำนวน</th>
        <th class="text-center">ลบ</th>
      </template>

      <template slot-scope="{row, index}">
        <td class="text-center" style="min-width: 50px">{{index + 1}}</td>
        <td class="text-center" style="min-width: 100px">
          <!-- {{row.stockId}} -->
          <base-input v-model="row.stockId" type="text"
                      placeholder="A00001"/>
        </td>
        <td class="text-center" style="min-width: 250px">
          <base-input v-model="row.productName" type="text"/>
        </td>
        <!-- <td class="text-center" style="min-width: 140px">
          <base-input v-model="row.productGroup" type="text" />
        </td> -->
        <td class="text-center" style="min-width: 110px">
          <base-input v-model="row.goldWeight" type="text"/>
        </td>
        <td class="text-center" style="min-width: 80px">
          <base-input v-model="row.quantity" type="number" min="0"/>
        </td>
        <td class="text-center" style="min-width: 30px">
          <el-tooltip content="ลบรายการ" :open-delay="300" placement="top">
            <base-button type="danger" class="btn-link action-btn"
                         @click="removeAddStock(row)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip> 
        </td>
      </template>
    </base-table>
    <!-- <base-button @click="checkStock()"/> -->
  </div>
</template>

<script>
import {BaseButton, BaseInput, BaseTable} from 'src/components';
export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTable
  },
  props: ['stockTable', 'groupOptions'],
  data() {
    return {
      StockTable: [],
      PledgingStockForm: {
        stockId: '',
        productName: '',
        productGroup: '',
        goldWeight: 0,
        quantity: 0,
        groupId: 0
      },
      FormDefault: {
        stockId: '',
        productName: '',
        productGroup: '',
        goldWeight: 0,
        quantity: 0,
        groupId: 0
      }
    }
  },
  methods: {
    // checkStock() {
    //   console.log(this.StockTable);
    // },
    removeAddStock(row) {
      // console.log(row);
      this.$emit('removeItemData', row);
      
    },
  },
  computed: {

  }
};
</script>

<style scoped>

</style>