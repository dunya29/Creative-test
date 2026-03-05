
import 'simplebar-vue/dist/simplebar.min.css'
import './assets/scss/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as Slicksort } from 'vue-slicksort';

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Slicksort);

app.mount('#app')
