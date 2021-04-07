<template>   
  <div>  
    <base-button block type="warning" @click="openAddInvModal">นำเข้าสินค้าใหม่</base-button>
      <!-- Modal -->
      <modal :show.sync="AddInventoryModal" modal-classes="modal-dialog-centered modal-xl">
        <h2 slot="header" class="modal-title">นำเข้าสินค้าใหม่</h2>
        <form @submit="onSubmit" @reset="onReset">
          <div class="row">
            <div class="col-8">
              <div class="form-row">
                <!-- ชื่อลาย -->
                <base-input class="col-md-12" type="text" placeholder="โซ่อิตาลี"
                  label="ชื่อลาย" v-model="FormInventory.styleName" required />
                <!-- ชื่อสินค้า -->
                <base-input class="col-md-12" type="text" placeholder="สร้อยคอ 1 สลึง"
                  label="ชื่อสินค้า" v-model="FormInventory.productName" required />
                
                <!-- กลุ่มสินค้า -->
                <base-input class="col-md-4" label="กลุ่มสินค้า" required>
                  <select class="form-control" v-model="FormInventory.groupId">
                    <option v-for="group in groupOptions" :key="group.groupId" :value="group.groupId"
                    >{{group.name}}</option>
                  </select>
                </base-input>
                <!-- ประเภทสินค้า -->
                <base-input class="col-md-4" label="ประเภทสินค้า" required>
                  <select class="form-control" v-model="FormInventory.categoryId">
                    <option v-for="category in categoryOptions" :key="category.categoryId" :value="category.categoryId"
                  >{{category.nameThai}}</option>
                  </select>
                </base-input>
                <!-- น้ำหนักทอง -->
                <base-input class="col-md-4" label="น้ำหนักทอง (บาท)" required>
                  <select class="form-control" v-model="FormInventory.bahtId">
                    <option v-for="baht in bahtOptions" :key="baht.bahtId" :value="baht.bahtId">{{baht.name}}</option>
                  </select>
                </base-input>
                <!-- รหัสสินค้า -->
                <base-input class="col-md-6" type="text" label="กำหนดรหัสสินค้า"
                  placeholder="G96NL41001"
                  v-model="FormInventory.productId" required />
                
                <!-- จำนวนสินค้า -->
                <base-input class="col-md-4" type="number" min="0" label="จำนวนสินค้า" 
                  v-model="FormInventory.quantity" required />
                <!-- น้ำหนักทอง / ชิ้น -->
                <base-input class="col-md-4" type="text" label="น้ำหนักทอง / ชิ้น (กรัม)" 
                  v-model="FormInventory.goldWeight" required />
                <!-- น้ำหนักทองรวม -->
                <base-input class="col-md-4" type="text" label="น้ำหนักทองรวม" 
                  :value="setGoldWeightTotal" 
                  disabled />
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
            <div class="col-4">
              <image-upload 
                @change="onImageChange" 
                select-text="อัพโหลดรูปภาพ" 
                style="display: block"
              ></image-upload>
              <!-- <p class="text-muted ">{{FormInventory.image}}</p> -->
              <!-- <base-input class="col-md-12" label="รูปภาพ"
                  v-model="FormInventory.image" required /> -->
              
              <!-- <base-button class="animation-on-hover" type="primary">อัพโหลดรูปภาพ</base-button> -->
              <!-- <base-button @click="updateForm"></base-button> -->
            </div>
          </div>    
        </form>
      </modal>
  </div>
</template>

<script>
import {BaseButton, Modal, BaseInput} from '@/components';
import {ImageUpload} from 'src/components/index';
import InventoryDataService from '../../services/InventoryDataService';

export default {
  components: {
    BaseButton,
    BaseInput,
    Modal,
    ImageUpload
  },
  props: ['parentData', 'groupOptions', 'categoryOptions', 'bahtOptions'],
  data() {
    return {
      AddInventoryModal: false,
      FormInventory: {
        // group: '',
        // category: '',
        productId: '',
        styleName: '',
        productName: '',
        quantity: 0,
        quantitySold: 0,
        goldWeight: '',
        goldWeightTotal: '',
        description: '',
        image: '',
        groupId: null,
        categoryId: null,
        bahtId: null,
        shopId: 1
      }
    }
  },
  computed: {
    setGoldWeightTotal() {
      this.calculateGoldWeightTotal();
      return this.FormInventory.goldWeightTotal;
    }
  },
  methods: {
    openAddInvModal() {
      this.AddInventoryModal = true;
    },
    updateForm() {
      console.log(this.FormInventory);
    },
    // getGoldWeight() {
    //   InventoryDataService.findById()
    //   then(res => {

    //   })
    //   this. 
    // },
    calculateGoldWeightTotal() {
      this.FormInventory.goldWeightTotal = (parseFloat(this.FormInventory.goldWeight) * parseInt(this.FormInventory.quantity)).toFixed(2).toString();
    },
    onSubmit(evt) {
      // evt.preventDefault();
      this.$emit('sendData', this.FormInventory);
      this.AddInventoryModal = false;
    },
    onReset(evt) {
      evt.preventDefault();
      this.FormInventory.group = '',
      this.FormInventory.category = '',
      this.FormInventory.productId = '',
      this.FormInventory.styleName = '',
      this.FormInventory.productName = '',
      this.FormInventory.quantity = 0,
      this.FormInventory.goldWeight = '',
      this.FormInventory.goldWeightTotal = '',
      this.FormInventory.description = '',
      this.FormInventory.image = ''
    },
    onImageChange(file) {
      this.FormInventory.image = '/img/productsamples/' + file.name;
    },
  }
};
</script>

<style scoped>
.auto-fill-button{
  margin-top: auto;
  margin-bottom: 10px;
  height: 43.14px;
}
</style>