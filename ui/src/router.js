import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ConnectedUsers from './components/ConnectedUsers'
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
        topBarEnd: ConnectedUsers
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import(/* webpackChunkName: "report" */ './views/Report.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
