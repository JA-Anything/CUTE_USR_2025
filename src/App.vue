<script setup lang="ts">
import { ref } from 'vue'
import Popup from './components/Popup.vue'
import MenuPopup from './components/MenuPopup.vue'

// 定義選單和對應的元件名稱
const headerMenu = [
  {
    label: '台北鳥會野鳥救傷中心',
    children: [
      { label: '城市常見野鳥', component: 'UrbanBirds' },
      { label: '野鳥知識大挑戰', component: 'BirdQuiz' },
      { label: '萌鳥DIY', component: 'CuteBirdDIY' },
      { label: '野鳥救傷初步指引', component: 'RescueGuide' },
    ],
  },
  {
    label: '富陽自然生態公園',
    children: [
      { label: '濕地生態觀察區', component: 'WetlandObservation' },
      { label: '戀戀蟬聲休憩區', component: 'CicadaRestArea' },
      { label: '生態水道區', component: 'EcologyWaterway' },
    ],
  },
  {
    label: '中國科技大學',
    children: [
      {
        label: '社區生態資源與生活',
        children: [
          { label: '活動預告', component: 'UpcomingEvents' },
          { label: '歷史活動', component: 'HistoricalEvents' },
        ],
      },
    ],
  },
  {
    label: '石泉巖清水祖師廟',
    children: [
      { label: '歷史古蹟', component: 'HistoricalSites' },
      { label: '文化巡禮', component: 'CulturalTour' },
    ],
  },
  {
    label: '大我新舍',
    children: [
      { label: '老兵的故事', component: 'VeteransStories' },
      { label: '大我巡禮', component: 'DawoTour' },
    ],
  },
  {
    label: '黎和生態公園',
    children: [{ label: '黎和故事', component: 'LiheStory' }],
  },
]

// 定義 footer 選單
const footerMenu = [
  { label: '隱私權政策', component: 'Privacy' },
  { label: '使用者條款', component: 'Terms' },
  { label: '免責聲明', component: 'Disclaimer' },
]

// 追蹤目前顯示的 popup 內容，初始為 null
const currentPopupComponent = ref<string | null>(null)
const isMenuPopupVisible = ref(false)
const menuItems = ref([])
const menuHistory = ref<any[]>([])

const openContentPopup = (componentName: string) => {
  currentPopupComponent.value = componentName
  closeMenuPopup()
}

const closeContentPopup = () => {
  currentPopupComponent.value = null
}

const openMenuPopup = (menuData: any) => {
  menuItems.value = menuData
  menuHistory.value = [menuData]
  isMenuPopupVisible.value = true
}

const closeMenuPopup = () => {
  isMenuPopupVisible.value = false
  menuHistory.value = []
}

const goToPreviousMenu = () => {
  if (menuHistory.value.length > 1) {
    menuHistory.value.pop()
    menuItems.value = menuHistory.value[menuHistory.value.length - 1]
  }
}

const handleMenuClick = (item: any) => {
  if (item.component) {
    // 如果有 component 屬性，表示這是最底層，打開內容 popup
    openContentPopup(item.component)
  } else if (item.children && item.children.length > 0) {
    // 如果有 children 屬性且不是空陣列，表示還有下一層，更新選單
    menuHistory.value.push(item.children)
    menuItems.value = item.children
  }
}
</script>

<template>
  <header>
    <h1>中國科技大學通識中心</h1>
    <nav>
      <ul>
        <li v-for="(item, index) in headerMenu" :key="index">
          <a v-if="item.component" href="#" @click.prevent="openContentPopup(item.component)">{{
            item.label
          }}</a>
          <a v-else href="#" @click.prevent="openMenuPopup(item.children)">{{ item.label }}</a>
        </li>
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
        <li v-for="(item, index) in footerMenu" :key="index">
          <a href="#" @click.prevent="openContentPopup(item.component)">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </footer>

  <!-- 顯示 header 的多層級選單 popup -->
  <MenuPopup
    v-if="isMenuPopupVisible"
    :menuItems="menuItems"
    :has-history="menuHistory.length > 1"
    @close="closeMenuPopup"
    @menu-click="handleMenuClick"
    @go-back="goToPreviousMenu"
  />

  <!-- 顯示內容元件的 popup (Dialog) -->
  <Popup :component-name="currentPopupComponent" @close="closeContentPopup" />
</template>

<style scoped>
/* 這裡可以放 App.vue 的專屬樣式，例如 header 和 footer */
header {
  background-color: #333;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
}

header nav ul,
footer nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1.5rem;
}

header nav a,
footer nav a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

header nav a:hover,
footer nav a:hover {
  color: #f0f0f0;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1rem 2rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

footer p {
  margin: 0;
}

footer nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

footer nav li a {
  color: #fff;
  text-decoration: none;
}

/* popup樣式 */
#popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

#popup-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
