<template>
  <div>
    <base-button block type="warning"
                 class="animation-on-hover"
                 @click="openPledgingHistory"
    >ประวัติการชำระดอกเบี้ย</base-button>

    <modal :show.sync="PledgingHistoryModal" modal-classes="modal-dialog-centered modal-xl">
      <h2 slot="header" class="modal-title">ประวัติการชำระดอกเบี้ย</h2>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6">
              <base-input type="text" label="รหัสรายการ"
                          :addonLeftIcon="'tim-icons icon-zoom-split'"
                          placeholder="ค้นหาจากรหัสรายการขายฝาก หรือรหัสบิล"
                          v-model="filterValue"
              />
            </div>            
            <div class="col-12 col-sm-12 col-md-6 float-right">
              <base-input type="date" min="1984-01-01" max="2030-12-31" label="วันที่ลงประวัติ"
                          :addonLeftIcon="'tim-icons icon-calendar-60'"
                          placeholder="ค้นหาจากวันที่บันทึกประวัติชำระดอกเบี้ย"
                          v-model="filterValue"
              />
              <!-- <p>{{filterValue2}}</p> -->
            </div>
          </div>
          
          <div class="row">
            <div class="col-12" v-if="PledgingHistoryTable">
              <base-table :data="filteredTable">
                <template slot="columns">
                  <th class="text-center">ลำดับที่</th>
                  <th class="text-center">รหัสบิล</th>
                  <th class="text-center">รหัสรายการขายฝาก</th>
                  <th class="text-center">วันที่ลงประวัติ</th>
                  <th class="text-center">งวดชำระดอกเบี้ย</th>
                  <th class="text-center">จำนวนเงินชำระ</th>
                  <th class="text-center">ชื่อลูกค้า</th>
                </template>
                <template slot-scope="{row, index}">
                  <td class="text-center" style="min-width: 50px">{{index + 1}}</td>
                  <td class="text-center" style="min-width: 100px">{{row.historyId}}</td>
                  <td class="text-center" style="min-width: 100px">{{row.transactionId}}</td>
                  <td class="text-center" style="min-width: 120px">{{row.date}}</td>
                  <td class="text-center" style="min-width: 120px">{{row.billRoutine}}</td>
                  <td class="text-center" style="min-width: 80px">
                    {{row.netPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}
                  </td>
                  <td class="text-center" style="min-width: 120px">{{row.customer.customerName}}</td>
                </template>
              </base-table>
            </div>
          </div>

          <div class="row">
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
      </div>
    </modal>
  </div>
</template>

<script>
import {BaseButton, BaseInput, BasePagination, BaseTable, Modal} from 'src/components'; 
import PledgingHistoryDataService from '../../services/PledgingHistoryDataService.js';

export default {
  components: {
    BaseButton,
    BaseInput,
    BasePagination,
    BaseTable,
    Modal,
    PledgingHistoryDataService
  },
  data() {
    return {
      PledgingHistoryModal: false,
      PledgingHistoryTable: [],
      filterValue: '',
      filterValue2: '',
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 20],
        total: 0
      }
    }
  },
  computed: {
    filteredTable() {
      let result = this.PledgingHistoryTable.filter(item => {
        const date = item.date.toString();
        const historyId = item.historyId.toString();
        const transactionId = item.transactionId.toString();
        
        const search = this.filterValue === '' ? '' : this.filterValue.toString();
        // const search2 = this.filterValue2 === '' ? '' : this.filterValue2.toString();

        return date.includes(search) || 
               historyId.includes(search) ||
               transactionId.includes(search);
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
      return this.PledgingHistoryTable.length > 0
        ? this.PledgingHistoryTable.length
        : this.PledgingHistoryTable.length;
    }
  },
  methods: {
    openPledgingHistory() {
      PledgingHistoryDataService.getAll().then(res => {
        // console.log(res.data);
        this.PledgingHistoryTable = res.data;
      }).catch(e => {
        console.log(e);
      });
      this.PledgingHistoryModal = true;
    }
  }
}
</script>

<style>

</style>