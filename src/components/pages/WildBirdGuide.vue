<template>
  <div class="guide-page-bg">
    <div class="guide-card">

      <!-- ══ HEADER ══════════════════════════════════════════════════════ -->
      <div class="guide-header">
        <div class="guide-header__deco">🦜</div>
        <h2 class="guide-header__title">發現受傷野鳥，怎麼辦？</h2>
        <p class="guide-header__desc">依照以下步驟判斷狀況、緊急處置，再聯繫專業救傷單位。</p>
        <div class="guide-header__bars">
          <div class="bar bar--orange-lg" />
          <div class="bar bar--green" />
          <div class="bar bar--orange-sm" />
        </div>
      </div>

      <!-- ══ SECTION 1 — 如何判斷野鳥受傷？(5 signs) ═══════════════════ -->
      <div class="guide-section">
        <SectionTitle title="如何判斷野鳥受傷？" />
        <div class="signs-grid">
          <div v-for="s in signs" :key="s.label" class="sign-card">
            <div class="sign-card__emoji">{{ s.emoji }}</div>
            <div class="sign-card__label">{{ s.label }}</div>
            <div class="sign-card__desc">{{ s.desc }}</div>
          </div>
        </div>
      </div>

      <!-- ══ SECTION 2 — 野鳥年齡怎麼分？(3 age types) ════════════════ -->
      <div class="guide-section guide-section--tinted">
        <SectionTitle title="野鳥年齡怎麼分？" />
        <div class="age-grid">
          <div
            v-for="card in ageCards"
            :key="card.name"
            class="age-card"
            :style="{ borderTopColor: card.borderColor }"
          >
            <div class="age-card__badge-row">
              <span
                class="age-card__badge"
                :style="{ backgroundColor: card.badgeColor }"
              >{{ card.badge }}</span>
            </div>
            <div class="age-card__emoji">{{ card.emoji }}</div>
            <div class="age-card__name">{{ card.name }}</div>
            <ul class="age-card__list">
              <li
                v-for="(pt, i) in card.points"
                :key="i"
                class="age-card__list-item"
                :class="{ 'age-card__list-item--action': pt.startsWith('➜') }"
                :style="{
                  color: pt.startsWith('➜') ? card.badgeColor : '#555',
                  fontWeight: pt.startsWith('➜') ? 600 : 400,
                  borderTop: i === card.points.length - 1 ? '1px dashed rgba(0,0,0,0.08)' : 'none',
                  paddingTop: i === card.points.length - 1 ? '8px' : '0',
                  marginTop: i === card.points.length - 1 ? '4px' : '0',
                }"
              >
                {{ pt.startsWith('➜') ? pt : `• ${pt}` }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ══ SECTION 3 — 緊急處置步驟 ════════════════════════════════ -->
      <div class="guide-section">
        <SectionTitle title="緊急處置步驟" />

        <div class="steps-timeline">
          <template v-for="(step, idx) in steps" :key="step.n">
            <!-- Step row -->
            <div class="step-row">
              <div class="step-row__badge">{{ step.n }}</div>
              <div class="step-row__body">
                <div class="step-row__title">{{ step.title }}</div>
                <div class="step-row__desc">{{ step.desc }}</div>
              </div>
            </div>
            <!-- Connector between steps -->
            <div v-if="idx < steps.length - 1" class="step-connector" />
          </template>
        </div>

        <!-- Warning banner -->
        <div class="warn-banner">
          <span class="warn-banner__icon">⚠️</span>
          <span class="warn-banner__text">
            請勿自行放生！放生不等於救援，外來種或受傷個體放生反而造成二次傷害。
          </span>
        </div>
      </div>

      <!-- ══ SECTION 4 — 救傷聯絡電話 ════════════════════════════════ -->
      <div class="guide-section guide-section--tinted">
        <SectionTitle title="救傷聯絡電話" />

        <div class="contact-grid">
          <div v-for="c in contacts" :key="c.org" class="contact-row">
            <span class="contact-row__org">{{ c.org }}</span>
            <span class="contact-row__phone">{{ c.phone }}</span>
          </div>
        </div>

        <!-- PDF download button -->
        <div class="download-wrap">
          <a
            href="/downloads/wild-bird/wild-bird-rescue-guide.pdf"
            download
            class="download-btn"
          >
            📄 下載完整救傷傳單 PDF
          </a>
        </div>
      </div>

      <!-- ══ FOOTER ════════════════════════════════════════════════════ -->
      <div class="guide-footer">
        <span class="guide-footer__left">資料來源：台北鳥會野鳥救傷中心 · 中科大野鳥救傷社群</span>
        <span class="guide-footer__right">野鳥救傷指引</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

// ── Inline SectionTitle component ─────────────────────────────────────────
const SectionTitle = defineComponent({
  props: { title: { type: String, required: true } },
  setup(props) {
    return () =>
      h('div', { class: 'section-title' }, [
        h('div', { class: 'section-title__text' }, props.title),
        h('div', { class: 'section-title__bar' }),
      ])
  },
})

// ── Data ──────────────────────────────────────────────────────────────────
const signs = [
  { emoji: '🩹', label: '身上有傷口',   desc: '出血、骨折、脫臼等明顯外傷' },
  { emoji: '😵', label: '精神萎靡',     desc: '對周圍環境無反應、眼神渙散' },
  { emoji: '🌡️', label: '體溫偏低',     desc: '身體冰涼、無法維持正常體溫' },
  { emoji: '🪶', label: '翅膀不對稱',   desc: '單側下垂或無法正常收攏' },
  { emoji: '💧', label: '羽毛凌亂濕透', desc: '羽毛糾結、無法正常防水保溫' },
]

const ageCards = [
  {
    emoji: '🐣',
    name: '雛鳥',
    badge: '需要幫助',
    badgeColor: '#F57600',
    borderColor: '#F57600',
    points: [
      '全身絨毛或幾乎裸露',
      '眼睛尚未睜開或剛睜開',
      '無法站立，依賴親鳥餵食',
      '➜ 請立即聯繫救傷單位',
    ],
  },
  {
    emoji: '🐦',
    name: '幼鳥',
    badge: '視情況判斷',
    badgeColor: '#2c5f2d',
    borderColor: '#2c5f2d',
    points: [
      '羽毛已漸長齊，但仍蓬鬆',
      '能短距離跳躍，翅膀尚弱',
      '可能是正常的離巢學飛',
      '➜ 觀察親鳥是否仍在附近',
    ],
  },
  {
    emoji: '🦅',
    name: '成鳥',
    badge: '通常需要救援',
    badgeColor: '#888',
    borderColor: '#888',
    points: [
      '羽毛完整、對人類戒心強',
      '若能被人輕易捉住通常表示受傷',
      '行動遲緩或無法飛翔',
      '➜ 確認異常後聯繫救傷單位',
    ],
  },
]

const steps = [
  {
    n: 1,
    title: '確認羽毛是否濕透',
    desc: '若羽毛沾水潮濕，請先用乾紙巾輕輕吸乾，不可用吹風機。',
  },
  {
    n: 2,
    title: '補充電解質水分',
    desc: '以運動飲料與水按 1：5～6 比例稀釋，用棉棒或吸管從嘴尖緩慢滴入，切勿滴入鼻孔。',
  },
  {
    n: 3,
    title: '禁止自行餵食',
    desc: '不可餵食麵包、米飯、牛奶等食物，不當餵食會造成嗆吸或消化道損傷。',
  },
  {
    n: 4,
    title: '製作野鳥運送箱',
    desc: '選用有蓋紙箱，底部鋪報紙（勿用毛巾、布料），側邊挖氣孔，不要塞太滿。',
  },
  {
    n: 5,
    title: '立即聯絡救傷單位',
    desc: '準備好發現地點、鳥的狀況描述，依下方電話聯繫最近的救傷單位。',
  },
]

const contacts = [
  { org: '台北鳥會野鳥救傷中心',   phone: '02-8732-8891' },
  { org: '台北市動物保護處',       phone: '02-8789-7158' },
  { org: '24小時動物救援專線',     phone: '02-8791-3064' },
  { org: '新北市動物保護防疫處',   phone: '02-2959-6353' },
  { org: '特生中心野生動物急救站', phone: '049-2761313'  },
  { org: '民眾服務專線',           phone: '1999'         },
]
</script>

<style scoped lang="scss">
/* ── Page background ──────────────────────────────────────────────────── */
.guide-page-bg {
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

/* ── White card ───────────────────────────────────────────────────────── */
.guide-card {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

/* ── Header ───────────────────────────────────────────────────────────── */
.guide-header {
  padding: 36px 40px 28px;
  border-bottom: 1px solid rgba(44,95,45,0.12);
  background: linear-gradient(135deg, rgba(211,227,187,0.5) 0%, rgba(255,255,255,0) 60%);
  position: relative;

  &__deco {
    position: absolute;
    top: 18px;
    right: 40px;
    font-size: 68px;
    opacity: 0.07;
    user-select: none;
    line-height: 1;
    transform: rotate(15deg);
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

/* ── Section wrapper ──────────────────────────────────────────────────── */
.guide-section {
  padding: 28px 40px 32px;

  &--tinted {
    background-color: rgba(211,227,187,0.25);
  }
}

/* ── SectionTitle (component styles) ─────────────────────────────────── */
:deep(.section-title) {
  margin-bottom: 20px;
}
:deep(.section-title__text) {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2c5f2d;
  margin-bottom: 8px;
}
:deep(.section-title__bar) {
  width: 36px;
  height: 3px;
  background-color: #F57600;
  border-radius: 2px;
}

/* ── Signs grid ───────────────────────────────────────────────────────── */
.signs-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.sign-card {
  background-color: #fff8f0;
  border: 1px solid rgba(245,118,0,0.15);
  border-radius: 10px;
  padding: 18px 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &__emoji {
    font-size: 36px;
    line-height: 1.2;
  }

  &__label {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #2c5f2d;
  }

  &__desc {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 12px;
    color: #777;
    line-height: 1.5;
  }
}

/* ── Age cards grid ───────────────────────────────────────────────────── */
.age-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.age-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 22px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-top: 3px solid transparent; // overridden by :style

  &__badge-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  &__badge {
    color: #fff;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 11px;
    font-weight: 600;
    border-radius: 20px;
    padding: 3px 10px;
    letter-spacing: 0.02em;
  }

  &__emoji {
    font-size: 40px;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  &__name {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 14px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__list-item {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 13px;
    line-height: 1.8;
  }
}

/* ── Steps timeline ───────────────────────────────────────────────────── */
.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;

  &__badge {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #F57600;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(245,118,0,0.3);
  }

  &__body {
    padding-top: 6px;
    flex: 1;
  }

  &__title {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #2c5f2d;
    margin-bottom: 4px;
  }

  &__desc {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 13px;
    color: #555;
    line-height: 1.6;
  }
}

.step-connector {
  width: 2px;
  height: 20px;
  background-color: rgba(245,118,0,0.3);
  margin-left: 19px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 1px;
}

/* ── Warning banner ───────────────────────────────────────────────────── */
.warn-banner {
  margin-top: 24px;
  background-color: rgba(220,38,38,0.06);
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon { font-size: 18px; flex-shrink: 0; }

  &__text {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 13px;
    color: #b91c1c;
    line-height: 1.6;
  }
}

/* ── Contact grid ─────────────────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 24px;
}

.contact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(44,95,45,0.15);
  padding: 10px 0;
  gap: 12px;

  &__org {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2c5f2d;
  }

  &__phone {
    background-color: #fff;
    border: 1px solid rgba(44,95,45,0.2);
    border-radius: 6px;
    padding: 4px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2c5f2d;
    letter-spacing: 0.03em;
    white-space: nowrap;
    flex-shrink: 0;
  }
}

/* ── Download button ──────────────────────────────────────────────────── */
.download-wrap {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.download-btn {
  background-color: #F57600;
  color: #fff;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 32px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(245,118,0,0.35);
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background-color: #d4620a;
    transform: translateY(-1px);
  }
}

/* ── Footer ───────────────────────────────────────────────────────────── */
.guide-footer {
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

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .signs-grid   { grid-template-columns: repeat(3, 1fr); }
  .age-grid     { grid-template-columns: repeat(2, 1fr); }
  .contact-grid { grid-template-columns: 1fr; }

  .guide-header,
  .guide-section { padding-left: 24px; padding-right: 24px; }
}

@media (max-width: 480px) {
  .signs-grid { grid-template-columns: repeat(2, 1fr); }
  .age-grid   { grid-template-columns: 1fr; }

  .guide-header,
  .guide-section { padding-left: 16px; padding-right: 16px; }
}
</style>
