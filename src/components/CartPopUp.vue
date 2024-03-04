<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import setSelectOptions from '../hooks/SetSelect.vue'

const props = defineProps({
  popUpCartItem: Object
})

const { addToCart } = inject('cart')

const emit = defineEmits(['closePopUp'])

const selectedOptionsPop = ref([])
const drawerMain = ref(null)
const drawerBG = ref(null)

const closePopUpGap = () => {
  drawerMain.value.classList.add('animate-drawerTranslateBack')
  drawerBG.value.classList.add('animate-drawerOpacityBack')
  setTimeout(() => emit('closePopUp'), 500)
}

const btnDisabled = computed(() => {
  let disabled = true
  selectedOptionsPop.value.forEach((option) => {
    if (option.state.some((choice) => choice.active)) disabled = false
    else {
      disabled = true
      return
    }
  })
  return disabled
})

const addAndClose = () => {
  if (!btnDisabled.value) {
    addToCart(props.popUpCartItem, 1, selectedOptionsPop.value)
    closePopUpGap()
  }
}

onMounted(() => {
  selectedOptionsPop.value = setSelectOptions(props.popUpCartItem.options)
})
</script>

<template>
  <div
    ref="drawerBG"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 animate-drawerOpacity"
    @click="closePopUpGap"
  ></div>
  <div
    ref="drawerMain"
    class="flex-col justify-between bg-white w-full xs:w-96 h-full fixed right-0 top-0 z-20 p-8 animate-drawerTranslate transition-transform"
  >
    <div>
      <div class="flex items-center justify-center gap-5 mb-8" @click="closePopUpGap">
        <img
          class="opacity-40 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
          src="/arrow.svg"
          alt=""
        />
        <h2 class="text-2xl font-body font-bold">Выберите опции товара:</h2>
      </div>
      <div class="flex flex-col gap-y-3">
        <h2 class="text-xl font-body">{{ popUpCartItem.name }}</h2>
        <div v-for="(option, index) in popUpCartItem.options" :key="option.name">
          <h2 class="text-xl font-body mb-2">{{ option.name }}</h2>
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
                @change="() => (selectedOptionsPop[index].state[i].active = true)"
              />
              <div class="product__radio-inner"></div>
            </div>
            <label :for="choice.text">{{ choice.text }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 font-body">
      <button
        class="block text-center bg-lime-500 mt-3 w-full rounded-lg py-2 text-white font-semibold disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        @click="addAndClose"
        :disabled="btnDisabled"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
