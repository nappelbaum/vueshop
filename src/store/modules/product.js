import PostService from '../../API/PostService.vue'

export default {
  actions: {
    async fetchProduct({ commit }, id) {
      const getData = await PostService.getItems(id)
      commit('updateProducts', getData)
    }
  },
  mutations: {
    updateProducts(state, getData) {
      Array.isArray(getData) ? (state.products = getData) : (state.productsErr = getData.err)
    }
  },
  state: {
    product: {},
    productErr: ''
  },
  getters: {
    product(state) {
      return state.product
    },
    productErr(state) {
      return state.productErr
    }
  }
}
