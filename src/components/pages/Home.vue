<template>
  <div class="home-page">

    <!-- 引導提示 -->
    <div class="home-hint">
      <span class="home-hint__text">點選任一主題，開始探索</span>
      <span class="home-hint__arrow">↓</span>
    </div>

    <!-- 六大主題卡片 -->
    <div class="home-grid">
      <button
        v-for="(s, i) in sections"
        :key="s.id"
        class="section-card"
        :style="{ animationDelay: `${i * 90}ms` }"
        @click="openMenuById(s.id)"
      >
        <div class="section-card__top" :style="{ background: `linear-gradient(160deg, ${s.bgFrom} 0%, ${s.bgTo} 100%)` }">
          <span class="section-card__emoji">{{ s.emoji }}</span>
          <h3 class="section-card__label">{{ s.label }}</h3>
        </div>
        <div class="section-card__body" :style="{ backgroundColor: s.accent }">
          <p class="section-card__desc">{{ s.description }}</p>
          <span class="section-card__cta" :style="{ color: s.bgFrom }">探索 →</span>
        </div>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const openMenuById = inject<(id: string) => void>('openMenuById', () => {})

const sections = [
  {
    id: 'wild-bird',
    label: '台北鳥會野鳥救傷中心',
    emoji: '🦅',
    description: '認識台北城市常見野鳥、萌鳥DIY手作，以及發現受傷野鳥時的初步處置指引。',
    bgFrom: '#0d2a3e',
    bgTo: '#1a4a6e',
    accent: '#e8f2fc',
  },
  {
    id: 'fuyang-park',
    label: '富陽自然生態公園',
    emoji: '🌿',
    description: '探索濕地生態觀察區、戀戀蟬聲休憩區與生態水道，走進六張犁的自然珍寶。',
    bgFrom: '#1a3828',
    bgTo: '#2c5f42',
    accent: '#eaf5ee',
  },
  {
    id: 'cute',
    label: '中國科技大學',
    emoji: '🌱',
    description: '社區生態資源與生活、歷史活動回顧，以及即將登場的年度生態教育活動。',
    bgFrom: '#2e1a0e',
    bgTo: '#5c3317',
    accent: '#faf2e8',
  },
  {
    id: 'temple',
    label: '石泉巖清水祖師廟',
    emoji: '⛩️',
    description: '深入探索廟宇的建築特色、歷史古蹟與獨特文化習俗，體驗心靈文化巡禮。',
    bgFrom: '#4a1a0a',
    bgTo: '#7a3018',
    accent: '#fdf0e8',
  },
  {
    id: 'dawo',
    label: '大我新舍',
    emoji: '🏠',
    description: '傾聽老兵們跨越歲月的動人故事，踏上大我新舍的歷史文化巡禮之旅。',
    bgFrom: '#1a2640',
    bgTo: '#2e4468',
    accent: '#eaf0f8',
  },
  {
    id: 'lihe',
    label: '黎和生態公園',
    emoji: '🌳',
    description: '了解黎和公園從廢棄營區蛻變為生態綠洲的精彩歷程，探索在地的生態故事。',
    bgFrom: '#1a3a1e',
    bgTo: '#2e6632',
    accent: '#e8f5ea',
  },
]
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.home-page {
  min-height: 100vh;
  background-color: $bg;
  padding: 32px 24px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// ── 引導提示 ──────────────────────────────────────────────────────────────────
.home-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 32px;
  animation: fadeIn 0.6s ease both;
}

.home-hint__text {
  font-size: 13px;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
}

.home-hint__arrow {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.3);
  animation: bounceDown 1.6s ease 0.8s 3 forwards;
}

// ── 卡片格線 ────────────────────────────────────────────────────────────────
.home-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 960px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

// ── 單張卡片 ────────────────────────────────────────────────────────────────
.section-card {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  font-family: inherit;

  // 入場動畫（每張錯開 delay，由 :style 注入）
  animation: slideUp 0.5s ease both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(-3px);
  }
}

// 卡片上方深色區（漸層背景）
.section-card__top {
  padding: 20px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-card__emoji {
  font-size: 30px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.section-card__label {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  margin: 0;
  letter-spacing: 0.02em;
}

// 卡片下方淺色區
.section-card__body {
  padding: 14px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-card__desc {
  font-size: 12.5px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.section-card__cta {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  align-self: flex-end;
  opacity: 0.8;
  transition: opacity 0.2s, transform 0.2s;

  .section-card:hover & {
    opacity: 1;
    transform: translateX(3px);
  }
}

// ── 動畫 ────────────────────────────────────────────────────────────────────
@keyframes slideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(7px); }
}
</style>
