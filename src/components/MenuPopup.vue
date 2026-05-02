<script setup lang="ts">
import NestedMenu from './NestedMenu.vue'
import type { MenuItem } from '@/types'

// 富陽標本式選單用的自然照片
import wetlandPhoto  from '@/assets/images/fuyang/wetland-observation/freshwater-mangrove.jpg'
import cicadaPhoto   from '@/assets/images/fuyang/cicada-rest-area/sour-creeper.jpg'
import waterwayPhoto from '@/assets/images/fuyang/ecology-waterway/alocasia-odora.jpg'

// 野鳥選單照片
import birdUrbanPhoto from '@/assets/images/wild-bird/urban-birds/bird-01.jpg'
import birdDiyPhoto   from '@/assets/images/wild-bird/diy/diy-baitouweng.jpg'
import birdGuidePhoto from '@/assets/images/wild-bird/urban-birds/bird-05.jpg'

// 中科大選單照片
import cuteEcologyPhoto  from '@/assets/images/cute/community-ecology/husan/photo-01.jpg'
import cuteUpcomingPhoto from '@/assets/images/cute/upcoming-events/poster-01.jpg'
import cuteHistoryPhoto  from '@/assets/images/cute/history-events/2024/poster-01.jpg'

const props = defineProps<{
  menuItems: MenuItem[]
  hasHistory: boolean
  menuId?: string
}>()

const emits = defineEmits(['close', 'menu-click', 'go-back'])

const closePopup = () => emits('close')

const handleMenuClick = (item: MenuItem) => emits('menu-click', item)

const goBack = () => emits('go-back')

// 選單卡片補充資料（照片 + 副標題）
interface CardExtra { photo: string; subtitle: string }

const fuyangExtra: Record<string, CardExtra> = {
  'fuyang-wetland':  { photo: wetlandPhoto,  subtitle: '探索水域生態系' },
  'fuyang-cicada':   { photo: cicadaPhoto,   subtitle: '傾聽自然的樂章' },
  'fuyang-waterway': { photo: waterwayPhoto, subtitle: '溯溪觀察水生生物' },
}

const wildBirdExtra: Record<string, CardExtra> = {
  'wild-bird-urban': { photo: birdUrbanPhoto, subtitle: '認識台北街頭的鳥鄰居' },
  'wild-bird-diy':   { photo: birdDiyPhoto,   subtitle: '動手做專屬的鳥寶貝' },
  'wild-bird-guide': { photo: birdGuidePhoto, subtitle: '遇到受傷野鳥怎麼辦？' },
}

const cuteExtra: Record<string, CardExtra> = {
  'cute-community': { photo: cuteEcologyPhoto,  subtitle: '看見社區裡的自然力量' },
  'cute-upcoming':  { photo: cuteUpcomingPhoto, subtitle: '即將到來的生態活動' },
  'cute-historical':{ photo: cuteHistoryPhoto,  subtitle: '回顧我們走過的足跡' },
}
</script>

<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="menu-popup-content" :class="{ 'fuyang-menu': props.menuId === 'fuyang-park', 'wild-bird-menu': props.menuId === 'wild-bird', 'cute-menu': props.menuId === 'cute' }">
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

      <!-- ── 野鳥：藍色大卡片 ── -->
      <template v-else-if="props.menuId === 'wild-bird'">
        <h2 class="bird-title">台北鳥會野鳥救傷中心</h2>
        <div class="bird-cards">
          <button
            v-for="item in menuItems"
            :key="item.id"
            class="bird-card"
            @click="handleMenuClick(item)"
          >
            <div class="bird-card__photo-wrap">
              <img
                :src="wildBirdExtra[item.id]?.photo"
                :alt="item.label"
                class="bird-card__photo"
              />
            </div>
            <span class="bird-card__name">{{ item.label }}</span>
            <span class="bird-card__subtitle">{{ wildBirdExtra[item.id]?.subtitle }}</span>
          </button>
        </div>
      </template>

      <!-- ── 中科大：暖棕色大卡片 ── -->
      <template v-else-if="props.menuId === 'cute'">
        <h2 class="cute-title">中國科技大學</h2>
        <div class="cute-cards">
          <button
            v-for="item in menuItems"
            :key="item.id"
            class="cute-card"
            @click="handleMenuClick(item)"
          >
            <div class="cute-card__photo-wrap">
              <img
                :src="cuteExtra[item.id]?.photo"
                :alt="item.label"
                class="cute-card__photo"
              />
            </div>
            <span class="cute-card__name">{{ item.label }}</span>
            <span class="cute-card__subtitle">{{ cuteExtra[item.id]?.subtitle }}</span>
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

/* ── Fuyang 選單：粉綠背景 ── */
.fuyang-menu {
  background: linear-gradient(160deg, #eaf5ee 0%, #d4ebdd 100%);
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
  border-bottom-color: rgba(44, 95, 66, 0.15);
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
  color: rgba(26, 56, 40, 0.5);
  &:hover { color: #1a3828; }
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
  color: #1a3828;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1.75rem;
  letter-spacing: 0.06em;
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
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(44, 95, 66, 0.15);
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
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 14px 36px rgba(26, 56, 40, 0.15);
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
  border: 3px solid rgba(44, 95, 66, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

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
  color: #1a3828;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

.fuyang-card__subtitle {
  font-size: 0.82rem;
  color: rgba(26, 56, 40, 0.6);
  letter-spacing: 0.03em;

  @media (max-width: 600px) {
    display: none;
  }
}

/* ═══════════════════════════════════════════════
   野鳥選單（粉藍主題）
   ═══════════════════════════════════════════════ */
.wild-bird-menu {
  background: linear-gradient(160deg, #e8f2fc 0%, #d0e4f5 100%);
  max-width: 860px;

  .popup-header {
    border-bottom-color: rgba(26, 74, 110, 0.15);
  }

  .close-button {
    color: rgba(13, 42, 62, 0.5);
    &:hover { color: #0d2a3e; }
  }
}

.bird-title {
  text-align: center;
  color: #0d2a3e;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1.75rem;
  letter-spacing: 0.06em;
}

.bird-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.bird-card {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(26, 74, 110, 0.15);
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
  appearance: none;
  -webkit-appearance: none;
  font-family: inherit;
  text-align: center;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 14px 36px rgba(13, 42, 62, 0.15);
  }

  &:active { transform: translateY(-2px); }

  @media (max-width: 600px) {
    flex-direction: row;
    padding: 1rem 1.25rem;
    gap: 1.25rem;
    text-align: left;

    &:hover { transform: translateX(4px); }
  }
}

.bird-card__photo-wrap {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(26, 74, 110, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
}

.bird-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;

  .bird-card:hover & { transform: scale(1.08); }
}

.bird-card__name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0d2a3e;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

.bird-card__subtitle {
  font-size: 0.82rem;
  color: rgba(13, 42, 62, 0.6);
  letter-spacing: 0.03em;

  @media (max-width: 600px) { display: none; }
}

/* ═══════════════════════════════════════════════
   中科大選單（暖棕色主題）
   ═══════════════════════════════════════════════ */
.cute-menu {
  background: linear-gradient(160deg, #faf2e8 0%, #f0ddc8 100%);
  max-width: 860px;

  .popup-header {
    border-bottom-color: rgba(92, 51, 23, 0.15);
  }

  .close-button {
    color: rgba(46, 26, 14, 0.5);
    &:hover { color: #2e1a0e; }
  }
}

.cute-title {
  text-align: center;
  color: #2e1a0e;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1.75rem;
  letter-spacing: 0.06em;
}

.cute-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.cute-card {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(92, 51, 23, 0.15);
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
  appearance: none;
  -webkit-appearance: none;
  font-family: inherit;
  text-align: center;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 14px 36px rgba(46, 26, 14, 0.15);
  }

  &:active { transform: translateY(-2px); }

  @media (max-width: 600px) {
    flex-direction: row;
    padding: 1rem 1.25rem;
    gap: 1.25rem;
    text-align: left;

    &:hover { transform: translateX(4px); }
  }
}

.cute-card__photo-wrap {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(92, 51, 23, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
}

.cute-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;

  .cute-card:hover & { transform: scale(1.08); }
}

.cute-card__name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2e1a0e;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

.cute-card__subtitle {
  font-size: 0.82rem;
  color: rgba(46, 26, 14, 0.6);
  letter-spacing: 0.03em;

  @media (max-width: 600px) { display: none; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.93); }
  to   { opacity: 1; transform: scale(1); }
}
</style>
