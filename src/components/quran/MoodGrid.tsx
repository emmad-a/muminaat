"use client";

import { MoodCategory } from "@/types/viral";

interface MoodGridProps {
  categories: MoodCategory[];
  onSelect: (categoryId: string) => void;
  selected: string | null;
}

export default function MoodGrid({ categories, onSelect, selected }: MoodGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`relative overflow-hidden rounded-2xl p-5 text-center transition-all duration-300 border ${
            selected === cat.id
              ? "border-gold-400/50 ring-2 ring-gold-400/30 scale-[1.02]"
              : "border-neutral-800 hover:border-neutral-700 hover:scale-[1.01]"
          } bg-gradient-to-br ${cat.color}`}
        >
          <div className="text-3xl mb-2">{cat.icon}</div>
          <div className="text-sm font-semibold text-white mb-0.5">{cat.label}</div>
          <div className="text-xs text-gold-400/70 font-arabic">{cat.labelArabic}</div>
        </button>
      ))}
    </div>
  );
}
