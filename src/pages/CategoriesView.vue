<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import PostService from '../API/PostService.vue'
import ShopProducts from '../components/ShopProducts.vue'

const route = useRoute()
const catId = route.params.id.split('-').pop().slice(3)
const category = ref([])
const products = ref([])
const { openDrawer, addToCart, clearCart } = inject('cart')

const fetchCategory = async () => {
  category.value = await PostService.getCategory(catId)
}

const fetchProducts = async () => {
  products.value = await PostService.getItemsForCart(category.value.productIds.join(','))
}

onMounted(async () => {
  await fetchCategory()
  if (Object.keys(category.value).length) fetchProducts()
  document.title = category.value.seoTitle
})
</script>

<template>
  <div v-if="Object.keys(category).length" class="mx-auto max-w-6xl py-6 px-8">
    <h1 class="text-center text-2xl font-bold text-gray-700 mb-10">
      Товары из категории {{ category.name }}
    </h1>
    <ShopProducts
      :items="products"
      @open-drawer="openDrawer"
      @addToCart="addToCart"
      @clearCart="clearCart"
    />
  </div>
</template>
