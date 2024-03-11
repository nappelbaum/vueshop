<template>
  <header class="bg-white font-body shadow">
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between py-6 px-8 lg:px-12"
      aria-label="Global"
    >
      <MainCart class="lg:hidden" />
      <div class="flex lg:flex-1">
        <router-link to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <div class="text-2xl font-bold text-gray-700">Магазин</div>
        </router-link>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 outline-none"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <a
          href="tel:+7 (495) 123-45-67"
          class="text-lg font-normal leading-6 text-gray-900"
          :class="searchOpen && 'hidden'"
          >+7 (495) 123-45-67</a
        >
        <a
          href="mailto:email@example.com"
          class="text-lg font-normal leading-6 text-gray-900"
          :class="searchOpen && 'hidden'"
          >email@example.com</a
        >

        <Popover class="relative">
          <PopoverButton
            class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none"
          >
            <svg
              :class="isAuth && 'auth-active'"
              xmlns="http://www.w3.org/2000/svg"
              fill="#374151"
              height="20px"
              viewBox="0 0 448 512"
            >
              <path
                d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
              />
              <linearGradient
                id="paint0_linear"
                x1="200"
                y1="0"
                x2="200"
                y2="500"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#89F09C" />
                <stop offset="1" stop-color="#3CC755" />
              </linearGradient>
            </svg>
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-80 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5"
            >
              <div class="p-4">
                <div
                  class="group flex items-center gap-x-6 rounded-lg p-3 text-md leading-6 hover:bg-gray-50"
                >
                  <router-link
                    :to="!isAuth ? '/signin' : '/user'"
                    class="block w-full font-semibold text-gray-900"
                  >
                    <PopoverButton v-if="!isAuth" class="w-full text-start"> Вход </PopoverButton>
                    <PopoverButton v-else class="w-full text-start"> Личный кабинет </PopoverButton>
                  </router-link>
                </div>

                <div
                  v-if="!isAuth"
                  class="group flex items-center gap-x-6 rounded-lg p-3 text-md leading-6 hover:bg-gray-50"
                >
                  <router-link to="/signup" class="block w-full font-semibold text-gray-900">
                    <PopoverButton class="w-full text-start"> Регистрация </PopoverButton>
                  </router-link>
                </div>

                <div
                  v-if="isAuth"
                  class="group flex items-center gap-x-6 rounded-lg p-3 text-md leading-6 hover:bg-gray-50"
                >
                  <div class="block w-full font-semibold text-gray-900">
                    <PopoverButton class="w-full text-start" @click="logOut"> Выход </PopoverButton>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-7">
        <MainCart />
      </div>
    </nav>

    <!-- mobile -->
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-end">
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700 outline-none"
            @click="closeMobMenu"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="py-6 text-lg font-body text-gray-900">
              <a
                href="tel:+7 (495) 123-45-67"
                class="block font-normal leading-6 mb-7"
                :class="searchOpen && 'hidden'"
                >+7 (495) 123-45-67</a
              >
              <a
                href="mailto:email@example.com"
                class="block font-normal leading-6 mb-7"
                :class="searchOpen && 'hidden'"
                >email@example.com</a
              >

              <div class="flex flex-col">
                <div class="font-semibold mb-7">
                  <router-link to="/user" @click="mobileMenuOpen = false" class="py-2">
                    {{ !isAuth ? 'Вход' : 'Личный кабинет' }}
                  </router-link>
                </div>
                <div v-if="!isAuth" class="font-semibold mb-7">
                  <router-link to="/signup" @click="mobileMenuOpen = false" class="py-2">
                    Регистрация
                  </router-link>
                </div>
                <div v-if="isAuth" class="inline-block font-semibold mb-7">
                  <span
                    @click="
                      () => {
                        mobileMenuOpen = false
                        logOut()
                      }
                    "
                    class="py-2"
                    >Выход</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import MainCart from './header/MainCart.vue'
import store from '@/store'

const searchOpen = ref(false)
const mobileMenuOpen = ref(false)

const closeMobMenu = () => {
  mobileMenuOpen.value = false
}

const isAuth = computed(() => store.getters.isAuth)

const logOut = async () => {
  const formData = new FormData()
  formData.append('postName', 'logOut')
  await store.dispatch('logOut', formData)
}
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  > div {
    color: rgb(13 46 145);
  }
}

.auth-active {
  fill: url(#paint0_linear);
}
</style>
