import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    technologyItems: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    technologyItems (state) {
      return state.technologyItems
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setTechnologyItems (state, payload) {
      if (Array.isArray(payload)) {
        state.technologyItems = payload
      } else {
        state.technologyItems = []
      }
    }
  },
  actions: {
    /**
     * Get all technologyItems.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async setTechnologyItems ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/technology-items')

        commit('setTechnologyItems', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Create technologyItem.
     *
     * @param commit
     * @param payload
     * @returns {Promise<*>}
     */
    async create ({ commit }, payload) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/technology-item/create', payload)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Delete technologyItem.
     *
     * @param commit
     * @param id
     * @returns {Promise<*>}
     */
    async delete ({ commit }, { id }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/technology-item/delete', { id })
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    }
  }
}
