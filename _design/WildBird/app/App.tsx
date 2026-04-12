import { useState } from "react";
import { birds, Bird } from "./data/birds";
import { BirdCard } from "./components/BirdCard";
import { BirdModal } from "./components/BirdModal";
import { DiyPage } from "./components/DiyPage";
import { WildBirdGuide } from "./components/WildBirdGuide";

type PageId = "birds" | "diy" | "guide";

const pages: { id: PageId; label: string; emoji: string }[] = [
  { id: "birds", label: "台北城市常見野鳥", emoji: "🐦" },
  { id: "diy",   label: "萌鳥DIY手作",      emoji: "✂️" },
  { id: "guide", label: "野鳥救傷指引",      emoji: "🦜" },
];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("birds");
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);

  const handleCardClick = (bird: Bird) => {
    setSelectedBird(bird);
  };

  const handleCloseModal = () => {
    setSelectedBird(null);
  };

  return (
    <>
      {/* ── Page Tab Navigation ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          backgroundColor: "rgba(44,95,45,0.97)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          gap: "4px",
          height: "52px",
        }}
      >
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "14px",
              fontWeight: activePage === page.id ? 700 : 400,
              color: activePage === page.id ? "#ffffff" : "rgba(255,255,255,0.65)",
              backgroundColor:
                activePage === page.id ? "rgba(255,255,255,0.15)" : "transparent",
              border:
                activePage === page.id
                  ? "1px solid rgba(255,255,255,0.25)"
                  : "1px solid transparent",
              borderRadius: "8px",
              padding: "6px 18px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              letterSpacing: "0.03em",
            }}
          >
            <span style={{ fontSize: "15px" }}>{page.emoji}</span>
            {page.label}
          </button>
        ))}

        {/* Accent dot */}
        <div
          style={{
            position: "absolute",
            left: "24px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#F57600",
          }}
        />
      </div>

      {/* ── Content area (offset by nav height) ── */}
      <div style={{ paddingTop: "52px" }}>
        {activePage === "birds" && (
          <>
            {/* Page background */}
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
                {/* Header */}
                <div
                  style={{
                    padding: "36px 40px 28px",
                    borderBottom: "1px solid rgba(44,95,45,0.12)",
                    background:
                      "linear-gradient(135deg, rgba(211,227,187,0.5) 0%, rgba(255,255,255,0) 60%)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "40px",
                      fontSize: "72px",
                      opacity: 0.08,
                      userSelect: "none",
                      lineHeight: 1,
                    }}
                  >
                    🌿
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
                    台北城市常見野鳥
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
                    六張犁周邊常見的 24 種城市野鳥，點選卡片即可查看詳細介紹。
                  </p>

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

                {/* Bird grid */}
                <div style={{ padding: "28px 32px 36px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "20px",
                    }}
                    className="bird-grid"
                  >
                    {birds.map((bird) => (
                      <BirdCard key={bird.id} bird={bird} onClick={handleCardClick} />
                    ))}
                  </div>
                </div>

                {/* Footer */}
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
                    資料來源：台北市野鳥學會 · 六張犁生態調查報告
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      color: "#aaa",
                    }}
                  >
                    {birds.length} 種鳥類
                  </span>
                </div>
              </div>
            </div>

            {/* Bird Modal */}
            <BirdModal bird={selectedBird} onClose={handleCloseModal} />
          </>
        )}

        {activePage === "diy" && <DiyPage />}

        {activePage === "guide" && <WildBirdGuide />}
      </div>

      {/* Global styles */}
      <style>{`
        @media (max-width: 768px) {
          .bird-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .bird-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        ::-webkit-scrollbar {
          display: none;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}