"use client";

import { Madhab, MadhabPosition, MADHAB_INFO } from "@/types/fiqh";

interface MadhabCardProps {
  madhab: Madhab;
  position: MadhabPosition;
}

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: {
    bg: "bg-gold-50",
    border: "border-gold-200",
    text: "text-gold-700",
    badge: "bg-gold-100 text-gold-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    badge: "bg-amber-100 text-amber-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    badge: "bg-blue-100 text-blue-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    badge: "bg-purple-100 text-purple-700",
  },
};

const rulingTypeLabels: Record<string, { label: string; color: string }> = {
  wajib: { label: "Obligatory", color: "bg-red-100 text-red-700" },
  mustahab: { label: "Recommended", color: "bg-green-100 text-green-700" },
  mubah: { label: "Permissible", color: "bg-gray-100 text-gray-700" },
  makruh: { label: "Disliked", color: "bg-orange-100 text-orange-700" },
  haram: { label: "Forbidden", color: "bg-red-200 text-red-800" },
};

export default function MadhabCard({ madhab, position }: MadhabCardProps) {
  const info = MADHAB_INFO[madhab];
  const colors = colorClasses[info.color];
  const rulingInfo = position.rulingType ? rulingTypeLabels[position.rulingType] : null;

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-5 h-full flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${colors.text}`}>{info.name}</h3>
          <p className="text-sm text-gray-500 font-arabic">{info.nameArabic}</p>
        </div>
        {rulingInfo && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${rulingInfo.color}`}>
            {rulingInfo.label}
          </span>
        )}
      </div>

      {/* Ruling */}
      <div className="mb-4 flex-grow">
        <p className="text-gray-900 font-medium leading-relaxed">{position.ruling}</p>
      </div>

      {/* Evidence */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Evidence
        </h4>
        <p className="text-sm text-gray-600">{position.evidence}</p>
      </div>

      {/* Details (if any) */}
      {position.details && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Details
          </h4>
          <p className="text-sm text-gray-600">{position.details}</p>
        </div>
      )}

      {/* Conditions (if any) */}
      {position.conditions && position.conditions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Conditions
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {position.conditions.map((condition, index) => (
              <li key={index} className="flex items-start">
                <span className={`mr-2 ${colors.text}`}>•</span>
                {condition}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Scholars (if any) */}
      {position.scholars && position.scholars.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {position.scholars.map((scholar, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-xs ${colors.badge}`}
              >
                {scholar}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
