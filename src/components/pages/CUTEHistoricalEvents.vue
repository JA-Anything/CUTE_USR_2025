<template>
  <div class="content-page cute-history-page">
    <!-- Header Banner -->
    <div class="history-header">
      <div class="header-inner">
        <span class="header-badge">中國科技大學</span>
        <h2 class="header-title">歷史活動</h2>
        <p class="header-subtitle">回顧每一場在地共好的行動足跡</p>
        <div class="header-deco">
          <span class="deco-bar bar-orange"></span>
          <span class="deco-bar bar-light-orange"></span>
        </div>
      </div>
    </div>

    <!-- Year Tab Bar -->
    <div class="tab-bar">
      <div class="tab-bar__inner">
        <button
          class="tab-btn"
          :class="{ active: activeYear === '2024' }"
          @click="activeYear = '2024'"
        >
          <span class="tab-label">2024 年</span>
          <span class="tab-badge" :class="{ 'tab-badge--active': activeYear === '2024' }">
            {{ events2024.length }}
          </span>
          <span v-if="activeYear === '2024'" class="tab-underline"></span>
        </button>

        <button
          class="tab-btn"
          :class="{ active: activeYear === '2025' }"
          @click="activeYear = '2025'"
        >
          <span class="tab-label">2025 年</span>
          <span class="tab-badge" :class="{ 'tab-badge--active': activeYear === '2025' }">
            {{ events2025.length }}
          </span>
          <span v-if="activeYear === '2025'" class="tab-underline"></span>
        </button>
      </div>
    </div>

    <!-- Poster Grid -->
    <div class="poster-section">
      <div class="poster-grid">
        <div
          v-for="(poster, index) in currentEvents"
          :key="poster.id"
          class="poster-card"
          @click="openLightbox(index)"
        >
          <div class="poster-card__img-wrap">
            <img :src="poster.imageUrl" :alt="poster.title" loading="lazy" />
            <span class="poster-card__year-tag">{{ poster.year }}</span>
            <div class="poster-card__overlay"></div>
          </div>
          <div class="poster-card__info">
            <span class="poster-card__date">{{ poster.date }}</span>
            <p class="poster-card__title">{{ poster.title }}</p>
          </div>
          <div class="poster-card__hover-border"></div>
          <div class="poster-card__view-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="lightboxOpen"
          class="lightbox-overlay"
          @click.self="closeLightbox"
        >
          <div class="lightbox-modal" @click.stop>
            <!-- Top bar -->
            <div class="lightbox-topbar">
              <span class="lightbox-counter">
                {{ lightboxIndex + 1 }}
                <span class="counter-sep">/</span>
                {{ currentEvents.length }}
              </span>
              <button class="lightbox-close" @click="closeLightbox">✕</button>
            </div>

            <!-- Tab bar（有活動照片的活動才顯示） -->
            <div v-if="currentEvent.type === 'with-photos'" class="lightbox-tabbar">
              <button
                class="ltab-btn"
                :class="{ active: activeTab === 'poster' }"
                @click="activeTab = 'poster'"
              >
                活動海報
                <span v-if="activeTab === 'poster'" class="ltab-underline"></span>
              </button>
              <button
                class="ltab-btn"
                :class="{ active: activeTab === 'photos' }"
                @click="activeTab = 'photos'"
              >
                活動照片
                <span class="ltab-count">{{ currentEvent.activityPhotos.length }}</span>
                <span v-if="activeTab === 'photos'" class="ltab-underline"></span>
              </button>
            </div>

            <!-- 活動海報 view -->
            <template v-if="activeTab === 'poster'">
              <div class="lightbox-img-area">
                <button
                  class="arrow-btn arrow-left"
                  :class="{ disabled: lightboxIndex === 0 }"
                  :disabled="lightboxIndex === 0"
                  @click="prevPoster"
                >‹</button>

                <div class="lightbox-img-wrap">
                  <Transition :name="slideDir" mode="out-in">
                    <img
                      :key="lightboxIndex"
                      :src="currentEvent.imageUrl"
                      :alt="currentEvent.title"
                      class="lightbox-img"
                    />
                  </Transition>
                </div>

                <button
                  class="arrow-btn arrow-right"
                  :class="{ disabled: lightboxIndex === currentEvents.length - 1 }"
                  :disabled="lightboxIndex === currentEvents.length - 1"
                  @click="nextPoster"
                >›</button>
              </div>

              <div class="lightbox-infobar">
                <h3 class="lightbox-title">{{ currentEvent.title }}</h3>
                <span class="lightbox-date">{{ currentEvent.date }}</span>
              </div>

              <div class="lightbox-filmstrip" ref="filmstripRef">
                <button
                  v-for="(event, idx) in currentEvents"
                  :key="event.id"
                  class="thumb-item"
                  :class="{ active: idx === lightboxIndex }"
                  @click="goTo(idx)"
                >
                  <img :src="event.imageUrl" :alt="event.title" />
                </button>
              </div>
            </template>

            <!-- 活動照片 view -->
            <template v-else-if="currentEvent.type === 'with-photos'">
              <div class="lightbox-photos-scroll">
                <div class="lightbox-photo-grid">
                  <div
                    v-for="(photo, idx) in currentEvent.activityPhotos"
                    :key="idx"
                    class="activity-photo"
                  >
                    <img :src="photo" :alt="`活動照片 ${idx + 1}`" />
                  </div>
                </div>

                <a
                  v-if="currentEvent.newsLink"
                  :href="currentEvent.newsLink.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="news-link-bar"
                >
                  <span class="news-link-bar__left">
                    <span class="news-icon">📰</span>
                    閱讀新聞稿
                  </span>
                  <span class="news-link-bar__right">
                    {{ currentEvent.newsLink.label }}
                    <span class="news-ext">↗</span>
                  </span>
                </a>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

interface PosterOnlyEvent {
  type: 'poster-only'
  id: number
  imageUrl: string
  date: string
  title: string
  year: string
}

interface EventWithPhotos {
  type: 'with-photos'
  id: number
  imageUrl: string
  date: string
  title: string
  year: string
  activityPhotos: string[]
  newsLink?: { label: string; url: string }
}

type EventData = PosterOnlyEvent | EventWithPhotos

// ── Image imports via Vite glob ──────────────────────────────────────────────
const globs2024 = import.meta.glob(
  '@/assets/images/cute/history-events/2024/poster-*.webp',
  { eager: true, import: 'default' }
) as Record<string, string>

const globs2025 = import.meta.glob(
  '@/assets/images/cute/history-events/2025/poster-*.webp',
  { eager: true, import: 'default' }
) as Record<string, string>

const activity0714 = import.meta.glob(
  '@/assets/images/cute/history-events/2025/activity/0714/photo-*.webp',
  { eager: true, import: 'default' }
) as Record<string, string>

const activity0721 = import.meta.glob(
  '@/assets/images/cute/history-events/2025/activity/0721/photo-*.webp',
  { eager: true, import: 'default' }
) as Record<string, string>

function img(globs: Record<string, string>, name: string): string {
  const key = Object.keys(globs).find((k) => k.includes(name))
  return key ? globs[key] : ''
}

function photos(globs: Record<string, string>): string[] {
  return Object.keys(globs).sort().map((k) => globs[k])
}

// ── Event data ───────────────────────────────────────────────────────────────
const events2024: EventData[] = [
  { type: 'poster-only', id: 1,  imageUrl: img(globs2024, 'poster-01'), date: '2024/04/09',    title: '生態保育大作戰－我們還來得及力挽狂瀾嗎', year: '2024' },
  { type: 'poster-only', id: 2,  imageUrl: img(globs2024, 'poster-02'), date: '2024/05/03',    title: '野鳥救傷宣導暨志工培訓活動',              year: '2024' },
  { type: 'poster-only', id: 3,  imageUrl: img(globs2024, 'poster-03'), date: '2024/05/24',    title: '大自然的生命圖像－從鳥類研究到環境教育',  year: '2024' },
  { type: 'poster-only', id: 4,  imageUrl: img(globs2024, 'poster-04'), date: '2024/05/31',    title: '生態旅遊趣',                              year: '2024' },
  { type: 'poster-only', id: 5,  imageUrl: img(globs2024, 'poster-05'), date: '2024/10/17',    title: '解說歸納術－解說題材的收集與整理',        year: '2024' },
  { type: 'poster-only', id: 6,  imageUrl: img(globs2024, 'poster-06'), date: '2024/11/13',    title: '原住民族狩獵與生態保育',                  year: '2024' },
  { type: 'poster-only', id: 7,  imageUrl: img(globs2024, 'poster-07'), date: '2024/12/17',    title: '野鳥救傷宣導野鳥模型 DIY',                year: '2024' },
]

const events2025: EventData[] = [
  { type: 'poster-only',  id: 8,  imageUrl: img(globs2025, 'poster-01'), date: '2025/04/28',    title: '新興污染物－要你命三千',                           year: '2025' },
  { type: 'poster-only',  id: 9,  imageUrl: img(globs2025, 'poster-02'), date: '2025/05/14',    title: '社區生態資源與生活',                               year: '2025' },
  { type: 'poster-only',  id: 10, imageUrl: img(globs2025, 'poster-03'), date: '2025/06/11',    title: '認識窗殺－看見「看不見」的陷阱',                    year: '2025' },
  {
    type: 'with-photos',  id: 11, imageUrl: img(globs2025, 'poster-04'), date: '2025/07/14–15', title: '暑期國小野鳥救傷宣導（萬興、吳興國小）',            year: '2025',
    activityPhotos: photos(activity0714),
    newsLink: { label: '中央社訊息平台', url: 'https://www.cna.com.tw/Postwrite/Chi/407585' },
  },
  {
    type: 'with-photos',  id: 18, imageUrl: img(globs2025, 'poster-04'), date: '2025/07/21–22', title: '暑期國小野鳥救傷宣導（興華、明道國小）',            year: '2025',
    activityPhotos: photos(activity0721),
    newsLink: { label: '中央社訊息平台', url: 'https://www.cna.com.tw/Postwrite/Chi/408534' },
  },
  { type: 'poster-only',  id: 12, imageUrl: img(globs2025, 'poster-05'), date: '2025/10/16',    title: '生態摺剪玩創意',                                   year: '2025' },
  { type: 'poster-only',  id: 13, imageUrl: img(globs2025, 'poster-06'), date: '2025/10/29',    title: '生態旅遊走世界，社區文化大進步！',                  year: '2025' },
  { type: 'poster-only',  id: 14, imageUrl: img(globs2025, 'poster-07'), date: '2025/10/30',    title: '紙的數學－生態立體小書',                            year: '2025' },
  { type: 'poster-only',  id: 15, imageUrl: img(globs2025, 'poster-08'), date: '2025/11/19',    title: '果皮再生＿柑橘皮萬用清潔劑',                        year: '2025' },
  { type: 'poster-only',  id: 16, imageUrl: img(globs2025, 'poster-09'), date: '2025/12/03',    title: '漫步六張犂－虎嘯里遇見臺灣欒樹',                    year: '2025' },
  { type: 'poster-only',  id: 17, imageUrl: img(globs2025, 'poster-10'), date: '2025 系列',     title: '在地關懷與實踐系列海報',                            year: '2025' },
]

// ── State ────────────────────────────────────────────────────────────────────
const activeYear = ref<'2024' | '2025'>('2024')
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const activeTab = ref<'poster' | 'photos'>('poster')
const slideDir = ref('slide-left')
const filmstripRef = ref<HTMLElement | null>(null)

const currentEvents = computed(() =>
  activeYear.value === '2024' ? events2024 : events2025
)

const currentEvent = computed(() => currentEvents.value[lightboxIndex.value])

// ── Lightbox controls ────────────────────────────────────────────────────────
function openLightbox(index: number) {
  lightboxIndex.value = index
  activeTab.value = 'poster'
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => scrollThumbIntoView(index))
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prevPoster() {
  if (lightboxIndex.value > 0) {
    slideDir.value = 'slide-right'
    lightboxIndex.value--
    activeTab.value = 'poster'
  }
}

function nextPoster() {
  if (lightboxIndex.value < currentEvents.value.length - 1) {
    slideDir.value = 'slide-left'
    lightboxIndex.value++
    activeTab.value = 'poster'
  }
}

function goTo(idx: number) {
  slideDir.value = idx > lightboxIndex.value ? 'slide-left' : 'slide-right'
  lightboxIndex.value = idx
  activeTab.value = 'poster'
}

function scrollThumbIntoView(idx: number) {
  const container = filmstripRef.value
  if (!container) return
  const thumb = container.children[idx] as HTMLElement
  if (thumb) thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

watch(lightboxIndex, (idx) => nextTick(() => scrollThumbIntoView(idx)))

// ── Keyboard navigation ──────────────────────────────────────────────────────
function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowLeft')  prevPoster()
  if (e.key === 'ArrowRight') nextPoster()
}

onMounted(()   => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// ── Page ─────────────────────────────────────────────────────────────────────
.cute-history-page {
  min-height: 100vh;
  background-color: #faf2e8;
}

// ── Header ───────────────────────────────────────────────────────────────────
.history-header {
  width: 100%;
  height: 220px;
  background: linear-gradient(160deg, #2e1a0e 0%, #5c3317 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-inner {
  text-align: center;
}

.header-badge {
  display: inline-block;
  padding: 4px 14px;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 13px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.header-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
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

  .deco-bar {
    display: block;
    width: 60px;
    height: 3px;
    border-radius: 2px;

    &.bar-orange       { background-color: rgba(255, 255, 255, 0.65); }
    &.bar-light-orange { background-color: rgba(255, 255, 255, 0.35); }
  }
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────
.tab-bar {
  width: 100%;
  background-color: #f5e8d8;
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.tab-bar__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  gap: 32px;
  height: 48px;
}

.tab-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #7a9a7a;
  transition: color 0.2s;

  &:hover { color: #5c3317; }
  &.active { color: #8b4513; }
}

.tab-label {
  font-size: 15px;
  font-weight: 500;
}

.tab-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  background-color: #c8a07a;
  transition: background-color 0.2s;

  &--active { background-color: #8b4513; }
}

.tab-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #8b4513;
}

// ── Poster Grid ───────────────────────────────────────────────────────────────
.poster-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
}

.poster-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px)  { grid-template-columns: 1fr; }
}

.poster-card {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .poster-card__img-wrap img { transform: scale(1.04); }
    .poster-card__hover-border { opacity: 1; }
    .poster-card__view-btn     { opacity: 1; }
  }
}

.poster-card__img-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}

.poster-card__year-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 8px;
  background-color: rgba(61, 122, 88, 0.9);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  z-index: 2;
}

.poster-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
  pointer-events: none;
}

.poster-card__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 2;
}

.poster-card__date {
  display: block;
  font-size: 12px;
  color: #9EC89C;
  margin-bottom: 4px;
}

.poster-card__title {
  margin: 0;
  font-size: 15px;
  color: #fff;
  line-height: 1.4;
}

.poster-card__hover-border {
  position: absolute;
  inset: 0;
  border: 1px solid #82AA80;
  border-radius: 12px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 3;
}

.poster-card__view-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #82AA80;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s;
  z-index: 4;
}

// ── Lightbox Tab Bar ─────────────────────────────────────────────────────────
.lightbox-tabbar {
  height: 44px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.ltab-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 12px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;

  &.active { color: #82AA80; }
  &:hover:not(.active) { color: #aaa; }
}

.ltab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #82AA80;
  color: #fff;
  font-size: 11px;
}

.ltab-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #82AA80;
}

// ── Activity Photo Grid ───────────────────────────────────────────────────────
.lightbox-photo-grid {
  background-color: #111;
  padding: 16px 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
}

.activity-photo {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: filter 0.2s, border-color 0.2s;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
    border-color: #82AA80;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

// ── News Link Bar ─────────────────────────────────────────────────────────────
.news-link-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-top: 1px solid rgba(0,0,0,0.1);
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover { background-color: rgba(61, 122, 88, 0.06); }

  &__left {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #668a66;
    font-size: 14px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #3d7a58;
    font-size: 14px;
    text-decoration: underline;
  }
}

.news-icon { font-size: 14px; }
.news-ext  { font-size: 14px; }

// ── Lightbox ──────────────────────────────────────────────────────────────────
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(4px);
}

.lightbox-modal {
  position: relative;
  width: 100%;
  max-width: 960px;
  max-height: calc(100vh - 32px);
  margin: 0 16px;
  background-color: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.lightbox-photos-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #444 transparent;

  &::-webkit-scrollbar        { width: 4px; }
  &::-webkit-scrollbar-track  { background: transparent; }
  &::-webkit-scrollbar-thumb  { background-color: #444; border-radius: 2px; }
}

.lightbox-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid #333;
}

.lightbox-counter {
  font-size: 14px;
  color: #aaa;

  .counter-sep { margin: 0 4px; }
}

.lightbox-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover { background-color: #82AA80; }
}

.lightbox-img-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 55vh;
  max-height: 65vh;
  padding: 16px 64px;
  background-color: #111;
}

.lightbox-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lightbox-img {
  max-height: 60vh;
  max-width: 100%;
  object-fit: contain;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  z-index: 10;

  &:hover:not(.disabled) { background-color: #82AA80; }
  &.disabled { opacity: 0.2; cursor: default; }

  &.arrow-left  { left: 12px; }
  &.arrow-right { right: 12px; }
}

.lightbox-infobar {
  padding: 16px 24px;
  border-top: 1px solid #333;
}

.lightbox-title {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.lightbox-date {
  font-size: 13px;
  color: #9EC89C;
}

.lightbox-filmstrip {
  display: flex;
  gap: 8px;
  padding: 12px 24px 16px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #444 transparent;

  &::-webkit-scrollbar        { height: 4px; }
  &::-webkit-scrollbar-track  { background: transparent; }
  &::-webkit-scrollbar-thumb  { background-color: #444; border-radius: 2px; }
}

.thumb-item {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  opacity: 0.5;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: opacity 0.2s, border-color 0.2s;

  &.active {
    border-color: #82AA80;
    opacity: 1;
  }

  &:hover:not(.active) { opacity: 0.8; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

// ── Slide transitions ─────────────────────────────────────────────────────────
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.22s ease;
}

.slide-left-enter-from  { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to    { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(40px); }

// ── Modal fade ────────────────────────────────────────────────────────────────
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to     { opacity: 0; }
</style>
