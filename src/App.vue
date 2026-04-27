<script setup lang="ts">
import { type Ref, watch, ref, onMounted, onUnmounted } from 'vue'
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
        hidden: true,
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
        name: 'CUTECommunityEcology',
        path: '/cute/community-ecology',
      },
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
const currentMenuId = ref<string>('')

const getVisibleMenuItems = (items: MenuItem[] = []): MenuItem[] =>
  items
    .filter((item) => !item.hidden)
    .map((item) => ({
      ...item,
      children: item.children ? getVisibleMenuItems(item.children) : undefined,
    }))

// 監聽路由變化，決定是否顯示 popup
watch(
  () => route.name,
  () => {
    // 每次路由變更都關閉 MenuPopup
    isMenuPopupVisible.value = false
    menuHistory.value = []
    menuItems.value = []
    currentMenuId.value = ''
  },
)

const openMenuPopup = (menuData: MenuItem[] | undefined, menuId: string = '') => {
  const visibleMenuData = getVisibleMenuItems(menuData)
  if (visibleMenuData.length > 0) {
    menuItems.value = visibleMenuData
    menuHistory.value = [visibleMenuData]
    currentMenuId.value = menuId
    isMenuPopupVisible.value = true
  }
}

const closeMenuPopup = () => {
  isMenuPopupVisible.value = false
  menuHistory.value = []
  menuItems.value = []
  currentMenuId.value = ''
}

// 路徑前綴對應 headerMenu 的 index
const menuPrefixMap: Record<string, number> = {
  'wild-bird': 0,
  'fuyang': 1,
  'cute': 2,
  'temple': 3,
  'dawo': 4,
  'lihe': 5,
}

const handlePopupGoBack = (pathPrefix: string) => {
  const idx = menuPrefixMap[pathPrefix]
  if (idx === undefined) { router.push('/'); return }
  const entry = headerMenu[idx]
  router.push('/').then(() => {
    openMenuPopup(entry.children, entry.id ?? '')
  })
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
    const visibleChildren = getVisibleMenuItems(item.children)
    if (visibleChildren.length === 0) return
    menuHistory.value.push(visibleChildren)
    menuItems.value = visibleChildren
  }
}

// ── Map UX refs ──────────────────────────────────────────────────────────
const mapWrapRef = ref<HTMLDivElement | null>(null)
const scrollZone = ref(0)          // 0 = 左, 1 = 中, 2 = 右
const showLeftArrow  = ref(false)
const showRightArrow = ref(true)
const hintDone = ref(false)        // 只做一次 hint 動畫

// 計算捲動區段 (0/1/2) 與顯示箭頭狀態
function updateScrollState() {
  const el = mapWrapRef.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  const pos = el.scrollLeft
  scrollZone.value = max <= 0 ? 1 : Math.min(2, Math.floor((pos / max) * 3))
  showLeftArrow.value  = pos > 8
  showRightArrow.value = pos < max - 8
}

// 點箭頭捲動
function scrollMap(delta: number) {
  const el = mapWrapRef.value
  if (!el) return
  el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' })
}

// 進站置中 + hint 微移動（只在手機尺寸執行）
function initMapScroll() {
  const el = mapWrapRef.value
  if (!el) return
  const navMap = el.querySelector('.nav-map') as HTMLElement | null
  if (!navMap) return

  const centerX = (navMap.offsetWidth - el.clientWidth) / 2
  el.scrollLeft = centerX
  updateScrollState()

  // 只在手機（有橫向捲動空間）才做 hint
  if (navMap.offsetWidth <= el.clientWidth || hintDone.value) return
  hintDone.value = true

  setTimeout(() => {
    el.scrollTo({ left: centerX - 100, behavior: 'smooth' })
    setTimeout(() => {
      el.scrollTo({ left: centerX, behavior: 'smooth' })
    }, 650)
  }, 500)
}

onMounted(() => {
  // 等待字型與圖片載入後才計算寬度
  window.addEventListener('load', initMapScroll)
  // 若 load 已觸發過（SPA 熱重載），立刻執行
  if (document.readyState === 'complete') initMapScroll()

  mapWrapRef.value?.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('load', initMapScroll)
  mapWrapRef.value?.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header>
    <h1><RouterLink to="/">翱．生態-共善六張犁</RouterLink></h1>

    <!-- 地圖容器：相對定位，讓箭頭可以疊在地圖兩側 -->
    <div class="map-container">

      <!-- 左箭頭（手機限定，捲到最左時隱藏） -->
      <button
        class="map-arrow map-arrow--left"
        :class="{ visible: showLeftArrow }"
        aria-label="向左捲動"
        @click="scrollMap(-280)"
      >‹</button>

      <div class="map-wrap" ref="mapWrapRef">
        <div class="nav-map">
          <nav>
            <ul>
              <li>
                <a href="#" class="nav-wild-bird top" @click.prevent="openMenuPopup(headerMenu[0].children)">台北鳥會野鳥救傷中心</a>
              </li>
              <li>
                <a href="#" class="nav-fuyang top" @click.prevent="openMenuPopup(headerMenu[1].children, headerMenu[1].id)">富陽自然生態公園</a>
              </li>
              <li>
                <a href="#" class="nav-cute top" @click.prevent="openMenuPopup(headerMenu[2].children)">中國科技大學</a>
              </li>
              <li>
                <a href="#" class="nav-temple bottom" @click.prevent="openMenuPopup(headerMenu[3].children)">石泉巖清水祖師廟</a>
              </li>
              <li>
                <a href="#" class="nav-dawo right" @click.prevent="openMenuPopup(headerMenu[4].children)">大我新舍</a>
              </li>
              <li>
                <a href="#" class="nav-lihe left" @click.prevent="openMenuPopup(headerMenu[5].children)">黎和生態公園</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- 右箭頭（手機限定，捲到最右時隱藏） -->
      <button
        class="map-arrow map-arrow--right"
        :class="{ visible: showRightArrow }"
        aria-label="向右捲動"
        @click="scrollMap(280)"
      >›</button>

      <!-- 底部進度點（手機限定） -->
      <div class="map-dots">
        <span class="map-dot" :class="{ active: scrollZone === 0 }" @click="scrollMap(-600)" />
        <span class="map-dot" :class="{ active: scrollZone === 1 }" @click="scrollMap(0)" />
        <span class="map-dot" :class="{ active: scrollZone === 2 }" @click="scrollMap(600)" />
      </div>

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
      Copyright&copy; &nbsp;2024 -
      <span id="current-year"></span>
      &nbsp;中國科技大學通識中心
    </p>
  </footer>

  <!-- 顯示 header 的多層級選單 popup -->
  <MenuPopup v-if="isMenuPopupVisible" :menuItems="menuItems" :menuId="currentMenuId" :has-history="menuHistory.length > 1" @close="closeMenuPopup" @menu-click="handleMenuClick" @go-back="goToPreviousMenu" />

  <!-- 顯示內容元件的 popup (Dialog) -->
  <Popup @go-back="handlePopupGoBack" />
</template>

<style scoped lang="scss">
/* ── Map container：包住 map-wrap + 箭頭 ── */
.map-container {
  position: relative;
  width: 100%;
  /* 把 dots 的空間留出來（只在手機顯示） */
  padding-bottom: 0;
  @media (max-width: 767px) {
    padding-bottom: 28px;
  }
}

/* ── 左右箭頭（預設隱藏，只在手機且有捲動空間時顯示） ── */
.map-arrow {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50% - 14px)); /* 微調：避開底部 dots */
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  font-size: 26px;
  line-height: 1;
  color: #328275;
  cursor: pointer;
  /* 預設透明，有 .visible 才出現 */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, background 0.2s ease;

  &:hover { background: rgba(255, 255, 255, 1); }

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }

  &--left  { left: 6px; }
  &--right { right: 6px; }

  /* 只在手機顯示 */
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* ── 底部進度點（只在手機顯示） ── */
.map-dots {
  display: none;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  gap: 8px;
  z-index: 10;

  @media (max-width: 767px) {
    display: flex;
  }
}

.map-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;

  &.active {
    background: rgba(50, 130, 117, 0.9);
    transform: scale(1.25);
  }
}
</style>
