<template>
  <div class="content-page">
    <h2>最新消息</h2>
    <ul class="news-list">
      <li v-for="news in newsItems" :key="news.id" class="news-item">
        <h3>{{ news.title }}</h3>
        <p class="news-date">{{ news.date }}</p>
        <p>{{ news.summary }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newsItems = ref([
  {
    id: 1,
    title: '【活動】富陽自然生態公園導覽活動',
    date: '2024-08-30',
    summary: '歡迎大家參加本週末的富陽生態公園導覽，由專業解說員帶領您認識公園的動植物生態。',
  },
  {
    id: 2,
    title: '【公告】中心網站改版，提供更佳使用者體驗',
    date: '2024-08-25',
    summary: '為了提供更好的服務，我們的官方網站已完成改版，介面更簡潔、功能更完善。',
  },
  {
    id: 3,
    title: '【課程】野鳥攝影入門工作坊，名額有限！',
    date: '2024-08-20',
    summary: '想學習如何捕捉鳥類美麗身影嗎？報名我們的攝影工作坊，專家將親自教學。',
  },
])
</script>

<style scoped>
.content-page {
  text-align: left;
}
.news-list {
  list-style: none;
  padding: 0;
}
.news-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.news-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
.news-item h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}
.news-date {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 0.5rem;
}
</style>
