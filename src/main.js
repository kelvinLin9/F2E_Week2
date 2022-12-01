import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App)
const pinia = createPinia()
// sweetalert2
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

app.config.globalProperties.$moment = moment
app.use(VueSweetalert2, options)
app.use(pinia)
app.use(router)
app.mount('#app')
