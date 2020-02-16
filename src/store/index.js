import Vue from 'vue'
import Vuex from 'vuex'
import technologies from './modules/technologies'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    technologies
  }
})
