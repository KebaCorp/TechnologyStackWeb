import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    stages: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    stages (state) {
      return state.stages
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setStages (state, payload) {
      if (Array.isArray(payload)) {
        state.stages = payload
      } else {
        state.stages = []
      }
    }
  },
  actions: {
    /**
     * Get all stages.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async setStages ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/stages')

        commit('setStages', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Create stage.
     *
     * @param commit
     * @param payload
     * @returns {Promise<*>}
     */
    async create ({ commit }, payload) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/stage/create', payload)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Delete stage.
     *
     * @param commit
     * @param id
     * @returns {Promise<*>}
     */
    async delete ({ commit }, { id }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/stage/delete', { id })
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    }
  }
}
