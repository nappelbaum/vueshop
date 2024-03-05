import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MainCart from '../pages/MainCart.vue'
import ProductView from '../pages/ProductView.vue'
import CategoriesView from '../pages/CategoriesView.vue'
import NotFoundView from '../pages/NotFoundView.vue'

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
  { path: '/:pathMatch(.*)*', name: '404', component: NotFoundView, meta: { title: 'NotFound' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
