import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 匯入 jQuery，Vite 處理套件的打包
import $ from 'jquery'

// 匯入共用樣式表，透過 Vite 進行管理
import '@/assets/scss/style.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 自動更新頁尾年份
$(document).ready(function () {
  $('#current-year').text(new Date().getFullYear())
})
