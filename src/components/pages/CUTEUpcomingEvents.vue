<template>
  <div class="content-page">
    <h2>最新消息 - 活動預告</h2>
    <p>以下是我們為您精心準備的活動預告，邀請您一起參與，探索在地生態與文化。</p>
    <ul class="news-list">
      <li v-for="news in upcomingEvents" :key="news.id" class="news-item">
        <h3>{{ news.title }}</h3>
        <p class="news-date">{{ news.date }}</p>
        <p>{{ news.summary }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const upcomingEvents = ref([
  {
    id: 1,
    title: '【講座】探索富陽：親子生態導覽',
    date: '2024-11-15',
    summary: '邀請親子一同參與富陽自然生態公園的導覽，由專業老師帶領，認識公園的動植物，學習如何愛護環境。',
  },
  {
    id: 2,
    title: '【工作坊】萌鳥DIY：動手做你的小鳥夥伴',
    date: '2024-11-23',
    summary: '透過簡單有趣的DIY活動，製作屬於自己的小鳥飾品，同時學習常見野鳥的特徵與習性。',
  },
  {
    id: 3,
    title: '【志工招募】野鳥救傷中心志工培訓',
    date: '2024-12-05',
    summary: '誠摯招募對野鳥救傷有熱情的志工夥伴，提供專業培訓課程，共同為野鳥保育盡一份心力。',
  },
])
</script>

<style scoped>
.content-page {
  text-align: left;
}
</style>
