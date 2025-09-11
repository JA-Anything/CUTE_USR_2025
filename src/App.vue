<script setup lang="ts">
import { type Ref, watch, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Popup from './components/Popup.vue'
import MenuPopup from './components/MenuPopup.vue'
import type { MenuItem } from '@/types'

const route = useRoute()
const router = useRouter()

// 定義選單和對應的路由路徑
const headerMenu: MenuItem[] = [
  {
    id: 'wild-bird',
    className: 'nav-wild-bird',
    label: '台北鳥會野鳥救傷中心',
    children: [
      {
        id: 'wild-bird-urban',
        label: '城市常見野鳥',
        name: 'WildBirdUrbanBirds',
        path: '/wild-bird/urban-birds',
      },
      {
        id: 'wild-bird-quiz',
        label: '野鳥知識大挑戰',
        name: 'WildBirdQuiz',
        path: '/wild-bird/quiz',
      },
      {
        id: 'wild-bird-diy',
        label: '萌鳥DIY',
        name: 'WildBirdCuteBirdDIY',
        path: '/wild-bird/cute-bird-diy',
      },
      {
        id: 'wild-bird-guide',
        label: '野鳥救傷初步指引',
        name: 'WildBirdGuide',
        path: '/wild-bird/guide',
      },
    ],
  },
  {
    id: 'fuyang-park',
    className: 'nav-fuyang',
    label: '富陽自然生態公園',
    children: [
      {
        id: 'fuyang-wetland',
        label: '濕地生態觀察區',
        name: 'FuyangWetlandObservation',
        path: '/fuyang/wetland-observation',
      },
      {
        id: 'fuyang-cicada',
        label: '戀戀蟬聲休憩區',
        name: 'FuyangCicadaRestArea',
        path: '/fuyang/cicada-rest-area',
      },
      {
        id: 'fuyang-waterway',
        label: '生態水道區',
        name: 'FuyangEcologyWaterway',
        path: '/fuyang/ecology-waterway',
      },
    ],
  },
  {
    id: 'cute',
    className: 'nav-cute',
    label: '中國科技大學',
    children: [
      {
        id: 'cute-community',
        label: '社區生態資源與生活',
        children: [
          {
            id: 'cute-upcoming',
            label: '活動預告',
            name: 'CUTEUpcomingEvents',
            path: '/cute/upcoming-events',
          },
          {
            id: 'cute-historical',
            label: '歷史活動',
            name: 'CUTEHistoricalEvents',
            path: '/cute/historical-events',
          },
        ],
      },
    ],
  },
  {
    id: 'temple',
    className: 'nav-temple',
    label: '石泉巖清水祖師廟',
    children: [
      {
        id: 'temple-sites',
        label: '歷史古蹟',
        name: 'TempleHistoricalSites',
        path: '/temple/historical-sites',
      },
      {
        id: 'temple-tour',
        label: '文化巡禮',
        name: 'TempleCulturalTour',
        path: '/temple/cultural-tour',
      },
    ],
  },
  {
    id: 'dawo',
    className: 'nav-dawo',
    label: '大我新舍',
    children: [
      {
        id: 'dawo-stories',
        label: '老兵的故事',
        name: 'DawoVeteransStories',
        path: '/dawo/veterans-stories',
      },
      { id: 'dawo-tour', label: '大我巡禮', name: 'DawoTour', path: '/dawo/tour' },
    ],
  },
  {
    id: 'lihe',
    className: 'nav-lihe',
    label: '黎和生態公園',
    children: [{ id: 'lihe-story', label: '黎和故事', name: 'LiheStory', path: '/lihe/story' }],
  },
]

// 定義 footer 選單
const footerMenu = [
  { id: 'privacy', label: '隱私權政策', name: 'Privacy', path: '/privacy' },
  { id: 'terms', label: '使用者條款', name: 'Terms', path: '/terms' },
  { id: 'disclaimer', label: '免責聲明', name: 'Disclaimer', path: '/disclaimer' },
]

const isMenuPopupVisible = ref(false)
const menuItems: Ref<MenuItem[]> = ref([])
const menuHistory: Ref<MenuItem[][]> = ref([])

// 監聽路由變化，決定是否顯示 popup
watch(
  () => route.name,
  () => {
    // 每次路由變更都關閉 MenuPopup
    isMenuPopupVisible.value = false
    menuHistory.value = []
    menuItems.value = []
  },
)

const openMenuPopup = (menuData: MenuItem[] | undefined) => {
  if (menuData) {
    menuItems.value = menuData
    menuHistory.value = [menuData]
    isMenuPopupVisible.value = true
  }
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

const handleMenuClick = (item: MenuItem) => {
  if (item.name) {
    router.push({ name: item.name }) // Navigate by name if it exists, fixing the type error.
    closeMenuPopup() // 導航後關閉選單
  } else if (item.children && item.children.length > 0) {
    menuHistory.value.push(item.children)
    menuItems.value = item.children
  }
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <header>
    <h1><RouterLink to="/">中國科技大學通識中心</RouterLink></h1>
    <div class="nav-map">
      <nav>
        <ul>
          <!-- Refactor to a v-for loop for maintainability -->
          <li v-for="item in headerMenu" :key="item.id">
            <a href="#" :class="item.className" @click.prevent="openMenuPopup(item.children)">{{
              item.label
            }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <nav>
      <ul>
        <!-- 使用 v-for 迴圈來動態產生 footer 選單，更具擴展性且安全 -->
        <li v-for="item in footerMenu" :key="item.id">
          <!-- 確保 item.path 存在才渲染 RouterLink -->
          <RouterLink v-if="item.path" :to="item.path">{{ item.label }}</RouterLink>
        </li>
      </ul>
    </nav>
    <p>
      Copyright&copy; 2024-<span>{{ currentYear }}</span> 中國科技大學通識中心
    </p>
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
  <Popup />
</template>

<style scoped lang="scss"></style>
