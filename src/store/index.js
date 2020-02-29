import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from './modules/snackBar'
import dashboard from './modules/dashboard'
import types from './modules/admin/types'
import stages from './modules/admin/stages'
import technologies from './modules/admin/technologies'
import projects from './modules/admin/projects'
import technologyItems from './modules/admin/technologyItems'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    snackBar,
    dashboard,
    types,
    stages,
    technologies,
    projects,
    technologyItems
  }
})
