import PostService from '../../API/PostService.vue'

export default {
  actions: {
    async fetchProducts({ commit }, filters) {
      const getData = await PostService.getItems(filters)
      commit('updateProducts', getData)
    }
  },
  mutations: {
    updateProducts(state, getData) {
      Array.isArray(getData) ? (state.products = getData) : (state.productsErr = getData.err)
    }
  },
  state: {
    products: [],
    productsErr: ''
  },
  getters: {
    allProducts(state) {
      return state.products
    },
    productsErr(state) {
      return state.productsErr
    }
  }
}
