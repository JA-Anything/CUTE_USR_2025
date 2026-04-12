import baitouwengImg from "../../imports/白頭翁-2.jpg";

interface DiyBird {
  id: number;
  name: string;
  englishName: string;
  colors: string[];
  available: boolean;
  imageType: "photo" | "svg";
  photo?: string;
}

const diyBirds: DiyBird[] = [
  {
    id: 1,
    name: "白頭翁",
    englishName: "Light-vented Bulbul",
    colors: ["#e8e8e0", "#c8d88a", "#888880"],
    available: true,
    imageType: "photo",
    photo: baitouwengImg,
  },
  {
    id: 2,
    name: "紅嘴黑鵯",
    englishName: "Black Bulbul",
    colors: ["#1a1a1a", "#e8e8e8", "#cc2222"],
    available: true,
    imageType: "svg",
  },
  {
    id: 3,
    name: "珠頸斑鳩",
    englishName: "Spotted Dove",
    colors: ["#c8a87a", "#a08060", "#d0b090"],
    available: true,
    imageType: "svg",
  },
  {
    id: 4,
    name: "臺灣藍鵲",
    englishName: "Taiwan Blue Magpie",
    colors: ["#2255aa", "#4488cc", "#ffffff"],
    available: false,
    imageType: "svg",
  },
];

// SVG bird illustrations — spread-wings paper craft style
function BirdSvg({ bird }: { bird: DiyBird }) {
  const [c1, c2, c3] = bird.colors;

  if (bird.name === "紅嘴黑鵯") {
    return (
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Stick */}
        <rect x="146" y="220" width="8" height="140" fill="#c8a060" rx="2" />
        {/* Body */}
        <ellipse cx="150" cy="200" rx="28" ry="22" fill={c1} />
        {/* Left wing spread */}
        <path d="M150,195 C110,170 60,130 30,90 C50,88 80,110 100,135 C80,100 90,70 110,65 C115,100 120,130 135,165 C125,140 135,110 148,100 C150,130 150,165 150,195Z"
          fill={c1} stroke="#333" strokeWidth="0.8" />
        {/* Right wing spread */}
        <path d="M150,195 C190,170 240,130 270,90 C250,88 220,110 200,135 C220,100 210,70 190,65 C185,100 180,130 165,165 C175,140 165,110 152,100 C150,130 150,165 150,195Z"
          fill="#3a3a3a" stroke="#555" strokeWidth="0.8" />
        {/* Tail */}
        <path d="M140,218 C135,240 130,260 145,270 L150,220 L155,270 C170,260 165,240 160,218Z"
          fill={c1} stroke="#333" strokeWidth="0.6" />
        {/* Head */}
        <ellipse cx="150" cy="182" rx="18" ry="17" fill={c1} />
        {/* Red beak */}
        <path d="M133,180 L128,183 L133,186Z" fill="#dd2222" />
        {/* Eye */}
        <circle cx="138" cy="180" r="3.5" fill="#ffffff" />
        <circle cx="138" cy="180" r="2" fill="#111" />
        <circle cx="137" cy="179" r="0.8" fill="#fff" />
        {/* Crest */}
        <path d="M148,166 C150,155 155,148 152,162Z" fill={c1} />
        {/* Wing feather details */}
        <path d="M75,110 C95,125 115,145 135,170" stroke="#555" strokeWidth="0.5" fill="none" strokeDasharray="3,2" />
        <path d="M90,95 C108,112 122,132 138,160" stroke="#555" strokeWidth="0.5" fill="none" strokeDasharray="3,2" />
        {/* Hand silhouette */}
        <rect x="130" y="330" width="40" height="50" rx="8" fill="#d4a882" />
        <rect x="120" y="320" width="15" height="30" rx="6" fill="#d4a882" />
        <rect x="115" y="315" width="13" height="28" rx="6" fill="#c89a72" />
        <rect x="155" y="325" width="15" height="28" rx="6" fill="#d4a882" />
        <rect x="168" y="328" width="13" height="25" rx="6" fill="#d4a882" />
      </svg>
    );
  }

  if (bird.name === "珠頸斑鳩") {
    return (
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Stick */}
        <rect x="146" y="225" width="8" height="135" fill="#b89050" rx="2" />
        {/* Left wing */}
        <path d="M150,200 C108,178 58,148 22,100 C44,96 76,118 100,142 C78,108 86,78 108,72 C113,105 118,138 136,168 C126,142 136,112 150,200Z"
          fill={c1} stroke="#a08060" strokeWidth="0.7" />
        {/* Right wing */}
        <path d="M150,200 C192,178 242,148 278,100 C256,96 224,118 200,142 C222,108 214,78 192,72 C187,105 182,138 164,168 C174,142 164,112 150,200Z"
          fill={c2} stroke="#806040" strokeWidth="0.7" />
        {/* Body */}
        <ellipse cx="150" cy="207" rx="26" ry="21" fill={c3} />
        {/* Tail */}
        <path d="M142,224 C136,246 134,265 150,272 L150,225 L150,272 C166,265 164,246 158,224Z"
          fill={c1} stroke="#a08060" strokeWidth="0.5" />
        {/* Head */}
        <ellipse cx="150" cy="188" rx="17" ry="16" fill="#d8c0a0" />
        {/* Neck spots (pearl-neck pattern) */}
        {[...Array(5)].map((_, i) => (
          <ellipse key={i} cx={140 + i * 5} cy={198 + (i % 2) * 2} rx="2" ry="1.5"
            fill="#222" opacity="0.7" />
        ))}
        {/* Beak */}
        <path d="M134,187 L128,190 L134,193Z" fill="#888" />
        {/* Eye */}
        <circle cx="140" cy="186" r="3" fill="#fff" />
        <circle cx="140" cy="186" r="2" fill="#c83030" />
        <circle cx="139.3" cy="185.3" r="0.7" fill="#fff" />
        {/* Feather lines */}
        <path d="M55,118 C80,132 108,152 136,174" stroke="#9a7850" strokeWidth="0.5" fill="none" strokeDasharray="4,3" />
        <path d="M65,105 C90,118 115,140 138,168" stroke="#9a7850" strokeWidth="0.5" fill="none" strokeDasharray="4,3" />
        {/* Hand */}
        <rect x="130" y="335" width="40" height="45" rx="8" fill="#d4a882" />
        <rect x="120" y="328" width="15" height="28" rx="6" fill="#d4a882" />
        <rect x="115" y="322" width="13" height="26" rx="6" fill="#c89a72" />
        <rect x="155" y="332" width="15" height="26" rx="6" fill="#d4a882" />
        <rect x="168" y="335" width="13" height="24" rx="6" fill="#d4a882" />
      </svg>
    );
  }

  // 臺灣藍鵲
  return (
    <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Long tail */}
      <path d="M148,228 C142,255 136,280 138,320 L143,320 L150,228 L157,320 L162,320 C164,280 158,255 152,228Z"
        fill={c1} stroke="#1a4488" strokeWidth="0.5" />
      {/* White tail tip */}
      <ellipse cx="140" cy="318" rx="5" ry="4" fill="#ffffff" />
      <ellipse cx="160" cy="318" rx="5" ry="4" fill="#ffffff" />
      {/* Stick */}
      <rect x="146" y="210" width="8" height="120" fill="#b89050" rx="2" />
      {/* Left wing */}
      <path d="M150,195 C105,172 55,138 20,88 C42,84 78,108 104,135 C82,100 90,70 112,64 C117,98 122,132 138,165 C128,138 138,108 150,195Z"
        fill={c1} stroke="#1a4488" strokeWidth="0.7" />
      {/* Right wing */}
      <path d="M150,195 C195,172 245,138 280,88 C258,84 222,108 196,135 C218,100 210,70 188,64 C183,98 178,132 162,165 C172,138 162,108 150,195Z"
        fill={c2} stroke="#3366aa" strokeWidth="0.7" />
      {/* Body */}
      <ellipse cx="150" cy="202" rx="26" ry="20" fill={c1} />
      {/* Head - black */}
      <ellipse cx="150" cy="184" rx="18" ry="17" fill="#111111" />
      {/* Beak - red/orange */}
      <path d="M132,183 L126,186 L132,189Z" fill="#dd3300" />
      {/* Eye */}
      <circle cx="138" cy="182" r="4" fill="#ffdd00" />
      <circle cx="138" cy="182" r="2.5" fill="#111" />
      <circle cx="137" cy="181" r="1" fill="#fff" />
      {/* Wing highlight feathers */}
      <path d="M52,105 C80,122 112,148 138,172" stroke="#4488cc" strokeWidth="0.8" fill="none" strokeDasharray="5,3" opacity="0.6" />
      <path d="M66,92 C92,108 118,135 140,168" stroke="#4488cc" strokeWidth="0.8" fill="none" strokeDasharray="5,3" opacity="0.6" />
      {/* Hand */}
      <rect x="130" y="318" width="40" height="50" rx="8" fill="#d4a882" opacity="0.9" />
      <rect x="120" y="310" width="15" height="30" rx="6" fill="#d4a882" opacity="0.9" />
      <rect x="115" y="304" width="13" height="28" rx="6" fill="#c89a72" opacity="0.9" />
      <rect x="155" y="315" width="15" height="28" rx="6" fill="#d4a882" opacity="0.9" />
      <rect x="168" y="318" width="13" height="25" rx="6" fill="#d4a882" opacity="0.9" />
    </svg>
  );
}

function DiyCard({ bird }: { bird: DiyBird }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        backgroundColor: "#ffffff",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 32px rgba(0,0,0,0.28)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)";
      }}
    >
      {/* Photo area — black background */}
      <div
        style={{
          backgroundColor: "#0a0a0a",
          position: "relative",
          paddingBottom: "133.33%", // 3:4
          overflow: "hidden",
        }}
      >
        {bird.imageType === "photo" && bird.photo ? (
          <img
            src={bird.photo}
            alt={bird.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 8px 8px",
            }}
          >
            <BirdSvg bird={bird} />
          </div>
        )}

        {/* "敬請期待" badge for disabled card */}
        {!bird.available && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "#F57600",
              color: "#ffffff",
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "20px",
              letterSpacing: "0.04em",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            敬請期待
          </div>
        )}

        {/* Subtle vignette for photos */}
        {bird.imageType === "photo" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Info area */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "12px 16px 14px",
        }}
      >
        {/* Bird name */}
        <div
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#2c5f2d",
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          {bird.name}
        </div>
        {/* English name */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "#aaa",
            textAlign: "center",
            marginBottom: "10px",
            letterSpacing: "0.02em",
          }}
        >
          {bird.englishName}
        </div>

        {/* Download button */}
        <button
          disabled={!bird.available}
          onClick={(e) => {
            e.stopPropagation();
            if (bird.available) {
              alert(`「${bird.name}」製作模板下載中...`);
            }
          }}
          style={{
            width: "100%",
            backgroundColor: bird.available ? "#F57600" : "#cccccc",
            color: "#ffffff",
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            padding: "9px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: bird.available ? "pointer" : "not-allowed",
            transition: "background 0.2s ease",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            if (bird.available) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4620a";
            }
          }}
          onMouseLeave={(e) => {
            if (bird.available) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F57600";
            }
          }}
        >
          {bird.available ? "下載製作模板 ↓" : "模板即將推出"}
        </button>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: "✂️",
    step: 1,
    title: "下載並列印紙模",
    description: "選擇喜歡的鳥種，下載 PDF 後以 A4 紙張印出",
  },
  {
    icon: "🎨",
    step: 2,
    title: "剪下並上色",
    description: "沿虛線剪下各部位，用色鉛筆或水彩自由上色",
  },
  {
    icon: "🐦",
    step: 3,
    title: "組裝完成！",
    description: "依照說明折疊黏合，插上竹籤即完成萌鳥棒棒！",
  },
];

export function DiyPage() {
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
        {/* ── Header ── */}
        <div
          style={{
            padding: "36px 40px 28px",
            borderBottom: "1px solid rgba(44,95,45,0.12)",
            background:
              "linear-gradient(135deg, rgba(211,227,187,0.5) 0%, rgba(255,255,255,0) 60%)",
            position: "relative",
          }}
        >
          {/* Decorative scissors motif */}
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "40px",
              fontSize: "68px",
              opacity: 0.07,
              userSelect: "none",
              lineHeight: 1,
              transform: "rotate(-15deg)",
            }}
          >
            ✂️
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
            萌鳥DIY手作
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
            由中科大野鳥救傷社群設計製作，剪下紙模、上色、組裝，做出專屬的棒棒萌鳥！
          </p>

          {/* Decorative bars */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "3px",
                backgroundColor: "#F57600",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "16px",
                height: "3px",
                backgroundColor: "#2c5f2d",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "3px",
                backgroundColor: "#F78B26",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>

        {/* ── Bird Cards Grid ── */}
        <div style={{ padding: "32px 40px 36px" }}>
          <div
            className="diy-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {diyBirds.map((bird) => (
              <DiyCard key={bird.id} bird={bird} />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            margin: "0 40px",
            height: "1px",
            backgroundColor: "rgba(44,95,45,0.1)",
          }}
        />

        {/* ── How-To Steps ── */}
        <div style={{ padding: "28px 40px 36px" }}>
          {/* Section title */}
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
              製作步驟
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

          <div
            className="steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {steps.map((s) => (
              <div
                key={s.step}
                style={{
                  backgroundColor: "#f0f5e8",
                  borderRadius: "10px",
                  padding: "20px",
                  position: "relative",
                }}
              >
                {/* Step number badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#F57600",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.step}
                </div>

                {/* Icon */}
                <div
                  style={{
                    fontSize: "32px",
                    textAlign: "center",
                    marginBottom: "10px",
                    marginTop: "4px",
                    lineHeight: 1.2,
                  }}
                >
                  {s.icon}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#2c5f2d",
                    textAlign: "center",
                    marginBottom: "6px",
                  }}
                >
                  {s.title}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: "13px",
                    color: "#666666",
                    lineHeight: 1.6,
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* Extra tip banner */}
          <div
            style={{
              marginTop: "16px",
              backgroundColor: "rgba(245,118,0,0.06)",
              border: "1px solid rgba(245,118,0,0.2)",
              borderRadius: "8px",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "18px" }}>💡</span>
            <span
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "13px",
                color: "#555",
                lineHeight: 1.6,
              }}
            >
              小訣竅：建議使用 200g 以上的厚紙張列印，成品更挺立耐用；上色時先淡後深，留白處更顯層次感！
            </span>
          </div>
        </div>

        {/* ── Footer ── */}
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
            設計製作：中科大野鳥救傷社群
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#aaa",
            }}
          >
            {diyBirds.length} 種鳥類
          </span>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .diy-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .diy-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
