<template>
  <div class="row" v-if="role === 'Owner'">
    <div class="col-md-12"><user-profile> </user-profile></div>
    <div class="col-md-12"><shop-profile> </shop-profile></div>
  </div>
  <div class="row" v-else>
    <div class="col-md-12"><user-profile> </user-profile></div>
  </div>
</template>
<script>
import UserProfile from './UserProfile/UserProfile.vue';
import ShopProfile from './UserProfile/ShopProfile.vue';

export default {
  components: {
    UserProfile,
    ShopProfile
  },
  data() {
    return {
      role: 'Owner'
    }
  },
  methods: {
    getRole() {
      
    }
  }
};
</script>
<style></style>