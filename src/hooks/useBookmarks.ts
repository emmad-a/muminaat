"use client";

import { useState, useEffect, useCallback } from "react";
import { Bookmark } from "@/types/quran";
import { loadBookmarks, saveBookmarks } from "@/lib/quran-settings";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(loadBookmarks());
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0 || loadBookmarks().length > 0) {
      saveBookmarks(bookmarks);
    }
  }, [bookmarks]);

  const addBookmark = useCallback(
    (surah: number, ayah: number, surahName: string) => {
      const id = `${surah}:${ayah}`;
      setBookmarks((prev) => {
        if (prev.some((b) => b.id === id)) return prev;
        return [...prev, { id, surah, ayah, surahName, createdAt: Date.now() }];
      });
    },
    []
  );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const isBookmarked = useCallback(
    (surah: number, ayah: number) => bookmarks.some((b) => b.id === `${surah}:${ayah}`),
    [bookmarks]
  );

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
