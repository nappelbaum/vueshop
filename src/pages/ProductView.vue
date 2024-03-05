<script setup>
import { onMounted, ref, inject, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostService from '../API/PostService.vue'
import resetSelectOptions from '../hooks/ResetSelect.vue'
import store from '@/store'

const route = useRoute()
const router = useRouter()
const id = route.params.id.split('-').pop().slice(1)
const product = ref({})
const productOptionsLength = ref(0)
const selectedOptions = ref([])
const needToChangeSelect = ref(true)
const itemErr = ref('')

const { cart, addToCart, changeCart } = inject('cart')

const cartItemsSameId = computed(() => {
  return cart.filter((item) => item.id === product.value.id)
})

const fetchProduct = async () => {
  const data = await PostService.getItem(id)
  if (typeof data === 'object') product.value = data
  else itemErr.value = data
}

const changeSelectOptions = () => {
  if (needToChangeSelect.value) {
    selectedOptions.value.forEach((option, index) => {
      option.state.forEach((choice, i) => {
        choice.active =
          cartItemsSameId.value[cartItemsSameId.value.length - 1].selectedOptions[index].state[
            i
          ].active
      })
    })
  }
  needToChangeSelect.value = true
}

const changeSelectOption = (index, i) => {
  selectedOptions.value[index].state.forEach((state, ind) => {
    state.active = ind === i ? true : false
  })
}

const btnDisabled = computed(() => {
  let disabled = true
  selectedOptions.value?.forEach((option) => {
    if (option.state.some((choice) => choice.active)) disabled = false
    else {
      disabled = true
      return
    }
  })
  if (!productOptionsLength.value) disabled = false
  return disabled
})

const addOrChangeCart = (e) => {
  const btn = e.currentTarget
  btn.classList.add('product__add-anim')
  btn.disabled = true
  setTimeout(() => {
    btn.classList.remove('product__add-anim')
    btn.disabled = false
  }, 1200)

  const findedIndexInCart = cart.findIndex(
    (cartItem) =>
      cartItem.id === product.value.id &&
      JSON.stringify(cartItem.selectedOptions) === JSON.stringify(selectedOptions.value)
  )

  if (findedIndexInCart >= 0) changeCart(findedIndexInCart, cart[findedIndexInCart].isAdded + 1)
  else if (!btnDisabled.value) addToCart(product.value, 1, selectedOptions.value)

  needToChangeSelect.value = false
}

watch(cart, () => {
  cartItemsSameId.value.length
    ? changeSelectOptions()
    : (selectedOptions.value = resetSelectOptions(product.value.options))
})

onMounted(async () => {
  if (store.getters.allProducts.length) {
    product.value = store.getters.allProducts.find((item) => item.id === +id)
  } else await fetchProduct()

  document.title = product.value.seoTitle
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', product.value.seoDescription)

  productOptionsLength.value = product.value.options?.length
  if (productOptionsLength.value) {
    selectedOptions.value = resetSelectOptions(product.value.options)
    cartItemsSameId.value.length && changeSelectOptions()
  }
})
</script>

<template>
  <section v-if="Object.keys(product).length" class="my-8 font-body">
    <div class="mx-auto max-w-6xl py-6 px-8">
      <div class="product__wrapper">
        <div class="product__img">
          <img :src="product.hdThumbnailUrl" :alt="product.name" />
        </div>
        <div class="product__content">
          <h1 class="text-2xl font-body font-bold" style="text-align: start">
            {{ product.name }}
          </h1>
          <div class="product__cost">{{ product.defaultDisplayedPriceFormatted }}</div>
          <div v-if="productOptionsLength" class="product__options">
            <div v-for="(option, index) in product.options" :key="option.name">
              <h2>{{ option.name }}</h2>
              <div
                v-for="(choice, i) in option.choices"
                :key="choice.text"
                class="flex gap-x-2 items-center mb-2"
              >
                <div class="product__radio">
                  <input
                    type="radio"
                    :id="choice.text"
                    name="choice"
                    :checked="selectedOptions[index]?.state[i].active"
                    @change="changeSelectOption(index, i)"
                  />
                  <div class="product__radio-inner"></div>
                </div>
                <label :for="choice.text">{{ choice.text }}</label>
              </div>
            </div>
          </div>
          <div class="product__btns">
            <div v-if="cartItemsSameId.length">
              <div class="product__cart-info">
                Товаров в корзине:
                {{ cartItemsSameId.reduce((acc, item) => acc + item.isAdded, 0) }}
              </div>
              <button class="product__add" @click="addOrChangeCart">
                <span class="product__add-caption">Добавить еще</span>
                <span class="product__check">
                  <img src="/check-mark.svg" alt="" />
                </span>
              </button>
            </div>
            <button
              v-if="cartItemsSameId.length"
              class="product__cart"
              @click="router.push({ name: 'MainCart' })"
            >
              <span>Корзина</span>
            </button>
            <button
              v-else
              class="product__cart"
              @click="
                () => {
                  if (!btnDisabled) addToCart(product, 1, selectedOptions)
                }
              "
            >
              <span>В корзину</span>
            </button>
          </div>
          <div class="product__description">
            <h2 class="font-bold">Информация о товаре</h2>
            <p class="product__description--p" v-html="product.description"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <div v-if="itemErr" class="mx-auto max-w-6xl py-6 px-8">
      <h2 class="text-center text-xl font-bold">
        Ошибка загрузки! Товара не существует! {{ itemErr }}
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/main';

.product__wrapper {
  display: grid;
  grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  column-gap: clamp(20px, 4vw, 60px);

  @media (max-width: 880px) {
    grid-template: repeat(1, 1fr) / repeat(1, 1fr);
    row-gap: clamp(20px, 4vw, 60px);
  }

  .product__img {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .product__content {
    > * {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .product__cost {
      @include adaptiv-font(26, 20);
    }

    .product__options {
      h2 {
        font-weight: 600;
        margin-bottom: 6px;
      }

      .product__radio {
        position: relative;
        width: 18px;
        height: 18px;

        input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          cursor: pointer;
        }

        input:checked + .product__radio-inner::after {
          border: solid 6px #1e7ec8;
          animation-name: radio-shadow;
          animation-duration: 0.2s;
          animation-fill-mode: forwards;
        }

        .product__radio-inner {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;

          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: solid 1px #9290a5;
            border-radius: 50%;
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: solid 0px #1e7ec8;
            border-radius: 50%;
            transition: border 0.2s ease-out;
          }
        }
      }
    }

    .product__btns {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      .product__cart-info {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .product__cart,
      .product__add {
        max-width: 50%;
        font-family: 'Montserrat', sans-serif;
        @include adaptiv-font(18, 16);
        font-weight: 600;
        padding: 9px 40px;
        border-radius: 4px;
        color: #fff;
        background-color: #333;
        cursor: pointer;
        transition: opacity 0.3s;

        @media (max-width: 1024px) {
          max-width: 100%;
        }

        &:hover {
          opacity: 0.8;
        }
      }

      .product__add {
        position: relative;
        color: #000;
        border: 1px solid #333;
        background-color: transparent;

        .product__add-caption {
          opacity: 1;
        }

        .product__check {
          position: absolute;
          top: calc(50% - 11px);
          left: calc(50% - 13px);
          opacity: 0;
          visibility: hidden;
          transform: rotateY(90deg);
        }
      }

      .product__add-anim {
        background-color: #e9e9e9;
        .product__add-caption {
          opacity: 0;
        }

        .product__check {
          opacity: 1;
          visibility: visible;
          animation: line-check 0.9s forwards;
        }
      }
    }

    .product__description {
      padding-top: 8px;
      h2 {
        margin-bottom: 8px;
      }
      p {
        line-height: 1.6;
      }
    }
  }
}

@keyframes radio-shadow {
  0% {
    box-shadow: none;
  }
  99% {
    box-shadow: 0 0 25px 0 #585858;
  }
  100% {
    box-shadow: none;
  }
}

@keyframes line-check {
  25% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}
</style>
