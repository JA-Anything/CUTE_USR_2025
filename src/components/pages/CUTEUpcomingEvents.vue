<template>
  <div class="events-page">

    <!-- Header Banner -->
    <div class="events-header">
      <div class="header-inner">
        <span class="header-badge">中國科技大學</span>
        <h1 class="header-title">活動預告</h1>
        <p class="header-subtitle">掌握最新活動資訊，與我們一起守護在地生態</p>
        <div class="header-deco">
          <span class="deco-bar bar-og1" />
          <span class="deco-bar bar-og2" />
        </div>
      </div>
    </div>

    <!-- Event Cards -->
    <div class="events-body">
      <div v-for="event in events" :key="event.id" class="event-card">

        <!-- Poster panel -->
        <div class="card-poster">
          <img :src="event.posterImage" :alt="event.title" loading="lazy" />
          <div class="card-poster__blend" />
        </div>

        <!-- Text panel -->
        <div class="card-text">
          <div class="card-badges">
            <span class="badge-status">{{ event.status }}</span>
            <span class="badge-year">{{ event.year }}</span>
          </div>

          <h2 class="card-title">
            {{ event.title }}
            <template v-if="event.titleLine2"><br />{{ event.titleLine2 }}</template>
          </h2>

          <div class="card-meta">
            <span class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              地點：{{ event.location }}
            </span>
            <span class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              時間：{{ event.time }}
            </span>
          </div>

          <p class="card-desc">{{ event.description }}</p>

          <div class="card-tags">
            <span v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <button class="card-cta" :disabled="!event.ctaEnabled">
            {{ event.ctaText }}
          </button>
        </div>

      </div>

      <!-- Empty State Hint -->
      <div class="empty-hint">
        <p>更多活動預告籌備中，請持續關注本頁面</p>
        <div class="dots">
          <span>•</span><span>•</span><span>•</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const posterGlobs = import.meta.glob(
  '@/assets/images/cute/upcoming-events/poster-*.webp',
  { eager: true, import: 'default' },
) as Record<string, string>

function img(name: string): string {
  const key = Object.keys(posterGlobs).find((k) => k.includes(name))
  return key ? posterGlobs[key] : ''
}

interface UpcomingEvent {
  id: string
  status: string
  year: string
  title: string
  titleLine2?: string
  location: string
  time: string
  description: string
  tags: string[]
  posterImage: string
  ctaText: string
  ctaEnabled: boolean
}

const events: UpcomingEvent[] = [
  {
    id: '2025-bird-rescue',
    status: '持續規劃中',
    year: '2025',
    title: '2025 野鳥救傷宣導',
    titleLine2: '教學設計暨志工培訓',
    location: '中國科技大學',
    time: '持續規劃中',
    description:
      '本課程為 114 年度 USR 萌芽型計畫「翱・生態－共善六張犁」年度重點活動，招募對野鳥救傷與生態教育有熱情的志工，提供系統化培訓課程，共同投入在地野鳥保育行動。',
    tags: ['志工招募', '野鳥救傷', '生態教育', '中科大'],
    posterImage: img('poster-01'),
    ctaText: '報名消息即將公布，敬請期待',
    ctaEnabled: false,
  },
]
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.events-page {
  min-height: 100vh;
  background-color: #faf2e8;
}

// ── Header ────────────────────────────────────────────────────────────────────
.events-header {
  width: 100%;
  min-height: 220px;
  background: linear-gradient(160deg, #2e1a0e 0%, #5c3317 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.header-inner {
  text-align: center;
}

.header-badge {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.header-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
}

.header-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 16px;
}

.header-deco {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.deco-bar {
  display: block;
  width: 60px;
  height: 3px;
  border-radius: 2px;

  &.bar-og1 { background-color: rgba(255, 255, 255, 0.65); }
  &.bar-og2 { background-color: rgba(255, 255, 255, 0.35); }
}

// ── Events Body ───────────────────────────────────────────────────────────────
.events-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

// ── Event Card ────────────────────────────────────────────────────────────────
.event-card {
  display: flex;
  background-color: #fdf5ec;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover { background-color: #f5e5d0; }
}

// Poster panel
.card-poster {
  width: 300px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.card-poster__blend {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60px;
  background: linear-gradient(to right, transparent, #fdf5ec);
  pointer-events: none;
  transition: background 0.2s;

  .event-card:hover & {
    background: linear-gradient(to right, transparent, #f5e5d0);
  }
}

// Text panel
.card-text {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.card-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.badge-status {
  padding: 4px 12px;
  border-radius: 4px;
  background-color: rgba(200, 149, 106, 0.15);
  color: #c8956a;
  font-size: 12px;
  border: 1px solid #c8956a;
}

.badge-year {
  padding: 4px 10px;
  border-radius: 4px;
  background-color: #f0ddc8;
  color: #7a4a2a;
  font-size: 12px;
}

.card-title {
  font-size: 26px;
  font-weight: 700;
  color: #2e1a0e;
  line-height: 1.3;
  margin: 0 0 16px;
}

.card-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #9a6a4a;
}

.card-desc {
  font-size: 15px;
  color: #9a6a4a;
  line-height: 1.7;
  margin: 0 0 24px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tag {
  background-color: #f0ddc8;
  color: #7a4a2a;
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 12px;
}

.card-cta {
  width: 100%;
  background-color: rgba(200, 149, 106, 0.12);
  border: 1px solid #c8956a;
  color: #c8956a;
  font-size: 14px;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: default;
  margin-top: auto;

  &:disabled {
    opacity: 0.7;
  }
}

// ── Empty State Hint ──────────────────────────────────────────────────────────
.empty-hint {
  text-align: center;
  padding-top: 32px;
  opacity: 0.45;

  p {
    font-size: 14px;
    color: $gr4;
    margin: 0 0 10px;
  }
}

.dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  font-size: 14px;
  color: $gr4;
}

// ── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 768px) {
  .events-header { min-height: 160px; padding: 24px 20px; }
  .header-title  { font-size: 24px; }
  .events-body   { padding: 32px 20px; }

  .event-card {
    flex-direction: column;
  }

  .card-poster {
    width: 100%;
    height: 220px;
  }

  .card-poster__blend {
    top: auto;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(to bottom, transparent, #fdf5ec);

    .event-card:hover & {
      background: linear-gradient(to bottom, transparent, #f5e5d0);
    }
  }

  .card-text    { padding: 24px; }
  .card-title   { font-size: 20px; }
  .card-meta    { flex-direction: column; gap: 8px; }
  .meta-item    { font-size: 13px; }
}
</style>
