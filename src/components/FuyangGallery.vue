<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

export interface Photo {
  id: number
  imageUrl: string
  chineseName: string
  englishName: string
}

const props = defineProps<{
  parkName: string
  sectionTitle: string
  subtitle: string
  photos: Photo[]
}>()

// ── Lightbox state ────────────────────────────────────────────────────────────
const lightboxOpen = ref(false)
const currentIndex = ref(0)
const slideDir = ref('slide-left')
const filmstripRef = ref<HTMLElement | null>(null)

function openLightbox(index: number) {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => scrollThumbIntoView(index))
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prev() {
  if (currentIndex.value > 0) {
    slideDir.value = 'slide-right'
    currentIndex.value--
  }
}

function next() {
  if (currentIndex.value < props.photos.length - 1) {
    slideDir.value = 'slide-left'
    currentIndex.value++
  }
}

function goTo(idx: number) {
  slideDir.value = idx > currentIndex.value ? 'slide-left' : 'slide-right'
  currentIndex.value = idx
}

function scrollThumbIntoView(idx: number) {
  const container = filmstripRef.value
  if (!container) return
  const thumb = container.children[idx] as HTMLElement
  thumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

watch(currentIndex, (idx) => nextTick(() => scrollThumbIntoView(idx)))

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowLeft')  prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(()   => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="fuyang-gallery">

    <!-- Header Banner -->
    <div class="gallery-header">
      <div class="gallery-header__inner">
        <span class="gallery-header__badge">{{ parkName }}</span>
        <h2 class="gallery-header__title">{{ sectionTitle }}</h2>
        <p class="gallery-header__subtitle">{{ subtitle }}</p>
        <div class="gallery-header__deco">
          <span class="deco-bar deco-bar--dark"></span>
          <span class="deco-bar deco-bar--light"></span>
        </div>
      </div>
    </div>

    <!-- Photo Grid -->
    <div class="photo-section">
      <div class="photo-grid">
        <div
          v-for="(photo, index) in photos"
          :key="photo.id"
          class="photo-card"
          @click="openLightbox(index)"
        >
          <img :src="photo.imageUrl" :alt="photo.chineseName" loading="lazy" />
          <div class="photo-card__overlay"></div>
          <div class="photo-card__caption">
            <span class="caption-zh">{{ photo.chineseName }}</span>
            <span class="caption-en">{{ photo.englishName }}</span>
          </div>
          <div class="photo-card__border"></div>
          <div class="photo-card__eye">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="lightboxOpen" class="lb-overlay" @click.self="closeLightbox">
          <div class="lb-modal" @click.stop>

            <!-- Top bar -->
            <div class="lb-topbar">
              <span class="lb-counter">
                {{ currentIndex + 1 }}<span class="lb-counter__sep">/</span>{{ photos.length }}
              </span>
              <button class="lb-close" @click="closeLightbox">✕</button>
            </div>

            <!-- Main image -->
            <div class="lb-img-area">
              <button
                class="lb-arrow lb-arrow--left"
                :class="{ disabled: currentIndex === 0 }"
                :disabled="currentIndex === 0"
                @click="prev"
              >‹</button>

              <div class="lb-img-wrap">
                <Transition :name="slideDir" mode="out-in">
                  <img
                    :key="currentIndex"
                    :src="photos[currentIndex].imageUrl"
                    :alt="photos[currentIndex].chineseName"
                    class="lb-img"
                  />
                </Transition>
              </div>

              <button
                class="lb-arrow lb-arrow--right"
                :class="{ disabled: currentIndex === photos.length - 1 }"
                :disabled="currentIndex === photos.length - 1"
                @click="next"
              >›</button>
            </div>

            <!-- Caption bar -->
            <div class="lb-caption">
              <span class="lb-caption__zh">{{ photos[currentIndex].chineseName }}</span>
              <span class="lb-caption__en">{{ photos[currentIndex].englishName }}</span>
            </div>

            <!-- Filmstrip -->
            <div class="lb-filmstrip" ref="filmstripRef">
              <button
                v-for="(photo, idx) in photos"
                :key="photo.id"
                class="lb-thumb"
                :class="{ active: idx === currentIndex }"
                @click="goTo(idx)"
              >
                <img :src="photo.imageUrl" :alt="photo.chineseName" />
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

// ── Page ──────────────────────────────────────────────────────────────────────
.fuyang-gallery {
  min-height: 100vh;
  background-color: $bg;
}

// ── Header Banner ─────────────────────────────────────────────────────────────
.gallery-header {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #152a1e 0%, #1f4030 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;

  @media (max-width: 560px) { height: 160px; }
}

.gallery-header__inner {
  text-align: center;
}

.gallery-header__badge {
  display: inline-block;
  padding: 5px 14px;
  background-color: #2c5f42;
  color: #fff;
  font-size: 13px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.gallery-header__title {
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;

  @media (max-width: 560px) { font-size: 24px; }
}

.gallery-header__subtitle {
  font-size: 14px;
  color: #aaa;
  margin: 0 0 16px;
}

.gallery-header__deco {
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

  &--dark  { background-color: #2c5f42; }
  &--light { background-color: #4a8f63; }
}

// ── Photo Grid ────────────────────────────────────────────────────────────────
.photo-section {
  padding: 48px 32px;

  @media (max-width: 560px) { padding: 32px 16px; }
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 560px) { grid-template-columns: repeat(2, 1fr); }
}

// ── Photo Card ────────────────────────────────────────────────────────────────
.photo-card {
  position: relative;
  aspect-ratio: 3 / 2;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: #2e2e2e;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    display: block;
  }

  &:hover img { transform: scale(1.05); }

  &:hover .photo-card__border { opacity: 1; }
  &:hover .photo-card__eye    { opacity: 1; }
}

.photo-card__overlay {
  position: absolute;
  inset: 0;
  height: 55%;
  bottom: 0;
  top: auto;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
  pointer-events: none;
}

.photo-card__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 12px;
  z-index: 1;
}

.caption-zh {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
  line-height: 1.3;
}

.caption-en {
  display: block;
  color: #aaa;
  font-size: 11px;
  line-height: 1.3;
}

.photo-card__border {
  position: absolute;
  inset: 0;
  border: 1px solid $og1;
  border-radius: 10px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
}

.photo-card__eye {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: $og1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 3;
}

// ── Lightbox Overlay ──────────────────────────────────────────────────────────
.lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(4px);
}

.lb-modal {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 16px;
  background-color: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
}

// ── Lightbox Top Bar ──────────────────────────────────────────────────────────
.lb-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #333;
}

.lb-counter {
  font-size: 14px;
  color: #aaa;

  &__sep { margin: 0 4px; }
}

.lb-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover { background-color: $og1; }
}

// ── Lightbox Image Area ───────────────────────────────────────────────────────
.lb-img-area {
  position: relative;
  background-color: #111;
  min-height: 52vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 64px;

  @media (max-width: 560px) {
    min-height: 40vh;
    padding: 16px 52px;
  }
}

.lb-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.lb-img {
  max-height: 52vh;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: 560px) { max-height: 40vh; }
}

.lb-arrow {
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

  &:hover:not(.disabled) { background-color: $og1; }
  &.disabled { opacity: 0.2; cursor: default; }

  &--left  { left: 12px; }
  &--right { right: 12px; }
}

// ── Lightbox Caption Bar ──────────────────────────────────────────────────────
.lb-caption {
  padding: 14px 24px;
  border-top: 1px solid #333;
}

.lb-caption__zh {
  display: block;
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.lb-caption__en {
  display: block;
  font-size: 13px;
  color: #aaa;
}

// ── Filmstrip ─────────────────────────────────────────────────────────────────
.lb-filmstrip {
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

.lb-thumb {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  opacity: 0.45;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: opacity 0.2s, border-color 0.2s;

  &.active {
    border-color: $og1;
    opacity: 1;
  }

  &:hover:not(.active) { opacity: 0.75; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 560px) { width: 52px; height: 52px; }
}

// ── Slide transitions ─────────────────────────────────────────────────────────
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.22s ease;
}

.slide-left-enter-from  { opacity: 0; transform: translateX(30px); }
.slide-left-leave-to    { opacity: 0; transform: translateX(-30px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-30px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(30px); }

// ── Modal fade ────────────────────────────────────────────────────────────────
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to     { opacity: 0; }
</style>
