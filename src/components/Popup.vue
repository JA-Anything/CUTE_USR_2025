<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef, watch, computed, h } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const emit = defineEmits<{ goBack: [pathPrefix: string] }>()

const MENU_PREFIXES = ['wild-bird', 'fuyang', 'cute', 'temple', 'dawo', 'lihe']
const pathPrefix = computed(() => route.path.split('/')[1] ?? '')
const hasParentMenu = computed(() => MENU_PREFIXES.includes(pathPrefix.value))

const currentComponent = shallowRef<Component | null>(null)
const isLoading = ref(false)
const loadError = ref<string | null>(null)

// 統一的 async component 工廠，帶錯誤處理
function asyncPage(loader: () => Promise<unknown>): Component {
  return defineAsyncComponent({
    loader: loader as () => Promise<Component>,
    errorComponent: {
      setup() {
        return () => h('div', { style: 'padding:2rem;color:#b91c1c;font-family:sans-serif' },
          '⚠️ 頁面載入失敗，請重新整理後再試。')
      },
    },
    onError(err) {
      console.error('[Popup] async component error:', err)
      loadError.value = err.message ?? String(err)
    },
  })
}

// 定義一個包含所有動態元件的對象，並使用前綴來區分單元
const componentMap: Record<string, Component> = {
  // 台北鳥會野鳥救傷中心
  WildBirdUrbanBirds: asyncPage(() => import('@/components/pages/WildBirdUrbanBirds.vue')),
  WildBirdQuiz:       asyncPage(() => import('@/components/pages/WildBirdQuiz.vue')),
  WildBirdCuteBirdDIY: asyncPage(() => import('@/components/pages/WildBirdCuteBirdDIY.vue')),
  WildBirdGuide:      asyncPage(() => import('@/components/pages/WildBirdGuide.vue')),

  // 富陽自然生態公園
  FuyangWetlandObservation: asyncPage(() => import('@/components/pages/FuyangWetlandObservation.vue')),
  FuyangCicadaRestArea:     asyncPage(() => import('@/components/pages/FuyangCicadaRestArea.vue')),
  FuyangEcologyWaterway:    asyncPage(() => import('@/components/pages/FuyangEcologyWaterway.vue')),

  // 中國科技大學
  CUTECommunityEcology: asyncPage(() => import('@/components/pages/CUTECommunityEcology.vue')),
  CUTEUpcomingEvents:   asyncPage(() => import('@/components/pages/CUTEUpcomingEvents.vue')),
  CUTEHistoricalEvents: asyncPage(() => import('@/components/pages/CUTEHistoricalEvents.vue')),

  // 石泉巖清水祖師廟
  TempleHistoricalSites: asyncPage(() => import('@/components/pages/TempleHistoricalSites.vue')),
  TempleCulturalTour:    asyncPage(() => import('@/components/pages/TempleCulturalTour.vue')),

  // 大我新舍
  DawoVeteransStories: asyncPage(() => import('@/components/pages/DawoVeteransStories.vue')),
  DawoTour:            asyncPage(() => import('@/components/pages/DawoTour.vue')),

  // 黎和生態公園
  LiheStory: asyncPage(() => import('@/components/pages/LiheStory.vue')),

  // 頁尾選單
  Privacy:    asyncPage(() => import('@/components/pages/Privacy.vue')),
  Terms:      asyncPage(() => import('@/components/pages/Terms.vue')),
  Disclaimer: asyncPage(() => import('@/components/pages/Disclaimer.vue')),
}

// 根據傳入的 componentName 載入對應的元件
watch(
  () => route.name,
  (newComponentName) => {
    if (newComponentName && typeof newComponentName === 'string' && componentMap[newComponentName]) {
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

const goBack = () => {
  emit('goBack', pathPrefix.value)
}
</script>

<template>
  <div class="popup-overlay" v-if="currentComponent" @click.self="closePopup">
    <div class="popup-content">
      <div class="popup-header">
        <button v-if="hasParentMenu" class="back-button" @click="goBack">‹ 回上層</button>
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
  box-sizing: border-box;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}

.back-button {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
  margin-left: auto;
}

.close-button:hover {
  color: #333;
}

.popup-body {
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
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
