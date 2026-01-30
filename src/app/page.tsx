"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TopicFilter from "@/components/TopicFilter";
import QuestionCard from "@/components/QuestionCard";
import { TOPICS, FIQH_QUESTIONS } from "@/data/fiqh-questions";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredQuestions = selectedTopic
    ? FIQH_QUESTIONS.filter((q) => q.topic === selectedTopic)
    : FIQH_QUESTIONS;

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
        {/* Topic Filter */}
        <TopicFilter
          topics={TOPICS}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />

        {/* Questions List */}
        <div className="space-y-8">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
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
