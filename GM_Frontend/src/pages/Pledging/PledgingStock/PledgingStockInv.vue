<template>
  <div class="row">
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <div class="row">
          <div class="col-sm-12">
            <collapse :active-index="0">
              <collapse-item title="ตัวเลือกคำค้นหา" name="1">
                <filter-form-pledging-stock
                  @StockId="onFilterStockId"
                  @TransactionId="onFilterTransactionId"
                  @ProductName="onFilterProductName"
                  @CustomerName="onFilterCustomerName"
                />
              </collapse-item>
            </collapse>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12">
      <div class="row">
        <div class="col-sm-12">
          <card card-body-classes="table-responsive">
            <pledging-stock-table
              :stockTable="filteredTable"
            />
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
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Collapse, CollapseItem, BasePagination } from 'src/components';
import PledgingStockTable from './PledgingStockTable.vue';
import FilterFormPledgingStock from './FilterFormPledgingStock.vue';
import PledgingStockDataService from '../../../services/PledgingStockDataService.js';

export default {
  components: {
    Collapse,
    CollapseItem,
    BasePagination,
    PledgingStockTable,
    FilterFormPledgingStock,
    PledgingStockDataService
  },
  data() {
    return {
      PledgingStockInvTable: [],
      // {
      //   stockId: 'A000001',
      //   transactionId: '20210221021500',
      //   productName: 'ก้านแข็งดาวและหัวใจ',
      //   goldWeight: '4.02',
      //   quantity: 1,
      //   customer: {
      //     customerId: 1,
      //     customerName: 'โดม โพธิกานนท์'
      //   },
      //   image: '/img/productsamples/ก้านแข็งดาวและหัวใจ_สร้อยข้อมือ.jpg',
      //   shopId: 1
      // }
      filterValue: '',
      pagination: {
        perPage: 8,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      },
    }
  },
  computed: {
    filteredTable() {
      let result = this.PledgingStockInvTable.filter(item => {
        const stockId = item.stockId.toString().toUpperCase();
        const transactionId = item.transactionId.toString();
        const productName = item.productName.toString();
        const customerName = item.pledging.customer.customerName.toString();
        
        const searchSId = this.filterValue === '' ? '' : this.filterValue.toString().toUpperCase();
        const search = this.filterValue === '' ? '' : this.filterValue.toString();

        return stockId.includes(searchSId) || 
               transactionId.includes(search) ||
               productName.includes(search) ||
               customerName.includes(search);
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
      return this.PledgingStockInvTable.length > 0
        ? this.PledgingStockInvTable.length
        : this.PledgingStockInvTable.length;
    }
  },
  methods: {
    retrievePledgingStock() {
      PledgingStockDataService.getAllStock().then(res => {
        this.PledgingStockInvTable = res.data;
        console.log(this.PledgingStockInvTable);
      }).catch(e => {
        console.log(e);
      });
    },
    refreshList() {
      this.retrievePledgingStock();
    },
    onFilterStockId(id) {
      this.filterValue = id;
    },
    onFilterTransactionId(id) {
      this.filterValue = id;
    },
    onFilterProductName(name) {
      this.filterValue = name;
    },
    onFilterCustomerName(name) {
      this.filterValue = name;
    }
  },
  mounted() {
    this.refreshList();
  }
}
</script>

<style scoped>

</style>