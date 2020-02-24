import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    technologies: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    technologies (state) {
      return state.technologies
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setTechnologies (state, payload) {
      if (Array.isArray(payload)) {
        state.technologies = payload
      } else {
        state.technologies = []
      }
    }
  },
  actions: {
    /**
     * Get all technologies.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async getTechnologies ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/technologies')

        commit('setTechnologies', data)

        commit('toggleLoading', false)
        return Promise.resolve(data)
      } catch (e) {
        commit('toggleLoading', false)
        return Promise.reject(e)
      }
    }
  }
}
