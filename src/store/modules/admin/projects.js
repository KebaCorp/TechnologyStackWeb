import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    projects: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    projects (state) {
      return state.projects
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setProjects (state, payload) {
      if (Array.isArray(payload)) {
        state.projects = payload
      } else {
        state.projects = []
      }
    }
  },
  actions: {
    /**
     * Get all projects.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async setProjects ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/projects')

        commit('setProjects', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Create project.
     *
     * @param commit
     * @param payload
     * @returns {Promise<*>}
     */
    async create ({ commit }, payload) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/project/create', payload)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Delete project.
     *
     * @param commit
     * @param id
     * @returns {Promise<*>}
     */
    async delete ({ commit }, { id }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/project/delete', { id })
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    }
  }
}
