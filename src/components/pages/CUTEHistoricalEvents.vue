<template>
  <div class="content-page">
    <h2>歷史活動 - 精彩回顧</h2>
    <p>這裡記錄了我們過往的精彩活動，一起來回顧這些美好的時光吧！</p>
    <ul class="news-list">
      <li v-for="news in historicalEvents" :key="news.id" class="news-item">
        <h3>{{ news.title }}</h3>
        <p class="news-date">{{ news.date }}</p>
        <p>{{ news.summary }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const historicalEvents = ref([
  {
    id: 1,
    title: '【導覽】石泉巖清水祖師廟文化巡禮',
    date: '2024-05-18',
    summary: '由文史專家帶領，深入了解石泉巖的建築藝術與歷史故事，感受在地信仰的獨特魅力。',
  },
  {
    id: 2,
    title: '【課程】城市野鳥觀察工作坊',
    date: '2024-06-03',
    summary: '教導學員如何在城市中觀察、辨識常見鳥類，透過望遠鏡與圖鑑，開啟一扇認識野鳥的新視窗。',
  },
  {
    id: 3,
    title: '【特展】大我新舍老兵故事展',
    date: '2024-07-20',
    summary: '透過珍貴的歷史照片與口述紀錄，重現大我新舍老兵們的生命故事，讓歷史不再遙遠。',
  },
])
</script>
>

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
