import { axios } from '@/axios'
import Authorization from '@/models/Authorization'

export default {
  namespaced: true,
  state: {
    loading: false,
    token: Authorization.getAccessToken(),
    isAuthorized: Authorization.isAuthorized()
  },
  getters: {
    loading (state) {
      return state.loading
    },
    token (state) {
      return state.token
    },
    isAuthorized (state) {
      return state.isAuthorized
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    setToken (state, { token, expiresAt, refreshToken }) {
      Authorization.setData({
        accessToken: token,
        accessTokenExpires: expiresAt,
        refreshToken
      })

      state.token = Authorization.getAccessToken()
      state.isAuthorized = Authorization.isAuthorized()
    },
    clearToken (state) {
      Authorization.clearData()

      state.token = Authorization.getAccessToken()
      state.isAuthorized = Authorization.isAuthorized()
    },
    clearLocalStorage () {
      localStorage.removeItem('user')
      localStorage.removeItem('menu')
    }
  },
  actions: {
    /**
     * Authorization.
     *
     * @param commit
     * @param username
     * @param password
     * @param rememberMe
     * @returns {Promise<*>}
     */
    async login ({ commit }, { username, password, rememberMe }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('authorization/login', {
          username,
          password,
          rememberMe
        })

        // Save user data
        if (data.user) {
          this.dispatch('user/setUser', data.user)
        }

        // Save token
        if (typeof data.token === 'object') {
          commit('setToken', data.token)
        }

        commit('toggleLoading', false)

        return data
      } catch (e) {
        commit('toggleLoading', false)

        return Promise.reject(e)
      }
    },

    /**
     * Update user data.
     *
     * @param commit
     * @returns {Promise<*>}
     */
    async updateToken ({ commit }) {
      commit('toggleLoading', true)

      try {
        const { data } = await axios.post('authorization/update-token', {
          refreshToken: Authorization.getRefreshToken()
        })

        // Save token
        if (typeof data.token === 'object') {
          commit('setToken', data.token)
        }

        commit('toggleLoading', false)

        return Promise.resolve(data)
      } catch (e) {
        commit('toggleLoading', false)

        return Promise.reject(e)
      }
    },

    /**
     * Logout.
     *
     * @param commit
     */
    async logout ({ commit }) {
      commit('toggleLoading', true)

      try {
        await axios.post('closed/authorization/logout')
      } catch (e) {
      }

      commit('toggleLoading', false)

      // Delete user data
      this.dispatch('user/clearUser')

      // Delete token
      commit('clearToken')

      // Clear local storage
      commit('clearLocalStorage')

      return true
    }
  }
}
