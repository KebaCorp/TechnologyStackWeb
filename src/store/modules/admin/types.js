import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    types: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    types (state) {
      return state.types
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setTypes (state, payload) {
      if (Array.isArray(payload)) {
        state.types = payload
      } else {
        state.types = []
      }
    }
  },
  actions: {
    /**
     * Get all types.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async setTypes ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/types')

        commit('setTypes', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Create type.
     *
     * @param commit
     * @param payload
     * @returns {Promise<*>}
     */
    async create ({ commit }, payload) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/type/create', payload)

        commit('setTypes', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    }
  }
}
