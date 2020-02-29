/**
 * Load user data from local storage.
 */
const getUserFromLocalStorage = () => {
  let user = {}
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) {
  }

  return user
}

export default {
  namespaced: true,
  state: {
    loading: false,
    user: getUserFromLocalStorage() || {}
  },
  getters: {
    loading (state) {
      return state.loading
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setUser (state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.user = payload
    },
    clearUser (state) {
      localStorage.removeItem('user')
      state.user = {}
    }
  },
  actions: {
    /**
     * Save user data.
     *
     * @param commit
     * @param payload
     */
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    },

    /**
     * Delete user data.
     *
     * @param commit
     */
    clearUser ({ commit }) {
      commit('clearUser')
    }
  }
}
