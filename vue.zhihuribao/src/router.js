import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import home from './views/Home';
import newdetail from './views/Newdetail.vue';
export default new Router({
  routes: [
    // {
    //   path: "/",
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    // },
    {
      path: '/home',
      component: home
    },
    {
      path: '/newdetail',
      component: newdetail
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});