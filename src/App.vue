<script setup lang="ts">
import { ref } from 'vue'
import Popup from './components/Popup.vue'

// 定義每個 popup 的資料
const popups = {
  wildBirdRescueCenter: {
    title: '台北鳥會野鳥救傷中心',
    text: '台北鳥會野鳥救傷中心是致力於救援受傷野鳥的機構。',
    image: 'https://placehold.co/400x250/2E8B57/FFFFFF?text=野鳥救傷中心',
  },
  FuyangEcoPark: {
    title: '富陽自然生態公園',
    text: '富陽自然生態公園是一個適合賞蝶、觀察昆蟲的城市綠洲。',
    image: 'https://placehold.co/400x250/4682B4/FFFFFF?text=富陽自然生態公園',
  },
  cute: {
    title: '中國科技大學',
    text: '中國科技大學是一所提供多元課程和活動的大學。',
    image: 'https://placehold.co/400x250/B8860B/FFFFFF?text=中國科技大學',
  },
  zuShiMiao: {
    title: '石泉巖清水祖師廟',
    text: '石泉巖清水祖師廟是當地著名的信仰中心。',
    image: 'https://placehold.co/400x250/A52A2A/FFFFFF?text=石泉巖清水祖師廟',
  },
  dawoXinShe: {
    title: '大我新舍',
    text: '大我新舍是中國科技大學學生的宿舍。',
    image: 'https://placehold.co/400x250/808080/FFFFFF?text=大我新舍',
  },
  liheEcoPark: {
    title: '黎和生態公園',
    text: '黎和生態公園是提供市民休閒遊憩的自然公園。',
    image: 'https://placehold.co/400x250/5F9EA0/FFFFFF?text=黎和生態公園',
  },
}

// 追蹤目前顯示的 popup 內容，初始為 null
const currentPopupData = ref(null)

const openPopup = (id: string) => {
  // 根據點擊的 id 取得對應的資料
  currentPopupData.value = popups[id]
}

const closePopup = () => {
  // 關閉 popup
  currentPopupData.value = null
}
</script>

<template>
  <header>
    <h1>中國科技大學通識中心</h1>
    <nav>
      <ul>
        <li><a href="#" @click.prevent="closePopup">首頁</a></li>
        <li>
          <a href="#wildBirdRescueCenter" @click.prevent="openPopup('wildBirdRescueCenter')"
            >台北鳥會野鳥救傷中心</a
          >
        </li>
        <li>
          <a href="#FuyangEcoPark" @click.prevent="openPopup('FuyangEcoPark')">富陽自然生態公園</a>
        </li>
        <li><a href="#cute" @click.prevent="openPopup('cute')">中國科技大學</a></li>
        <li><a href="#zuShiMiao" @click.prevent="openPopup('zuShiMiao')">石泉巖清水祖師廟</a></li>
        <li><a href="#dawoXinShe" @click.prevent="openPopup('dawoXinShe')">大我新舍</a></li>
        <li><a href="#liheEcoPark" @click.prevent="openPopup('liheEcoPark')">黎和生態公園</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- 這裡可以放您的頁面主要內容 -->
  </main>

  <footer>
    <p>Copyright&copy; 2024 中國科技大學通識中心</p>
    <nav>
      <ul>
        <li><a href="#">隱私權政策</a></li>
        <li><a href="#">使用者條款</a></li>
        <li><a href="#">免責聲明</a></li>
      </ul>
    </nav>
  </footer>

  <!-- 根據 currentPopupData 的值來顯示 Popup 組件 -->
  <Popup
    v-if="currentPopupData"
    :title="currentPopupData.title"
    :text="currentPopupData.text"
    :image="currentPopupData.image"
    @close="closePopup"
  />
</template>

<style scoped>
/* 這裡可以放 App.vue 的專屬樣式，例如 header 和 footer */
</style>
