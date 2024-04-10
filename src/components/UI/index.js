import USelect from './USelect.vue'
import UButton from './UButton.vue'
import UDropdown from './UDropdown.vue'

const components = [
  { name: 'USelect', component: USelect },
  { name: 'UButton', component: UButton },
  { name: 'UDropdown', component: UDropdown }
]

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  }
}
