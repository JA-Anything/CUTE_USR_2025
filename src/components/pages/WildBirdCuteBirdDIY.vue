<template>
  <div class="diy-page-bg">
    <!-- White card container -->
    <div class="diy-card-container">

      <!-- ── Header ── -->
      <div class="diy-header">
        <div class="diy-header__deco-emoji">✂️</div>
        <h2 class="diy-header__title">萌鳥DIY手作</h2>
        <p class="diy-header__desc">
          由中科大野鳥救傷社群設計製作，剪下紙模、上色、組裝，做出專屬的棒棒萌鳥！
        </p>
        <div class="diy-header__bars">
          <div class="bar bar--orange-lg" />
          <div class="bar bar--green" />
          <div class="bar bar--orange-sm" />
        </div>
      </div>

      <!-- ── Bird Cards Grid ── -->
      <div class="diy-section">
        <div class="diy-grid">
          <div
            v-for="bird in diyBirds"
            :key="bird.id"
            class="diy-bird-card"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <!-- Photo area -->
            <div class="diy-bird-card__photo-area">
              <img
                :src="bird.imageUrl"
                :alt="bird.name"
                class="diy-bird-card__photo"
              />

              <!-- "敬請期待" badge -->
              <div v-if="!bird.available" class="diy-bird-card__badge">敬請期待</div>

              <!-- Vignette overlay -->
              <div class="diy-bird-card__vignette" />
            </div>

            <!-- Info area -->
            <div class="diy-bird-card__info">
              <div class="diy-bird-card__name">{{ bird.name }}</div>
              <div class="diy-bird-card__english-name">{{ bird.englishName }}</div>
              <a
                v-if="bird.available && bird.pdfPath"
                :href="bird.pdfPath"
                download
                class="diy-btn diy-btn--active"
                @click.stop
              >
                下載製作模板 ↓
              </a>
              <button
                v-else
                class="diy-btn diy-btn--disabled"
                disabled
              >
                模板即將推出
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Divider ── -->
      <div class="diy-divider" />

      <!-- ── How-To Steps ── -->
      <div class="diy-section">
        <div class="diy-steps-header">
          <div class="diy-steps-header__title">製作步驟</div>
          <div class="diy-steps-header__bar" />
        </div>

        <div class="steps-grid">
          <div v-for="s in steps" :key="s.step" class="step-card">
            <div class="step-card__badge">{{ s.step }}</div>
            <div class="step-card__icon">{{ s.icon }}</div>
            <div class="step-card__title">{{ s.title }}</div>
            <p class="step-card__desc">{{ s.description }}</p>
          </div>
        </div>

        <!-- Tip banner -->
        <div class="tip-banner">
          <span class="tip-banner__icon">💡</span>
          <span class="tip-banner__text">
            小訣竅：建議使用 200g 以上的厚紙張列印，成品更挺立耐用；上色時先淡後深，留白處更顯層次感！
          </span>
        </div>
      </div>

      <!-- ── Footer ── -->
      <div class="diy-footer">
        <span class="diy-footer__left">設計製作：中科大野鳥救傷社群</span>
        <span class="diy-footer__right">{{ diyBirds.length }} 種鳥類</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// ── Image imports (via import.meta.glob so Vite can statically analyse) ──
const diyGlobs = import.meta.glob(
  '@/assets/images/wild-bird/diy/diy-*.jpg',
  { eager: true, import: 'default' }
) as Record<string, string>

function diyImg(filename: string): string {
  const key = Object.keys(diyGlobs).find((k) => k.endsWith(filename))
  return key ? diyGlobs[key] : ''
}

// ── Data ──
interface DiyBird {
  id: number
  name: string
  englishName: string
  available: boolean
  imageUrl: string
  pdfPath: string | null
}

const diyBirds: DiyBird[] = [
  {
    id: 1,
    name: '白頭翁',
    englishName: 'Light-vented Bulbul',
    available: true,
    imageUrl: diyImg('diy-baitouweng.jpg'),
    pdfPath: '/downloads/wild-bird/diy-baitouweng.pdf',
  },
  {
    id: 2,
    name: '紅嘴黑鵯',
    englishName: 'Black Bulbul',
    available: true,
    imageUrl: diyImg('diy-hongzuiheibei.jpg'),
    pdfPath: '/downloads/wild-bird/diy-hongzuiheibei.pdf',
  },
  {
    id: 3,
    name: '珠頸斑鳩',
    englishName: 'Spotted Dove',
    available: true,
    imageUrl: diyImg('diy-zhujingbanjiu.jpg'),
    pdfPath: '/downloads/wild-bird/diy-zhujingbanjiu.pdf',
  },
  {
    id: 4,
    name: '臺灣藍鵲',
    englishName: 'Taiwan Blue Magpie',
    available: true,
    imageUrl: diyImg('diy-taiwanlanque.jpg'),
    pdfPath: '/downloads/wild-bird/diy-taiwanlanque.pdf',
  },
]

const steps = [
  {
    icon: '✂️',
    step: 1,
    title: '下載並列印紙模',
    description: '選擇喜歡的鳥種，下載 PDF 後以 A4 紙張印出',
  },
  {
    icon: '🎨',
    step: 2,
    title: '剪下並上色',
    description: '沿虛線剪下各部位，用色鉛筆或水彩自由上色',
  },
  {
    icon: '🐦',
    step: 3,
    title: '組裝完成！',
    description: '依照說明折疊黏合，插上竹籤即完成萌鳥棒棒！',
  },
]

// ── Hover handlers ──
function onCardEnter(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.transform = 'scale(1.02)'
  el.style.boxShadow = '0 10px 32px rgba(0,0,0,0.28)'
}
function onCardLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.transform = 'scale(1)'
  el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)'
}
</script>

<style scoped lang="scss">
/* ── Page background ── */
.diy-page-bg {
  min-height: 100vh;
  background-color: #d3e3bb;
  background-image:
    radial-gradient(ellipse at 20% 30%, rgba(100,140,60,0.18) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 70%, rgba(60,100,40,0.14) 0%, transparent 55%);
  padding: 32px 16px 48px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* ── White card wrapper ── */
.diy-card-container {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

/* ── Header ── */
.diy-header {
  padding: 36px 40px 28px;
  border-bottom: 1px solid rgba(44,95,45,0.12);
  background: linear-gradient(135deg, rgba(211,227,187,0.5) 0%, rgba(255,255,255,0) 60%);
  position: relative;

  &__deco-emoji {
    position: absolute;
    top: 18px;
    right: 40px;
    font-size: 68px;
    opacity: 0.07;
    user-select: none;
    line-height: 1;
    transform: rotate(-15deg);
  }

  &__title {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #2c5f2d;
    margin: 0 0 10px;
    letter-spacing: 0.04em;
    line-height: 1.3;
  }

  &__desc {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 15px;
    color: #555;
    margin: 0;
    line-height: 1.7;
  }

  &__bars {
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.bar {
  height: 3px;
  border-radius: 2px;

  &--orange-lg { width: 32px; background-color: #F57600; }
  &--green     { width: 16px; background-color: #2c5f2d; }
  &--orange-sm { width: 8px;  background-color: #F78B26; }
}

/* ── Section wrapper ── */
.diy-section {
  padding: 32px 40px 36px;
}

/* ── Bird cards grid ── */
.diy-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.diy-bird-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;

  &__photo-area {
    background-color: #0a0a0a;
    position: relative;
    padding-bottom: 133.33%; // 3:4 aspect ratio
    overflow: hidden;
  }

  &__photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #F57600;
    color: #fff;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    letter-spacing: 0.04em;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    z-index: 2;
  }

  &__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%);
    pointer-events: none;
  }

  &__info {
    background-color: #fff;
    padding: 12px 16px 14px;
  }

  &__name {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 4px;
  }

  &__english-name {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #aaa;
    text-align: center;
    margin-bottom: 10px;
    letter-spacing: 0.02em;
  }
}

/* ── Download button ── */
.diy-btn {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: 6px;
  border: none;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: background-color 0.2s ease;

  &--active {
    background-color: #F57600;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #d4620a;
    }
  }

  &--disabled {
    background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
  }
}

/* ── Divider ── */
.diy-divider {
  margin: 0 40px;
  height: 1px;
  background-color: rgba(44,95,45,0.1);
}

/* ── Steps section ── */
.diy-steps-header {
  margin-bottom: 20px;

  &__title {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #2c5f2d;
    margin-bottom: 8px;
  }

  &__bar {
    width: 36px;
    height: 3px;
    background-color: #F57600;
    border-radius: 2px;
  }
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.step-card {
  background-color: #f0f5e8;
  border-radius: 10px;
  padding: 20px;
  position: relative;

  &__badge {
    position: absolute;
    top: 14px;
    left: 14px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #F57600;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    font-size: 32px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 4px;
    line-height: 1.2;
  }

  &__title {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 6px;
  }

  &__desc {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin: 0;
    text-align: center;
  }
}

/* ── Tip banner ── */
.tip-banner {
  margin-top: 16px;
  background-color: rgba(245,118,0,0.06);
  border: 1px solid rgba(245,118,0,0.2);
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon { font-size: 18px; }

  &__text {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 13px;
    color: #555;
    line-height: 1.6;
  }
}

/* ── Footer ── */
.diy-footer {
  padding: 16px 32px;
  border-top: 1px solid rgba(44,95,45,0.1);
  background-color: rgba(211,227,187,0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 12px;
    color: #888;
  }

  &__right {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #aaa;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .diy-grid    { grid-template-columns: repeat(2, 1fr); }
  .steps-grid  { grid-template-columns: repeat(2, 1fr); }

  .diy-header,
  .diy-section { padding-left: 24px; padding-right: 24px; }
  .diy-divider { margin: 0 24px; }
}

@media (max-width: 480px) {
  .diy-grid    { grid-template-columns: 1fr; }
  .steps-grid  { grid-template-columns: 1fr; }

  .diy-header,
  .diy-section { padding-left: 16px; padding-right: 16px; }
  .diy-divider { margin: 0 16px; }
}
</style>
