import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import UIComponents from './components/UI'
import VFocus from './directives/VFocus'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(UIComponents)
app.directive('focus', VFocus)

app.mount('#app')
