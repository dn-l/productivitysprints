import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Review from './views/Review.vue'
import ConnectedUsers from './components/ConnectedUsers'
import StateCaption from './components/StateCaption'
import SkipReport from './components/SkipReport'

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
      path: '/review',
      name: 'review',
      components: {
        default: Review,
        topBarEnd: SkipReport
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
