<script setup>
import { computed, inject } from 'vue'
import CartItem from '../components/CartItem.vue'
import LocalStorage from '../localStorage/LocalStorage.vue'

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
  document.title = route.meta.title
})

const { cart } = inject('cart')

const attentions = computed(() => {
  return cart
    .filter((item) => !item.selectedOptions.length && item.options.length)
    .map((el) => el.name)
})
</script>

<template>
  <div class="font-body mx-auto max-w-6xl py-6 px-8">
    <section
      v-if="cart.length"
      class="flex flex-col gap-y-20 md:flex-row md:gap-x-16 lg:gap-x-20 xl:gap-x-24"
    >
      <div class="flex-initial w-full md:w-1/2">
        <h2 class="text-2xl font-bold text-gray-700 mb-10">Корзина</h2>
        <CartItem />
      </div>
      <div class="flex-initial w-full md:w-1/2">
        <h2 class="text-2xl font-bold text-gray-700 mb-10">Оформление заказа</h2>
        <div class="flex flex-col gap-y-4 mb-12">
          <div v-if="attentions.length" class="text-red-600 font-bold">
            Укажите недостающие опции товарам:
            <div v-for="attention in attentions" :key="attention">
              {{ attention }}
            </div>
          </div>
          <div>
            Введите адрес своей электронной почты. На этот адрес будут отправляться уведомления о
            статусе заказа.
          </div>
          <input
            class="py-2 px-4 bg-slate-50 border border-slate-400 rounded-md outline-none focus-visible:bg-transparent"
            type="email"
          />
          <div
            class="flex items-center justify-center py-4 px-14 bg-zinc-700 rounded-md cursor-pointer lg:w-3/5"
          >
            <span class="text-white font-bold text-center">Оформить заказ</span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-700 mb-6">Далее</h2>
        <h3>Оплата</h3>
        <h3>Подтвердить заказ</h3>
      </div>
    </section>
    <h2
      v-else-if="!cart.length && !LocalStorage.getCart().length"
      class="text-center text-xl font-bold text-gray-700"
    >
      Ваша корзина пуста
    </h2>
  </div>
</template>
