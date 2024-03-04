import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import MainCart from './pages/MainCart.vue'
import ProductView from './pages/ProductView.vue'
import CategoriesView from './pages/CategoriesView.vue'
import NotFoundView from './pages/NotFoundView.vue'

const app = createApp(App)

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

app.use(router)

app.mount('#app')
