<script setup>
import { reactive, ref, provide, computed, onMounted, watch } from 'vue'
import ShopHeader from './components/ShopHeader.vue'
import CartDrawer from './components/CartDrawer.vue'
import MyFooter from './components/MyFooter.vue'
import PostService from './API/PostService.vue'
import LocalStorage from './localStorage/LocalStorage.vue'
import copy from './hooks/Copy.vue'
import store from './store'

// before vuex

const cart = reactive([])
const drawerCartItem = ref({})
const drawerOpen = ref(false)

const openDrawer = (item) => {
  drawerOpen.value = true
  drawerCartItem.value = item
}
const closeDrawer = () => {
  drawerOpen.value = false
}

const setStorage = () => {
  if (cart.length) LocalStorage.setItem(cart)
  else LocalStorage.deleteCart()
}

const fetchItemsForCart = async () => {
  const localCart = LocalStorage.getCart()
  const localIds = Array.from(new Set(localCart.map((el) => el.id))).join(',')

  const itemsForCart = await PostService.getItemsForCart(localIds)
  cart.length = 0

  localCart.forEach((localItem) => {
    const cartItem = itemsForCart.find((item) => item.id === localItem.id)
    cart.push({
      ...cartItem,
      isAdded: localItem.qty,
      selectedOptions: localItem.selectedOptions
    })
  })
}

const setTotalCart = computed(() => {
  return {
    totalQty: cart.reduce((acc, el) => acc + el.isAdded, 0),
    totalPrice: cart.reduce((acc, el) => acc + el.defaultDisplayedPrice * el.isAdded, 0)
  }
})

const addToCart = (item, qty, options) => {
  const optionsNonMute = copy(options)
  const cartItem = {
    ...item,
    isAdded: qty,
    selectedOptions: optionsNonMute
  }
  cart.push(cartItem)
  openDrawer(cartItem)
  setStorage()
}

const changeCart = (cartItemIndex, qty) => {
  cart[cartItemIndex].isAdded = qty
  setStorage()
}

const clearCart = (item) => {
  let cartFindIndex = cart.findIndex((cartItem) => cartItem.id === item.id)
  while (cartFindIndex !== -1) {
    cart.splice(cartFindIndex, 1)
    cartFindIndex = cart.findIndex((cartItem) => cartItem.id === item.id)
  }
  setStorage()
}

const deleteCartItem = (cartIndex) => {
  cart.splice(cartIndex, 1)
  setStorage()
}

const isAuth = computed(() => store.getters.isAuth)
const user = computed(() => store.getters.user)
const getUser = async () => {
  const formData = new FormData()
  formData.append('postName', 'getUser')
  await store.dispatch('getUser', formData)
}

const bc = new BroadcastChannel('auth_channel')

onMounted(() => {
  fetchItemsForCart()

  window.addEventListener('storage', () => {
    fetchItemsForCart()
  })

  getUser()

  bc.addEventListener('message', function (e) {
    store.dispatch('updateAuthData', e.data)
  })

  window.addEventListener('popstate', () => {
    drawerOpen.value = false
  })
})

watch(isAuth, () => {
  bc.postMessage({ ...user.value, isAuth: isAuth.value })
})
watch(drawerOpen, () => {
  document.body.style.overflow = drawerOpen.value ? 'hidden' : 'visible'
})

provide('cart', {
  cart,
  drawerCartItem,
  drawerOpen,
  closeDrawer,
  openDrawer,
  addToCart,
  changeCart,
  clearCart,
  deleteCartItem
})

provide('cartTotal', setTotalCart)
</script>

<template>
  <ShopHeader />
  <CartDrawer
    v-if="drawerOpen"
    :drawerOpen="drawerOpen"
    @close-drawer="closeDrawer"
    :drawerCartItem="drawerCartItem"
  />

  <main class="my-8">
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <MyFooter class="mt-auto" />
</template>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'); */

@import './scss/_main.scss';

body {
  font-family:
    'Montserrat',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Arial,
    'Noto Sans',
    'Liberation Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

a:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.page-enter-active {
  transition: all 0.4s;
}

.page-enter-from {
  opacity: 0;
  filter: blur(1rem);
}
</style>
