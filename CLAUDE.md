# CUTE USR 2025

臺北科技大學 USR 計畫的互動式教育網站，介紹台北在地生態與文化場域。

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`) + **TypeScript 5.8**
- **Vite 7** + **Vue Router 4.5** (lazy-loaded routes) + **Pinia 3**
- **Swiper 12** (圖片輪播) + **SCSS** (Sass)

## Dev Commands

```bash
npm run dev          # 開發伺服器 → http://localhost:5173
npm run build        # 型別檢查 + 生產建置
npm run preview      # 預覽生產建置 → http://localhost:4173
npm run lint         # ESLint auto-fix
npm run format       # Prettier format src/
npm run test:unit    # Vitest 單元測試
```

## Project Structure

```
src/
  components/
    pages/           # 22 個頁面元件（路由對應）
    MenuPopup.vue    # 導覽選單 Popup
    NestedMenu.vue   # 巢狀選單
    Popup.vue        # 通用 Popup
  router/index.ts    # 所有路由定義
  assets/
    images/          # 圖片資源（按主題分資料夾）
    scss/
      _variables.scss # 設計 token（顏色、z-index）
      _base.scss
      _main.scss
      _nav.scss
      style.scss      # 主入口
  stores/            # Pinia stores
  types/             # TypeScript 介面（MenuItem 等）
App.vue              # 根元件，含 headerMenu 導覽資料
```

## Routing（按主題分群）

| 群組 | 路徑前綴 | 頁面數 |
|------|----------|--------|
| 野鳥 (Wild Bird) | `/wild-bird/` | 4 |
| 富陽 (Fuyang) | `/fuyang/` | 3 |
| 北科大 (CUTE) | `/cute/` | 2 |
| 廟宇 (Temple) | `/temple/` | 2 |
| 大我社區 (Dawo) | `/dawo/` | 2 |
| 麗和 (Lihe) | `/lihe/` | 1 |

所有路由皆為動態匯入（code-splitting）。未知路徑 redirect → `/`。

## Content Architecture

**無 CMS**：內容直接嵌入各 `.vue` 頁面元件中。

典型頁面模式：
```ts
const images = [
  { url: '/images/xxx.jpg', alt: '...', caption: '...' },
  // ...
]
// 搭配 Swiper 元件渲染圖片輪播
```

導覽層級資料（headerMenu）定義在 `App.vue`，類型為 `src/types/` 中的 `MenuItem`。

## Styling Conventions

- `@ alias` = `src/`
- 顏色 token 在 `_variables.scss`：`$og1`(橘)、`$ye`(黃)、`$bk`(黑)、`$bg`(深灰背景 #242424)
- 暗色主題為主，`$bg: #242424`
- 各頁面元件使用 `<style scoped lang="scss">`

## Key Conventions

- 使用 `<script setup lang="ts">` (Composition API)
- 路由懶載入：`component: () => import('@/components/pages/Xxx.vue')`
- 圖片放 `public/` 或 `src/assets/images/`，依用途區分
- 設計稿與原始素材放 `_design/`、`_raw-materials/`（不進 build）
