"use client";

import { useState, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import TopicFilter from "@/components/TopicFilter";
import QuestionCard from "@/components/QuestionCard";
import SearchBar from "@/components/SearchBar";
import { TOPICS, FIQH_QUESTIONS } from "@/data/fiqh-questions";
import { FiqhQuestion } from "@/types/fiqh";

// Search function that looks through all relevant fields
function searchQuestions(questions: FiqhQuestion[], query: string): FiqhQuestion[] {
  if (!query.trim()) return questions;

  const searchTerm = query.toLowerCase().trim();

  return questions.filter((q) => {
    // Search in question text
    if (q.question.toLowerCase().includes(searchTerm)) return true;
    if (q.questionArabic?.includes(searchTerm)) return true;

    // Search in topic
    if (q.topic.toLowerCase().includes(searchTerm)) return true;
    if (q.subtopic?.toLowerCase().includes(searchTerm)) return true;

    // Search in all madhab positions
    for (const madhab of Object.values(q.positions)) {
      if (madhab.ruling.toLowerCase().includes(searchTerm)) return true;
      if (madhab.evidence.toLowerCase().includes(searchTerm)) return true;
      if (madhab.details?.toLowerCase().includes(searchTerm)) return true;
      if (madhab.conditions?.some(c => c.toLowerCase().includes(searchTerm))) return true;
      if (madhab.scholars?.some(s => s.toLowerCase().includes(searchTerm))) return true;
    }

    // Search in consensus
    if (q.consensus?.toLowerCase().includes(searchTerm)) return true;

    // Search in modern scholars
    if (q.modernScholars?.some(s => s.toLowerCase().includes(searchTerm))) return true;

    return false;
  });
}

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Clear topic filter when searching to show all results
    if (query.trim()) {
      setSelectedTopic(null);
    }
  }, []);

  const filteredQuestions = useMemo(() => {
    let results = FIQH_QUESTIONS;

    // Apply topic filter
    if (selectedTopic) {
      results = results.filter((q) => q.topic === selectedTopic);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      results = searchQuestions(results, searchQuery);
    }

    return results;
  }, [selectedTopic, searchQuery]);

  const resultsCount = filteredQuestions.length;
  const totalCount = FIQH_QUESTIONS.length;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Compare Islamic Rulings<br />
              <span className="text-emerald-200">Across All Four Madhabs</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              See how Hanafi, Maliki, Shafi&apos;i, and Hanbali scholars interpret fiqh
              questions — with authentic evidence from Quran and Sunnah.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">{FIQH_QUESTIONS.length}</div>
                <div className="text-sm text-emerald-200">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-emerald-200">Madhabs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">{TOPICS.length}</div>
                <div className="text-sm text-emerald-200">Topics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Topic Filter */}
        <TopicFilter
          topics={TOPICS}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />

        {/* Results Count */}
        {(searchQuery || selectedTopic) && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{resultsCount}</span> of {totalCount} questions
              {searchQuery && (
                <span className="ml-2">
                  for &quot;<span className="text-emerald-600">{searchQuery}</span>&quot;
                </span>
              )}
            </p>
            {(searchQuery || selectedTopic) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic(null);
                }}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-8">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-4">
                Try a different search term or browse all topics
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic(null);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Show all questions
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 text-center">
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
              className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              View Source PDF
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Contribute on GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white">☪</span>
              </div>
              <span className="font-bold text-white">Muminaat</span>
            </div>
            <p className="text-sm mb-4">
              Fiqh comparisons for educational purposes. Always consult qualified
              scholars for personal rulings.
            </p>
            <p className="text-xs">
              Data sourced from &quot;Differences in Fiqh Made Easy&quot; and classical fiqh
              texts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
