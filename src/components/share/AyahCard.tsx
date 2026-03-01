"use client";

import { forwardRef } from "react";
import { ShareCardData, ShareCardTheme } from "@/types/viral";
import { CARD_THEMES } from "@/lib/share-utils";

interface AyahCardProps {
  data: ShareCardData;
  theme: ShareCardTheme;
}

const AyahCard = forwardRef<HTMLDivElement, AyahCardProps>(
  ({ data, theme }, ref) => {
    const colors = CARD_THEMES[theme];

    return (
      <div
        ref={ref}
        style={{
          width: 540,
          height: 675,
          background: `linear-gradient(145deg, ${colors.from}, ${colors.to})`,
          padding: 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative corner elements */}
        <div style={{
          position: "absolute", top: 24, left: 24, right: 24,
          borderTop: "1px solid rgba(201, 168, 76, 0.3)",
          borderLeft: "1px solid rgba(201, 168, 76, 0.3)",
          borderRight: "1px solid rgba(201, 168, 76, 0.3)",
          height: 24, borderRadius: "8px 8px 0 0",
        }} />
        <div style={{
          position: "absolute", bottom: 24, left: 24, right: 24,
          borderBottom: "1px solid rgba(201, 168, 76, 0.3)",
          borderLeft: "1px solid rgba(201, 168, 76, 0.3)",
          borderRight: "1px solid rgba(201, 168, 76, 0.3)",
          height: 24, borderRadius: "0 0 8px 8px",
        }} />

        {/* Arabic Text */}
        <div style={{
          textAlign: "center",
          direction: "rtl",
          fontFamily: "'Amiri', serif",
          fontSize: data.arabicText.length > 200 ? 22 : data.arabicText.length > 100 ? 26 : 32,
          lineHeight: 2.2,
          color: "#ffffff",
          marginBottom: 24,
          maxHeight: 300,
          overflow: "hidden",
        }}>
          {data.arabicText}
        </div>

        {/* Gold divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24, width: "60%",
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(201, 168, 76, 0.5)" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c" }} />
          <div style={{ flex: 1, height: 1, background: "rgba(201, 168, 76, 0.5)" }} />
        </div>

        {/* Translation */}
        <div style={{
          textAlign: "center",
          fontSize: data.translation.length > 200 ? 13 : 15,
          lineHeight: 1.7,
          color: "rgba(255, 255, 255, 0.7)",
          marginBottom: 32,
          maxHeight: 120,
          overflow: "hidden",
        }}>
          {data.translation}
        </div>

        {/* Reference */}
        <div style={{
          textAlign: "center",
          fontSize: 13,
          color: "#c9a84c",
          letterSpacing: 1,
        }}>
          {data.surahName} ({data.surahNameArabic}) {data.surahNumber}:{data.ayahNumber}
        </div>

        {/* Muminaat branding */}
        <div style={{
          position: "absolute",
          bottom: 36,
          textAlign: "center",
          fontSize: 11,
          color: "rgba(201, 168, 76, 0.4)",
          letterSpacing: 2,
        }}>
          مومنات · MUMINAAT
        </div>
      </div>
    );
  }
);

AyahCard.displayName = "AyahCard";
export default AyahCard;
