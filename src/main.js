import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/style.css' // kui on oma style.css fail

createApp(App).use(router).mount('#app')
