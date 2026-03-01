"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search fiqh questions..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative mb-6">
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? "ring-2 ring-gold-400 ring-offset-2" : ""
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
        />

        {/* Keyboard Shortcut Hint */}
        <div className="absolute right-4 flex items-center gap-1">
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200">
            <span className="text-sm">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Search Tips */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
          <p className="text-sm text-gray-500 mb-2">Search tips:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Search by question: <span className="text-gold-500">&quot;wudu&quot;</span></li>
            <li>• Search by topic: <span className="text-gold-500">&quot;prayer&quot;</span></li>
            <li>• Search by ruling: <span className="text-gold-500">&quot;permissible&quot;</span></li>
            <li>• Search in Arabic: <span className="text-gold-500 font-arabic">&quot;الوضوء&quot;</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}
