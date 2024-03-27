<script setup>
import store from '@/store'
import { computed, onMounted, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const formInputs = reactive({ email: '', pass: '' })
const router = useRouter()
const route = useRoute()

const isAuth = computed(() => store.getters.isAuth)
const authWarning = computed(() => store.getters.authWarning)
const authErr = computed(() => store.getters.authErr)

const authUser = async (e) => {
  const formData = new FormData(e.target)
  formData.append('postName', 'authUser')
  await store.dispatch('authUser', formData)

  if (isAuth.value) {
    formInputs.email = ''
    formInputs.pass = ''
    router.replace('/user')
  }
}

onMounted(() => {
  store.dispatch('clearAuthWarning')
  formInputs.email = route.query?.email
  document.title = route.meta.title
})

watch(formInputs, () => store.dispatch('clearAuthWarning'))
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Войдите в вашу учетную запись
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="authUser">
        <div>
          <label for="email" class="block text-md font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="formInputs.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              :required="true"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="pass" class="block text-md font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-md">
              <span
                href=""
                class="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer select-none"
                >Forgot password?</span
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="formInputs.pass"
              id="pass"
              name="pass"
              type="password"
              autocomplete="current-password"
              :required="true"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
            />
          </div>
        </div>

        <p class="text-red-600 text-lg font-bold">{{ authWarning }}</p>
        <p v-if="authErr" class="text-red-600 text-lg font-bold">
          Ошибка подключения к базе данных. Попробуйте перезагрузить страницу
        </p>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Войти
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <router-link
          to="/signup"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Register</router-link
        >
      </p>
    </div>
  </div>
</template>
