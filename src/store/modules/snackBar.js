export default {
  namespaced: true,
  state: {
    snackBar: false,
    content: null,
    color: null,
    mode: null,
    x: null,
    y: null,
    timeout: null,
    closeButton: null,
    buttonColor: null,
    buttonText: null
  },
  getters: {
    snackBar (state) {
      return state.snackBar
    },
    content (state) {
      return state.content
    },
    color (state) {
      return state.color
    },
    mode (state) {
      return state.mode
    },
    x (state) {
      return state.x
    },
    y (state) {
      return state.y
    },
    timeout (state) {
      return state.timeout
    },
    closeButton (state) {
      return state.closeButton
    },
    buttonColor (state) {
      return state.buttonColor
    },
    buttonText (state) {
      return state.buttonText
    }
  },
  mutations: {
    toggleSnackBar (state, payload) {
      state.snackBar = payload.value
      state.content = payload.content
      state.color = payload.color || 'success'
      state.mode = payload.mode
      state.x = payload.x || 'right'
      state.y = payload.y || 'bottom'
      state.timeout = payload.timeout || 6000
      state.closeButton = payload.closeButton || true
      state.buttonColor = payload.buttonColor
      state.buttonText = payload.buttonText
    }
  },
  actions: {
    toggleSnackBar ({ commit }, payload) {
      commit('toggleSnackBar', payload)
    }
  }
}
