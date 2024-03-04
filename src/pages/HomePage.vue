<script setup>
import { computed, inject, onMounted, ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import debounce from 'lodash.debounce'
import ShopCategories from '../components/ShopCategories.vue'
import ShopProducts from '../components/ShopProducts.vue'
import SearchInput from '../components/SearchInput.vue'
import PostService from '../API/PostService.vue'

const route = useRoute()
const { openDrawer, addToCart, clearCart } = inject('cart')

const categories = ref([])
const items = ref([])
const itemsErr = ref('')

const filters = reactive({
  sortBy: '',
  searchQuery: ''
})

const selectText = computed(() => {
  return filters.sortBy ? 'Исходная сортировка' : 'Сортировать по цене'
})

const onChangeSearchInput = debounce((e) => {
  filters.searchQuery = e.target.value
}, 500)

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}

const fetchCategories = async () => {
  categories.value = await PostService.getCategories()
}

const fetchItems = async () => {
  const data = await PostService.getItems(filters)
  if (Array.isArray(data)) items.value = data
  else itemsErr.value = data
}

onMounted(() => {
  fetchCategories()
  fetchItems()
  document.title = route.meta.title
  document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
})
watch(filters, fetchItems)
</script>

<template>
  <ShopCategories :categories="categories" />
  <section class="mt-7">
    <div class="mx-auto max-w-6xl py-6 px-8">
      <h1 class="text-center text-2xl font-bold text-gray-700 relative">Рекомендуемые товары</h1>

      <div class="my-5 flex flex-col gap-y-3 sm:flex-row justify-center gap-x-2 lg:justify-end">
        <SearchInput @onChangeSearchInput="onChangeSearchInput" />
        <select
          class="font-body px-2 py-1 outline-none border rounded-md text-base font-normal bg-transparent shop__select"
          @change="onChangeSelect"
        >
          <option value>{{ selectText }}</option>
          <option value="PRICE_ASC">Сначала дешевые</option>
          <option value="PRICE_DESC">Сначала дорогие</option>
        </select>
      </div>

      <ShopProducts
        v-if="items.length"
        :items="items"
        @open-drawer="openDrawer"
        @addToCart="addToCart"
        @clearCart="clearCart"
      />
      <div v-else>
        <h2 v-if="itemsErr" class="text-center text-xl font-bold text-red-700 relative">
          Ошибка загрузки товаров! {{ itemsErr }}
        </h2>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@-moz-document url-prefix() {
  option {
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
