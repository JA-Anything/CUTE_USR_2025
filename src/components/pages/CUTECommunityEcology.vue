<template>
  <div class="ecology-page">

    <!-- Header Banner -->
    <div class="ecology-header">
      <div class="header-inner">
        <span class="header-badge">中國科技大學</span>
        <h1 class="header-title">社區生態資源與生活</h1>
        <p class="header-subtitle">走入社區，以野草為媒介，推廣生態永續生活</p>
        <div class="header-deco">
          <span class="deco-bar bar-og1" />
          <span class="deco-bar bar-og2" />
        </div>
      </div>
    </div>

    <!-- Location Tab Bar -->
    <div class="loc-bar">
      <div class="loc-bar__inner">
        <button
          v-for="s in sessions"
          :key="s.id"
          class="loc-tab"
          :class="{ active: activeSessionId === s.id }"
          @click="switchSession(s.id)"
        >
          {{ s.locationName }}
          <span v-if="activeSessionId === s.id" class="tab-line" />
        </button>
      </div>
    </div>

    <!-- Content Tab Bar -->
    <div class="content-bar">
      <div class="content-bar__inner">
        <button
          v-if="currentSession.poster"
          class="content-tab"
          :class="{ active: activeTab === 'poster' }"
          @click="activeTab = 'poster'"
        >
          活動海報
          <span v-if="activeTab === 'poster'" class="tab-line" />
        </button>
        <button
          class="content-tab"
          :class="{ active: activeTab === 'photos' }"
          @click="activeTab = 'photos'"
        >
          活動照片
          <span class="photo-badge">{{ currentSession.photos.length }}</span>
          <span v-if="activeTab === 'photos'" class="tab-line" />
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <Transition name="fade" mode="out-in">

      <!-- Poster View -->
      <div v-if="activeTab === 'poster' && currentSession.poster" key="poster" class="poster-view">
        <div class="poster-wrap">
          <img :src="currentSession.poster" alt="活動海報" class="poster-img" />
        </div>
        <div class="poster-info">
          <p class="poster-title">社區生態資源與生活</p>
          <p class="poster-date">2024/12/10 × 2025/05/14 兩場次</p>
        </div>
      </div>

      <!-- Photos View -->
      <div v-else key="photos" class="photos-view">
        <div class="photos-inner">

          <!-- 虎嘯里：1 wide + 2 side-by-side -->
          <template v-if="currentSession.id === 'husan'">
            <div class="husan-layout">
              <div class="photo-cell wide">
                <img :src="currentSession.photos[0]" alt="活動照片" loading="lazy" />
              </div>
              <div class="photos-pair">
                <div class="photo-cell">
                  <img :src="currentSession.photos[1]" alt="活動照片" loading="lazy" />
                </div>
                <div class="photo-cell">
                  <img :src="currentSession.photos[2]" alt="活動照片" loading="lazy" />
                </div>
              </div>
            </div>
          </template>

          <!-- 黎安里：2×2 grid -->
          <template v-else>
            <div class="photos-grid">
              <div
                v-for="(photo, i) in currentSession.photos"
                :key="i"
                class="photo-cell"
              >
                <img :src="photo" alt="活動照片" loading="lazy" />
              </div>
            </div>
          </template>

        </div>

        <!-- News Link Bar -->
        <a
          v-if="currentSession.newsLink"
          :href="currentSession.newsLink.url"
          target="_blank"
          rel="noopener noreferrer"
          class="news-bar"
        >
          <span class="news-bar__left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              <path d="M2 15h10"/><path d="M9 18l3-3-3-3"/>
            </svg>
            閱讀新聞稿
          </span>
          <span class="news-bar__right">
            {{ currentSession.newsLink.label }}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </span>
        </a>
      </div>

    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const husanPhotoGlobs = import.meta.glob(
  '@/assets/images/cute/community-ecology/husan/photo-*.webp',
  { eager: true, import: 'default' },
) as Record<string, string>

const lianPhotoGlobs = import.meta.glob(
  '@/assets/images/cute/community-ecology/lian/photo-*.webp',
  { eager: true, import: 'default' },
) as Record<string, string>

const lianPosterGlobs = import.meta.glob(
  '@/assets/images/cute/community-ecology/lian/poster-*.webp',
  { eager: true, import: 'default' },
) as Record<string, string>

function sortedValues(globs: Record<string, string>): string[] {
  return Object.keys(globs)
    .sort()
    .map((k) => globs[k])
}

function firstValue(globs: Record<string, string>): string | undefined {
  const keys = Object.keys(globs).sort()
  return keys.length ? globs[keys[0]] : undefined
}

interface Session {
  id: string
  locationName: string
  poster?: string
  photos: string[]
  newsLink?: { label: string; url: string }
}

const sessions: Session[] = [
  {
    id: 'husan',
    locationName: '虎嘯里場',
    photos: sortedValues(husanPhotoGlobs),
  },
  {
    id: 'lian',
    locationName: '黎安里場',
    poster: firstValue(lianPosterGlobs),
    photos: sortedValues(lianPhotoGlobs),
  },
]

const activeSessionId = ref<string>('husan')
const activeTab = ref<'poster' | 'photos'>('photos')

const currentSession = computed(
  () => sessions.find((s) => s.id === activeSessionId.value)!,
)

function switchSession(id: string) {
  activeSessionId.value = id
  const session = sessions.find((s) => s.id === id)!
  activeTab.value = session.poster ? 'poster' : 'photos'
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.ecology-page {
  min-height: 100vh;
  background-color: #faf2e8;
}

// ── Header ────────────────────────────────────────────────────────────────────
.ecology-header {
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

// ── Location Tab Bar ──────────────────────────────────────────────────────────
.loc-bar {
  width: 100%;
  height: 48px;
  background-color: #f5e8d8;
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.loc-bar__inner {
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 0 32px;
}

.loc-tab {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 14px;
  font-size: 15px;
  font-weight: 500;
  color: #9a7a6a;
  white-space: nowrap;
  transition: color 0.2s;

  &:hover { color: #5c3317; }
  &.active { color: #8b4513; }
}

// ── Content Tab Bar ───────────────────────────────────────────────────────────
.content-bar {
  width: 100%;
  height: 44px;
  background-color: #f8efe2;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.content-bar__inner {
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
}

.content-tab {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: #9a7a6a;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: color 0.2s;

  &:hover { color: #5c3317; }
  &.active { color: #8b4513; }
}

.photo-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #8b4513;
  color: #fff;
  font-size: 11px;
  flex-shrink: 0;
}

.tab-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #8b4513;
}

// ── Poster View ───────────────────────────────────────────────────────────────
.poster-view {
  background-color: #fdf5ec;
  padding: 48px 32px;
  max-width: 960px;
  margin: 0 auto;
}

.poster-wrap {
  display: flex;
  justify-content: center;
}

.poster-img {
  max-height: 65vh;
  max-width: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
  display: block;
}

.poster-info {
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 16px 0;
  margin-top: 24px;
}

.poster-title {
  font-size: 18px;
  font-weight: 700;
  color: #2e1a0e;
  margin: 0 0 4px;
}

.poster-date {
  font-size: 13px;
  color: #8b4513;
  margin: 0;
}

// ── Photos View ───────────────────────────────────────────────────────────────
.photos-view {
  background-color: #fdf5ec;
}

.photos-inner {
  padding: 16px 24px;
  max-width: 960px;
  margin: 0 auto;
}

.husan-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photos-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.photos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.photo-cell {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: filter 0.2s, border-color 0.2s;
  cursor: pointer;

  &.wide { aspect-ratio: 16 / 9; }
  &:not(.wide) { aspect-ratio: 4 / 3; }

  &:hover {
    filter: brightness(1.1);
    border-color: #c8956a;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

// ── News Bar ──────────────────────────────────────────────────────────────────
.news-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-top: 1px solid rgba(0,0,0,0.1);
  text-decoration: none;
  transition: background-color 0.2s;
  max-width: 960px;
  margin: 0 auto;

  &:hover { background-color: rgba(139, 69, 19, 0.06); }

  &__left {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #9a6a4a;
    font-size: 14px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #8b4513;
    font-size: 14px;
    text-decoration: underline;
  }
}

// ── Fade Transition ───────────────────────────────────────────────────────────
.fade-enter-active,
.fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from,
.fade-leave-to      { opacity: 0; }

// ── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 768px) {
  .ecology-header { min-height: 160px; padding: 24px 20px; }
  .header-title   { font-size: 24px; }
  .loc-bar__inner { padding: 0 16px; gap: 20px; }
  .content-bar__inner { padding: 0 16px; }
  .poster-view    { padding: 24px 16px; }
  .photos-inner   { padding: 12px 16px; }
  .news-bar       { padding: 12px 16px; }
}

@media (max-width: 560px) {
  .photos-pair,
  .photos-grid    { grid-template-columns: 1fr; }
  .photo-cell.wide { aspect-ratio: 4 / 3; }
}
</style>
