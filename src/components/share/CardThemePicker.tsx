"use client";

import { ShareCardTheme } from "@/types/viral";
import { CARD_THEMES } from "@/lib/share-utils";

interface CardThemePickerProps {
  selected: ShareCardTheme;
  onSelect: (theme: ShareCardTheme) => void;
}

export default function CardThemePicker({ selected, onSelect }: CardThemePickerProps) {
  return (
    <div className="flex gap-3">
      {(Object.entries(CARD_THEMES) as [ShareCardTheme, typeof CARD_THEMES[ShareCardTheme]][]).map(
        ([key, value]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`w-10 h-10 rounded-xl transition-all ${
              selected === key ? "ring-2 ring-gold-400 ring-offset-2 ring-offset-black scale-110" : "hover:scale-105"
            }`}
            style={{
              background: `linear-gradient(135deg, ${value.from}, ${value.to})`,
            }}
            title={value.name}
          />
        )
      )}
    </div>
  );
}
