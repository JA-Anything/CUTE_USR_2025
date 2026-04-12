import { useEffect, useCallback, useRef, useState } from "react";
import { Bird, birds } from "../data/birds";
import useEmblaCarousel from "embla-carousel-react";

interface BirdModalProps {
  bird: Bird | null;
  onClose: () => void;
}

function TrianglePattern() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "12px",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderBottom: i % 2 === 0 ? "12px solid #F57600" : "12px solid #2c5f2d",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function BirdDetailSlide({ bird }: { bird: Bird }) {
  return (
    <div
      style={{
        width: "100%",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Top triangle border */}
      <TrianglePattern />

      {/* Bird image */}
      <div
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={bird.image}
          alt={bird.name}
          style={{
            width: "100%",
            height: "340px",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
        {/* Gradient from bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
          }}
        />
      </div>

      {/* Bottom content */}
      <div style={{ padding: "16px 28px 20px", flexGrow: 1 }}>
        {/* Bird name */}
        <div
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#F57600",
            marginBottom: "4px",
            letterSpacing: "0.04em",
          }}
        >
          {bird.name}
        </div>

        {/* English & Latin name */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "#888",
            marginBottom: "12px",
            letterSpacing: "0.02em",
          }}
        >
          {bird.englishName} · <em>{bird.latinName}</em>
        </div>

        {/* Bottom triangle separator */}
        <div style={{ marginBottom: "12px" }}>
          <TrianglePattern />
        </div>

        {/* Info row */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "12px" }}>
          <div>
            <span
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#F57600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              棲地
            </span>
            <div
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "13px",
                color: "#555",
                marginTop: "2px",
              }}
            >
              {bird.habitat}
            </div>
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#F57600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              體長
            </span>
            <div
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: "13px",
                color: "#555",
                marginTop: "2px",
              }}
            >
              {bird.size}
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <p
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "14px",
            color: "#333333",
            lineHeight: 1.8,
            margin: "0 0 10px",
          }}
        >
          {bird.description1}
        </p>
        <p
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "14px",
            color: "#333333",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {bird.description2}
        </p>
      </div>
    </div>
  );
}

export function BirdModal({ bird, onClose }: BirdModalProps) {
  const initialIndex = bird ? birds.findIndex((b) => b.id === bird.id) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: initialIndex >= 0 ? initialIndex : 0,
  });
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Sync when bird prop changes (new modal open)
  useEffect(() => {
    if (!bird) return;
    const idx = birds.findIndex((b) => b.id === bird.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      if (emblaApi) {
        emblaApi.scrollTo(idx, true);
      }
    }
  }, [bird?.id]);

  // Re-init scroll when emblaApi becomes available
  useEffect(() => {
    if (!emblaApi || !bird) return;
    const idx = birds.findIndex((b) => b.id === bird.id);
    if (idx !== -1) {
      emblaApi.scrollTo(idx, true);
      setCurrentIndex(idx);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbsRef.current) {
      const thumbEl = thumbsRef.current.children[currentIndex] as HTMLElement;
      if (thumbEl) {
        thumbEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentIndex]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, scrollPrev, scrollNext]);

  if (!bird) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Modal container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar: counter + close */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
            padding: "0 4px",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#FFFFFF",
              fontWeight: 600,
            }}
          >
            {currentIndex + 1} <span style={{ opacity: 0.5 }}>/</span> {birds.length}
          </div>
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.6)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "#FFFFFF",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(245,118,0,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,0,0,0.6)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Carousel area with nav arrows */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Left arrow */}
          <button
            onClick={scrollPrev}
            disabled={currentIndex === 0}
            style={{
              position: "absolute",
              left: "-52px",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor:
                currentIndex === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.95)",
              border: "none",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: currentIndex === 0 ? "rgba(255,255,255,0.3)" : "#2c5f2d",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (currentIndex !== 0) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F57600";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== 0) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,255,255,0.95)";
                (e.currentTarget as HTMLButtonElement).style.color = "#2c5f2d";
              }
            }}
          >
            ←
          </button>

          {/* Embla carousel */}
          <div
            ref={emblaRef}
            style={{
              overflow: "hidden",
              borderRadius: "12px",
              width: "100%",
              boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
              maxHeight: "calc(90vh - 130px)",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex" }}>
              {birds.map((b) => (
                <BirdDetailSlide key={b.id} bird={b} />
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={scrollNext}
            disabled={currentIndex === birds.length - 1}
            style={{
              position: "absolute",
              right: "-52px",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor:
                currentIndex === birds.length - 1
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.95)",
              border: "none",
              cursor: currentIndex === birds.length - 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color:
                currentIndex === birds.length - 1 ? "rgba(255,255,255,0.3)" : "#2c5f2d",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (currentIndex !== birds.length - 1) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F57600";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== birds.length - 1) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,255,255,0.95)";
                (e.currentTarget as HTMLButtonElement).style.color = "#2c5f2d";
              }
            }}
          >
            →
          </button>
        </div>

        {/* Thumbnail filmstrip */}
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            ref={thumbsRef}
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              maxWidth: "100%",
              padding: "4px 4px 6px",
              scrollbarWidth: "none",
            }}
          >
            {birds.map((b, idx) => (
              <div
                key={b.id}
                onClick={() => scrollToIndex(idx)}
                style={{
                  width: "56px",
                  flexShrink: 0,
                  cursor: "pointer",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border:
                    idx === currentIndex
                      ? "2.5px solid #F57600"
                      : "2.5px solid transparent",
                  transition: "border 0.2s ease, transform 0.2s ease",
                  transform: idx === currentIndex ? "scale(1.08)" : "scale(1)",
                  opacity: idx === currentIndex ? 1 : 0.65,
                }}
              >
                <img
                  src={b.image}
                  alt={b.name}
                  style={{
                    width: "100%",
                    height: "48px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    backgroundColor: idx === currentIndex ? "#F57600" : "rgba(0,0,0,0.7)",
                    padding: "2px 3px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Noto Sans TC', sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}