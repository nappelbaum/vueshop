import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MainCart from '../pages/MainCart.vue'
import ProductView from '../pages/ProductView.vue'
import CategoriesView from '../pages/CategoriesView.vue'
import NotFoundView from '../pages/NotFoundView.vue'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/SignUp.vue'
import TheChat from '../pages/TheChat.vue'
import UserPersArea from '../pages/UserPersArea.vue'
import store from '@/store'
import { computed } from 'vue'

const isAuth = computed(() => store.getters.isAuth)

const getUser = async () => {
  const formData = new FormData()
  formData.append('postName', 'getUser')
  await store.dispatch('getUser', formData)
}

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { title: 'Home', description: 'Shop beautyfull' }
  },
  {
    path: '/cart',
    name: 'MainCart',
    component: MainCart,
    meta: { title: 'Cart' }
  },
  {
    path: '/products/:id([a-zA-Z0-9-]+-p\\d+)',
    name: 'ProductView',
    component: ProductView
  },
  {
    path: '/categories/:id([a-zA-Z0-9-]+-cat\\d+)',
    name: 'CategoriesView',
    component: CategoriesView
  },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFoundView, meta: { title: 'NotFound' } },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { title: 'Авторизация' }
  },
  { path: '/signup', name: 'SignUp', component: SignUp, meta: { title: 'Регистрация' } },
  {
    path: '/user',
    name: 'UserPersArea',
    component: UserPersArea,
    meta: { title: 'Личный кабинет' },
    beforeEnter: async (to, from, next) => {
      if (!isAuth.value) await getUser()
      if (isAuth.value) next()
      else next('/signin')
    }
  },
  {
    path: '/chat',
    name: 'TheChat',
    component: TheChat
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
