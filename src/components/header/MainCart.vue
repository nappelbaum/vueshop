<script setup>
import { inject } from 'vue'
import Convert from '../../hooks/Convert.vue'

const cartTotal = inject('cartTotal')
</script>

<template>
  <router-link
    to="/cart"
    class="flex items-center text-lg font-normal"
    aria-label="Перейти в корзину"
    title="Перейти в корзину"
  >
    <div
      class="flex relative items-end justify-center text-lg font-normal leading-6 icon-cart"
      :data-count="cartTotal.totalQty ? cartTotal.totalQty : ''"
    >
      <svg width="28" height="28" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <path
          class="fill-slate-800"
          d="M24 5v17a4 4 0 01-4 4H6a4 4 0 01-4-4V5h22zm-2 2H4v15a2 2 0 001.85 1.995L6 24h14a2 2 0 001.995-1.85L22 22V7z"
        ></path>
        <path
          class="fill-slate-800"
          d="M13 0c3.224 0 5.877 2.408 5.996 5.453l.004.214V9a1 1 0 01-1.993.117L17 9V5.667C17 3.657 15.224 2 13 2c-2.154 0-3.889 1.556-3.995 3.48L9 5.666V9a1 1 0 01-1.993.117L7 9V5.667C7 2.52 9.701 0 13 0z"
        ></path>
        <path
          :class="cartTotal.totalQty ? 'fill-slate-800' : 'opacity-0'"
          d="M3 6h20v16a3 3 0 01-3 3H6a3 3 0 01-3-3V6z"
        ></path>
      </svg>
    </div>
    <span class="text-sm ml-2 cart-price">{{ Convert(cartTotal.totalPrice) }}₽</span>
  </router-link>
</template>

<style lang="scss" scoped>
.icon-cart::after {
  content: attr(data-count);
  position: absolute;
  font-size: 13px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  margin-bottom: -1px;
}

@media (max-width: 1025px) {
  .cart-price {
    display: none;
  }
}

.router-link-exact-active {
  color: rgb(13 46 145);

  svg {
    > path {
      fill: rgb(13 46 145);
    }
  }
}
</style>
