import Vue from 'vue'
import Vuetify from 'vuetify'
import ru from 'vuetify/es5/locale/ru'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#283447',
        secondary: '#4F759E',
        accent: '#82B1FF',
        error: '#F56C72',
        info: '#769BD4',
        success: '#70C97A',
        warning: '#FFC107',
        lighten5: '#e5e7e9',
        lighten4: '#bfc2c8',
        lighten3: '#949aa3',
        lighten2: '#69717e',
        lighten1: '#485263',
        darken1: '#283447',
        darken2: '#242f40',
        darken3: '#1e2737',
        darken4: '#18212f'
      }
    }
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    locales: { ru },
    current: process.env.VUE_APP_LOCALE
  }
})
