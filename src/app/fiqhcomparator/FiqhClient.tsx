"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import TopicFilter from "@/components/TopicFilter";
import QuestionCard from "@/components/QuestionCard";
import SearchBar from "@/components/SearchBar";
import { TOPICS, ALL_QUESTIONS } from "@/data/questions";
import { FiqhQuestion } from "@/types/fiqh";

function searchQuestions(questions: FiqhQuestion[], query: string): FiqhQuestion[] {
  if (!query.trim()) return questions;

  const searchTerm = query.toLowerCase().trim();

  return questions.filter((q) => {
    if (q.question.toLowerCase().includes(searchTerm)) return true;
    if (q.questionArabic?.includes(searchTerm)) return true;
    if (q.topic.toLowerCase().includes(searchTerm)) return true;
    if (q.subtopic?.toLowerCase().includes(searchTerm)) return true;

    for (const madhab of Object.values(q.positions)) {
      if (madhab.ruling.toLowerCase().includes(searchTerm)) return true;
      if (madhab.evidence.toLowerCase().includes(searchTerm)) return true;
      if (madhab.details?.toLowerCase().includes(searchTerm)) return true;
      if (madhab.conditions?.some(c => c.toLowerCase().includes(searchTerm))) return true;
      if (madhab.scholars?.some(s => s.toLowerCase().includes(searchTerm))) return true;
    }

    if (q.consensus?.toLowerCase().includes(searchTerm)) return true;
    if (q.modernScholars?.some(s => s.toLowerCase().includes(searchTerm))) return true;

    return false;
  });
}

export default function FiqhClient() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSelectedTopic(null);
    }
  }, []);

  const filteredQuestions = useMemo(() => {
    let results = ALL_QUESTIONS;

    if (selectedTopic) {
      results = results.filter((q) => q.topic === selectedTopic);
    }

    if (searchQuery.trim()) {
      results = searchQuestions(results, searchQuery);
    }

    return results;
  }, [selectedTopic, searchQuery]);

  const resultsCount = filteredQuestions.length;
  const totalCount = ALL_QUESTIONS.length;

  return (
    <div className="min-h-screen pt-14">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Compare Islamic Rulings<br />
              <span className="text-gold-400">Across All Four Madhabs</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8">
              See how Hanafi, Maliki, Shafi&apos;i, and Hanbali scholars interpret fiqh
              questions — with authentic evidence from Quran and Sunnah.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">{ALL_QUESTIONS.length}</div>
                <div className="text-sm text-gold-300">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-gold-300">Madhabs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">{TOPICS.length}</div>
                <div className="text-sm text-gold-300">Topics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar onSearch={handleSearch} />

        <TopicFilter
          topics={TOPICS}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />

        {(searchQuery || selectedTopic) && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{resultsCount}</span> of {totalCount} questions
              {searchQuery && (
                <span className="ml-2">
                  for &quot;<span className="text-gold-500">{searchQuery}</span>&quot;
                </span>
              )}
            </p>
            {(searchQuery || selectedTopic) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic(null);
                }}
                className="text-sm text-gold-500 hover:text-gold-600 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <div className="space-y-8">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-4">
                Try a different search term or browse all topics
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic(null);
                }}
                className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
              >
                Show all questions
              </button>
            </div>
          )}
        </div>

        <section className="mt-16 bg-gradient-to-r from-gold-50 to-gold-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Help Expand This Resource
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            This is an open-source project. We need your help to add more
            questions, verify rulings, and translate to other languages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://raleighmasjid.org/wp-content/uploads/2021/07/Differences_in_Fiqh_Made_Easy_Part_I__II.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-colors"
            >
              View Source PDF
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-logo text-2xl text-gold-400/60 mb-4">مومنات</p>
            <p className="text-sm mb-4 leading-relaxed">
              This content has been compiled from classical fiqh sources across the four
              Sunni schools of thought (Hanafi, Maliki, Shafi&apos;i, Hanbali). While every
              effort has been made to ensure accuracy, this app is for educational purposes
              and does not constitute a fatwa or religious ruling. Please consult qualified
              scholars for personal matters.
            </p>
            <div className="border-t border-gray-800 pt-4 flex justify-center gap-4 text-xs">
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <span className="text-gray-600">|</span>
              <Link href="/quran" className="hover:text-gold-400 transition-colors">Quran</Link>
              <span className="text-gray-600">|</span>
              <Link href="/admin" className="text-gray-500 hover:text-gold-400 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
