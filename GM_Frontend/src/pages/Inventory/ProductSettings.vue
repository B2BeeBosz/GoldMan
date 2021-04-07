<template>
  <div class="row">
    <div class="col-4">
      <card card-body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-6">
              <h4 class="card-category">Product Category</h4>
              <h2 class="table-title">ประเภทสินค้า</h2>
            </div>
            <div class="col-6">
              <div class="float-right">
                <base-button type="warning" class="animation-on-hover" @click="openPCModal">เพิ่มประเภทสินค้า</base-button>
                <!-- PC Modal -->
                <modal :show.sync="PCModal" modal-classes="modal-md">
                  <h2 slot="header" class="modal-title">เพิ่มรหัสประเภทสินค้า</h2>
                  <form @submit="onSubmit()">
                    <div class="form-row">
                      <base-input 
                        class="col-sm-12" label="ชื่อประเภทสินค้า (ภาษาไทย)" 
                        placeholder="สร้อยคอ" v-model="categoryForm.nameThai"
                        required
                      />
                      <base-input 
                        class="col-sm-12" label="ชื่อประเภทสินค้า (ภาษาอังกฤษ) (ถ้ามี)" 
                        placeholder="Necklace" v-model="categoryForm.nameEng"
                      />
                      <base-input 
                        class="col-sm-12" label="รหัส" 
                        placeholder="NL" v-model="categoryForm.categoryId"
                        required 
                      />
                    </div>
                    <div class="form-row mt-3">
                      <base-button 
                        class="col-md-6" 
                        size="md" 
                        type="warning"
                        native-type="submit"
                        @click="addCategory()"
                      >ยืนยันข้อมูล</base-button>
                    </div>
                  </form>  
                </modal>

              </div>
            </div>
          </div>
        </template>
        
        <div class="col-12">
          <el-table style="width:100%" :data="categoryTable">
            <el-table-column min-width="100" 
              label="ประเภทสินค้า" prop="nameThai" 
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="100"
              label="รหัส" prop="categoryId"
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="70"
              label="ตัวเลือก"
              header-align="center" align="center"
            >
              <el-tooltip content="แก้ไข" effect="light"
                  :open-delay="300"
                  placement="top">
                <base-button type="success" size="sm" icon>
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
              </el-tooltip>
              <el-tooltip content="ลบ" effect="light"
                  :open-delay="300"
                  placement="top">
                <base-button type="danger" size="sm" icon>
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </el-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>

    <div class="col-4">
      <card card-body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-6">
              <h4 class="card-category">Product Group</h4>
              <h2 class="table-title">กลุ่มสินค้า</h2>
            </div>
            <div class="col-6">
              <div class="float-right">
                <base-button type="warning" class="animation-on-hover" @click="openGrModal">เพิ่มกลุ่มสินค้า</base-button>
                <!-- Product Group Modal -->
                <modal :show.sync="GrModal" modal-classes="modal-md">
                  <h2 slot="header" class="modal-title">เพิ่มรหัสกลุ่มสินค้า</h2>
                  <form @submit.prevent>
                    <div class="form-row">
                      <base-input 
                        class="col-sm-12" label="ชื่อกลุ่มสินค้า" 
                        placeholder="ทองรูปพรรณ 96.5%" v-model="groupForm.name"
                        required
                      />
                      <base-input 
                        class="col-sm-12" label="รหัส" 
                        placeholder="G96" v-model="groupForm.groupId"
                        required
                      />
                    </div>
                    <div class="form-row mt-3">
                      <base-button 
                        class="col-md-6" size="md" 
                        type="warning"
                        native-type="submit"
                         
                      >ยืนยันข้อมูล</base-button>
                    </div>
                  </form>  
                </modal>
              </div>
            </div>
          </div>
        </template>

        <div class="col-12">
          <el-table style="width:100%" :data="groupTable">
            <el-table-column min-width="100"
              label="กลุ่มสินค้า" prop="name"
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="100"
              label="รหัส" prop="groupId"
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="70"
              label="ตัวเลือก"
              header-align="center" align="center"
            >
              <el-tooltip content="แก้ไข" effect="light"
                  :open-delay="300"
                  placement="top">
                <base-button type="success" size="sm" icon> 
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
              </el-tooltip>
              <el-tooltip content="ลบ" effect="light"
                  :open-delay="300"
                  placement="top">
                <base-button type="danger" size="sm" icon>
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </el-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>

    <div class="col-4">
      <card card-body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-6">
              <h4 class="card-category">Gold Weight</h4>
              <h2 class="table-title">น้ำหนักทอง</h2>
            </div>
            <div class="col-6">
              <div class="float-right">
                <base-button type="warning" class="animation-on-hover" @click="openGWModal">เพิ่มน้ำหนักทอง</base-button>
                <modal :show.sync="GWModal" modal-classes="modal-md">
                  <h2 slot="header" class="modal-title">เพิ่มรหัสน้ำหนักทอง</h2>
                  <form @submit.prevent>
                    <div class="form-row">
                      <base-input class="col-sm-12" label="น้ำหนักทอง (บาท)" placeholder="1 บาท"/>
                      <base-input class="col-sm-12" label="น้ำหนักทอง (กรัม)" placeholder="15.16"/>
                      <base-input class="col-sm-12" label="รหัส" />
                    </div>
                    <div class="form-row mt-3">
                      <base-button class="col-md-6" size="md" type="warning">ยืนยันข้อมูล</base-button>
                    </div>
                  </form>  
                </modal>
              </div>
            </div>
          </div>
        </template>

        <div class="col-12">
          <el-table style="width:100%" :data="goldweightTable">
            <el-table-column min-width="100"
              label="น้ำหนักทอง(บาท)" prop="name"
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="100"
              label="น้ำหนักทอง(กรัม)" prop="goldWeight"
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="100"
              label="รหัส" prop="bahtId"
              header-align="center" align="center"
            ></el-table-column>
            <el-table-column min-width="70"
              label="ตัวเลือก"
              header-align="center" align="center"
            >
              <el-tooltip content="แก้ไข" effect="light"
                  :open-delay="300"
                  placement="top">
                <base-button type="success" size="sm" icon>
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
              </el-tooltip>
              <el-tooltip content="ลบ" effect="light"
                  :open-delay="300"
                  placement="top">
                <base-button type="danger" size="sm" icon>
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </el-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>

  </div>
</template>

<script>
import { BaseButton, Modal } from '@/components';
import { Table, TableColumn } from 'element-ui';
import OptionsDataService from '../../services/OptionsDataService.js';

export default {
  components: { 
    BaseButton,
    Modal,
    OptionsDataService,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      PCModal: false,
      GrModal: false,
      GWModal: false,
      PCEditModal: false,
      GrEditModal: false,
      GWEditModal: false,
      categoryForm: {
        categoryId: '',
        nameThai: null,
        nameEng: null
      },
      groupForm: {
        groupId: '',
        name: null
      },
      goldWeightForm: {
        bahtId: '',
        name: null,
        goldWeight: null
      },
      categoryTable: [],
      groupTable: [],
      goldweightTable: []
    }
  },
  methods: {
    openPCModal() {
      this.PCModal = true;
    },
    openGrModal() {
      this.GrModal = true;
    },
    openGWModal() {
      this.GWModal = true;
    },
    editPCModal() {
      this.PCEditModal = true;
    },
    editGrModal() {
      this.GrEditModal = true;
    },
    editGWModal() {
      this.GrEditModal = true;
    },
    
    // Display Infomations
    refreshList() {
      this.showPCTable();
      this.showGrTable();
      this.showGWTable();
    },
    showPCTable() {
      OptionsDataService.getAllCategories()
        .then(res => {
          // console.log(res.data);
          this.categoryTable = res.data;
        })
        .catch(e => {
          console.log(e);
        });
      
      console.log(this.categoryTable);
    },
    showGrTable() {
      OptionsDataService.getAllGroups()
        .then(res => {
          this.groupTable = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    showGWTable() {
      OptionsDataService.getAllWeights()
        .then(res => {
          this.goldweightTable = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    // Add new ID to Table
    addCategory() {
      OptionsDataService.createCategory(this.categoryForm)
        .then(res => {
          this.refreshList();
        }).catch(e => {
          console.log(e);
        });
      // Reset Form
      this.categoryForm.categoryId = '';
      this.categoryForm.nameThai = null;
      this.categoryForm.nameEng = null;
    },
    addGroup() {
      OptionsDataService.createGroup(this.groupForm)
        .then(res => {
          this.refreshList();
        }).catch(e => {
          console.log(e);
        });
      // Reset
      this.groupForm.groupId = '';
      this.groupForm.name = null;
    },
    addGoldWeight() {
      OptionsDataService.createWeight(this.goldWeightForm)
        .then(res => {
          this.refreshList();
        }).catch(e => {
          console.log(e);
        });
      // Reset
      this.goldWeightForm.bahtId = '';
      this.goldWeightForm.name = null;
      this.goldWeightForm.goldWeight = null;
    },
  },
  mounted() {
    this.refreshList();
  }
}
</script>

<style scoped>
.table-title{
  font-size: 1.5rem;
}
</style>