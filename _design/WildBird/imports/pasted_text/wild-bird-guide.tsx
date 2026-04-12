Design a single-page React + TypeScript component called WildBirdGuide.
No external libraries. All styles as inline style objects.
Font imports via <style> tag: Google Fonts — Inter and Noto Sans TC.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERALL LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Page background:
  backgroundColor: "#d3e3bb"
  backgroundImage: "radial-gradient(ellipse at 20% 30%, rgba(100,140,60,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(60,100,40,0.14) 0%, transparent 55%)"
  minHeight: "100vh"
  padding: "32px 16px 48px"
  display flex, justifyContent center, alignItems flex-start

Inside: one white card container
  width 100%, maxWidth 1200px
  backgroundColor #FFFFFF
  borderRadius 16px
  boxShadow "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)"
  overflow hidden

━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — HEADER
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Same header pattern as previous pages in this project:
  padding "36px 40px 28px"
  borderBottom "1px solid rgba(44,95,45,0.12)"
  background "linear-gradient(135deg, rgba(211,227,187,0.5) 0%, rgba(255,255,255,0) 60%)"
  position relative

Decorative emoji (top-right, absolute):
  emoji: 🦜   fontSize 68px   opacity 0.07   userSelect none
  transform "rotate(15deg)"

h2 title: "發現受傷野鳥，怎麼辦？"
  fontFamily Noto Sans TC   fontSize 28px   fontWeight 700
  color #2c5f2d   margin "0 0 10px"   letterSpacing 0.04em

Subtitle paragraph:
  "依照以下步驟判斷狀況、緊急處置，再聯繫專業救傷單位。"
  fontFamily Noto Sans TC   fontSize 15px   color #555   lineHeight 1.7

Decorative bars row (marginTop 16px, gap 8px):
  32px × 3px  #F57600
  16px × 3px  #2c5f2d
  8px  × 3px  #F78B26
  borderRadius 2px each

━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — 鳥類異常狀態 (5 signs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Wrapper: padding "28px 40px 32px"
Section label (same style as Steps section below):
  "如何判斷野鳥受傷？"  fontSize 20px  fontWeight 700  color #2c5f2d
  Orange underbar 36px × 3px  #F57600  marginBottom 20px

5-column grid (gap 16px) of sign cards.
Each sign card:
  backgroundColor "#fff8f0"
  border "1px solid rgba(245,118,0,0.15)"
  borderRadius 10px
  padding "18px 12px"
  textAlign center
  display flex, flexDirection column, alignItems center, gap 8px

Inside each card:
  Large emoji icon (fontSize 36px)
  Label text (fontFamily Noto Sans TC, fontSize 14px, fontWeight 700, color #2c5f2d)
  Sub-description (fontSize 12px, color #777, lineHeight 1.5)

5 signs data:
  { emoji: "🩹", label: "身上有傷口",   desc: "出血、骨折、脫臼等明顯外傷" }
  { emoji: "😵", label: "精神萎靡",     desc: "對周圍環境無反應、眼神渙散" }
  { emoji: "🌡️", label: "體溫偏低",     desc: "身體冰涼、無法維持正常體溫" }
  { emoji: "🪶", label: "翅膀不對稱",   desc: "單側下垂或無法正常收攏" }
  { emoji: "💧", label: "羽毛凌亂濕透", desc: "羽毛糾結、無法正常防水保溫" }

━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — 野鳥年齡怎麼分？ (3 age types)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

backgroundColor "rgba(211,227,187,0.25)"  padding "28px 40px 32px"

Section label: "野鳥年齡怎麼分？"  same style as above

3-column grid (gap 20px):

Each age card:
  backgroundColor #FFFFFF
  borderRadius 12px
  padding "22px 20px"
  boxShadow "0 2px 12px rgba(0,0,0,0.08)"
  borderTop "3px solid" with color per card

Card 1 — 雛鳥 (borderTop color #F57600):
  Top badge pill: "需要幫助" — backgroundColor #F57600, color #fff, fontSize 11px, borderRadius 20px, padding "3px 10px"
  Emoji: 🐣  fontSize 40px  textAlign center
  Name: "雛鳥"  fontSize 18px  fontWeight 700  color #2c5f2d
  Description list (fontSize 13px, color #555, lineHeight 1.8):
    • 全身絨毛或幾乎裸露
    • 眼睛尚未睜開或剛睜開
    • 無法站立，依賴親鳥餵食
    • ➜ 請立即聯繫救傷單位

Card 2 — 幼鳥 (borderTop color #2c5f2d):
  Top badge pill: "視情況判斷" — backgroundColor #2c5f2d, color #fff
  Emoji: 🐦  fontSize 40px
  Name: "幼鳥"
  Description list:
    • 羽毛已漸長齊，但仍蓬鬆
    • 能短距離跳躍，翅膀尚弱
    • 可能是正常的離巢學飛
    • ➜ 觀察親鳥是否仍在附近

Card 3 — 成鳥 (borderTop color #888):
  Top badge pill: "通常需要救援" — backgroundColor #888, color #fff
  Emoji: 🦅  fontSize 40px
  Name: "成鳥"
  Description list:
    • 羽毛完整、對人類戒心強
    • 若能被人輕易捉住通常表示受傷
    • 行動遲緩或無法飛翔
    • ➜ 確認異常後聯繫救傷單位

━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — 緊急處置步驟
━━━━━━━━━━━━━━━━━━━━━━━━━━━

padding "28px 40px 32px"
Section label: "緊急處置步驟"

Vertical timeline list (flexDirection column, gap 12px).
Each step row:
  display flex, alignItems flex-start, gap 16px

Left side: circle badge (40px × 40px, borderRadius 50%, backgroundColor #F57600,
  color #fff, fontFamily Inter, fontSize 16px, fontWeight 700, flexShrink 0,
  display flex, alignItems center, justifyContent center)

Right side:
  Step title (fontFamily Noto Sans TC, fontSize 15px, fontWeight 700, color #2c5f2d, marginBottom 4px)
  Step description (fontSize 13px, color #555, lineHeight 1.6)

Between step rows: a vertical connector line segment (2px wide, 20px tall, backgroundColor rgba(245,118,0,0.3), marginLeft 19px)

5 steps data:
  { n:1, title:"確認羽毛是否濕透",      desc:"若羽毛沾水潮濕，請先用乾紙巾輕輕吸乾，不可用吹風機。" }
  { n:2, title:"補充電解質水分",         desc:"以運動飲料與水按 1：5～6 比例稀釋，用棉棒或吸管從嘴尖緩慢滴入，切勿滴入鼻孔。" }
  { n:3, title:"禁止自行餵食",           desc:"不可餵食麵包、米飯、牛奶等食物，不當餵食會造成嗚吸或消化道損傷。" }
  { n:4, title:"製作野鳥運送箱",         desc:"選用有蓋紙箱，底部鋪報紙（勿用毛巾、布料），側邊挖氣孔，不要塞太滿。" }
  { n:5, title:"立即聯絡救傷單位",       desc:"準備好發現地點、鳥的狀況描述，依下方電話聯繫最近的救傷單位。" }

After the timeline, add a warning banner:
  backgroundColor "rgba(220,38,38,0.06)"
  border "1px solid rgba(220,38,38,0.2)"
  borderRadius 8px  padding "12px 20px"
  display flex, alignItems center, gap 10px
  ⚠️ icon (fontSize 18px)
  Text: "請勿自行放生！放生不等於救援，外來種或受傷個體放生反而造成二次傷害。"
  fontFamily Noto Sans TC  fontSize 13px  color #b91c1c  lineHeight 1.6

━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — 救傷聯絡電話
━━━━━━━━━━━━━━━━━━━━━━━━━━━

backgroundColor "rgba(211,227,187,0.25)"  padding "28px 40px 32px"
Section label: "救傷聯絡電話"

Contact list as 2-column grid (gap 12px 24px):
Each contact item: display flex, justifyContent space-between, alignItems center
  borderBottom "1px dashed rgba(44,95,45,0.15)"  paddingBottom 10px

Left: org name (fontFamily Noto Sans TC, fontSize 14px, fontWeight 600, color #2c5f2d)
Right: phone number chip
  backgroundColor #fff  border "1px solid rgba(44,95,45,0.2)"
  borderRadius 6px  padding "4px 12px"
  fontFamily Inter  fontSize 14px  fontWeight 600  color #2c5f2d
  letterSpacing 0.03em

6 contacts data:
  { org: "台北鳥會野鳥救傷中心",          phone: "02-8732-8891" }
  { org: "台北市動物保護處",              phone: "02-8789-7158" }
  { org: "24小時動物救援專線",            phone: "02-8791-3064" }
  { org: "新北市動物保護防疫處",           phone: "02-2959-6353" }
  { org: "特生中心野生動物急救站",         phone: "049-2761313"  }
  { org: "民眾服務專線",                  phone: "1999"         }

Below the contact list, a centered download button:
  marginTop 24px  display flex  justifyContent center
  <a> tag styled as button:
    backgroundColor #F57600  color #fff
    fontFamily Noto Sans TC  fontSize 15px  fontWeight 700
    padding "12px 32px"  borderRadius 8px  textDecoration none
    display inline-flex  alignItems center  gap 8px
    boxShadow "0 4px 16px rgba(245,118,0,0.35)"
    Text: "📄 下載完整救傷傳單 PDF"
    href="#"  (placeholder)

━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Same footer pattern as previous pages:
  padding "16px 32px"
  borderTop "1px solid rgba(44,95,45,0.1)"
  backgroundColor "rgba(211,227,187,0.25)"
  display flex, justifyContent space-between, alignItems center

Left: "資料來源：台北鳥會野鳥救傷中心 · 中科大野鳥救傷社群"
  fontFamily Noto Sans TC  fontSize 12px  color #888

Right: "野鳥救傷指引"
  fontFamily Inter  fontSize 12px  color #aaa

━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add responsive <style> tag:

@media (max-width: 768px) {
  .signs-grid  { grid-template-columns: repeat(3, 1fr) !important; }
  .age-grid    { grid-template-columns: repeat(2, 1fr) !important; }
  .contact-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 480px) {
  .signs-grid  { grid-template-columns: repeat(2, 1fr) !important; }
  .age-grid    { grid-template-columns: 1fr !important; }
}
