<script setup>
defineProps({
  selectText: String
})

const select = defineModel('select')
</script>

<template>
  <select
    v-model="select"
    class="font-body px-2 py-1.5 sm:py-1 outline-none border rounded-md text-base font-normal bg-transparent shop__select"
  >
    <option value>{{ selectText }}</option>
    <option value="PRICE_ASC">Сначала дешевые</option>
    <option value="PRICE_DESC">Сначала дорогие</option>
  </select>
</template>
