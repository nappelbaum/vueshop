<script setup>
import store from '@/store'
import { computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isAuth = computed(() => store.getters.isAuth)
const user = computed(() => store.getters.user)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  document.title = route.meta.title
})

watch(isAuth, () => {
  if (!isAuth.value) router.push('/')
})
</script>

<template>
  <div v-if="isAuth" class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Личный кабинет пользователя
    </h2>
    <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Привет, {{ user.name }} {{ user.lastname }}
    </h2>
  </div>
</template>
