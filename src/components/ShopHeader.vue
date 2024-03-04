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
            <div class="py-6">
              <a
                href="tel:+7 (495) 123-45-67"
                class="block font-body text-lg font-normal leading-6 text-gray-900 mb-7"
                :class="searchOpen && 'hidden'"
                >+7 (495) 123-45-67</a
              >
              <a
                href="mailto:email@example.com"
                class="block font-body text-lg font-normal leading-6 text-gray-900"
                :class="searchOpen && 'hidden'"
                >email@example.com</a
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import MainCart from './header/MainCart.vue'

const searchOpen = ref(false)
const mobileMenuOpen = ref(false)

const closeMobMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  > div {
    color: rgb(13 46 145);
  }
}
</style>
