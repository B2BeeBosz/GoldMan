<template>
<div class="row justify-content-md-center">
  <form @submit="updateProfile" class="col-9">
    <card style="padding:2%">
    <h3 slot="header" class="title">แก้ไขข้อมูลของฉัน</h3><hr>
    <div class="row">
      <div class="col-8">
        <div class="form-row">
          <base-input
            class="col-12"
            type="text"
            label="Username"
            :disabled="true"
            placeholder="Username"
            v-model="user.username"
          ></base-input>
        
        <div class="form-row">
          <base-input
            class="col-6"
            type="email"
            label="Email address"
            v-model="user.email"
          >
          </base-input>
          <base-input
            class="col-6"
            type="tel"
            label="เบอร์โทรศัพท์"
            v-model="user.phoneNum"
          ></base-input>
          <base-input
            class="col-6"
            type="text"
            label="ชื่อ (ภาษาไทย)"
            placeholder="ชื่อ"
            v-model="user.firstNameThai"
          ></base-input>
          <base-input
            class="col-6"
            type="text"
            label="นามสกุล (ภาษาไทย)"
            placeholder="นามสกุล"
            v-model="user.lastNameThai"
          ></base-input>
        </div>
          
          <div class="col-6">
            <base-input
            type="text"
            label="Firstname (English)"
            placeholder="firstname"
            v-model="user.firstNameEng"
          >
          </base-input></div>
          <div class="col-6">
          <base-input
            type="text"
            label="Lastname (English)"
            placeholder="lastname"
            v-model="user.lastNameEng"
          >
          </base-input>
          </div>
          <div class="col-sm-3">
            <base-input label="เพศ">
              <select class="form-control" v-model="user.gender">
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </base-input>  
              
              <!-- <label>เพศ</label><div>
              <base-radio
              inline
              name="radio0"
              v-model="user.gender.radio1"
              >
              ชาย
              </base-radio>
              <base-radio
              inline
              name="radio1"
              v-model="user.gender.radio1"
              >
              หญิง
              </base-radio></div> -->
          </div>
          <div class="col-sm">
            <base-input
              label="หมายเลขบัตรประชาชน"
              v-model="user.citizenId"
              placeholder="หมายเลขบัตรประชาชน">
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
        <h5 style="text-align:center;">เปลี่ยนรูปประจำตัว</h5>
      </div>
      

      
    </div>
      <base-button native-type="submit" type="primary" class="btn-fill">
        Save
      </base-button>
  </card>
  </form>
</div>
</template>
<script>
import { ImageUpload } from 'src/components';
import BaseInput from '../../../components/Inputs/BaseInput.vue';
import BaseRadio from '../../../components/Inputs/BaseRadio.vue';
import UsersDataService from '../../../services/UsersDataService.js';
import { Modal } from 'src/components';

export default {
  components: {
    ImageUpload,
    BaseInput,
    BaseRadio,
    UsersDataService,
    Modal
  },
  data() {
    return {
      user: {
        userId: 0,
        username: '',
        email: '',
        phoneNum:'',
        firstNameThai: '',
        lastNameThai: '',
        firstNameEng:'',
        lastNameEng:'',
        gender: {
          radio1:""
        },
        birthDay:'',
        citizenId:'',
        addressLine: '',
        subDistrict:'',
        district:'',
        province:'',
        country: '',
        postalCode: '',
        image:''
      }
    };
  },
  methods: {
    updateProfile(evt) {
      UsersDataService.update(this.user.userId, this.user).then(res => {
        this.refreshList();
      }).catch(e => {
        console.log(e);
      });
    },
    retrieveUserProfile() {
      UsersDataService.findById(1).then(res => {
        this.user = res.data;
        // console.log(res.data);
      }).catch(e => {
        console.log(e);
      })
    },
    refreshList() {
      this.retrieveUserProfile();
    },
    
    onFileChange(file) {
      this.user.image = '/img/users/' + file.name;
    }
  },
  mounted() {
    this.refreshList();
  }
};
</script>
<style>
</style>
