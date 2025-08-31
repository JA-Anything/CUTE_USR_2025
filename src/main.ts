import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 匯入共用樣式表，透過 Vite 進行管理
import '@/assets/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
