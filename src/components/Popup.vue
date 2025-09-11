<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentComponent = shallowRef<Component | null>(null)
const isLoading = ref(false)

// 定義一個包含所有動態元件的對象，並使用前綴來區分單元
const componentMap: Record<string, Component> = {
  // 台北鳥會野鳥救傷中心
  WildBirdUrbanBirds: defineAsyncComponent(
    () => import('@/components/pages/WildBirdUrbanBirds.vue'),
  ),
  WildBirdQuiz: defineAsyncComponent(() => import('@/components/pages/WildBirdQuiz.vue')),
  WildBirdCuteBirdDIY: defineAsyncComponent(
    () => import('@/components/pages/WildBirdCuteBirdDIY.vue'),
  ),
  WildBirdGuide: defineAsyncComponent(() => import('@/components/pages/WildBirdGuide.vue')),

  // 富陽自然生態公園
  FuyangWetlandObservation: defineAsyncComponent(
    () => import('@/components/pages/FuyangWetlandObservation.vue'),
  ),
  FuyangCicadaRestArea: defineAsyncComponent(
    () => import('@/components/pages/FuyangCicadaRestArea.vue'),
  ),
  FuyangEcologyWaterway: defineAsyncComponent(
    () => import('@/components/pages/FuyangEcologyWaterway.vue'),
  ),

  // 中國科技大學
  CUTEUpcomingEvents: defineAsyncComponent(
    () => import('@/components/pages/CUTEUpcomingEvents.vue'),
  ),
  CUTEHistoricalEvents: defineAsyncComponent(
    () => import('@/components/pages/CUTEHistoricalEvents.vue'),
  ),

  // 石泉巖清水祖師廟
  TempleHistoricalSites: defineAsyncComponent(
    () => import('@/components/pages/TempleHistoricalSites.vue'),
  ),
  TempleCulturalTour: defineAsyncComponent(
    () => import('@/components/pages/TempleCulturalTour.vue'),
  ),

  // 大我新舍
  DawoVeteransStories: defineAsyncComponent(
    () => import('@/components/pages/DawoVeteransStories.vue'),
  ),
  DawoTour: defineAsyncComponent(() => import('@/components/pages/DawoTour.vue')),

  // 黎和生態公園
  LiheStory: defineAsyncComponent(() => import('@/components/pages/LiheStory.vue')),

  // 頁尾選單
  Privacy: defineAsyncComponent(() => import('@/components/pages/Privacy.vue')),
  Terms: defineAsyncComponent(() => import('@/components/pages/Terms.vue')),
  Disclaimer: defineAsyncComponent(() => import('@/components/pages/Disclaimer.vue')),
}

// 根據傳入的 componentName 載入對應的元件
watch(
  () => route.name,
  (newComponentName) => {
    if (
      newComponentName &&
      typeof newComponentName === 'string' &&
      componentMap[newComponentName]
    ) {
      isLoading.value = true
      currentComponent.value = componentMap[newComponentName]

      setTimeout(() => {
        isLoading.value = false
      }, 500)
    } else {
      currentComponent.value = null
      isLoading.value = false
    }
  },
  { immediate: true },
)

const closePopup = () => {
  router.push('/')
}
</script>

<template>
  <div class="popup-overlay" v-if="currentComponent" @click.self="closePopup">
    <div class="popup-content">
      <div class="popup-header">
        <button class="close-button" @click="closePopup">&times;</button>
      </div>
      <div class="popup-body">
        <div v-if="isLoading" class="loading-indicator">載入中...</div>
        <component v-else :is="currentComponent" />
      </div>
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
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.popup-content {
  background-color: #fff;
  border-radius: 12px;
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  max-height: 800px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s ease-out;
  overflow: hidden;
}

.popup-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
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

.popup-body {
  flex-grow: 1;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  overflow-y: auto;
}

.loading-indicator {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
