<template>
  <div>
    <div class="row">
      <div class="col-12">
        <base-input type="text"
                    :addonLeftIcon="'tim-icons icon-zoom-split'"
                    placeholder="ค้นหาสินค้าจากรหัสสินค้า, ชื่อสินค้า, ประเภทสินค้า, กลุ่มสินค้า"
                    v-model="filterValue"
        />
      </div>
    </div>
    <div class="table-shopping">
      <base-table :data="filteredTable" thead-classes="text-primary">
        <template slot="columns">
          <th class="text-center">รหัสสินค้า</th>
          <th class="text-center">ชื่อสินค้า</th>
          <th class="text-center">ประเภทสินค้า</th>
          <th class="text-center">กลุ่มสินค้า</th>
          <th class="text-center">จำนวน</th>
          <th class="text-center">น้ำหนักทอง</th>
          <th class="text-center">เพิ่ม</th>
        </template>
        <template slot-scope="{ row }">
          <td class="text-center">{{ row.productId }}</td>   
          <td class="text-center">{{ row.productName }}</td>
          <td class="text-center">{{ row.productCategory.nameThai }}</td>
          <td class="text-center">{{ row.productGroup.name }}</td>
          <td class="text-center">{{ row.quantity }}</td>
          <td class="text-center">{{ row.productWeight.goldWeight }}</td>
          <td class="text-center">
            <div v-if="row.quantity > 0">
              <base-button
                size="sm"
                type="default"
                class="animation-on-hover"
                @click="addToAddAccountingModal(row)"
              >เลือก</base-button>
            </div>
            <div v-else>
              <base-button
                size="sm"
                type="default"
                class="animation-on-hover"
                :disabled="true"
              >เลือก</base-button>
            </div>
          </td>
        </template>
      </base-table>
    <!-- <base-button @click="checkProducts"></base-button> -->
    </div>
    <div>
      <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
        <div>
          <p class="card-category">
            แสดงลำดับที่ {{ from + 1 }} ถึง {{ to }} จากทั้งหมด {{ total }} รายการ
          </p>
        </div>
        <base-pagination
          class="pagination-no-border"
          v-model="pagination.currentPage"
          :per-page="pagination.perPage"
          :total="total"
        ></base-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {BaseTable, BaseButton, BasePagination} from 'src/components';

export default {
  components: {
    BaseTable,
    BaseButton,
    BasePagination
  },
  props: ['InventoryTable'],
  data() {
    return {
      SelectedProducts: [],
      filterValue: '',
      pagination: {
        perPage: 6,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      }
    }
  },
  computed: {
    filteredTable() {
      let result = this.InventoryTable.filter(item => {
        const productId = item.productId.toString();
        const productName = item.productName.toString();
        const category = item.productCategory.nameThai.toString();
        const group = item.productGroup.name.toString();
        
        const search = this.filterValue === '' ? '' : this.filterValue.toString();
        
        return productId.includes(search) ||
               productName.includes(search) ||
               category.includes(search) ||
               group.includes(search);
      });
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.InventoryTable.length > 0
        ? this.InventoryTable.length
        : this.InventoryTable.length;
    }
  },
  methods: {
    checkProducts() {
      console.log(this.InventoryTable);
    },
    addToAddAccountingModal(row) {
      this.SelectedProducts[0] = row;
      this.$emit('selectedProducts', this.SelectedProducts);
      this.resetSelected();
    },
    removeFromAddAccountingModal() {
      // this.addPressed.splice(index, 1);
      this.SelectedProducts = [];
      // this.SelectedProducts.splice(index, 1);
      // console.log(this.SelectedProducts);
    },
    // onSubmitSelected() {
    //   this.$emit('selectedProducts', this.SelectedProducts);
    //   this.SelectedProducts = [];
    // },
    resetSelected() {
      this.SelectedProducts = [];
    }
  }
}
</script>

<style scoped>
.table-overflow-horizontal {
  overflow-x: auto;
}
</style>