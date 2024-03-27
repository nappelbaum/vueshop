<script setup>
import { nextTick, onUnmounted, ref } from 'vue'

const numberOfStars = ref(null)
const stars = [1, 2, 3, 4, 5]

const message = ref('')
const messages = ref([])
const wrapper_Scrollbottom = ref(null)

const socket = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/')

const getMessage = (e) => {
  console.log(e.data)
  messages.value = [...messages.value, e.data]
  autoScroll()
}

const sendMessage = () => {
  socket.send(message.value)
  messages.value = [...messages.value, message.value]
  autoScroll()
}

async function autoScroll() {
  await nextTick()
  wrapper_Scrollbottom.value.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  })
}

socket.addEventListener('message', getMessage)

const socketSend = () => {
  if (socket.readyState === WebSocket.OPEN) {
    sendMessage()
    return
  }

  socket.addEventListener(
    'open',
    () => {
      sendMessage()
    },
    { once: true }
  )
}

onUnmounted(() => {
  socket.removeEventListener('message', getMessage)
})
</script>

<template>
  <div class="px-6">
    <section class="mb-8">
      <h2 class="text-xl font-bold mb-2">Поставьте оценку</h2>
      <div class="flex gap-x-3 mb-2">
        <div v-for="(star, index) in stars" :key="star" class="relative w-6 h-6 star-wrapper">
          <input type="radio" :value="star" v-model="numberOfStars" />
          <transition name="stars">
            <div v-if="index + 1 > numberOfStars">
              <img src="/stars/star-gray.svg" alt="" />
            </div>
            <div v-else>
              <img src="/stars/star-gold.svg" alt="" />
            </div>
          </transition>
        </div>
      </div>
      <div>Оценка: {{ numberOfStars }}</div>
    </section>
    <section>
      <h2 class="text-xl font-bold">TheChat</h2>
      <br />
      <ul class="chat-window">
        <li v-for="m in messages" :key="m">
          {{ m }}
          <hr />
        </li>
        <li ref="wrapper_Scrollbottom" class="wrapper_Scrollbottom"></li>
      </ul>
      <br />
      <input type="text" v-model="message" />
      <br />
      <button @click="socketSend">SEND</button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.star-wrapper {
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
  }
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.stars-enter-active,
.stars-leave-active {
  transition: opacity 0.2s ease-out;
}

.stars-enter-from,
.stars-leave-to {
  opacity: 0;
}

.chat-window {
  width: 300px;
  height: 400px;
  overflow: auto;
  border: 1px solid #000;
  padding: 0 10px;
  padding-top: 10px;
}
.chat-window li {
  word-break: break-all;
}
.wrapper_Scrollbottom {
  padding-bottom: 10px;
}

input {
  border: 1px solid #000;
}
</style>
