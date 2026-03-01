"use client";

interface ShareButtonProps {
  onClick: () => void;
  className?: string;
}

export default function ShareButton({ onClick, className = "" }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-300 dark:text-gray-600 hover:text-gold-500 ${className}`}
      aria-label="Share verse"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8a2 2 0 100-4 2 2 0 000 4zM11 4a2 2 0 100-4 2 2 0 000 4zM11 14a2 2 0 100-4 2 2 0 000 4zM4.7 7.1l4.6 2.3M9.3 3.1L4.7 5.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
