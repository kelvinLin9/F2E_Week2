import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import moment from 'moment'


const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$moment = moment
app.use(pinia)
app.use(router)
app.mount('#app')
