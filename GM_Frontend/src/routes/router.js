import VueRouter from 'vue-router';
import routes from './routes';

// configure router
const router = new VueRouter({
  // mode: history,
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
