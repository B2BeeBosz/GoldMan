<template>
  <div class="row">
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <div class="row">
          <div class="col-sm-12">
            <collapse :active-index="0">
              <collapse-item title="ตัวเลือกคำค้นหา" name="1">
                <filter-form-buy-stock
                  @StockId="onFilterStockId"
                  @TransactionId="onFilterTransactionId"
                  @Date="onFilterDate"
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
      <card card-body-classes="table-responsive">
        <buy-stock-table
          :buyStockTable="filteredTable"
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
          />
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import {BaseTable, BaseButton, BasePagination, Collapse, CollapseItem} from 'src/components';
import FilterFormBuyStock from './FilterFormBuyStock.vue';
import BuyStockTable from './BuyStockTable.vue';
import BuyStockDataService from '../../../services/BuyStockDataService';

export default {
  components: {
    BaseButton,
    BasePagination,
    BaseTable,
    Collapse,
    CollapseItem,
    BuyStockTable,
    FilterFormBuyStock,
    BuyStockDataService
  },
  data() {
    return {
      BuyStockTable: [],
      BuyStockForm: {
        productId: '',
        transactionId: '',
        productName: '',
        date: '',
        customer: {
          customerName: ''
        },
        quantity: 0,
        goldWeightTotal: 0,
        customerId: 0,
        shopId: 0,
      },
      FilterValue: '',
      pagination: {
        perPage: 8,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      }
    }
  },
  computed: {
    filteredTable() {
      let result = this.BuyStockTable.filter(item => {
        const stockId = item.stockId.toString().toUpperCase();
        const transactionId = item.transactionId.toString();
        const date = item.date.toString();
        const productName = item.productName.toString();
        const customerName = item.customer.customerName.toString();
      
        const searchSId = this.FilterValue === '' ? '' : this.FilterValue.toString().toUpperCase();
        const search = this.FilterValue === '' ? '' : this.FilterValue.toString();

        return stockId.includes(searchSId) ||
               transactionId.includes(search) ||
               date.includes(search) ||
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
      return this.BuyStockTable.length > 0
        ? this.BuyStockTable.length
        : this.BuyStockTable.length;
    }
  },
  methods: {
    refreshList() {
      this.retrieveBuyStockTable();
    },
    retrieveBuyStockTable() {
      BuyStockDataService.getAll().then(res => {
        this.BuyStockTable = res.data;
        // console.log(this.BuyStockTable);
      }).catch(e => {
        console.log(e);
      });
    },
    onFilterStockId(id) {
      this.FilterValue = id;
      // console.log(this.FilterValue);
    },
    onFilterTransactionId(id) {
      this.FilterValue = id;
      // console.log(this.FilterValue);
    },
    onFilterDate(date) {
      this.FilterValue = date;
      // console.log(this.FilterValue);
    },
    onFilterProductName(name) {
      this.FilterValue = name;
      // console.log(this.FilterValue);
    },
    onFilterCustomerName(name) {
      this.FilterValue = name;
      // console.log(this.FilterValue);
    }
  },
  mounted() {
    this.refreshList();
  }
}
</script>

<style>

</style>