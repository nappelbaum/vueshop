import { createStore } from 'vuex'
import products from './modules/products'
import auth from './modules/auth'
import reg from './modules/reg'

const store = createStore({
  modules: {
    products,
    auth,
    reg
  }
})

export default store
