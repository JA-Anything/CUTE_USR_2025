<script setup lang="ts">
import NestedMenu from './NestedMenu.vue'
import type { MenuItem } from '@/types'

// 富陽標本式選單用的自然照片
import wetlandPhoto  from '@/assets/images/fuyang/wetland-observation/freshwater-mangrove.jpg'
import cicadaPhoto   from '@/assets/images/fuyang/cicada-rest-area/sour-creeper.jpg'
import waterwayPhoto from '@/assets/images/fuyang/ecology-waterway/alocasia-odora.jpg'

const props = defineProps<{
  menuItems: MenuItem[]
  hasHistory: boolean
  menuId?: string
}>()

const emits = defineEmits(['close', 'menu-click', 'go-back'])

const closePopup = () => emits('close')

const handleMenuClick = (item: MenuItem) => emits('menu-click', item)

const goBack = () => emits('go-back')

// 富陽三個區域的補充資料（照片 + 副標題）
interface FuyangExtra { photo: string; subtitle: string }

const fuyangExtra: Record<string, FuyangExtra> = {
  'fuyang-wetland':  { photo: wetlandPhoto,  subtitle: '探索水域生態系' },
  'fuyang-cicada':   { photo: cicadaPhoto,   subtitle: '傾聽自然的樂章' },
  'fuyang-waterway': { photo: waterwayPhoto, subtitle: '溯溪觀察水生生物' },
}
</script>

<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="menu-popup-content" :class="{ 'fuyang-menu': props.menuId === 'fuyang-park' }">
      <div class="popup-header">
        <button v-if="props.hasHistory" class="back-button" @click="goBack">&lt; 回上一頁</button>
        <button class="close-button" @click="closePopup">&times;</button>
      </div>

      <!-- ── 富陽：標本式大卡片 ── -->
      <template v-if="props.menuId === 'fuyang-park'">
        <h2 class="fuyang-title">富陽自然生態公園</h2>
        <div class="fuyang-cards">
          <button
            v-for="item in menuItems"
            :key="item.id"
            class="fuyang-card"
            @click="handleMenuClick(item)"
          >
            <div class="fuyang-card__photo-wrap">
              <img
                :src="fuyangExtra[item.id]?.photo"
                :alt="item.label"
                class="fuyang-card__photo"
              />
            </div>
            <span class="fuyang-card__name">{{ item.label }}</span>
            <span class="fuyang-card__subtitle">{{ fuyangExtra[item.id]?.subtitle }}</span>
          </button>
        </div>
      </template>

      <!-- ── 其餘選單：一般巢狀清單 ── -->
      <template v-else>
        <ul class="menu-list">
          <NestedMenu :items="menuItems" @menu-item-click="handleMenuClick" />
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
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
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: fadeIn 0.28s ease-out;
}

/* ── Fuyang 選單：深綠色背景 ── */
.fuyang-menu {
  background: linear-gradient(160deg, #1a3828 0%, #2c5f42 100%);
  max-width: 860px;
}

/* ── Header ── */
.popup-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.fuyang-menu .popup-header {
  border-bottom-color: rgba(255, 255, 255, 0.15);
}

.back-button {
  background: none;
  border: none;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
  &:hover { color: #333; }
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
  &:hover { color: #333; }
}

.fuyang-menu .close-button {
  color: rgba(255, 255, 255, 0.65);
  &:hover { color: #fff; }
}

/* ── 一般選單 list ── */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

/* ── 富陽標題 ── */
.fuyang-title {
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1.75rem;
  letter-spacing: 0.06em;
  opacity: 0.9;
}

/* ── 富陽卡片容器 ── */
.fuyang-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* ── 富陽單張卡片 ── */
.fuyang-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  padding: 1.75rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  transition:
    transform 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease;

  /* reset button styles */
  appearance: none;
  -webkit-appearance: none;
  font-family: inherit;
  text-align: center;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
  }

  &:active {
    transform: translateY(-2px);
  }

  /* 手機：橫排 */
  @media (max-width: 600px) {
    flex-direction: row;
    padding: 1rem 1.25rem;
    gap: 1.25rem;
    text-align: left;

    &:hover { transform: translateX(4px); }
  }
}

/* ── 圓形照片區 ── */
.fuyang-card__photo-wrap {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
}

.fuyang-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;

  .fuyang-card:hover & {
    transform: scale(1.08);
  }
}

/* ── 文字 ── */
.fuyang-card__name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

.fuyang-card__subtitle {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.03em;

  @media (max-width: 600px) {
    display: none;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.93); }
  to   { opacity: 1; transform: scale(1); }
}
</style>
