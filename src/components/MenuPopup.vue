<script setup lang="ts">
import NestedMenu from './NestedMenu.vue'
import type { MenuItem } from '@/types'

const props = defineProps<{
  menuItems: MenuItem[] // 將 any[] 改為 MenuItem[]
  hasHistory: boolean
  menuId?: string // 用來識別是哪個選單
}>()

const emits = defineEmits(['close', 'menu-click', 'go-back'])

const closePopup = () => {
  emits('close')
}

// 這個函式會接收到來自 NestedMenu 的點擊事件
const handleMenuClick = (item: MenuItem) => {
  // 將 any 改為 MenuItem
  emits('menu-click', item)
}

const goBack = () => {
  emits('go-back')
}
</script>

<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="menu-popup-content" :class="{ 'fuyang-menu': props.menuId === 'fuyang-park' }">
      <div class="popup-header">
        <button v-if="props.hasHistory" class="back-button" @click="goBack">&lt; 回上一頁</button>
        <button class="close-button" @click="closePopup">&times;</button>
      </div>
      <ul class="menu-list">
        <NestedMenu :items="menuItems" @menu-item-click="handleMenuClick" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
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
  padding: 1rem;
  box-sizing: border-box;
}

.menu-popup-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.popup-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.back-button {
  background: none;
  border: none;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

/* 富陽選單的 menu-list 需要有高度才能讓 absolute 定位的子元素正確對位 */
.fuyang-menu .menu-list {
  position: relative;
  min-height: 320px; /* 基礎高度 */
  height: 100%; /* 填滿父容器 */
}

@media (min-width: 768px) {
  .fuyang-menu .menu-list {
    min-height: 560px; /* 大螢幕時增加高度 */
  }
}

.menu-list li {
  margin-bottom: 1rem;
  cursor: pointer;
}

.menu-list li:last-child {
  margin-bottom: 0;
}

.menu-item-link {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.menu-item-link:hover {
  background-color: #f0f0f0;
}

.menu-parent-link {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.menu-parent-link::after {
  content: '>';
  font-weight: normal;
  color: #888;
}

.menu-parent-link:hover {
  background-color: #f0f0f0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 富陽自然生態公園選單特殊樣式 */
.fuyang-menu {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('@/assets/images/fuyang.png');
  background-size: 95%;
  background-position: center 70%;
  background-repeat: no-repeat;
}

/* 為富陽選單添加半透明遮罩以提高文字可讀性 */
.fuyang-menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  z-index: 0;
}

/* 確保內容在遮罩之上 */
.fuyang-menu .popup-header,
.fuyang-menu .menu-list {
  position: relative;
  z-index: 1;
}
</style>
