import { axios } from '@/axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    users: []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    users (state) {
      return state.users
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setUsers (state, payload) {
      if (Array.isArray(payload)) {
        state.users = payload
      } else {
        state.users = []
      }
    }
  },
  actions: {
    /**
     * Get all users.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async setUsers ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.get('/users')

        commit('setUsers', data)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Create user.
     *
     * @param commit
     * @param payload
     * @returns {Promise<*>}
     */
    async create ({ commit }, payload) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/user/create', payload)
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    },

    /**
     * Delete user.
     *
     * @param commit
     * @param id
     * @returns {Promise<*>}
     */
    async delete ({ commit }, { id }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('/user/delete', { id })
        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return e
      }
    }
  }
}
