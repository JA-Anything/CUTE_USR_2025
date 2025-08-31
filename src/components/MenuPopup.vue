<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  menuItems: any[]
  hasHistory: boolean
}>()

const emits = defineEmits(['close', 'menu-click', 'go-back'])

const closePopup = () => {
  emits('close')
}

const handleMenuClick = (item: any) => {
  emits('menu-click', item)
}

const goBack = () => {
  emits('go-back')
}
</script>

<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="menu-popup-content">
      <div class="popup-header">
        <button v-if="hasHistory" class="back-button" @click="goBack">&larr; 回上一頁</button>
        <button class="close-button" @click="closePopup">&times;</button>
      </div>
      <ul class="menu-list">
        <li v-for="(item, index) in menuItems" :key="index" @click.prevent="handleMenuClick(item)">
          <a
            href="#"
            :class="{ 'menu-item-link': !item.children, 'menu-parent-link': item.children }"
          >
            {{ item.label }}
          </a>
        </li>
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
}

.menu-popup-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.popup-header {
  display: flex;
  justify-content: space-between;
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
</style>
