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
    async setTechnologies ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/technologies')

        commit('setTechnologies', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Create technology.
     *
     * @param commit
     * @param payload
     * @returns {Promise<*>}
     */
    async create ({ commit }, payload) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/technology/create', payload)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Delete technologies.
     *
     * @param commit
     * @param id
     * @returns {Promise<*>}
     */
    async delete ({ commit }, { id }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/technology/delete', { id })
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    }
  }
}
