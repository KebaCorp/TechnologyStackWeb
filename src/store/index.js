import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from './modules/snackBar'
import technologies from './modules/technologies'
import types from './modules/admin/types'
import stages from './modules/admin/stages'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    snackBar,
    technologies,
    types,
    stages
  }
})
