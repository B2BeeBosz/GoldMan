<template>
  <bread-crumb class="breadcrumb">
    <BreadCrumbItem
      v-for="(route, index) in $route.matched.slice()"
      :key="route.name"
      style="display:inline-block"
    >
    <!-- breadcrumb-link -->
      <router-link
        :to="{ name: route.name }"
        v-if="index < $route.matched.length - 1"
        class="grey-link"
      >
        {{ route.name }}
      </router-link>
      <!-- breadcrumb-current -->
      <span v-else class="white-link">{{ route.name }}</span>
    </BreadCrumbItem>
  </bread-crumb>
</template>

<script>
import BreadCrumb from './Breadcrumb';
import BreadCrumbItem from './BreadcrumbItem';

export default {
  name: 'route-breadcrumb',
  components: {
    BreadCrumb,
    BreadCrumbItem
  },
  methods: {
    getBreadName(route) {
      return route.name;
    }
  }
};
</script>

<style scoped>
.breadcrumb{
  padding: 0rem 1rem;
  display: contents;
}
.grey-link{
  color: rgba(255, 255, 255, 0.8); 
}
.grey-link:hover{
  color: #FFFFFF;
  transition: 100ms;
}
.white-link{
  color: #FFFFFF
}
</style>
