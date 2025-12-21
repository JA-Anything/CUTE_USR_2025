<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import type { MenuItem } from '@/types'

defineProps<{
  items: MenuItem[] // 將 any[] 改為 MenuItem[]
}>()

const emits = defineEmits(['menu-item-click'])

const expandedItems = ref<{ [key: string]: boolean }>({})

const NestedMenu = defineAsyncComponent(() => import('./NestedMenu.vue'))

const toggleExpand = (item: MenuItem) => {
  // 將 any 改為 MenuItem
  if (item.children) {
    expandedItems.value[item.id] = !expandedItems.value[item.id]
  } else {
    emits('menu-item-click', item)
  }
}
</script>

<template>
  <ul class="nested-menu-list">
    <li v-for="item in items" :key="item.id">
      <div class="menu-item-wrapper" :class="[{ 'menu-item-positioned': item.id?.startsWith('fuyang-') }, item.id ? `menu-item-${item.id}` : '']" @click.prevent="toggleExpand(item)">
        <a
          href="#"
          :class="{
            'menu-item-link': !item.children,
            'menu-parent-link': item.children,
            'menu-item-with-image': item.image,
            expanded: item.children && expandedItems[item.id],
          }"
        >
          <img v-if="item.image" :src="item.image" :alt="item.label" class="menu-item-image" />
          <span class="menu-item-text">{{ item.label }}</span>
          <span v-if="item.children" class="arrow-icon">{{ expandedItems[item.id] ? '&#x25B2;' : '&#x25BC;' }}</span>
        </a>
      </div>
      <ul v-if="item.children && expandedItems[item.id]" class="submenu-list">
        <NestedMenu :items="item.children" @menu-item-click="(childItem: MenuItem) => emits('menu-item-click', childItem)" />
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.nested-menu-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  position: relative; /* 讓子元素可以使用 absolute 定位 */
  min-height: 320px; /* 給予基礎高度讓 absolute 定位可以對位 */
}

/* 大螢幕時增加高度 */
@media (min-width: 768px) {
  .nested-menu-list {
    min-height: 560px;
  }
}

.nested-menu-list .nested-menu-list {
  padding-left: 20px;
  min-height: auto; /* 巢狀選單不需要固定高度 */
}

.menu-item-wrapper {
  margin-bottom: 0.5rem;
}

/* 有自訂位置的選單項目 */
.menu-item-positioned {
  position: absolute; /* 啟用 absolute 定位 */
  margin-bottom: 0; /* 移除 margin 避免影響定位 */
  z-index: 10;
}

.menu-item-link,
.menu-parent-link {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.menu-item-link:hover,
.menu-parent-link:hover {
  background-color: rgba(240, 240, 240, 0.8);
}

.menu-parent-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-icon {
  font-size: 0.8rem;
  color: #888;
  transition: transform 0.2s ease;
}

.menu-parent-link.expanded .arrow-icon {
  transform: rotate(360deg);
}

.submenu-list {
  list-style: none;
  padding-left: 20px;
  margin: 0.5rem 0 0 0;
}

/* 圖片+文字選單項目樣式 */
.menu-item-with-image {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding: 1rem !important;
  gap: 0.75rem;
}

.menu-item-image {
  width: 100%;
  max-width: 80px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.menu-item-with-image:hover .menu-item-image {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-item-text {
  text-align: center;
  font-weight: bold;
}

/* ========================================
   富陽選單項目個別位置調整
   ======================================== */

/* 濕地生態觀察區 - 左上角 */
.menu-item-fuyang-wetland {
  top: 5% !important;
  left: 0% !important;
}

/* 戀戀蟬聲休憩區 - 右上角 */
.menu-item-fuyang-cicada {
  top: 0% !important;
  right: 0% !important;
}

/* 生態水道區 - 底部中央 */
.menu-item-fuyang-waterway {
  bottom: 0% !important;
  right: 5% !important;
}

/* 大螢幕調整 (≥768px) */
@media (min-width: 768px) {
  .menu-item-fuyang-wetland {
    top: 18% !important;
    left: 8% !important;
  }

  .menu-item-fuyang-cicada {
    top: 5% !important;
    right: 5% !important;
  }

  .menu-item-fuyang-waterway {
    bottom: 12% !important;
    right: 18% !important;
  }
}

/* ========================================
   呼吸動畫效果
   ======================================== */

@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

/* 為富陽選單項目添加呼吸動畫 */
.menu-item-fuyang-wetland,
.menu-item-fuyang-cicada,
.menu-item-fuyang-waterway {
  animation: breathe 3s ease-in-out infinite;
}

/* 為每個項目設定不同的延遲，創造波浪效果 */
.menu-item-fuyang-wetland {
  animation-delay: 0s;
}

.menu-item-fuyang-cicada {
  animation-delay: 1s;
}

.menu-item-fuyang-waterway {
  animation-delay: 2s;
}

/* hover 時暫停動畫 */
.menu-item-fuyang-wetland:hover,
.menu-item-fuyang-cicada:hover,
.menu-item-fuyang-waterway:hover {
  animation-play-state: paused;
  transform: scale(1.1);
  opacity: 1;
}
</style>
