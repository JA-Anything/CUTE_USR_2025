<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef, watch } from 'vue'

const props = defineProps<{
  componentName: string | null
}>()

const emits = defineEmits(['close'])

const currentComponent = shallowRef(null)
const isLoading = ref(false)

// 定義一個包含所有動態元件的對象
const componentMap = {
  Vision: defineAsyncComponent(() => import('@/components/pages/Vision.vue')),
  News: defineAsyncComponent(() => import('@/components/pages/News.vue')),
  Fuyang: defineAsyncComponent(() => import('@/components/pages/Fuyang.vue')),
  Lihe: defineAsyncComponent(() => import('@/components/pages/Lihe.vue')),
  WildBird: defineAsyncComponent(() => import('@/components/pages/WildBird.vue')),
  Dawo: defineAsyncComponent(() => import('@/components/pages/Dawo.vue')),
  Culture: defineAsyncComponent(() => import('@/components/pages/Culture.vue')),
  Privacy: defineAsyncComponent(() => import('@/components/pages/Privacy.vue')),
  Terms: defineAsyncComponent(() => import('@/components/pages/Terms.vue')),
  Disclaimer: defineAsyncComponent(() => import('@/components/pages/Disclaimer.vue')),
}

// 根據傳入的 componentName 載入對應的元件
watch(
  () => props.componentName,
  (newComponentName) => {
    if (newComponentName && componentMap[newComponentName]) {
      isLoading.value = true
      // 直接將非同步元件定義賦值給 shallowRef
      // Vue 會在渲染時自動處理非同步載入
      currentComponent.value = componentMap[newComponentName]
      // 由於 Vue 會自動處理載入，我們需要一個方式來知道它何時完成
      // 但對於 `<component :is="...">`，Vue 會自動管理 loading 狀態。
      // 所以我們先假設載入會成功，並在短時間後關閉 loading 狀態。
      // 這種方式不是最理想的，但能解決當前問題。
      setTimeout(() => {
        isLoading.value = false
      }, 500) // 設定一個短暫的延遲來模擬載入
    } else {
      currentComponent.value = null
      isLoading.value = false
    }
  },
  { immediate: true },
)

const closePopup = () => {
  emits('close')
}
</script>

<template>
  <div class="popup-overlay" v-if="componentName" @click.self="closePopup">
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
