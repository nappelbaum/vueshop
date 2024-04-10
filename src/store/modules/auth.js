import PostService from '../../API/PostService.vue'

export default {
  actions: {
    async authUser({ commit }, data) {
      const authData = await PostService.authAPI(data)
      commit('AUTH_USER', authData)
    },
    clearAuthWarning({ commit }) {
      commit('CLEAR_AUTH_WARNING')
    },
    async getUser({ commit }, data) {
      const userData = await PostService.authAPI(data)
      commit('GET_USER', userData)
    },
    async logOut({ commit }, data) {
      await PostService.authAPI(data)
      commit('LOG_OUT')
    },
    updateAuthData({ commit }, newData) {
      commit('UPDATE_AUTH_DATA', newData)
    }
  },
  mutations: {
    AUTH_USER(state, authData) {
      if (typeof authData == 'object') {
        if (Object.keys(authData).length > 1) {
          state.isAuth = true
          state.user = authData
        } else if (authData.result == 'no_pass') {
          state.authWarning = 'Неправильный пароль'
        } else if (authData.result == 'no_email') {
          state.authWarning = 'Пользователь с таким e-mail не найден'
        }
      } else state.authErr = authData
    },
    CLEAR_AUTH_WARNING(state) {
      state.authWarning = ''
      state.authErr = ''
    },
    GET_USER(state, userData) {
      if (typeof userData == 'object') {
        state.isAuth = true
        state.user = userData
      }
    },
    LOG_OUT(state) {
      state.isAuth = false
      state.user = {}
    },
    UPDATE_AUTH_DATA(state, newData) {
      state.isAuth = newData.isAuth
      delete newData.isAuth
      state.user = newData
    }
  },
  state: {
    isAuth: false,
    user: {},
    authWarning: '',
    authErr: ''
  },
  getters: {
    isAuth(state) {
      return state.isAuth
    },
    user(state) {
      return state.user
    },
    authWarning(state) {
      return state.authWarning
    },
    authErr(state) {
      return state.authErr
    }
  }
}
