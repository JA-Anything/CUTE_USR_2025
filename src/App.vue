<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import Popup from './components/Popup.vue'
import MenuPopup from './components/MenuPopup.vue'

// 定義選單項目的型別
interface MenuItem {
  label: string
  name?: string
  path?: string
  children?: MenuItem[]
}

const route = useRoute()
const router = useRouter()

// 定義選單和對應的路由路徑
const headerMenu: MenuItem[] = [
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
const menuItems: Ref<MenuItem[]> = ref([])
const menuHistory: Ref<MenuItem[][]> = ref([])

// 監聽路由變化，決定是否顯示 popup
watch(
  () => route.name,
  (newName: string | symbol | null) => {
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
  if (item.path) {
    router.push({ name: item.name })
    closeMenuPopup() // 導航後關閉選單
  } else if (item.children && item.children.length > 0) {
    menuHistory.value.push(item.children)
    menuItems.value = item.children
  }
}
</script>

<template>
  <header>
    <h1><RouterLink to="/">中國科技大學通識中心</RouterLink></h1>
    <div class="nav-map">
      <nav>
        <ul>
          <li>
            <a href="#" class="nav-wild-bird" @click.prevent="openMenuPopup(headerMenu[0].children)"
              >台北鳥會野鳥救傷中心</a
            >
          </li>
          <li>
            <a href="#" class="nav-fuyang" @click.prevent="openMenuPopup(headerMenu[1].children)"
              >富陽自然生態公園</a
            >
          </li>
          <li>
            <a href="#" class="nav-cute" @click.prevent="openMenuPopup(headerMenu[2].children)"
              >中國科技大學</a
            >
          </li>
          <li>
            <a href="#" class="nav-temple" @click.prevent="openMenuPopup(headerMenu[3].children)"
              >石泉巖清水祖師廟</a
            >
          </li>
          <li>
            <a href="#" class="nav-dawo" @click.prevent="openMenuPopup(headerMenu[4].children)"
              >大我新舍</a
            >
          </li>
          <li>
            <a href="#" class="nav-lihe" @click.prevent="openMenuPopup(headerMenu[5].children)"
              >黎和生態公園</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- <main>
    <RouterView />
  </main> -->

  <footer>
    <nav>
      <ul>
        <li>
          <RouterLink class="footer-link-1" :to="footerMenu[0].path">隱私權政策</RouterLink>
        </li>
        <li>
          <RouterLink class="footer-link-2" :to="footerMenu[1].path">使用者條款</RouterLink>
        </li>
        <li>
          <RouterLink class="footer-link-3" :to="footerMenu[2].path">免責聲明</RouterLink>
        </li>
      </ul>
    </nav>
    <p>Copyright&copy; 2024-<span id="current-year"></span> 中國科技大學通識中心</p>
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
  <Popup :component-name="currentPopupComponent" />
</template>

<style scoped lang="scss"></style>
