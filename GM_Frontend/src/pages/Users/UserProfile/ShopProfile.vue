<template>
<div class="row justify-content-md-center">
<form @submit="updateProfile" class="col-9">
  <card style="padding:2%">
    <h3 slot="header" class="title">แก้ไขข้อมูลร้านค้า</h3><hr>
    
    <div class="row">
      <div class="col-8">
        
          
          <div class="row">  
            <div class="col-sm-6">
            <base-input
              type="text"
              label="ชื่อร้าน"
              v-model="user.shopName"
            >
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
                type="tel"
                label="เบอร์โทรศัพท์"
                v-model="user.telephone"
              >
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
              type="text"
              label="ที่อยู่"
              placeholder="Home Address"
              v-model="user.addressLine"
            >
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
              v-model="user.subDistrict"
              label="ตำบล/แขวง">
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
              v-model="user.district"
              label="อำเภอ/เขต">
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
              v-model="user.province"
              label="จังหวัด">
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
              v-model="user.country"
              label="ประเทศ">
            </base-input>
          </div>
          <div class="col-sm-6">
            <base-input
              v-model="user.postalCode"
              label="หมายเลขไปรษณีย์">
            </base-input>
          </div>  
      </div>
    </div>
      <div class="col" style="border-left:1px solid rgba(0, 0, 0, 0.1);height:5%">
        <image-upload style="width:70%;margin-left:15%;border-radius:50%" :src="user.image" @change="onFileChange"></image-upload>
        <h5 style="text-align:center;">เปลี่ยนรูปร้านค้า</h5>
      </div>
      </div>

      <div class="form-row">
        <div class="col-md-12">
          <base-input label="รายละเอียดเพิ่มเติมเกี่ยวกับร้านค้า">
            <textarea class="form-control" rows="10"
                      placeholder="บอกรายละเอียดร้าน, วันและเวลาทำการ, ช่องทางการติดต่อ (เช่น Facebook, Instagram)" 
                      v-model="user.about"
            ></textarea>
          </base-input>
        </div>
      </div>

      <base-button native-type="submit" type="primary" class="btn-fill">
        บันทึกข้อมูล
      </base-button>
    
  </card>
  </form>
</div>
</template>
<script>
import { ImageUpload } from 'src/components';
import ShopsDataService from '../../../services/ShopsDataService.js';

export default {
  components: {
    ImageUpload,
    ShopsDataService
  },
  data() {
    return {
      user: {
        shopId:0,
        shopName: '',
        telephone:'',
        addressLine: '',
        subDistrict:'',
        district:'',
        province:'',
        country: '',
        postalCode: '',
        image:'',
        about: ''
      }
    };
  },
  methods: {
    updateProfile(evt) {
      alert('Your data: ' + JSON.stringify(this.user));
      ShopsDataService.update(this.user.shopId, this.user).then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
    },
    retrieveUserProfile() {
      ShopsDataService.getOneShopById(1).then(res => {
        console.log(res.data)
        this.user = res.data[0];
      }).catch(e => {
        console.log(e);
      })
    },
    refreshList() {
      this.retrieveUserProfile();
    },
    onFileChange(file) {
      this.user.image = '/img/shops/' + file.name; 
    }
  },
  mounted() {
    this.refreshList();
  }
};
</script>
<style></style>
