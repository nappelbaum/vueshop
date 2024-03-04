<script setup>
import { reactive, ref, provide, computed, onMounted } from 'vue'
import ShopHeader from './components/ShopHeader.vue'
import CartDrawer from './components/CartDrawer.vue'
import MyFooter from './components/MyFooter.vue'
import PostService from './API/PostService.vue'
import LocalStorage from './localStorage/LocalStorage.vue'
import copy from './hooks/Copy.vue'

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

  const extraItems = cart.filter((el) => !localIds.includes(el.id))
  if (extraItems.length) extraItems.forEach((el) => cart.splice(cart.indexOf(el), 1))

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

onMounted(() => {
  fetchItemsForCart()

  window.addEventListener('storage', () => {
    fetchItemsForCart()
  })
})

provide('cart', {
  cart,
  drawerCartItem,
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
    <router-view></router-view>
  </main>
  <MyFooter />
</template>

<style>
a:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}
</style>
