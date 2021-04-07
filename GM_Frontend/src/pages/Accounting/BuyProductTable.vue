<template>
  <div>
    <base-table :data="stockTable">
      <template slot="columns">
        <th class="text-center">ลำดับ</th>
        <th class="text-center">รหัสสต๊อก</th>
        <th class="text-center">ชื่อสินค้า</th>
        <th class="text-center">น้ำหนักทอง</th>
        <th class="text-center">จำนวน</th>
        <th class="text-center">ลบ</th>
      </template>

      <template slot-scope="{row, index}">
        <td class="text-center" style="min-width: 50px">{{index + 1}}</td>
        <td class="text-center" style="min-width: 100px">
          <base-input v-model="row.stockId" type="text" placeholder="BS00001"></base-input>
        </td>
        <td class="text-center" style="min-width: 250px">
          <base-input v-model="row.productName" type="text" placeholder="สร้อยคอ 1 บาท"></base-input>
        </td>
        <td class="text-center" style="min-width: 110px">
          <base-input v-model="row.goldWeightTotal" type="text"></base-input>
        </td>
        <td class="text-center" style="min-width: 80px">
          <base-input v-model="row.quantity" type="number" min="0"></base-input>
        </td>
        <td class="text-center" style="min-width: 30px">
          <el-tooltip content="ลบรายการ" :open-delay="300" placement="top">
            <base-button type="danger" class="btn-link action-btn"
                         @click="removeBuyStock(row)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </td>
      </template>

    </base-table>
  </div>
</template>

<script>
import {BaseInput, BaseTable} from 'src/components';

export default {
  components: {
    BaseInput,
    BaseTable
  },
  props: ['stockTable'],
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    removeBuyStock(row) {
      this.$emit('removeItemData', row);
    }
  }
}
</script>

<style>

</style>