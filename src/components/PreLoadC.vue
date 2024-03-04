<script setup>
import { ref } from 'vue'

let loadArr = ref([])
for (let i = 0; i < 12; i++) {
  loadArr.value[i] = i
}
</script>

<template>
  <div class="mx-auto max-w-6xl p-6">
    <div class="flex flex-wrap gap-6 justify-center mt-32">
      <div v-for="count in loadArr" :key="count" class="w-56 h-56 bg-slate-100"></div>
    </div>
  </div>
</template>
