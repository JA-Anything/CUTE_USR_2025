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
      <div class="menu-item-wrapper" @click.prevent="toggleExpand(item)">
        <a
          href="#"
          :class="{
            'menu-item-link': !item.children,
            'menu-parent-link': item.children,
            expanded: item.children && expandedItems[item.id],
          }"
        >
          {{ item.label }}
          <span v-if="item.children" class="arrow-icon">{{
            expandedItems[item.id] ? '&#x25B2;' : '&#x25BC;'
          }}</span>
        </a>
      </div>
      <ul v-if="item.children && expandedItems[item.id]" class="submenu-list">
        <NestedMenu
          :items="item.children"
          @menu-item-click="(childItem: MenuItem) => emits('menu-item-click', childItem)"
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
