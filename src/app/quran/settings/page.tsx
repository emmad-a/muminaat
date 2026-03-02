"use client";

import { useQuranContext } from "@/components/quran/QuranProvider";
import { RECITERS } from "@/lib/quran-audio";
import { AudioMode } from "@/types/quran";

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5];

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings } = useQuranContext();

  const handleReset = () => {
    if (window.confirm("Reset all settings to their default values?")) {
      resetSettings();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings <span className="font-arabic text-gold-400">الإعدادات</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize your Quran reading experience
        </p>
      </div>

      {/* Typography */}
      <Section title="Typography" icon={<TypographyIcon />}>
        {/* Arabic Font Size */}
        <SettingRow label="Arabic Font Size" value={`${settings.arabicFontSize}px`}>
          <input
            type="range"
            min={18}
            max={48}
            value={settings.arabicFontSize}
            onChange={(e) => updateSetting("arabicFontSize", Number(e.target.value))}
            className="w-full accent-gold-400"
          />
        </SettingRow>

        {/* Live Preview */}
        <div className="mt-3 p-4 rounded-lg bg-black/30 border border-neutral-800/50 text-center">
          <p
            className="font-arabic text-gray-200 leading-[2.2]"
            style={{ fontSize: settings.arabicFontSize }}
            dir="rtl"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p
            className="text-gray-500 mt-2 leading-relaxed"
            style={{ fontSize: settings.translationFontSize }}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Translation Font Size */}
        <SettingRow label="Translation Font Size" value={`${settings.translationFontSize}px`}>
          <input
            type="range"
            min={12}
            max={24}
            value={settings.translationFontSize}
            onChange={(e) => updateSetting("translationFontSize", Number(e.target.value))}
            className="w-full accent-gold-400"
          />
        </SettingRow>
      </Section>

      {/* Reading Experience */}
      <Section title="Reading Experience" icon={<BookIcon />}>
        <ToggleRow
          label="Word-by-Word Highlight"
          description="Highlight each word as the reciter speaks"
          checked={settings.wordHighlight}
          onChange={(v) => updateSetting("wordHighlight", v)}
        />
        <ToggleRow
          label="Show Translations"
          description="Display translations below verses"
          checked={settings.showTranslation}
          onChange={(v) => updateSetting("showTranslation", v)}
        />
        <ToggleRow
          label="Reading Mode"
          description="Continuous text flow without verse separators"
          checked={settings.readingMode}
          onChange={(v) => updateSetting("readingMode", v)}
        />
        <ToggleRow
          label="Word-by-Word Tooltips"
          description="Show translation and transliteration on hover"
          checked={false}
          onChange={() => {}}
          disabled
        />
        <ToggleRow
          label="Tajwid Colors"
          description="Color-coded pronunciation rules"
          checked={false}
          onChange={() => {}}
          disabled
        />
      </Section>

      {/* Audio & Recitation */}
      <Section title="Audio & Recitation" icon={<AudioIcon />}>
        {/* Reciter */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Reciter</label>
          <select
            value={settings.reciterId}
            onChange={(e) => updateSetting("reciterId", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-gold-400 transition-colors"
          >
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.nameArabic}
              </option>
            ))}
          </select>
        </div>

        {/* Audio Mode */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Audio Mode</label>
          <div className="flex gap-2">
            <PillButton
              active={settings.audioMode === "ayah"}
              onClick={() => updateSetting("audioMode", "ayah" as AudioMode)}
            >
              Ayah-by-Ayah
            </PillButton>
            <PillButton
              active={settings.audioMode === "surah"}
              onClick={() => updateSetting("audioMode", "surah" as AudioMode)}
            >
              Full Surah
            </PillButton>
          </div>
        </div>

        {/* Playback Rate */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Playback Speed</label>
          <div className="flex gap-2">
            {PLAYBACK_RATES.map((rate) => (
              <PillButton
                key={rate}
                active={settings.playbackRate === rate}
                onClick={() => updateSetting("playbackRate", rate)}
              >
                {rate}x
              </PillButton>
            ))}
          </div>
        </div>
      </Section>

      {/* Appearance */}
      <Section title="Appearance" icon={<PaletteIcon />}>
        <label className="text-sm font-medium text-gray-300 mb-2 block">Theme</label>
        <div className="flex gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <PillButton
              key={t}
              active={settings.theme === t}
              onClick={() => updateSetting("theme", t)}
            >
              {t === "light" ? "Light" : t === "dark" ? "Dark" : "System"}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Reset */}
      <div className="mt-8 mb-12 p-5 rounded-xl border border-red-900/30 bg-red-950/20">
        <h3 className="text-sm font-semibold text-red-400 mb-1">Reset All Settings</h3>
        <p className="text-xs text-gray-500 mb-4">
          This will restore all settings to their default values
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-red-900/40 text-red-300 hover:bg-red-900/60 transition-colors"
        >
          Reset Settings
        </button>
      </div>
    </div>
  );
}

/* ── Helper Components ─────────────────────────── */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gold-400">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-200 tracking-wide uppercase">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SettingRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-xs font-mono text-gold-400">{value}</span>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3 border-b border-neutral-800/40 last:border-0 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <div className="pr-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200">{label}</span>
          {disabled && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-neutral-700 text-gray-400">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
          checked ? "bg-gold-400" : "bg-neutral-700"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? "bg-gold-400/15 text-gold-400 border border-gold-400/30"
          : "bg-neutral-800 text-gray-400 border border-neutral-700 hover:text-gray-200 hover:border-neutral-600"
      }`}
    >
      {children}
    </button>
  );
}

/* ── Section Icons (inline SVG) ────────────────── */

function TypographyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12.5L8 3L13 12.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9h6" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 3C2 2.45 2.45 2 3 2h3.5c.83 0 1.5.67 1.5 1.5V14l-.02-.01C7.4 13.37 6.67 13 5.88 13H3c-.55 0-1-.45-1-1V3z" strokeLinejoin="round" />
      <path d="M14 3c0-.55-.45-1-1-1h-3.5C8.67 2 8 2.67 8 3.5V14l.02-.01c.58-.62 1.32-1 2.1-1H13c.55 0 1-.45 1-1V3z" strokeLinejoin="round" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v12M5 5v6M2 7v2M11 4v8M14 6v4" strokeLinecap="round" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6" />
      <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="6" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
