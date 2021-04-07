<template>
  <div>
    <div class="table-shopping">
      <el-table class="table-overflow-horizontal" :data="parentData">
      <el-table-column min-width="145" align="center">
        <div slot-scope="{ row }" class="img-container">
          <img :src="row.image" alt="product image" />
        </div>
      </el-table-column>
      
      <el-table-column 
        min-width="150"
        label="รหัสสินค้า"
        prop="productId"
        header-align="center"
        align="center"
        sortable
      ></el-table-column>

      <el-table-column min-width="250" label="ชื่อสินค้า">
        <div class="td-name td-line-height" slot-scope="{ row }">
          <a href="#/shop/inventory" @click="showProductInfo(row)">{{ row.styleName }}</a> <br/>
          <small>{{ row.productName }}</small>
        </div>
      </el-table-column>
      
      <el-table-column
        min-width="150"
        label="ประเภทสินค้า"
        prop="productCategory.nameThai"
        header-align="center"
        align="center"
      ></el-table-column>
      
      <el-table-column
        min-width="180"
        label="กลุ่มสินค้า"
        prop="productGroup.name"
        header-align="center"
        align="center"
      ></el-table-column>
      
      <el-table-column
        min-width="180"
        label="จำนวนสินค้า"
        header-align="center"
        align="center"
      >
        <template slot-scope="{ row }">
          <div class="btn-group">
            <base-button type="primary" class="btn-simple mr-3 mt-0" 
                         size="sm" @click="decreaseQuantity(row);">
              -
            </base-button>
            <p style="margin-top: auto">{{row.quantity}}</p>
            <base-button type="primary" class="ml-3 mt-0" 
                         size="sm" @click="increaseQuantity(row);">
              +
            </base-button>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
        min-width="120"
        label="น้ำหนักทอง"
        prop="productWeight.goldWeight"
        header-align="center"
        align="center"
      ></el-table-column>

      <el-table-column min-width="120" label="น้ำหนักทองรวม" prop="goldWeightTotal"
        header-align="center" align="center" />

      <el-table-column min-width="120" label="สถานะสินค้า" header-align="center" align="center">
        <template slot-scope="{ row }">
          <div v-if="isEmpty(row) == true" class="status-content-red">
            สินค้าหมด
          </div>
          <div v-else class="status-content-green">
            มีสินค้า
          </div>
        </template>
      </el-table-column>
      
      <el-table-column min-width="120" 
        label="ตัวเลือก" header-align="center" align="center">
        <template slot-scope="scope">
          
          <base-button type="success" class="btn-link" @click="editItem(scope)">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
          <base-button type="danger" class="btn-link" @click="deletionAlert(scope)">
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
          
        </template>
      </el-table-column>
      
      <!-- Show Product Infomation -->
      <modal :show.sync="ProductInfoModal" modal-classes="modal-dialog-centered modal-xl">
        <h2 slot="header"></h2>
        <div class="row">
          <!-- Image Section -->
          <div class="col-4">
            <card class="card-primary">
              <img slot="image" class="card-img-top" :src="ProductInfo.image">
            </card>
          </div>
      
          <!-- Infomation Section -->
          <div class="col-8">
            <div class="row">
              <h3 class="col-12">{{ProductInfo.styleName}}</h3>
              <!-- <h4>{{ProductInfo.productName}}</h4> -->
              <label class="col-4 mt-3">ประเภทสินค้า</label>
              <label class="col-4 mt-3">กลุ่มสินค้า</label>
            </div>
            <div class="row">
              <p class="col-4">{{ProductInfo.productCategory.nameThai}}</p>
              <p class="col-4">{{ProductInfo.productGroup.name}}</p>
            </div>
            <label class="mt-3">รายละเอียดสินค้า</label>
            <p>{{ProductInfo.description}}</p>
          </div>
        </div>
      </modal>

      <!-- Update Item in Inventory -->
      <modal :show.sync="EditInventoryModal" modal-classes="modal-dialog-centered modal-xl">
        <h2 slot="header" class="modal-title">แก้ไขสินค้า</h2>
          <form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-8">
                <div class="form-row">
                  <base-input class="col-md-12" type="text" label="ชื่อลาย"
                    v-model="FormInventory.styleName" required/>
                  <base-input class="col-md-12" type="text" label="ชื่อสินค้า"
                    v-model="FormInventory.productName" required />

                  <!-- กลุ่มสินค้า -->
                  <base-input class="col-md-6" label="กลุ่มสินค้า" required>
                    <select class="form-control" v-model="FormInventory.group">
                      <option v-for="group in groupOptions" :key="group.id" :value="group.id"
                      >{{group.name}}</option>
                    </select>
                  </base-input>
                  <!-- ประเภทสินค้า -->
                  <base-input class="col-md-6" label="ประเภทสินค้า" required>
                    <select class="form-control" v-model="FormInventory.category">
                      <option v-for="category in categoryOptions" :key="category.id" :value="category.id"
                      >{{category.name}}</option>
                    </select>
                  </base-input>
                  <!-- น้ำหนักทอง -->
                  <!-- <base-input class="col-md-4" label="น้ำหนักทอง (บาท)" disabled>
                    <select class="form-control" v-model="FormInventory.goldWeight">
                      <option v-for="baht in bahtOption" :key="baht.id" :value="baht.value">{{baht.name}}</option>
                    </select>
                  </base-input> -->
                    
                  <!-- รหัสสินค้า -->
                  <base-input class="col-md-6" type="text" label="กำหนดรหัสสินค้า"
                    v-model="FormInventory.productId" disabled />
                  <!-- จำนวนสินค้า -->
                  <base-input class="col-md-4" type="number" min="0" label="จำนวนสินค้า" 
                    v-model="FormInventory.quantity" required />
                  <!-- น้ำหนักทอง/ชิ้น -->
                  <base-input class="col-md-4" type="text" label="น้ำหนักทอง / ชิ้น (กรัม)" 
                    v-model="FormInventory.goldWeight" required />
                  <!-- น้ำหนักทองรวม -->
                  <base-input class="col-md-4" type="text" label="น้ำหนักทองรวม" 
                    :value="setGoldWeightTotal" disabled />
                  <!-- รายละเอียดสินค้า -->
                  <base-input class="col-md-12" label="รายละเอียดสินค้า">
                    <textarea class="form-control" rows="3" v-model="FormInventory.description"></textarea>
                  </base-input>
                </div>

                <div class="form-row mt-3">
                  <div class="col-6">
                    <base-button block class="animation-on-hover" native-type="submit" type="warning">
                      บันทึกรายการ
                    </base-button>
                  </div>
                  <div class="col-6">
                    <base-button block simple native-type="reset" type="warning">
                      ล้างรายการ
                    </base-button>
                  </div>
                </div>
              
              </div>
              
              <!-- รูปภาพสินค้า -->
              <div class="col-4">
                <card class="card-primary">
                  <img slot="image" class="card-img-top" :src="FormInventory.image">
                </card>
                <base-input class="col-md-12" label="รูปภาพ"
                  v-model="FormInventory.image" required />
                <base-button class="animation-on-hover" type="primary">อัพโหลดรูปภาพ</base-button>
              </div>

            </div>
          </form>
      </modal>
        
      <!-- Delete Item in Inventory -->
      <modal :show.sync="deleteAlertModal" modal-classes="modal-md">
        <h2 slot="header" class="modal-title">นำออกสินค้า</h2>
        <div class="form-row">
          <p class="text-center">ท่านต้องการนำสินค้าออกหรือไม่</p>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <base-button block type="danger" class="animation-on-hover" 
                        @click="deleteItem()">
              ลบสินค้า
            </base-button>
          </div>
          <div class="col-6">
            <base-button block simple @click="deleteAlertModal = false">ยกเลิก</base-button>
          </div>
        </div>
      </modal>
      </el-table>
    </div>
  </div>
</template>

<script>
import {Table, TableColumn} from 'element-ui';
import {Modal} from 'src/components';
// import ProductSettings from './ProductSettings.vue';

export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      Modal
    },
    props: ['parentData', 'categoryOptions', 'groupOptions', 'goldWeightOptions'],
    data() {
      return {
        FormInventory: {},
        FormDefault: {},
        ProductInfo: {
          productCategory: {
            nameThai: null
          },
          productGroup: {
            name: null
          }
        },
        ProductInfoModal: false,
        EditInventoryModal: false,
        deleteAlertModal: false,
        updateId: '',
        deleteId: ''
      }
    },
    computed: {
      setGoldWeightTotal() {
        this.calculateGoldWeightTotal();
        return this.FormInventory.goldWeightTotal;
      }
    },
    // mounted() {
    //   this.checkParentData();
    // },
    methods: {
      checkParentData() {
        console.log(this.parentData);
      },
      onSubmit(evt) {
        // evt.preventDefault();
        this.$emit('updateData', this.FormInventory);
        this.EditInventoryModal = false;
      },
      onReset(evt) {
        evt.preventDefault();
        this.FormInventory = this.FormDefault;
      },
      showProductInfo(row){
        console.log(row)
        this.ProductInfo = row;
        this.ProductInfoModal = true;
      },
      increaseQuantity(row) {
        row.quantity++;
        this.calculateGoldWeightTotalByButton(row);
        // console.log(row);
        this.$emit('updateQty', row);
      },
      decreaseQuantity(row) {
        if (row.quantity > 0) {
          row.quantity--;
          this.calculateGoldWeightTotalByButton(row);
          this.$emit('updateQty', row);
        }
      },
      calculateGoldWeightTotalByButton(row) {
        row.goldWeightTotal = (parseFloat(row.goldWeight) * row.quantity).toFixed(2);
        // console.log(row.goldWeightTotal);
      },
      calculateGoldWeightTotal() {
        this.FormInventory.goldWeightTotal = (parseFloat(this.FormInventory.goldWeight) * parseInt(this.FormInventory.quantity)).toFixed(2).toString();
        
      },
      isEmpty(row){
        if(row.quantity == 0){
          return true
        }else{
          return false
        }
      },
      editItem(scope) {
        // console.log(scope.row);
        this.FormDefault = scope.row;
        this.FormInventory = scope.row;
        this.EditInventoryModal = true;
      },
      deletionAlert(scope) {
        console.log(scope);
        this.deleteId = scope.row.productId;
        this.deleteAlertModal = true;
      },
      deleteItem() {
        var id = this.deleteId;
        this.deleteAlertModal = false;
        // this.parentData.splice(index, 1);
        this.$emit('deleteData', id);
        
        // Reset deleteIndex
        this.deleteId = '';
      }
    }
}
</script>

<style scoped>
.status-content-red{
  color: red;
}
.status-content-green{
  color: green;
}
.td-line-height{
  line-height: 30px;
}
.table-overflow-horizontal {
  overflow-x: auto;
}
</style>