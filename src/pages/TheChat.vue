<script setup>
import { nextTick, onUnmounted, ref, reactive, computed, onMounted } from 'vue'
import { refDebounced } from '@vueuse/core'
import PostService from '@/API/PostService.vue'

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

const text1 = ref('')
const text2 = ref('')
const myNote = reactive({ text1: refDebounced(text1, 1000), text2: refDebounced(text2, 1000) })
const computedNote = computed(() => myNote.text1)

const COLS = 5
const ROWS = 20

const cells = reactive(
  Array.from(Array(COLS).keys()).map(() => Array.from(Array(ROWS).keys()).map(() => ''))
)
const cols = cells.map((_, i) => String.fromCharCode(65 + i))
console.log(cols)

const sortBy = ref('')
const options = [
  { name: 'по убыванию цены', value: 'DESC' },
  { name: 'по возрастанию цены', value: 'ASC' }
]
const sortOption = (option) => {
  sortBy.value = option
  console.log('сортируем по ' + sortBy.value)
}

const skill = ref({})

onMounted(async () => {
  const skillsMedia = await PostService.getSkillsWithMediaWP()
  const formData = JSON.stringify(options)

  const test = await PostService.testWP(formData)
  console.log(test)

  const res = skillsMedia[0].map((skill) => {
    const images = skillsMedia[1].filter((media) =>
      skill.podimages ? skill.podimages.some((podimg) => media.id == podimg.ID) : false
    )
    return { ...skill, images }
  })

  console.log(res)
  skill.value = res[0]
  console.log(skill.value)
})
</script>

<template>
  <div class="px-6">
    <div class="test"></div>

    <div>
      <h1>{{ skill.title?.rendered }}</h1>
      <div v-if="!Object.keys(skill).length" class="flex gap-4 flex-wrap">
        <div v-for="img in 3" :key="img" class="w-72 h-72 overflow-hidden bg-gray-100"></div>
      </div>
      <div v-else class="flex gap-4 flex-wrap">
        <div v-for="img in skill.images" :key="img.id" class="w-72 h-72 overflow-hidden">
          <picture>
            <source
              :srcset="`${img.media_details.sizes?.medium?.source_url || img.source_url} 1x, ${img.media_details.sizes?.large?.source_url || img.source_url} 2x, ${img.media_details?.sizes['1536x1536']?.source_url || img.source_url} 3x`"
              media="(max-width: 400px)"
            />
            <img
              class="w-full h-full object-cover"
              width="300px"
              height="300px"
              :srcset="`${img.media_details?.sizes['1536x1536']?.source_url || img.source_url} 2x`"
              :src="img.media_details.sizes?.large?.source_url || img.source_url"
              alt=""
            />
          </picture>
        </div>
      </div>
    </div>

    <u-dropdown name="сортировка" :options="options" @sortOption="sortOption" />

    <section class="mb-8">
      <input v-model="text1" type="text" />
      <input v-model="text2" type="text" />
      <pre>{{ myNote }}</pre>
      <u-button @click="myNote.text1 = 'comp'" color="green" :style="{ color: 'black' }"
        >green</u-button
      >
      <pre>{{ computedNote }}</pre>
    </section>
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
.test {
  width: 100px;
  height: var(--container-size);
  background-color: aquamarine;
}

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
