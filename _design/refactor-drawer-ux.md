# UX 重構計畫：Popup → 右側 Drawer（方案 A）

## 目標

將目前的雙層 Popup 架構（MenuPopup + Popup）整合成單一右側滑入 Drawer，
解決多層模態視窗操作笨重的問題，同時保留大地圖的首頁視覺。

## 目前架構（Before）

```
使用者點擊地圖節點
    ↓
MenuPopup.vue（fixed overlay，顯示子選單卡片）
    ↓ 點擊子項目
router.push() 觸發路由變更
    ↓
Popup.vue（第二個 fixed overlay，watch route.name 顯示頁面元件）
```

問題：兩個獨立 fixed overlay 疊加、進出動線不直覺、無法自然「回上一頁」。

## 新架構（After）

```
使用者點擊地圖節點
    ↓
AppDrawer.vue（右側滑入面板，480px wide）
  ├─ [menu 模式] 顯示子選單卡片 / Fuyang 標本卡
  └─ [content 模式] 點擊子項目後，面板內直接換成頁面內容
         ↓ 點「← 返回」
     回到 [menu 模式]
         ↓ 點「✕」或點 overlay
     關閉 Drawer
```

---

## 狀態機

```
'closed'
   ↓  mapNode.click → drawerRef.openMenu(items, menuId)
'menu'
   ↓  leaf item click → router.push(item.path)
'content'     ← route.name watch 觸發
   ↓  goBack()
'menu'        ← 重新顯示上次的 menuItems
   ↓  close() 或 overlay click
'closed'      → router.push('/') 清除路由
```

---

## 需要修改的檔案

### 新建
| 檔案 | 說明 |
|------|------|
| `src/components/AppDrawer.vue` | 新的統一 Drawer 元件 |

### 刪除
| 檔案 | 原因 |
|------|------|
| `src/components/MenuPopup.vue` | 功能整合進 AppDrawer |
| `src/components/Popup.vue` | 功能整合進 AppDrawer |

### 修改
| 檔案 | 修改內容 |
|------|----------|
| `src/App.vue` | 替換 MenuPopup + Popup → AppDrawer；簡化狀態管理 |

### 不動
- `src/components/NestedMenu.vue`（在 AppDrawer 內繼續使用）
- `src/router/index.ts`（路由定義不變）
- `src/components/pages/*.vue`（所有頁面元件不動）

---

## Step 1：建立 AppDrawer.vue

完整的元件架構如下。**請直接依此實作。**

### Script

```typescript
<script setup lang="ts">
import { ref, shallowRef, watch, computed, onMounted, onUnmounted, defineAsyncComponent, h } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NestedMenu from './NestedMenu.vue'
import type { MenuItem } from '@/types'

// ── 富陽標本卡照片 ──────────────────────────────────────────────────────
import wetlandPhoto  from '@/assets/images/fuyang/wetland-observation/freshwater-mangrove.jpg'
import cicadaPhoto   from '@/assets/images/fuyang/cicada-rest-area/sour-creeper.jpg'
import waterwayPhoto from '@/assets/images/fuyang/ecology-waterway/alocasia-odora.jpg'

interface FuyangExtra { photo: string; subtitle: string }
const fuyangExtra: Record<string, FuyangExtra> = {
  'fuyang-wetland':  { photo: wetlandPhoto,  subtitle: '探索水域生態系' },
  'fuyang-cicada':   { photo: cicadaPhoto,   subtitle: '傾聽自然的樂章' },
  'fuyang-waterway': { photo: waterwayPhoto, subtitle: '溯溪觀察水生生物' },
}

// ── 頁面元件 map（從 Popup.vue 移過來）──────────────────────────────────
function asyncPage(loader: () => Promise<unknown>): Component {
  return defineAsyncComponent({
    loader: loader as () => Promise<Component>,
    errorComponent: {
      setup() {
        return () => h('div', { style: 'padding:2rem;color:#b91c1c' }, '⚠️ 頁面載入失敗，請重新整理後再試。')
      },
    },
    onError(err) { console.error('[AppDrawer] async component error:', err) },
  })
}

const componentMap: Record<string, Component> = {
  WildBirdUrbanBirds:       asyncPage(() => import('@/components/pages/WildBirdUrbanBirds.vue')),
  WildBirdQuiz:             asyncPage(() => import('@/components/pages/WildBirdQuiz.vue')),
  WildBirdCuteBirdDIY:      asyncPage(() => import('@/components/pages/WildBirdCuteBirdDIY.vue')),
  WildBirdGuide:            asyncPage(() => import('@/components/pages/WildBirdGuide.vue')),
  FuyangWetlandObservation: asyncPage(() => import('@/components/pages/FuyangWetlandObservation.vue')),
  FuyangCicadaRestArea:     asyncPage(() => import('@/components/pages/FuyangCicadaRestArea.vue')),
  FuyangEcologyWaterway:    asyncPage(() => import('@/components/pages/FuyangEcologyWaterway.vue')),
  CUTEUpcomingEvents:       asyncPage(() => import('@/components/pages/CUTEUpcomingEvents.vue')),
  CUTEHistoricalEvents:     asyncPage(() => import('@/components/pages/CUTEHistoricalEvents.vue')),
  TempleHistoricalSites:    asyncPage(() => import('@/components/pages/TempleHistoricalSites.vue')),
  TempleCulturalTour:       asyncPage(() => import('@/components/pages/TempleCulturalTour.vue')),
  DawoVeteransStories:      asyncPage(() => import('@/components/pages/DawoVeteransStories.vue')),
  DawoTour:                 asyncPage(() => import('@/components/pages/DawoTour.vue')),
  LiheStory:                asyncPage(() => import('@/components/pages/LiheStory.vue')),
  Privacy:                  asyncPage(() => import('@/components/pages/Privacy.vue')),
  Terms:                    asyncPage(() => import('@/components/pages/Terms.vue')),
  Disclaimer:               asyncPage(() => import('@/components/pages/Disclaimer.vue')),
}

// ── 狀態 ──────────────────────────────────────────────────────────────────
type DrawerMode = 'closed' | 'menu' | 'content'
const mode = ref<DrawerMode>('closed')
const menuItems = ref<MenuItem[]>([])
const menuId    = ref<string>('')
const menuTitle = ref<string>('')         // 上層選單名稱（用於 header 顯示）
const transitionDir = ref<'forward' | 'back'>('forward')
const currentContentComponent = shallowRef<Component | null>(null)

const route  = useRoute()
const router = useRouter()

// ── 路由監聽：route.name 變化 → 切換 content 模式 ──────────────────────
watch(
  () => route.name,
  (name) => {
    if (name && typeof name === 'string' && componentMap[name]) {
      currentContentComponent.value = componentMap[name]
      transitionDir.value = 'forward'
      mode.value = 'content'
    } else if (!name || name === 'Home') {
      // 回到首頁時關閉 Drawer
      if (mode.value !== 'closed') close(false) // false = 不再 push route（避免無限迴圈）
    }
  },
  { immediate: true }
)

// ── 公開 API：供 App.vue 呼叫 ────────────────────────────────────────────
function openMenu(items: MenuItem[], id: string = '', title: string = '') {
  menuItems.value = items
  menuId.value    = id
  menuTitle.value = title
  transitionDir.value = 'forward'
  mode.value = 'menu'
}

function close(pushRoute = true) {
  mode.value = 'closed'
  currentContentComponent.value = null
  if (pushRoute) router.push('/')
}

function goBack() {
  transitionDir.value = 'back'
  mode.value = 'menu'
  currentContentComponent.value = null
  // 路由也回到首頁（避免 content route 殘留）
  router.push('/')
}

function handleItemClick(item: MenuItem) {
  if (item.name) {
    router.push({ name: item.name })  // watch route.name 會自動切到 content 模式
  } else if (item.children) {
    // 子選單展開（NestedMenu 自己處理，這裡不需要額外邏輯）
  }
}

const canGoBack  = computed(() => mode.value === 'content')
const isOpen     = computed(() => mode.value !== 'closed')

// ── Escape 鍵關閉 ─────────────────────────────────────────────────────────
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

// ── body scroll lock ──────────────────────────────────────────────────────
watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

defineExpose({ openMenu })
</script>
```

### Template

```html
<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition name="drawer-overlay">
      <div
        v-if="isOpen"
        class="drawer-overlay"
        aria-hidden="true"
        @click="close()"
      />
    </Transition>

    <!-- Drawer Panel -->
    <div
      class="drawer"
      :class="{ 'drawer--open': isOpen }"
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="drawer-header">
        <button
          v-if="canGoBack"
          class="drawer-back"
          @click="goBack"
          aria-label="返回選單"
        >
          ← 返回
        </button>
        <span class="drawer-header__title">{{ menuTitle }}</span>
        <button class="drawer-close" @click="close()" aria-label="關閉">✕</button>
      </div>

      <!-- Body（Menu / Content 用 Transition 切換） -->
      <div class="drawer-body">
        <Transition :name="transitionDir === 'forward' ? 'slide-left' : 'slide-right'" mode="out-in">

          <!-- Menu 模式 -->
          <div v-if="mode === 'menu'" key="menu" class="drawer-menu">

            <!-- 富陽：標本式卡片（與 MenuPopup.vue 舊版相同邏輯） -->
            <template v-if="menuId === 'fuyang-park'">
              <h2 class="fuyang-drawer-title">富陽自然生態公園</h2>
              <div class="fuyang-cards">
                <button
                  v-for="item in menuItems"
                  :key="item.id"
                  class="fuyang-card"
                  @click="handleItemClick(item)"
                >
                  <div class="fuyang-card__photo-wrap">
                    <img :src="fuyangExtra[item.id]?.photo" :alt="item.label" class="fuyang-card__photo" />
                  </div>
                  <span class="fuyang-card__name">{{ item.label }}</span>
                  <span class="fuyang-card__subtitle">{{ fuyangExtra[item.id]?.subtitle }}</span>
                </button>
              </div>
            </template>

            <!-- 一般選單：NestedMenu -->
            <template v-else>
              <ul class="menu-list">
                <NestedMenu :items="menuItems" @menu-item-click="handleItemClick" />
              </ul>
            </template>
          </div>

          <!-- Content 模式 -->
          <div v-else-if="mode === 'content'" key="content" class="drawer-content">
            <component :is="currentContentComponent" />
          </div>

        </Transition>
      </div>
    </div>
  </Teleport>
</template>
```

### Style

```scss
<style scoped lang="scss">
/* ── Overlay ── */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 899;
  cursor: pointer;
}

.drawer-overlay-enter-active,
.drawer-overlay-leave-active { transition: opacity 0.3s ease; }
.drawer-overlay-enter-from,
.drawer-overlay-leave-to    { opacity: 0; }

/* ── Drawer Panel ── */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(480px, 100vw);
  height: 100dvh;
  background: #fff;
  z-index: 900;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 40px rgba(0, 0, 0, 0.22);
  transform: translateX(100%);
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.drawer--open {
  transform: translateX(0);
}

/* ── Drawer Header ── */
.drawer-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
  min-height: 56px;

  &__title {
    flex: 1;
    font-size: 0.95rem;
    color: #555;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.drawer-back {
  background: none;
  border: none;
  font-size: 0.9rem;
  color: #328275;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  white-space: nowrap;
  transition: background 0.18s;
  &:hover { background: #f0f8f6; }
}

.drawer-close {
  background: none;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  color: #aaa;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: auto;
  transition: color 0.18s;
  &:hover { color: #333; }
}

/* ── Drawer Body ── */
.drawer-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem 1.25rem;
  -webkit-overflow-scrolling: touch;
}

/* ── Slide transitions ── */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.22s ease;
}

.slide-left-enter-from  { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to    { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(40px); }

/* ── General menu list ── */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ── 富陽標本卡（與 MenuPopup.vue 一致，搬過來）── */
.fuyang-drawer-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c5f2d;
  margin: 0 0 1.25rem;
  letter-spacing: 0.05em;
}

.fuyang-cards {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.fuyang-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #1a3828 0%, #2c5f42 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  text-align: left;
  width: 100%;
  appearance: none;
  font-family: inherit;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(4px);
    background: linear-gradient(135deg, #1e4530 0%, #337050 100%);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &__photo-wrap {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.25);
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
    .fuyang-card:hover & { transform: scale(1.08); }
  }

  &__name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.03em;
    display: block;
  }

  &__subtitle {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.58);
    display: block;
    margin-top: 0.2rem;
  }
}
</style>
```

> **注意**：Fuyang 卡片在 drawer 裡改為垂直排列（3張堆疊）、橫向 row 佈局，
> 因為 480px 寬度放不下原本的 3欄橫排。調整後保留圖片＋文字的辨識度。

---

## Step 2：修改 App.vue

### 移除

```typescript
// 刪除這些 import
import Popup from './components/Popup.vue'
import MenuPopup from './components/MenuPopup.vue'

// 刪除這些 refs/state
const isMenuPopupVisible = ref(false)
const menuItems: Ref<MenuItem[]> = ref([])
const menuHistory: Ref<MenuItem[][]> = ref([])
const currentMenuId = ref<string>('')

// 刪除這些 functions
function openMenuPopup(...)  { ... }
function closeMenuPopup()    { ... }
function goToPreviousMenu()  { ... }
function handleMenuClick(...)  { ... }

// 刪除 route watch（Popup.vue 裡的那個也一起移除）
```

### 新增

```typescript
// 新增 import
import AppDrawer from './components/AppDrawer.vue'

// 新增 drawer ref
const drawerRef = ref<InstanceType<typeof AppDrawer> | null>(null)

// openMenuPopup 改為呼叫 drawer
const openMenuPopup = (menuData: MenuItem[] | undefined, menuId: string = '', title: string = '') => {
  if (menuData) {
    drawerRef.value?.openMenu(menuData, menuId, title)
  }
}
```

### Template 修改

```html
<!-- 舊：移除這兩行 -->
<MenuPopup v-if="isMenuPopupVisible" ... />
<Popup />

<!-- 新：改成這一行 -->
<AppDrawer ref="drawerRef" />
```

### 地圖節點 click handler 加入 title 參數

```html
<!-- 舊 -->
<a @click.prevent="openMenuPopup(headerMenu[0].children)">台北鳥會野鳥救傷中心</a>

<!-- 新（加入 title 讓 drawer header 顯示）-->
<a @click.prevent="openMenuPopup(headerMenu[0].children, '', '台北鳥會野鳥救傷中心')">台北鳥會野鳥救傷中心</a>
<a @click.prevent="openMenuPopup(headerMenu[1].children, headerMenu[1].id, '富陽自然生態公園')">富陽自然生態公園</a>
<!-- 其餘依此類推 -->
```

---

## Step 3：刪除舊元件

確認 AppDrawer 運作正常後：
```bash
rm src/components/MenuPopup.vue
rm src/components/Popup.vue
```

---

## 驗收清單

- [ ] 點擊地圖節點 → Drawer 從右側滑入，顯示子選單
- [ ] 點擊富陽 → Drawer 顯示 3 張標本式卡片（垂直排列）
- [ ] 點擊子項目 → Drawer 內容換成頁面內容（slide 動畫）
- [ ] 點「← 返回」→ 退回子選單（slide 反方向）
- [ ] 點「✕」或 Overlay → Drawer 關閉，路由回到 `/`
- [ ] 按 Escape 鍵 → 關閉 Drawer
- [ ] 手機（< 480px）→ Drawer 撐滿全螢幕寬度
- [ ] Drawer 開啟時 body 不可捲動
- [ ] 直接輸入 URL（如 `/wild-bird/urban-birds`）→ Drawer 自動開啟 content 模式
- [ ] `vite build` 無錯誤

---

## 注意事項

1. **`@/types` 中的 `MenuItem` interface**：確認 `image` 欄位是否還需要保留
   （目前 Fuyang 已改用 `fuyangExtra`，NestedMenu 也不再用 `item.image`，可以考慮從 type 移除）

2. **多層巢狀選單（如中科大）**：`NestedMenu.vue` 的 `toggleExpand` 邏輯
   在 drawer 內應正常運作，不需修改。

3. **Fuyang 卡片方向**：Drawer 內垂直排（column），與原本 MenuPopup 橫排（grid 3欄）不同，
   這是因應 480px 寬度的調整。

4. **`route.name` watch 的無限迴圈防護**：`close(false)` 參數讓 close 不再 push route，
   避免 watch → push('/') → watch('Home') → close() → push('/') 的循環。

5. **`height: 100dvh`**：iOS Safari 上用 `dvh` 而非 `vh` 才能避免底部 toolbar 遮擋。
