import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UsersCounters from './components/UsersCounters'
import StateCaption from './components/StateCaption'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        topBarMiddle: StateCaption,
        topBarEnd: UsersCounters
      }
    },
    {
      path: '/review',
      name: 'review',
      component: () => import(/* webpackChunkName: "review" */ './views/Review.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
