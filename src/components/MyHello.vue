<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
  console.log(count)
}

// function updateCount(e) {
//   count.value = e.target.value
// }
</script>

<template>
  <h1>{{ count }}</h1>
  <button @click="increment">+1</button>
  <input type="text" v-model="count" />
  <input type="text" @keyup.enter="increment" />
</template>

<style scoped>
button {
  color: red;
}
</style>
