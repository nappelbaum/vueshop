<script setup>
import store from '@/store'
import { computed, onMounted, reactive, watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Modal from '../components/ModalWindow.vue'

const formInputs = reactive({ email: '', name: '', lastname: '', pass: '' })
const router = useRouter()
const route = useRoute()

const open = ref(false)

const regWarning = computed(() => store.getters.regWarning)
const regMessage = computed(() => store.getters.regMessage)
const regErr = computed(() => store.getters.regErr)

const regUser = async (e) => {
  const formData = new FormData(e.target)
  formData.append('postName', 'regUser')
  await store.dispatch('regUser', formData)

  if (regMessage.value === 'success') {
    const url = `/signin?email=${formInputs.email}`
    Object.keys(formInputs).forEach((key) => (formInputs[key] = ''))

    open.value = true
    setTimeout(() => router.push(url), 3000)
  }
}

onMounted(() => {
  store.dispatch('clearRegMessage')
  document.title = route.meta.title
})

watch(formInputs, () => store.dispatch('clearRegMessage'))
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Зарегистрируйте учетную запись
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="regUser">
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
          <label for="name" class="block text-md font-medium leading-6 text-gray-900"
            >Your firstname</label
          >
          <div class="mt-2">
            <input
              v-model="formInputs.name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              :required="true"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label for="lastname" class="block text-md font-medium leading-6 text-gray-900"
            >Your lastname</label
          >
          <div class="mt-2">
            <input
              v-model="formInputs.lastname"
              id="lastname"
              name="lastname"
              type="text"
              autocomplete="lastname"
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

        <p class="text-red-600 text-lg font-bold">{{ regWarning }}</p>
        <p v-if="regErr" class="text-red-600 text-lg font-bold">
          Ошибка подключения к базе данных. Попробуйте перезагрузить страницу
        </p>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  </div>

  <Modal :open="open" />
</template>
