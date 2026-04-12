<template>
  <div class="content-page wild-bird-page">
    <!-- Header -->
    <div class="bird-header">
      <h2>台北城市常見野鳥</h2>
      <p class="subtitle">六張犁周邊常見的 24 種城市野鳥，點選卡片即可查看詳細介紹。</p>
      <div class="header-decoration">
        <span class="deco-bar bar-orange"></span>
        <span class="deco-bar bar-green"></span>
        <span class="deco-bar bar-light"></span>
      </div>
    </div>

    <!-- Bird Card Grid -->
    <div class="bird-grid">
      <div
        v-for="bird in birds"
        :key="bird.id"
        class="bird-card"
        @click="openModal(bird.id)"
      >
        <div class="bird-photo">
          <img :src="bird.imageUrl" :alt="bird.name" loading="lazy" />
          <div class="photo-overlay"></div>
        </div>
        <div class="bird-name">{{ bird.name }}</div>
      </div>
    </div>

    <!-- Footer attribution -->
    <div class="bird-footer">
      <span>資料來源：台北市野鳥學會・六張犁生態調查報告</span>
      <span>{{ birds.length }} 種鳥類</span>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="modalVisible" class="bird-modal-overlay" @click.self="closeModal">
          <div class="bird-modal">
            <!-- Top bar: counter + close -->
            <div class="modal-top-bar">
              <span class="modal-counter">
                {{ currentIndex + 1 }}
                <span class="counter-divider">/</span>
                {{ birds.length }}
              </span>
              <button class="modal-close-btn" @click="closeModal">✕</button>
            </div>

            <!-- Slide area with arrows -->
            <div class="modal-slide-area">
              <button
                class="arrow-btn arrow-left"
                :class="{ disabled: currentIndex === 0 }"
                :disabled="currentIndex === 0"
                @click="prevBird"
              >←</button>

              <div class="modal-slide-container">
                <Transition :name="slideDirection" mode="out-in">
                  <div :key="currentIndex" class="modal-slide-scroll">
                    <img
                      :src="birds[currentIndex].fullImageUrl"
                      :alt="birds[currentIndex].name"
                      class="modal-bird-img"
                    />
                  </div>
                </Transition>
              </div>

              <button
                class="arrow-btn arrow-right"
                :class="{ disabled: currentIndex === birds.length - 1 }"
                :disabled="currentIndex === birds.length - 1"
                @click="nextBird"
              >→</button>
            </div>

            <!-- Thumbnail filmstrip -->
            <div class="modal-thumbs" ref="thumbsContainerRef">
              <div
                v-for="(bird, idx) in birds"
                :key="bird.id"
                class="thumb-item"
                :class="{ active: idx === currentIndex }"
                @click="goTo(idx)"
              >
                <img :src="bird.imageUrl" :alt="bird.name" />
                <span class="thumb-name">{{ bird.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

interface Bird {
  id: number
  name: string
  imageUrl: string
  fullImageUrl: string
}

// Vite glob import — lazy (non-eager) 讓 Vite 靜態分析路徑但不在模組初始化時一次性 import 全部檔案
// 使用 eager:true + import:'default' 在圖片檔案過多時可能造成模組初始化失敗
const birdGlobs = import.meta.glob(
  '@/assets/images/wild-bird/urban-birds/bird-*.jpg',
  { eager: true, import: 'default' }
) as Record<string, string>

const img = (num: string): string => {
  // 支援零補位 (01) 和不補位 (1) 兩種格式
  const padded   = `bird-${num}.jpg`
  const key = Object.keys(birdGlobs).find((k) => k.endsWith(padded))
  if (key) return birdGlobs[key] as string
  console.warn(`[WildBirdUrbanBirds] 找不到圖片: ${padded}`, Object.keys(birdGlobs))
  return ''
}

const fullImg = (num: string): string => {
  const padded = `bird-${num}_full.jpg`
  const key = Object.keys(birdGlobs).find((k) => k.endsWith(padded))
  if (key) return birdGlobs[key] as string
  return img(num)
}

const birds: Bird[] = [
  { id: 1,  name: '麻雀',     imageUrl: img('01'), fullImageUrl: fullImg('01') },
  { id: 2,  name: '八哥',     imageUrl: img('02'), fullImageUrl: fullImg('02') },
  { id: 3,  name: '大卷尾',   imageUrl: img('03'), fullImageUrl: fullImg('03') },
  { id: 4,  name: '小卷尾',   imageUrl: img('04'), fullImageUrl: fullImg('04') },
  { id: 5,  name: '五色鳥',   imageUrl: img('05'), fullImageUrl: fullImg('05') },
  { id: 6,  name: '白腹鶇',   imageUrl: img('06'), fullImageUrl: fullImg('06') },
  { id: 7,  name: '白頭翁',   imageUrl: img('07'), fullImageUrl: fullImg('07') },
  { id: 8,  name: '灰樹鶇',   imageUrl: img('08'), fullImageUrl: fullImg('08') },
  { id: 9,  name: '紅嘴黑鵯', imageUrl: img('09'), fullImageUrl: fullImg('09') },
  { id: 10, name: '家八哥',   imageUrl: img('10'), fullImageUrl: fullImg('10') },
  { id: 11, name: '家燕',     imageUrl: img('11'), fullImageUrl: fullImg('11') },
  { id: 12, name: '喜鵲',     imageUrl: img('12'), fullImageUrl: fullImg('12') },
  { id: 13, name: '黃頭鷺',   imageUrl: img('13'), fullImageUrl: fullImg('13') },
  { id: 14, name: '繡眼畫眉', imageUrl: img('14'), fullImageUrl: fullImg('14') },
  { id: 15, name: '鳳頭蒼鷹', imageUrl: img('15'), fullImageUrl: fullImg('15') },
  { id: 16, name: '領角鴞',   imageUrl: img('16'), fullImageUrl: fullImg('16') },
  { id: 17, name: '臺灣藍鵲', imageUrl: img('17'), fullImageUrl: fullImg('17') },
  { id: 18, name: '大冠鷲',   imageUrl: img('18'), fullImageUrl: fullImg('18') },
  { id: 19, name: '夜鷺',     imageUrl: img('19'), fullImageUrl: fullImg('19') },
  { id: 20, name: '翠鳥',     imageUrl: img('20'), fullImageUrl: fullImg('20') },
  { id: 21, name: '黑冠麻鷺', imageUrl: img('21'), fullImageUrl: fullImg('21') },
  { id: 22, name: '珠頸斑鳩', imageUrl: img('22'), fullImageUrl: fullImg('22') },
  { id: 23, name: '紅尾伯勞', imageUrl: img('23'), fullImageUrl: fullImg('23') },
  { id: 24, name: '金背鳩',   imageUrl: img('24'), fullImageUrl: fullImg('24') },
]

const modalVisible = ref(false)
const currentIndex = ref(0)
const slideDirection = ref('slide-left')
const thumbsContainerRef = ref<HTMLElement | null>(null)

function openModal(birdId: number) {
  const idx = birds.findIndex((b) => b.id === birdId)
  currentIndex.value = idx >= 0 ? idx : 0
  modalVisible.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => scrollThumbIntoView(currentIndex.value))
}

function closeModal() {
  modalVisible.value = false
  document.body.style.overflow = ''
}

function prevBird() {
  if (currentIndex.value > 0) {
    slideDirection.value = 'slide-right'
    currentIndex.value--
  }
}

function nextBird() {
  if (currentIndex.value < birds.length - 1) {
    slideDirection.value = 'slide-left'
    currentIndex.value++
  }
}

function goTo(idx: number) {
  slideDirection.value = idx > currentIndex.value ? 'slide-left' : 'slide-right'
  currentIndex.value = idx
}

function scrollThumbIntoView(idx: number) {
  if (!thumbsContainerRef.value) return
  const thumb = thumbsContainerRef.value.children[idx] as HTMLElement
  if (thumb) {
    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

watch(currentIndex, (idx) => {
  nextTick(() => scrollThumbIntoView(idx))
})

function handleKeydown(e: KeyboardEvent) {
  if (!modalVisible.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prevBird()
  if (e.key === 'ArrowRight') nextBird()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── Page ── */
.wild-bird-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  text-align: left;
}

/* ── Header ── */
.bird-header {
  padding: 36px 40px 28px;
  border-bottom: 1px solid rgba(44, 95, 45, 0.12);
  background: linear-gradient(135deg, rgba(211, 227, 187, 0.5) 0%, rgba(255, 255, 255, 0) 60%);
}

.bird-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2c5f2d;
  margin: 0 0 10px;
  letter-spacing: 0.04em;
}

.subtitle {
  font-size: 15px;
  color: #555;
  margin: 0;
  line-height: 1.7;
}

.header-decoration {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}
.deco-bar { display: block; height: 3px; border-radius: 2px; }
.bar-orange { width: 32px; background-color: #f57600; }
.bar-green  { width: 16px; background-color: #2c5f2d; }
.bar-light  { width: 8px;  background-color: #f78b26; }

/* ── Card Grid ── */
.bird-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 28px 32px 36px;
}

.bird-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bird-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
}

.bird-photo {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 square */
  overflow: hidden;
}

.bird-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.3s ease;
}

.bird-card:hover .bird-photo img {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.25), transparent);
}

.bird-name {
  padding: 8px 12px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #2c5f2d;
  letter-spacing: 0.02em;
  text-align: center;
}

/* ── Footer ── */
.bird-footer {
  padding: 16px 32px;
  border-top: 1px solid rgba(44, 95, 45, 0.1);
  background: rgba(211, 227, 187, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
}

/* ── Modal Overlay ── */
.bird-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.bird-modal {
  position: relative;
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ── Modal Top Bar ── */
.modal-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}

.modal-counter {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.counter-divider {
  opacity: 0.5;
  margin: 0 4px;
}

.modal-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  line-height: 1;
}

.modal-close-btn:hover {
  background: rgba(245, 118, 0, 0.8);
}

/* ── Slide Area ── */
.modal-slide-area {
  position: relative;
  display: flex;
  align-items: center;
}

.modal-slide-container {
  overflow: hidden;
  border-radius: 12px;
  width: 100%;
  max-height: calc(90vh - 140px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
}

.modal-slide-scroll {
  overflow-y: auto;
  max-height: calc(90vh - 140px);
  scrollbar-width: thin;
  scrollbar-color: rgba(44, 95, 45, 0.3) rgba(0, 0, 0, 0.05);
}

.modal-slide-scroll::-webkit-scrollbar { width: 4px; }
.modal-slide-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.05); }
.modal-slide-scroll::-webkit-scrollbar-thumb { background: rgba(44, 95, 45, 0.3); border-radius: 2px; }

.modal-bird-img {
  width: 100%;
  display: block;
  border-radius: 12px;
}

/* ── Arrow Buttons ── */
.arrow-btn {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #2c5f2d;
  transition: all 0.2s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  z-index: 10;
  flex-shrink: 0;
}

.arrow-btn:hover:not(.disabled) {
  background: #f57600;
  color: #fff;
}

.arrow-btn.disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.arrow-left  { left: -52px; }
.arrow-right { right: -52px; }

/* ── Thumbnail Filmstrip ── */
.modal-thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 4px 6px;
  scrollbar-width: none;
}

.modal-thumbs::-webkit-scrollbar { display: none; }

.thumb-item {
  width: 56px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  border: 2.5px solid transparent;
  transition: border 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.65;
}

.thumb-item.active {
  border-color: #f57600;
  transform: scale(1.08);
  opacity: 1;
}

.thumb-item img {
  width: 100%;
  height: 48px;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.thumb-name {
  display: block;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 3px;
  text-align: center;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumb-item.active .thumb-name {
  background: #f57600;
}

/* ── Slide Transitions ── */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease;
}

.slide-left-enter-from  { transform: translateX(40px);  opacity: 0; }
.slide-left-leave-to    { transform: translateX(-40px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-40px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(40px);  opacity: 0; }

/* ── Modal Overlay Transition ── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .arrow-left  { left: -44px; }
  .arrow-right { right: -44px; }
  .arrow-btn { width: 36px; height: 36px; font-size: 16px; }
}

@media (max-width: 768px) {
  .bird-header { padding: 24px 20px 20px; }
  .bird-header h2 { font-size: 22px; }
  .bird-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    padding: 20px;
  }
  .bird-modal-overlay { padding: 8px; }
  .arrow-left,
  .arrow-right { display: none; }
  .bird-modal { max-width: 100%; }
}

@media (max-width: 480px) {
  .bird-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 14px;
  }
  .bird-name { font-size: 14px; }
}
</style>
