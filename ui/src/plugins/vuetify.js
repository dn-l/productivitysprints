import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import themes from '../themes'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  dark: true,
  theme: {
    options: {
      customProperties: true
    },
    themes
  }
})
