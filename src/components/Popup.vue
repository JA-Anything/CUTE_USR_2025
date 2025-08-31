<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef, watch } from 'vue'

const props = defineProps<{
  componentName: string | null
}>()

const emits = defineEmits(['close'])

const currentComponent = shallowRef(null)
const isLoading = ref(false)

// 根據傳入的 componentName 動態載入對應的元件
watch(
  () => props.componentName,
  (newComponentName) => {
    if (newComponentName) {
      isLoading.value = true
      // 使用 defineAsyncComponent 進行延遲載入
      // 確保路徑指向 src/components/pages/
      const asyncComponent = defineAsyncComponent(() =>
        import(`./pages/${newComponentName}.vue`).finally(() => {
          isLoading.value = false
        }),
      )
      currentComponent.value = asyncComponent
    } else {
      currentComponent.value = null
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
