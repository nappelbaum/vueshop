<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps({
  name: String,
  options: Array
})

const event = defineEmits(['sortOption'])
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {{ name }}
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute left-0 z-10 mt-2 whitespace-nowrap origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="option in options" :key="option.name" v-slot="{ active }">
            <div
              @click="event('sortOption', option.value)"
              class="cursor-pointer"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-md'
              ]"
            >
              {{ option.name }}
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
