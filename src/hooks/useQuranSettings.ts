"use client";

import { useState, useEffect, useCallback } from "react";
import { QuranSettings } from "@/types/quran";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "@/lib/quran-settings";

export function useQuranSettings() {
  const [settings, setSettings] = useState<QuranSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveSettings(settings);
  }, [settings, loaded]);

  const updateSetting = useCallback(
    <K extends keyof QuranSettings>(key: K, value: QuranSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, updateSetting, resetSettings };
}
