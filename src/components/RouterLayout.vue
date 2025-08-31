<template>
  <div class="router-layout">
    <!-- 這裡可以放共用的標題、導覽或樣式 -->
    <div class="page-content">
      <!-- 子路由的內容會在這裡顯示 -->
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
.router-layout {
  padding: 2rem;
}
</style>
