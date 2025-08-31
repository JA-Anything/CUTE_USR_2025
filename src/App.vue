<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import Popup from './components/Popup.vue'
import MenuPopup from './components/MenuPopup.vue'

const route = useRoute()
const router = useRouter()

// 定義選單和對應的路由路徑
const headerMenu = [
  {
    label: '台北鳥會野鳥救傷中心',
    children: [
      { label: '城市常見野鳥', name: 'WildBirdUrbanBirds', path: '/wild-bird/urban-birds' },
      { label: '野鳥知識大挑戰', name: 'WildBirdQuiz', path: '/wild-bird/quiz' },
      { label: '萌鳥DIY', name: 'WildBirdCuteBirdDIY', path: '/wild-bird/cute-bird-diy' },
      { label: '野鳥救傷初步指引', name: 'WildBirdGuide', path: '/wild-bird/guide' },
    ],
  },
  {
    label: '富陽自然生態公園',
    children: [
      {
        label: '濕地生態觀察區',
        name: 'FuyangWetlandObservation',
        path: '/fuyang/wetland-observation',
      },
      { label: '戀戀蟬聲休憩區', name: 'FuyangCicadaRestArea', path: '/fuyang/cicada-rest-area' },
      { label: '生態水道區', name: 'FuyangEcologyWaterway', path: '/fuyang/ecology-waterway' },
    ],
  },
  {
    label: '中國科技大學',
    children: [
      {
        label: '社區生態資源與生活',
        children: [
          { label: '活動預告', name: 'CUTEUpcomingEvents', path: '/cute/upcoming-events' },
          { label: '歷史活動', name: 'CUTEHistoricalEvents', path: '/cute/historical-events' },
        ],
      },
    ],
  },
  {
    label: '石泉巖清水祖師廟',
    children: [
      { label: '歷史古蹟', name: 'TempleHistoricalSites', path: '/temple/historical-sites' },
      { label: '文化巡禮', name: 'TempleCulturalTour', path: '/temple/cultural-tour' },
    ],
  },
  {
    label: '大我新舍',
    children: [
      { label: '老兵的故事', name: 'DawoVeteransStories', path: '/dawo/veterans-stories' },
      { label: '大我巡禮', name: 'DawoTour', path: '/dawo/tour' },
    ],
  },
  {
    label: '黎和生態公園',
    children: [{ label: '黎和故事', name: 'LiheStory', path: '/lihe/story' }],
  },
]

// 定義 footer 選單
const footerMenu = [
  { label: '隱私權政策', name: 'Privacy', path: '/privacy' },
  { label: '使用者條款', name: 'Terms', path: '/terms' },
  { label: '免責聲明', name: 'Disclaimer', path: '/disclaimer' },
]

// 追蹤目前顯示的 popup 內容，初始為 null
const currentPopupComponent = ref<string | null>(null)
const isMenuPopupVisible = ref(false)
const menuItems = ref([])
const menuHistory = ref<any[]>([])

// 監聽路由變化，決定是否顯示 popup
watch(
  () => route.name,
  (newName) => {
    // 檢查路由名稱是否應顯示在 popup 中 (所有非 'home' 的路由)
    if (newName && newName !== 'home') {
      currentPopupComponent.value = newName as string
    } else {
      currentPopupComponent.value = null
    }
    // 每次路由變更都關閉 MenuPopup
    isMenuPopupVisible.value = false
    menuHistory.value = []
    menuItems.value = []
  },
)

const openMenuPopup = (menuData: any[]) => {
  menuItems.value = menuData
  menuHistory.value = [menuData]
  isMenuPopupVisible.value = true
}

const closeMenuPopup = () => {
  isMenuPopupVisible.value = false
  menuHistory.value = []
  menuItems.value = []
}

const goToPreviousMenu = () => {
  if (menuHistory.value.length > 1) {
    menuHistory.value.pop()
    menuItems.value = menuHistory.value[menuHistory.value.length - 1]
  }
}

const handleMenuClick = (item: any) => {
  if (item.path) {
    router.push({ name: item.name })
  } else if (item.children && item.children.length > 0) {
    menuHistory.value.push(item.children)
    menuItems.value = item.children
  }
}
</script>

<template>
  <header>
    <h1><RouterLink to="/">中國科技大學通識中心</RouterLink></h1>
    <nav>
      <ul>
        <li v-for="(item, index) in headerMenu" :key="index">
          <RouterLink v-if="item.path" :to="item.path">{{ item.label }}</RouterLink>
          <a v-else href="#" @click.prevent="openMenuPopup(item.children)">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>Copyright&copy; 2024 中國科技大學通識中心</p>
    <nav>
      <ul>
        <li v-for="(item, index) in footerMenu" :key="index">
          <RouterLink :to="item.path">{{ item.label }}</RouterLink>
        </li>
      </ul>
    </nav>
  </footer>

  <MenuPopup
    v-if="isMenuPopupVisible"
    :menuItems="menuItems"
    :has-history="menuHistory.length > 1"
    @close="closeMenuPopup"
    @menu-click="handleMenuClick"
    @go-back="goToPreviousMenu"
  />

  <Popup :component-name="currentPopupComponent" />
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

header h1 a {
  color: #fff;
  text-decoration: none;
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
</style>
