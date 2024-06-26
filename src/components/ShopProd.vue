<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  context: String,
  id: Number,
  autogeneratedSlug: String,
  title: String,
  imgUrl_160: String,
  imgUrl_400: String,
  imgUrl_800: String,
  imgUrl_1500: String,
  price: String,
  options: Array,
  openPopUp: Function,
  openDrawer: Function,
  addToCart: Function,
  clearCart: Function
})

const { cart } = inject('cart')
const isAdded = computed(() => {
  return cart.some((el) => el.id === props.id)
})
const isAddedQty = computed(() => {
  const cartFilterIsAdded = cart.filter((el) => el.id === props.id)
  return cartFilterIsAdded.length && cartFilterIsAdded.reduce((acc, el) => acc + el.isAdded, 0)
})

const addWithoutOptions = () => {
  props.addToCart()
  props.openDrawer()
}
</script>

<template>
  <article
    class="products__card select-none"
    :class="{
      products__small: context === 'cart'
    }"
  >
    <router-link :to="`/products/${autogeneratedSlug}-p${id}`" class="products__card-img">
      <picture>
        <source
          :srcset="`${imgUrl_400} 1x, ${imgUrl_400} 2x, ${imgUrl_800} 3x`"
          media="(max-width: 400px)"
        />
        <img :srcset="`${imgUrl_800} 2x, ${imgUrl_1500} 3x`" :src="imgUrl_400" alt="" />
      </picture>
    </router-link>
    <router-link :to="`/products/${autogeneratedSlug}-p${id}`" class="products__card-name">
      <div>{{ title }}</div>
    </router-link>
    <div class="products__card-cost" :style="context === 'cart' && 'justify-content: center'">
      <div>
        <div v-if="context !== 'cart'">
          <div class="text-slate-600 text-sm font-light">Цена:</div>
          <div>{{ price }}</div>
        </div>
        <div v-if="context === 'cart'">
          <span>Кол-во: </span>
          <span>1</span>
        </div>
      </div>

      <div
        v-if="context !== 'cart'"
        class="hover:opacity-80 cursor-pointer"
        :class="isAdded && 'products__card-qty'"
        :data-isadded="isAddedQty"
      >
        <img
          :src="!isAdded ? '/btn-plus.svg' : '/btn-checked.svg'"
          :title="!isAdded ? 'Добавить в корзину' : 'Удалить из корзины'"
          @click="
            () => {
              if (!isAdded) {
                options.length ? openPopUp() : addWithoutOptions()
              } else {
                clearCart()
              }
            }
          "
          :alt="title"
        />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import '../scss/main';

.products__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  width: 100%;

  @media (max-width: 860px) {
    width: clamp(200px, 22vw, 245px);
  }

  &:hover {
    .products__card-img img {
      transform: scale(1.1);
    }
  }

  .products__card-img {
    height: clamp(200px, 22vw, 245px);
    width: 100%;
    overflow: hidden;
    &:hover {
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.2s ease-out;
    }
  }

  .products__card-name {
    font-family:
      ui-sans-serif,
      system-ui,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';
    font-size: 18px;
    margin-top: 6px;

    div {
      text-align: center;
    }
  }

  .products__card-cost {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 20px;
    font-weight: 700;

    span {
      font-size: 16px;
      font-weight: 400;
    }
  }
}

.products__small {
  .products__card-cost {
    font-size: 16px;
  }
}

.products__card-qty {
  position: relative;
  &::after {
    content: attr(data-isadded);
    position: absolute;
    font-size: 14px;
    font-weight: 600;
    color: rgb(79 199 77);
    top: -8px;
    right: -10px;
  }
}
</style>
