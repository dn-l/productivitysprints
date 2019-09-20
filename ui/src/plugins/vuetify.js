import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  dark: true,
  theme: {
    themes: {
      light: {
        primary: '#FFFFFE',
        secondary: '#F8E9CC',
        accent: '#449B90',
        text: '#262739',
        white: '#FFFFFE'
      },
      dark: {
        primary: '#1B1D2B',
        secondary: '#0D0E16',
        accent: '#449B90'
      }
    }
  }
})
