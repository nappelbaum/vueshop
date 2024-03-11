import PostService from '../../API/PostService.vue'

export default {
  actions: {
    async regUser({ commit }, data) {
      const regData = await PostService.authAPI(data)
      commit('REG_USER', regData)
    },
    clearRegMessage({ commit }) {
      commit('CLEAR_REG_MESSAGE')
    }
  },
  mutations: {
    REG_USER(state, regData) {
      if (typeof regData == 'object') {
        if (regData.result == 'exist') {
          state.regWarning = 'Пользователь с таким e-mail уже есть'
        } else if (regData.result == 'success') {
          state.regMessage = 'success'
        }
      } else state.regErr = regData
    },
    CLEAR_REG_MESSAGE(state) {
      state.regWarning = ''
      state.regMessage = ''
      state.regErr = ''
    }
  },
  state: {
    regWarning: '',
    regMessage: '',
    regErr: ''
  },
  getters: {
    regWarning(state) {
      return state.regWarning
    },
    regMessage(state) {
      return state.regMessage
    },
    regErr(state) {
      return state.regErr
    }
  }
}
