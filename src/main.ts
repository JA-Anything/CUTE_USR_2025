import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 匯入 jQuery，這會讓 Vite 處理套件的打包
import $ from 'jquery'

// 匯入共用樣式表
import '@/assets/style.css'
// 匯入 popup.js
import '@/assets/popup.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 自動更新頁尾年份 (使用 jQuery)
$(document).ready(function () {
  $('#current-year').text(new Date().getFullYear())
})
