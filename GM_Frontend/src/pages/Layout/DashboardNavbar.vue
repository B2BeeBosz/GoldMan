<template>
  <!-- navbar-absolute top-navbar -->
  <base-nav
    v-model="showMenu"
    class="fixed-top" 
    type="warning"
    :transparent="false"
  >
    <div slot="brand" class="navbar-wrapper">
      <div class="navbar-minimize d-inline"><sidebar-toggle-button /></div>
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <route-breadcrumb></route-breadcrumb>
      <!-- <a class="navbar-brand" href="#pablo">{{ routeName }}</a> -->
      <!-- <breadcrumb :transparent="false">
        <breadcrumb-item>
          <a class="navbar-brand" href="#">Home</a>
        </breadcrumb-item>
        <breadcrumb-item active>
          Library
        </breadcrumb-item>
      </breadcrumb> -->
    </div>

    <ul class="navbar-nav ml-auto">
      <!-- <div class="search-bar input-group" @click="searchModalVisible = true">
        
          <input type="text" class="form-control" placeholder="Search...">
          <div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div>
        
        <button
          class="btn btn-link"
          id="search-button"
          data-toggle="modal"
          data-target="#searchModal"
        >
          <i class="tim-icons icon-zoom-split"></i>
        </button> -->
        <!-- You can choose types of search input -->
      <!-- </div>
      <modal
        :show.sync="searchModalVisible"
        class="modal-search"
        id="searchModal"
        :centered="false"
        :show-close="true"
      >
        <input
          slot="header"
          v-model="searchQuery"
          type="text"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="SEARCH"
        />
      </modal> -->
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
      >
        <template
          slot="title"
        >
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-bell-55"></i>
          <p class="d-lg-none">New Notifications</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Mike John responded to your email</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Your friend Michael is in town</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another notification</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another one</a>
        </li>
      </base-dropdown>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template
          slot="title"
        >
          <div class="photo"><img :src="user.image" /></div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">Log out</p>
        </template>
        <h4 class="dropdown-item">{{user.username}}</h4>
        <!-- <p>เจ้าของร้าน</p> -->
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <a href="#/shop/profile" class="nav-item dropdown-item">โปรไฟล์ผู้ใช้</a>
        </li>
        <li class="nav-link">
          <a href="/" class="nav-item dropdown-item">ออกจากระบบ</a>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import SidebarToggleButton from './SidebarToggleButton';
import RouteBreadcrumb from '../../components/Breadcrumb/RouteBreadcrumb';
import UsersDataService from '../../services/UsersDataService.js';

export default {
  components: {
    SidebarToggleButton,
    CollapseTransition,
    BaseNav,
    Modal,
    RouteBreadcrumb,
    UsersDataService
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      user: {
        userId: 0,
        username:'',
        image:''
      }
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    retrieveUserProfile() {
      UsersDataService.findById(1).then(res => {
        this.user.userId = res.data.userId;
        this.user.username = res.data.username;
        this.user.image = res.data.image;
        // console.log(res.data);
      }).catch(e => {
        console.log(e);
      })
    },
    
  },
  mounted() {
    this.retrieveUserProfile();
    // if (!this.currentUser) {
    //   this.$router.push('/login');
    // }
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
