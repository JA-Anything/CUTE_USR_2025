import { Bird } from "../data/birds";

interface BirdCardProps {
  bird: Bird;
  onClick: (bird: Bird) => void;
}

export function BirdCard({ bird, onClick }: BirdCardProps) {
  return (
    <div
      onClick={() => onClick(bird)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      {/* Photo area */}
      <div
        style={{
          width: "100%",
          paddingBottom: "133.33%", // 3:4 aspect ratio
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={bird.image}
          alt={bird.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
          }}
        />
      </div>

      {/* Name label */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "8px 12px",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            color: "#2c5f2d",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          {bird.name}
        </span>
      </div>
    </div>
  );
}
