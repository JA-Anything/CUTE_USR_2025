const signs = [
  { emoji: "🩹", label: "身上有傷口",   desc: "出血、骨折、脫臼等明顯外傷" },
  { emoji: "😵", label: "精神萎靡",     desc: "對周圍環境無反應、眼神渙散" },
  { emoji: "🌡️", label: "體溫偏低",     desc: "身體冰涼、無法維持正常體溫" },
  { emoji: "🪶", label: "翅膀不對稱",   desc: "單側下垂或無法正常收攏" },
  { emoji: "💧", label: "羽毛凌亂濕透", desc: "羽毛糾結、無法正常防水保溫" },
];

const ageCards = [
  {
    emoji: "🐣",
    name: "雛鳥",
    badge: "需要幫助",
    badgeColor: "#F57600",
    borderColor: "#F57600",
    points: [
      "全身絨毛或幾乎裸露",
      "眼睛尚未睜開或剛睜開",
      "無法站立，依賴親鳥餵食",
      "➜ 請立即聯繫救傷單位",
    ],
  },
  {
    emoji: "🐦",
    name: "幼鳥",
    badge: "視情況判斷",
    badgeColor: "#2c5f2d",
    borderColor: "#2c5f2d",
    points: [
      "羽毛已漸長齊，但仍蓬鬆",
      "能短距離跳躍，翅膀尚弱",
      "可能是正常的離巢學飛",
      "➜ 觀察親鳥是否仍在附近",
    ],
  },
  {
    emoji: "🦅",
    name: "成鳥",
    badge: "通常需要救援",
    badgeColor: "#888",
    borderColor: "#888",
    points: [
      "羽毛完整、對人類戒心強",
      "若能被人輕易捉住通常表示受傷",
      "行動遲緩或無法飛翔",
      "➜ 確認異常後聯繫救傷單位",
    ],
  },
];

const steps = [
  {
    n: 1,
    title: "確認羽毛是否濕透",
    desc: "若羽毛沾水潮濕，請先用乾紙巾輕輕吸乾，不可用吹風機。",
  },
  {
    n: 2,
    title: "補充電解質水分",
    desc: "以運動飲料與水按 1：5～6 比例稀釋，用棉棒或吸管從嘴尖緩慢滴入，切勿滴入鼻孔。",
  },
  {
    n: 3,
    title: "禁止自行餵食",
    desc: "不可餵食麵包、米飯、牛奶等食物，不當餵食會造成嗆吸或消化道損傷。",
  },
  {
    n: 4,
    title: "製作野鳥運送箱",
    desc: "選用有蓋紙箱，底部鋪報紙（勿用毛巾、布料），側邊挖氣孔，不要塞太滿。",
  },
  {
    n: 5,
    title: "立即聯絡救傷單位",
    desc: "準備好發現地點、鳥的狀況描述，依下方電話聯繫最近的救傷單位。",
  },
];

const contacts = [
  { org: "台北鳥會野鳥救傷中心",  phone: "02-8732-8891" },
  { org: "台北市動物保護處",      phone: "02-8789-7158" },
  { org: "24小時動物救援專線",    phone: "02-8791-3064" },
  { org: "新北市動物保護防疫處",  phone: "02-2959-6353" },
  { org: "特生中心野生動物急救站", phone: "049-2761313"  },
  { org: "民眾服務專線",          phone: "1999"          },
];

// ── Reusable section heading ──────────────────────────────────────────────
function SectionTitle({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          fontFamily: "'Noto Sans TC', sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#2c5f2d",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: "36px",
          height: "3px",
          backgroundColor: "#F57600",
          borderRadius: "2px",
        }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export function WildBirdGuide() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#d3e3bb",
        backgroundImage:
          "radial-gradient(ellipse at 20% 30%, rgba(100,140,60,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(60,100,40,0.14) 0%, transparent 55%)",
        padding: "32px 16px 48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* White card container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >

        {/* ══ SECTION 1 — HEADER ══════════════════════════════════════════ */}
        <div
          style={{
            padding: "36px 40px 28px",
            borderBottom: "1px solid rgba(44,95,45,0.12)",
            background: "linear-gradient(135deg, rgba(211,227,187,0.5) 0%, rgba(255,255,255,0) 60%)",
            position: "relative",
          }}
        >
          {/* Decorative emoji */}
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "40px",
              fontSize: "68px",
              opacity: 0.07,
              userSelect: "none",
              lineHeight: 1,
              transform: "rotate(15deg)",
            }}
          >
            🦜
          </div>

          <h2
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#2c5f2d",
              margin: "0 0 10px",
              letterSpacing: "0.04em",
              lineHeight: 1.3,
            }}
          >
            發現受傷野鳥，怎麼辦？
          </h2>
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "15px",
              color: "#555555",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            依照以下步驟判斷狀況、緊急處置，再聯繫專業救傷單位。
          </p>

          {/* Decorative bars */}
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "3px", backgroundColor: "#F57600", borderRadius: "2px" }} />
            <div style={{ width: "16px", height: "3px", backgroundColor: "#2c5f2d", borderRadius: "2px" }} />
            <div style={{ width: "8px",  height: "3px", backgroundColor: "#F78B26", borderRadius: "2px" }} />
          </div>
        </div>

        {/* ══ SECTION 2 — 5 SIGNS ═════════════════════════════════════════ */}
        <div style={{ padding: "28px 40px 32px" }}>
          <SectionTitle title="如何判斷野鳥受傷？" />
          <div
            className="signs-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}
          >
            {signs.map((s) => (
              <div
                key={s.label}
                style={{
                  backgroundColor: "#fff8f0",
                  border: "1px solid rgba(245,118,0,0.15)",
                  borderRadius: "10px",
                  padding: "18px 12px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ fontSize: "36px", lineHeight: 1.2 }}>{s.emoji}</div>
                <div
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#2c5f2d",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: "12px",
                    color: "#777",
                    lineHeight: 1.5,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ SECTION 3 — AGE TYPES ═══════════════════════════════════════ */}
        <div
          style={{
            backgroundColor: "rgba(211,227,187,0.25)",
            padding: "28px 40px 32px",
          }}
        >
          <SectionTitle title="野鳥年齡怎麼分？" />
          <div
            className="age-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
          >
            {ageCards.map((card) => (
              <div
                key={card.name}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "22px 20px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  borderTop: `3px solid ${card.borderColor}`,
                }}
              >
                {/* Badge */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                  <span
                    style={{
                      backgroundColor: card.badgeColor,
                      color: "#fff",
                      fontFamily: "'Noto Sans TC', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      borderRadius: "20px",
                      padding: "3px 10px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Emoji */}
                <div style={{ fontSize: "40px", textAlign: "center", lineHeight: 1.2, marginBottom: "10px" }}>
                  {card.emoji}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#2c5f2d",
                    textAlign: "center",
                    marginBottom: "14px",
                  }}
                >
                  {card.name}
                </div>

                {/* Points */}
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {card.points.map((pt, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "'Noto Sans TC', sans-serif",
                        fontSize: "13px",
                        color: pt.startsWith("➜") ? card.badgeColor : "#555",
                        lineHeight: 1.8,
                        fontWeight: pt.startsWith("➜") ? 600 : 400,
                        paddingLeft: pt.startsWith("➜") ? 0 : "0",
                        borderTop: i === card.points.length - 1 ? "1px dashed rgba(0,0,0,0.08)" : "none",
                        paddingTop: i === card.points.length - 1 ? "8px" : 0,
                        marginTop: i === card.points.length - 1 ? "4px" : 0,
                      }}
                    >
                      {pt.startsWith("➜") ? pt : `• ${pt}`}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══ SECTION 4 — 緊急處置步驟 ════════════════════════════════════ */}
        <div style={{ padding: "28px 40px 32px" }}>
          <SectionTitle title="緊急處置步驟" />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((step, idx) => (
              <div key={step.n}>
                {/* Step row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  {/* Circle badge */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#F57600",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(245,118,0,0.3)",
                    }}
                  >
                    {step.n}
                  </div>

                  {/* Text */}
                  <div style={{ paddingTop: "6px", flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Noto Sans TC', sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#2c5f2d",
                        marginBottom: "4px",
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Noto Sans TC', sans-serif",
                        fontSize: "13px",
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {step.desc}
                    </div>
                  </div>
                </div>

                {/* Connector line between steps */}
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      width: "2px",
                      height: "20px",
                      backgroundColor: "rgba(245,118,0,0.3)",
                      marginLeft: "19px",
                      marginTop: "4px",
                      marginBottom: "4px",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Warning banner */}
          <div
            style={{
              marginTop: "24px",
              backgroundColor: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.2)",
              borderRadius: "8px",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "18px", flexShrink: 0 }}>⚠️</span>
            <span
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "13px",
                color: "#b91c1c",
                lineHeight: 1.6,
              }}
            >
              請勿自行放生！放生不等於救援，外來種或受傷個體放生反而造成二次傷害。
            </span>
          </div>
        </div>

        {/* ══ SECTION 5 — 救傷聯絡電話 ════════════════════════════════════ */}
        <div
          style={{
            backgroundColor: "rgba(211,227,187,0.25)",
            padding: "28px 40px 32px",
          }}
        >
          <SectionTitle title="救傷聯絡電話" />

          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 24px" }}
          >
            {contacts.map((c) => (
              <div
                key={c.org}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dashed rgba(44,95,45,0.15)",
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  gap: "12px",
                }}
              >
                {/* Org name */}
                <span
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#2c5f2d",
                  }}
                >
                  {c.org}
                </span>

                {/* Phone chip */}
                <span
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(44,95,45,0.2)",
                    borderRadius: "6px",
                    padding: "4px 12px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#2c5f2d",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {c.phone}
                </span>
              </div>
            ))}
          </div>

          {/* Download button */}
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                backgroundColor: "#F57600",
                color: "#fff",
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                padding: "12px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(245,118,0,0.35)",
                transition: "background 0.2s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d4620a";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F57600";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              📄 下載完整救傷傳單 PDF
            </a>
          </div>
        </div>

        {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: "16px 32px",
            borderTop: "1px solid rgba(44,95,45,0.1)",
            backgroundColor: "rgba(211,227,187,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "12px",
              color: "#888",
            }}
          >
            資料來源：台北鳥會野鳥救傷中心 · 中科大野鳥救傷社群
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#aaa",
            }}
          >
            野鳥救傷指引
          </span>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .signs-grid   { grid-template-columns: repeat(3, 1fr) !important; }
          .age-grid     { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .signs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .age-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
