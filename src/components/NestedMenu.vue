<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定義組件 props 和 emits
const props = defineProps<{
  items: any[]
}>()

const emits = defineEmits(['menu-item-click'])

// 使用 ref 來追蹤每個子選單的展開狀態
const expandedItems = ref<{ [key: string]: boolean }>({})

// 遞迴呼叫自身元件
const NestedMenu = defineAsyncComponent(() => import('./NestedMenu.vue'))

const toggleExpand = (item: any, index: number) => {
  if (item.children) {
    const itemId = item.label + index
    expandedItems.value[itemId] = !expandedItems.value[itemId]
  } else {
    // 點擊最底層的項目時，發出事件給父元件處理
    emits('menu-item-click', item)
  }
}
</script>

<template>
  <ul class="nested-menu-list">
    <li v-for="(item, index) in items" :key="index">
      <div class="menu-item-wrapper" @click.prevent="toggleExpand(item, index)">
        <a
          href="#"
          :class="{
            'menu-item-link': !item.children,
            'menu-parent-link': item.children,
            expanded: item.children && expandedItems[item.label + index],
          }"
        >
          {{ item.label }}
          <span v-if="item.children" class="arrow-icon">{{
            expandedItems[item.label + index] ? '&#x25B2;' : '&#x25BC;'
          }}</span>
        </a>
      </div>
      <ul v-if="item.children && expandedItems[item.label + index]" class="submenu-list">
        <!-- 這裡不再需要處理 handleChildClick，因為父元件會直接接收事件 -->
        <NestedMenu
          :items="item.children"
          @menu-item-click="(childItem) => emits('menu-item-click', childItem)"
        />
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.nested-menu-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.nested-menu-list .nested-menu-list {
  padding-left: 20px;
}

.menu-item-wrapper {
  margin-bottom: 0.5rem;
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
  background-color: #f0f0f0;
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
</style>
