import { toPng } from "html-to-image";

export async function generateCardImage(element: HTMLElement): Promise<Blob> {
  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    quality: 0.95,
  });
  const res = await fetch(dataUrl);
  return res.blob();
}

export async function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function shareImage(blob: Blob, title: string, text: string) {
  if (navigator.share && navigator.canShare) {
    const file = new File([blob], "muminaat-verse.png", { type: "image/png" });
    const shareData = { title, text, files: [file] };
    if (navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return true;
    }
  }
  return false;
}

// Share counter per ayah
const SHARE_PREFIX = "muminaat_shares_";

export function getShareCount(surah: number, ayah: number): number {
  if (typeof window === "undefined") return 0;
  const key = `${SHARE_PREFIX}${surah}:${ayah}`;
  return parseInt(localStorage.getItem(key) || "0", 10);
}

export function incrementShareCount(surah: number, ayah: number): number {
  const key = `${SHARE_PREFIX}${surah}:${ayah}`;
  const current = getShareCount(surah, ayah);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return next;
}

// Card theme gradients
export const CARD_THEMES = {
  midnight: { from: "#0f0f23", to: "#1a1a3e", name: "Midnight" },
  desert: { from: "#2d1f0e", to: "#4a3520", name: "Desert" },
  ocean: { from: "#0a1628", to: "#152238", name: "Ocean" },
  dawn: { from: "#1f0a1e", to: "#2a1428", name: "Dawn" },
} as const;
