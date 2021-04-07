<template>
  <div class="row">
    <div class="col-12">
      <card card-body-classes="table-responsive">
        <div class="row">
          <div class="col-sm-12 col-lg-10">
            <div class="text-left">
              <collapse :active-index="0">
                <collapse-item title="ตัวเลือกคำค้นหา" name="1">
                  <filter-form-inv 
                    @getDataId="onFilteredId" 
                    @getDataCategory="onFilteredCategory"
                    @getDataGroup="onFilteredGroup"
                    @getDataStyleName="onFilteredStyleName"
                  ></filter-form-inv>
                </collapse-item>
              </collapse>
            </div>
          </div>
          <div class="col-sm-12 col-lg-2 d-flex d-sm-block">
            <add-inventory 
              @sendData="addInventory" 
              :categoryOptions="categoryOptions"
              :groupOptions="groupOptions"
              :bahtOptions="bahtOptions"
            />
            <!-- <base-button 
              block 
              type="success"
              @click="updateQuantity"
            >บันทึกตาราง</base-button> -->
          </div>
        </div>
      </card>
    </div>
    <div class="col-12" v-if="role == 'owner' || role === 'shop admin'">
      <card card-body-classes="table-responsive">
        <inventory-table 
          :parentData="filteredTable"
          :categoryOptions="categoryOptions"
          :groupOptions="groupOptions"
          :bahtOptions="bahtOptions"
          @deleteData="removeInventoryById"
          @updateData="updateInventoryById"
          @updateQty="updateInventoryById"
        />
        <div slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
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
    <div class="col-12" v-if="role === 'sales employee'">
      <card card-body-classes="table-full-width">
        <inventory-table 
          :parentData="filteredTable"
          :categoryOptions="categoryOptions"
          :groupOptions="groupOptions"
          @deleteData="removeInventoryById"
          @updateData="updateInventoryById"
        />
        <div slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
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
</template>

<script>
import {Collapse, CollapseItem, BaseButton, BasePagination} from 'src/components';
import AddInventory from './AddInventory.vue';
import InventoryTable from './InventoryTable.vue';
import FilterFormInv from './FilterFormInv.vue';
import ProductSettings from './ProductSettings.vue';
import InventoryDataService from '../../services/InventoryDataService';
import OptionsDataService from '../../services/OptionsDataService';

export default {
  components: {
    BaseButton,
    BasePagination,
    Collapse,
    CollapseItem,
    AddInventory,
    InventoryTable,
    FilterFormInv,
    ProductSettings,
    InventoryDataService,
    OptionsDataService
  },
  data() {
    return {
      role: 'owner',
      productsTable: [],
      filterValue: '',
      groupOptions: [],
      categoryOptions: [],
      bahtOptions: [],
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
      let result = this.productsTable.filter(item => {
        const productId = item.productId.toString().toUpperCase();
        const category = item.productCategory.nameThai.toString();
        const group = item.productGroup.name.toString();
        const styleName = item.styleName.toString();
        
        const searchId = this.filterValue === '' ? '' : this.filterValue.toString().toUpperCase();
        const search = this.filterValue === '' ? '' : this.filterValue.toString();

        return productId.includes(searchId) ||
               category.includes(search) ||
               group.includes(search) ||
               styleName.includes(search)
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
        return this.productsTable.length > 0
          ? this.productsTable.length
          : this.productsTable.length;
      }
  },
  mounted() {
    this.refreshList();
  },
  methods: {
    retrieveOptions() {
      // Group Options
      OptionsDataService.getAllGroups()
        .then(res => {
          // console.log(res.data);
          this.groupOptions = res.data;
        }).catch(e => {
          console.log(e);
        });
      // Category Options
      OptionsDataService.getAllCategories()
        .then(res => {
          this.categoryOptions = res.data;
        }).catch(e => {
          console.log(e);
        });
      // Baht Options
      OptionsDataService.getAllWeights()
        .then(res => {
          this.bahtOptions = res.data;
        }).catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveInventory();
      this.retrieveOptions();
    },
    // Add Inventory
    addInventory(postData) {
      var data = postData;
      // console.log(postData);
      
      InventoryDataService.create(data)
        .then(res => {
          this.retrieveInventory();
          // this.productsTable.productId = res.data.productId;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        })
    },
    
    // Show all inventory
    retrieveInventory() {
      InventoryDataService.getAll()
        .then(res => {
          this.productsTable = res.data;
          // console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Filter inventory
    findInventoryById(getData) {
      var data = getdata;

      InventoryDataService.findById(data)
        .then(res => {
          this.productsTable.productId = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    findInventoryByCategory(getData) {
      InventoryDataService.findByCategory(getData.category)
        .then(res => {
          this.productsTable.category = res.data;
        })
        .catch(e => {
          console.log(e);
        })
    },
    findInventoryByGroup(getData) {
      InventoryDataService.findByGroup(getData.group)
        .then(res => {
          this.productsTable.group = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    findInventoryByStyleName(getData) {
      InventoryDataService.findByStyleName(getData.styleName)
        .then(res => {
          this.productsTable.styleName = res.data;
        })
        .catch(e => {
          console.log(e);
        })
    },
    
    // Update by ID
    updateInventoryById(updateData) {
      var id = updateData.productId;
      var data = updateData;

      InventoryDataService.update(id, data)
        .then(res => {
          console.log(res.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        })
    },

    // Delete Inventory
    removeInventoryById(deleteId) {
      InventoryDataService.delete(deleteId)
        .then(res => {
          console.log(res.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        })
    },
    // removeAllInventory() {
    //   InventoryDataService.deleteAll()
    //     .then(res => {
    //       console.log(res.data);
    //       this.refreshList();
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     })
    // },

    // Search By ProductID
    onFilteredId(getData) {
      this.filterValue = getData;
      // this.filterData.productId = getData;
      console.log(this.filterValue);
    },  
    // Search By Categories
    onFilteredCategory(getData) {
      this.filterValue = getData;
      // this.filterData.category = getData;
      console.log(this.filterValue);
    },
    // Search By Group 
    onFilteredGroup(getData) {
      this.filterValue = getData;
      // this.filterData.group = getData;
      console.log(this.filterValue);
    },
    // Search By Product Style
    onFilteredStyleName(getData) {
      this.filterValue = getData;
      console.log(this.filterValue);
      // this.filterData.styleName = getData;
    },
    
    // saveInvTable() {

    // }
  }
}
</script>

<style scoped>

</style>